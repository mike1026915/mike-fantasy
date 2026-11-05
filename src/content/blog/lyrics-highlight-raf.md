---
title: 一個 Audio 物件撐起整個逐字 highlight
slug: lyrics-highlight-raf
lang: zh-Hant
draft: false
date: 2026-09-20
description: 一個練習念排灣語感謝詞的小網頁：點單字播錄音、跟著節奏念、逐字 highlight。沒有 backend、沒有 Web Audio API，不到 100 行 JS。
tags:
  - JavaScript
  - Audio
  - Frontend
---
我做了一個很小的網頁，用來練習念一段排灣語的感謝詞。錄音都是我自己錄的：每個片語一個 `.wav`，再加一段帶節奏、整段念完的 `.m4a`。頁面要做的事情只有三件：點一個詞就播那個詞、點一句就從那句開始跟著節奏念，以及播放時逐句、逐字 highlight。

做完回頭看，整個機制就三樣東西：一張對應表、一個共用的 `Audio` 物件，還有每一幀去讀 `currentTime`。

**對應表是硬寫的。** 每一列放片語和對應的檔名、中文意思、這句在整段錄音裡的起訖秒數，以及每個字的起始秒數。本來會想「用歌詞算出檔名」，但檔名跟歌詞根本對不起來：有的是縮寫，有一個甚至拼錯了。硬寫一張表反而最穩，代價是之後如果要改檔名，表要一起改。

**全頁只有一個 `Audio`。** 切換錄音就是換 `src`。瀏覽器的一個 media element 同時只能播一個 source，設了新的 `src`，舊的就自動停掉，所以我不用自己寫「先停掉上一個」，也不可能兩個聲音疊在一起。event listener 也只要掛一次。

**「從這句跟著念」不是播新檔案，是 seek。** 直接設 `audio.currentTime = t` 就好，但有個坑：metadata 還沒載入前設 `currentTime` 是無效的，因為瀏覽器還不知道時間軸。所以 `readyState` 還是 0 的時候，改成掛一個 `loadedmetadata` 的一次性 listener，等好了再跳。第一次點某一句時走的就是這條路。

**highlight 用 `requestAnimationFrame`，不用 `timeupdate`。** `timeupdate` 大約每 250ms 才觸發一次，逐句勉強可以，逐字就會明顯慢半拍。rAF 跟著螢幕更新跑，每一幀讀一次 `currentTime`，highlight 就貼得住。這個 loop 會一直跑，所以第一行先判斷「沒在播整段錄音就 return」，成本幾乎是零。找目前的字用 `findLast(t >= start)`，表本來就照時間排序，最後一個已經開始的字就是現在這個字。

還有一個小細節：句子和句子之間有空檔。如果嚴格用「`t` 小於這句的結束時間」來判斷，一句念完到下一句開始前，highlight 會整個消失、閃一下。所以結束時間多撐 1 秒，讓 highlight 停在原句，等下一句接手。

如果某句沒填逐字秒數，就退回去用母音數當權重，把整句的時間按比例分給每個字。排灣語的音節結構滿規律的，這樣估算還算堪用，但終究不如手標準，所以後來每一句都補上了秒數，這段 code 就只當保險。

最後兩件「不用做」的事。`.wav` 沒壓縮，第一次點要等網路，所以按下去先顯示 loading，等 `playing` event 才拿掉。所有 `play()` 都直接發生在 `onclick` 裡，在使用者手勢的 call stack 內，所以不會被 autoplay policy 擋，不需要「先靜音播一次解鎖」那種 workaround。我也沒有用 Web Audio API，只需要播放和定位的話，`<audio>` 元素就夠了。
