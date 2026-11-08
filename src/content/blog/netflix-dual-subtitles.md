---
title: 一天做出 Netflix 雙語字幕 extension
slug: netflix-dual-subtitles
lang: zh-Hant
draft: false
date: 2026-11-08
description: 想在 Netflix 上同時看中文和英文字幕，就自己寫了一個 Chrome extension。攔截 JSON.parse 拿到字幕清單，自己下載、自己畫 overlay，當天還遇到 Netflix 改欄位名稱。
tags:
  - Chrome Extension
  - JavaScript
  - Netflix
---
Netflix 一次只能開一種字幕。我想要上面中文、下面英文同時顯示，於是寫了一個 Chrome extension。整個專案只有五個檔案，`inject.js` 不到一百行，從第一個 commit 到加上開關和重新載入按鈕，是同一天做完的。

**第一個問題：字幕從哪裡來。** Netflix 開始播放前，會先要一份 playback manifest，裡面列了這部片所有的字幕 track，每個 track 都附有下載網址。這份 manifest 是用 JSON 傳的，所以最簡單的做法，是把頁面上的 `JSON.parse` 換掉：照常解析，但順手看一下結果裡有沒有字幕清單，有就存起來。

另外還要攔截 `JSON.stringify`。送出 manifest request 時，裡面有一個 `profiles` 陣列，告訴 server 這個 client 支援哪些字幕格式。我在這裡多塞一個 WebVTT 的 profile，讓 server 回來的下載連結裡多一種好解析的格式。

**第二個問題：要攔截頁面的 `JSON`，script 就得跑在頁面自己的環境裡。** Chrome extension 的 content script 預設跑在 isolated world，跟頁面共用 DOM，但不共用 JavaScript 的全域物件，所以在那裡改 `JSON.parse` 對 Netflix 沒有作用。Manifest V3 可以用 `"world": "MAIN"` 讓 script 直接跑在頁面裡，但代價是拿不到 `chrome.storage` 這些 extension API。

所以我拆成兩支 script。`bridge.js` 跑在 isolated world，負責讀使用者的設定（要哪兩種語言、開或關），把設定寫進 `<html>` 的一個 `data-` attribute，再丟一個 custom event 通知對方。`inject.js` 跑在 MAIN world，負責攔截、下載和畫字幕，收到 event 就去 attribute 讀最新設定。兩邊唯一共用的東西是 DOM，就拿 DOM 當傳話筒。

**第三個問題：Netflix 改了欄位名稱。** 同一天的第三個 commit，就是在處理這件事。新版 manifest 裡，`timedtexttracks` 改名叫 `textTracks`，每個 track 的 `ttDownloadables` 也改成 `downloadables`。修法是兩個名字都試：`r.result.textTracks || r.result.timedtexttracks`。這種靠別人內部、沒有文件的格式吃飯的東西，本來就隨時會壞，第一天就遇到一次。所以我把兩種名稱都留著，並在旁邊註明為什麼，下次再改名，至少知道該從哪裡找起。

**挑 track 和解析格式。** 找語言時先找完全符合的，例如 `zh-Hant`；找不到再退一步，只比對前綴 `zh`。forced narrative（只在外語對白出現時才顯示的那種）和代表「無字幕」的 track 都要跳過。真的找不到，就在 console 印出這部片有哪些語言，方便 debug。

下載回來的字幕不一定是我要的 WebVTT，有時只有 TTML，所以兩種都要能解析。VTT 是純文字，用空行切 block，找 `-->` 那行取時間就好。TTML 是 XML，時間可能寫成 `12.5s`，也可能寫成 `125000000t`，後者是以 tick 為單位，要除以文件宣告的 `ttp:tickRate`，沒宣告就用一千萬。`<br>` 也要先換成換行，不然兩行字會黏在一起。

**畫字幕。** 在 `<video>` 上面疊一個 `div`，上面一行白字、下面一行黃色小一點的字，`pointer-events: none`，所以不會擋到播放器的操作。這個 `div` 掛在播放器的容器裡，而不是 `body`。瀏覽器全螢幕時只會顯示全螢幕元素裡面的東西，掛在外面就會在全螢幕時消失。更新方式是每 200ms 讀一次 `currentTime`，找出這個時間點該顯示的字幕。之前做歌詞逐字 highlight 時，我用的是 `requestAnimationFrame`，因為逐字需要跟得很緊；字幕一行通常停留好幾秒，200ms 的延遲看不出來，一個簡單的 `setInterval` 就夠了。

**最後一點小技巧。** popup 上有個「重新載入字幕」按鈕，它做的事其實只是往 `chrome.storage.local` 寫一個 timestamp。`bridge.js` 本來就在監聽 storage 的任何變動，一有變動就把設定重送一次，`inject.js` 收到設定就會重新下載字幕。所以這個按鈕不用另外開一條溝通管道，直接搭現有機制的便車。

用的時候要記得把 Netflix 內建字幕關掉，不然畫面上會多出一組字幕跟我的疊在一起。popup 上我也寫了這句提醒。
