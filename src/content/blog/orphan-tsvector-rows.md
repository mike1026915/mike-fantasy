---
title: 刪除端沒有漏，孤兒列從寫入端來
slug: orphan-tsvector-rows
lang: zh-Hant
draft: false
date: 2026-09-08
description: 資料庫裡累積了 171 筆指向已刪除 candidate 的搜尋索引列。我一開始以為是刪除漏清，結果問題出在 fire-and-forget 的寫入。
tags:
  - PostgreSQL
  - Prisma
  - Debugging
---
有一天我發現資料庫裡有 171 筆搜尋索引（tsvector）指向已經不存在的 candidate。直覺的第一個念頭是：刪除 candidate 的時候漏清了索引。我讓 AI 去修這個「刪除時沒有一併清理」的 bug，但它先回報的是：前提不對。

它做的事情是把整個程式碼庫搜過一輪。應用層只有一條刪除 candidate 的路徑，tsvector 和 pgvector 都在同一個 transaction 裡一起刪；用 `git log -L` 往回看，這兩行從刪除功能第一次上線就在，沒有歷史缺口。Schema 裡也沒有任何 `onDelete: Cascade` 指向 candidate，沒有從父表連帶刪除的路徑；其他腳本和資料探索工具也都沒有刪過 candidate。刪除端沒有東西可以修。

真正的來源在寫入端。我們寫索引的方式是一段 raw SQL 的 `INSERT ... ON CONFLICT`，而專案用的是 Prisma 的 `relationMode = "prisma"`，資料庫層沒有外鍵擋著。更關鍵的是，建立和更新 candidate 時呼叫這段寫入，都是 fire-and-forget，沒有 await。於是只要一個 candidate 在索引寫入落地之前就被刪掉，寫入照樣成功，孤兒列就這樣出現了。pgvector 的 embedding 寫入形狀一模一樣，而且中間還夾著一次要好幾秒的 AI embedding 呼叫，時間窗口更大。

修法很小。把 `INSERT ... VALUES` 改成 `INSERT ... SELECT ... FROM "Candidate" WHERE id = ...`：candidate 還在就照寫，已經被刪就寫入 0 列，`ON CONFLICT` 的行為完全不變。所有呼叫端共用同一個函式，所以一處改動全部蓋住，另外補了兩個回歸測試。

有兩件事我決定不做。一是不把呼叫改成 await，因為那會把 AI 索引的延遲加進建立和更新的回應時間，而且現在正確性已經不依賴它了。二是不加資料庫外鍵，`relationMode = "prisma"` 是整個專案的決定，不該為了一個 bug 改掉。

既有的 171 筆孤兒沒有放進這次修改，改成另外清理，這次只負責不再產生新的。

我覺得這件事最有意思的是驗證的方式：既然修法只擋新的孤兒，那過幾天再數一次，如果還是 0，就代表 guard 有效；如果又長出來，就表示還有我沒找到的寫入路徑。我全庫只找到兩處 raw INSERT，但這是唯一能證明我找漏了沒有的辦法。這個回頭數的動作我還沒做完，所以現在只能說「推論上擋住了」，不能說「已經證實」。
