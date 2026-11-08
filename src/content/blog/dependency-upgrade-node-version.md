---
title: merge 了不等於上線了
slug: dependency-upgrade-node-version
lang: zh-Hant
draft: false
date: 2026-10-28
updated: 2026-11-08
description: Dependabot 的升級 PR 在合併前就已經是紅燈，我還是合了。main 壞掉之後，Netlify 部署失敗也不會報錯，網站只會安靜地停在舊版。
tags:
  - Netlify
  - Dependabot
  - CI
---
這個網站開了 Dependabot，它每週會發 PR 升級套件，而且分成兩組：Astro 相關的一組，開發工具一組。10 月 20 日它發了兩個 PR，一個把 Astro 升到 7.4.0，一個升開發工具，其中包含把 TypeScript 從 `^6.0.3` 升到 `^7.0.2`。一週後，我在幾分鐘內把這兩個 PR 連同其他幾個一起合併，接著又合了幾篇新文章，然後發現網站上一篇新的都沒有。

事後回頭查，最關鍵的事實其實很簡單：**這兩個 PR 在合併之前就已經是紅燈了。** CI 的 `check` 失敗，Netlify 的 deploy preview 也失敗，結果就掛在 PR 頁面上。但我還是合了，GitHub 也沒有擋下來。

紅燈有兩個原因，彼此無關。

第一個是 TypeScript。CI 在 `npm ci` 這一步就掛了，peer dependency 衝突：`@astrojs/check` 只接受 TypeScript `^5.0.0 || ^6.0.0`。Dependabot 只知道有新版，不會管它跟其他套件合不合得來。修法是把 TypeScript 降回 `^6.0.3`。

第二個是 Node 版本。`npm ci` 修好之後，換 type check 失敗，錯誤訊息很直白：

```
Node.js v22.12.0 is not supported by Astro!
Please upgrade Node.js to a supported version: ">=22.22.0"
```

新版 Astro 把 Node 的最低版本拉高了，但專案的 Node 版本寫死在好幾個地方：CI 讀的 `.nvmrc`、Netlify 讀的 `netlify.toml` 裡的 `NODE_VERSION`，還有 `package.json` 和 `package-lock.json` 根套件的 `engines`。Dependabot 只改套件的版本，這四個地方它不會幫你改。

改 `package-lock.json` 的時候還出了個小插曲。AI 一開始用 `sed` 把 `>=22.12.0` 全部取代，結果連第三方套件自己宣告的 `engines` 也一起改掉了，那些本來就不該動。發現後還原，只改根套件那一行。lock file 這種東西，用全域取代很危險。

main 上的 CI 也有提醒，只是更不容易看到。workflow 設了 `cancel-in-progress`，同一個 branch 有新的 push 時，就會取消還在跑的那一次。我合得太快，前面幾次 merge 的 CI 都被取消了，只有最後一次跑完、回報失敗。被取消的 run 不是紅燈，很容易就被略過。

這次真正讓我在意的，是 Netlify 的行為。部署失敗時，網站不會掛掉，它會安靜地停在上一次成功的版本。從使用者的角度看，什麼都沒壞；從我的角度看，GitHub 上的 PR 已經 merged，也很容易以為新內容已經上線了。我差點就把「已合併」當成「已發布」。

**然後同樣的事又發生了一次。** 把 TypeScript 降回 6 的修正合進去之後，沒過幾個小時，Dependabot 又開了兩個新 PR：開發工具那組再一次把 TypeScript 升到 7；Astro 那組則升到 7.4.2，而這一版又把 Node 的最低版本拉高到 `>=22.23.4`。這兩個 PR 一樣是紅燈，一樣被我合了，main 又壞了一次。這一壞就是一個多星期，直到 11 月 5 日才修好。

第二次修的時候，除了再降一次 TypeScript、把 Node 升到 22.23.4，還在 `dependabot.yml` 加了一條 `ignore`，先跳過 TypeScript 的 major 升級，等 `@astrojs/check` 支援 7 再拿掉。不加的話，只要 TypeScript 7 還是最新版，Dependabot 就會一直提。其實 Dependabot 的 PR 底下就有現成的指令，留言 `@dependabot ignore typescript major version` 也能達到同樣效果；寫在設定檔裡的好處是，規則旁邊可以寫上原因，以後回頭看才知道為什麼有這一條。

整理下來，這件事其實有三道關卡，每一道都沒擋住。第一道是 PR 本身：Dependabot 的 PR 也是 PR，紅燈就是紅燈，合併前要先看。第二道是 GitHub：最根本的做法，是把 CI 設成 `main` 的 required status check，讓紅燈的 PR 根本按不下 merge，不用靠人記得。第三道是部署：merge 之後，要確認 Netlify 最新一筆 production deploy 對應的就是剛剛那個 commit，而且是 Published。合併、建置成功、上線，是三件不同的事。
