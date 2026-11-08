---
title: 片尾幾分鐘，字幕變成下一集的
slug: netflix-dual-sub-next-episode
lang: zh-Hant
draft: false
date: 2026-11-08
description: Netflix 雙語字幕 extension 的第一個 bug：一集快結束時，字幕突然換成下一集的。原因是 Netflix 會預先載入下一集，而我的 code 假設「最後到的 manifest 就是正在看的那一集」。
tags:
  - Chrome Extension
  - Debugging
  - Netflix
---
[上一篇](/blogs/netflix-dual-subtitles/)做好的 Netflix 雙語字幕 extension，當天晚上就修了第一個 bug：一集快結束的時候，畫面上的雙語字幕突然對不上，顯示的是下一集的字幕。

**先縮小範圍。** 字幕顯示錯，大概只有兩種可能：一是時間算錯，例如解析 VTT 或 TTML 時把秒數弄錯；二是載入的 track 本身就不對。這個 bug 只在片尾出現，前面幾十分鐘都正常。如果是解析的問題，同一份字幕檔前面就應該出錯，不會等到最後幾分鐘才發作。所以比較可能的是第二種：播到一半，字幕被換成另一份了。

**誰會把字幕換掉？** 整支 `inject.js` 裡，會改 `tracks` 這個變數的只有一個地方，就是攔截 `JSON.parse` 的那段：

```js
if (tt) { tracks = tt; reload(); }
```

只要有任何一份 JSON 裡帶著字幕清單，就直接覆蓋 `tracks`，然後重新下載字幕。這行 code 背後藏著一個沒寫出來的假設：**最後一個到的 manifest，就是正在播的那一集。**

**這個假設什麼時候會不成立？** Netflix 會自動播下一集，而且要接得夠順，播放器就得提前做準備。實際上它會在一集結束前幾分鐘，就先去要下一集的 playback manifest。這份 manifest 一樣經過 `JSON.parse`，一樣帶著字幕清單，於是我的 code 就把它當成「現在這一集」，把字幕換成下一集的。這也剛好解釋了為什麼只有片尾會出錯。

**修法要回答一個問題：現在到底在播哪一集？** manifest 到達的順序不可靠，那就換一個比較可靠的來源：網址。Netflix 播放頁的網址是 `/watch/<id>`，這個 id 就是 manifest 裡的 `movieId`。所以改成兩步：

1. 攔截到 manifest 時，不再直接覆蓋 `tracks`，而是用 `movieId` 當 key 存進一張表。預載的下一集就先放著，不會影響現在的字幕。
2. 在原本每 200ms 更新字幕的 loop 裡，順手讀一次網址裡的 id。id 變了，而且表裡有這一集的 manifest，才把 `tracks` 換過去並重新下載字幕。

```js
const id = currentId();
if (id !== loadedId && manifests[id]) { loadedId = id; tracks = manifests[id]; reload(); }
```

為什麼不監聽網址變化，而是用 polling？Netflix 是 SPA，換集時頁面不會重新載入。SPA 通常是用 `history.pushState` 改網址，而 `pushState` 不會觸發 `popstate` event，真要監聽就得再去 patch `history.pushState`。既然本來就有一個每 200ms 跑一次的 loop，在裡面多比對一個字串，成本幾乎是零，也少一個要維護的 hook。

這個寫法還有一個好處：順序不重要。manifest 先到、網址後變（就是預載的情況），manifest 會先在表裡等著；網址先變、manifest 後到，下一個 tick 看到表裡有了，就會載入。兩種順序都會落在同一個結果。

**還沒處理的地方。** 這個修法依賴兩件沒有文件保證的事：manifest 裡有 `movieId`，以及換集時網址會跟著換成新的 id。上一篇才遇過 Netflix 改欄位名稱，這兩件事以後也可能變。另外，存 manifest 的那張表不會清，每看一集就多一筆，對一次看幾集來說影響可以忽略。這個 extension 沒有自動化測試，要驗證這個 bug，只能實際把一集播到最後幾分鐘。

回頭看，這個 bug 不是哪一行寫錯，而是一個沒說出口的假設。「最後一個到的就是最新的」，在一般 request/response 的情境下通常是對的；但只要對方開始預先載入，「最新到的」和「現在用的」就不再是同一件事。
