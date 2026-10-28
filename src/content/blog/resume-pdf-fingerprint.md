---
title: 讓履歷 PDF 不會悄悄過期
slug: resume-pdf-fingerprint
lang: zh-Hant
draft: false
date: 2026-10-14
description: 網站上的履歷是從 profile.json 產生的，PDF 卻是另外一個檔案。我用一個 sha256 fingerprint，讓兩者對不上時直接讓檢查失敗。
tags:
  - Astro
  - Automation
  - Resume
---
這個網站的履歷有兩份：網頁上的 `/resume`，和可以下載的 PDF。兩份都從同一個 `profile.json` 來，但 PDF 是用 Python 另外產生、再 commit 進 `public/` 的。這樣 Netlify build 時不用裝 Python，缺點是只要我改了 `profile.json` 卻忘了重跑 generator，PDF 就默默過期了。

這件事真的發生過。有一次我檢查才發現，已經 commit 的 PDF 和 `profile.json` 對不起來，只好重新產生一份。

做法很單純。generator 每次跑完，除了 PDF 之外，還會寫出一個 `resume-pdf.sha256`，內容是「會進到 PDF 的那些資料」的 hash。`npm run resume:check` 則是用 Node 重算一次目前 `profile.json` 的 hash，跟檔案裡的比，不一樣就讓指令失敗，並提醒我去跑 `npm run resume:pdf`。

有幾個細節是我刻意處理的。第一，只 hash 會進 PDF 的 field，例如姓名、職稱、摘要、經歷、學歷、技能。興趣之類不會出現在 PDF 的內容，我改了不該害我重新產生一份 PDF。第二，算 hash 前先把 object 的 key 全部排序，這樣只是調換 field 順序的修改不會誤判。第三，hash 的 algorithm 在 Python 和 Node 各寫了一份，兩邊必須一模一樣，所以我在兩個檔案的 comment 裡都寫明了要同步。

另外兩個跟隱私有關的選擇，順便記下來。PDF 裡不放 email，除非我另外用 environment variable 指定；每一頁 footer 都有網站 URL 和更新月份，這樣別人手上的舊版一眼就看得出來是舊的；文件本身的 metadata（作者、建立工具、日期）則全部清掉。

中間還踩到一個小坑：我的 macOS 不讓我直接 `pip install` 到 global（PEP 668），而且 PDF 需要的 font 路徑跟 Linux 不一樣。後來改成 generator 在本機建一個 `.venv` 來跑，font 找不到時再退回到 macOS 內建的。

如果要說這件事學到什麼，大概是：兩份由同一份資料衍生的東西，本來就會分叉。與其期待自己記得同步，不如讓不同步的時候，build 會直接壞給你看。
