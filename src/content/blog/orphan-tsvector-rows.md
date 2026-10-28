---
title: 刪除端沒有漏，orphan rows 從寫入端來
slug: orphan-tsvector-rows
lang: zh-Hant
draft: false
date: 2026-10-27
description: search index 表裡累積了一批指向已刪除資料的 orphan rows。我一開始以為是刪除時漏清，結果問題出在 fire-and-forget 的寫入。
tags:
  - PostgreSQL
  - Debugging
---
有一次我發現 search index 的表裡，累積了一批指向已經不存在的資料的列。直覺的第一個念頭是：刪除的時候漏清了 index。我讓 AI 去修這個「刪除時沒有一併清理」的 bug，但它先回報的是：前提不對。

它做的事情是把整個 codebase 搜過一輪。application layer 只有一條刪除路徑，index 和主資料都在同一個 transaction 裡一起刪；用 `git log -L` 往回看，這幾行從刪除功能第一次上線就在，沒有歷史缺口。Schema 裡也沒有任何 `onDelete: Cascade` 指到這張表，沒有從父表連帶刪除的路徑；其他腳本和工具也都沒有刪過這張表的資料。刪除端沒有東西可以修。

真正的來源在寫入端。index 是用一段 raw SQL 的 `INSERT ... ON CONFLICT` 寫入的，而專案用的 ORM 把 relation 放在 application layer 處理，database 層沒有 foreign key 擋著。更關鍵的是，建立和更新資料時呼叫這段寫入，都是 fire-and-forget，沒有 await。於是只要一筆資料在 index 寫入落地之前就被刪掉，寫入照樣成功，orphan rows 就這樣出現了。另一種 vector index 的寫入形狀一模一樣，而且中間還夾著一次要好幾秒的 external call，time window 更大。

修法很小。把 `INSERT ... VALUES` 改成 `INSERT ... SELECT ... FROM <main_table> WHERE id = ...`：主資料還在就照寫，已經被刪就寫入 0 列，`ON CONFLICT` 的行為完全不變。所有 caller 共用同一個函式，所以一處改動全部蓋住，另外補了兩個 regression test。

有兩件事我決定不做。一是不把呼叫改成 await，因為那會把 index 的 latency 加進建立和更新的 response time，而且現在正確性已經不依賴它了。二是不加 database foreign key，relation 放在 application layer 是整個專案的決定，不該為了一個 bug 改掉。

既有的 orphan rows 沒有放進這次修改，改成另外清理，這次只負責不再產生新的。

我覺得這件事最有意思的是驗證的方式：既然修法只擋新的孤兒，那過幾天再數一次，如果還是 0，就代表 guard 有效；如果又長出來，就表示還有我沒找到的寫入路徑。我全庫只找到兩處 raw INSERT，但這是唯一能證明我找漏了沒有的辦法。這個回頭數的動作我還沒做完，所以現在只能說「推論上擋住了」，不能說「已經證實」。
