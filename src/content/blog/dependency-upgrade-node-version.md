---
title: merge 了不等於上線了
slug: dependency-upgrade-node-version
lang: zh-Hant
draft: false
date: 2026-10-28
description: Dependabot 的兩個升級 PR 合併後，CI 先是 npm ci 失敗，修好又卡在 Node 版本。Netlify 部署失敗時不會讓網站掛掉，只會安靜地停在舊版。
tags:
  - Netlify
  - Dependabot
  - CI
---
這個網站開了 Dependabot，它會定期發 PR 升級套件。有一天我在幾分鐘內連續合併了好幾個 PR，其中兩個是它發的：一個升 Astro，一個升開發工具。合完之後我又合了幾篇新文章，然後發現網站上一篇新的都沒有。

第一層原因是 CI 直接在 `npm ci` 就掛了，peer dependency 衝突：`@astrojs/check` 要求 TypeScript `^5.0.0 || ^6.0.0`，但開發工具那個 PR 把 TypeScript 從 `^6.0.3` 升到了 `^7.0.2`。修法是把 TypeScript 降回 `^6.0.3`。

事後回頭看，main 上的 CI 其實有警告過我，只是我沒看到。workflow 設了 `cancel-in-progress`，同一個 branch 有新的 push 時，就會取消還在跑的那一次。我合得太快，前面幾次 merge 的 CI 都被取消了，只有最後一次跑完、回報失敗。被取消的 run 不是紅燈，很容易就被略過。

修好之後 `npm ci` 過了，卻換 type check 失敗，錯誤訊息很直白：

```
Node.js v22.12.0 is not supported by Astro!
Please upgrade Node.js to a supported version: ">=22.22.0"
```

新版 Astro 把 Node 的最低版本拉高了，但專案裡的 Node 版本還釘在 22.12.0，而且釘了好幾個地方：CI 讀的 `.nvmrc`、Netlify 讀的 `netlify.toml` 裡的 `NODE_VERSION`，還有 `package.json` 和 `package-lock.json` 根套件的 `engines`。四個地方都要改。

改 `package-lock.json` 的時候還出了個小插曲。AI 一開始用 `sed` 把 `>=22.12.0` 全部取代，結果連第三方套件自己宣告的 `engines` 也一起改掉了，那些本來就不該動。發現後還原，只改根套件那一行。lock file 這種東西，用全域取代很危險。

這次真正讓我在意的，是 Netlify 的行為。部署失敗時，網站不會掛掉，它會安靜地停在上一次成功的版本。從使用者的角度看，什麼都沒壞；從我的角度看，GitHub 上的 PR 已經 merged，也很容易以為新內容已經上線了。我差點就把「已合併」當成「已發布」。

所以現在我的做法是：merge 之後，至少看一眼兩件事。一是 main 的 CI 是不是綠的，二是 Netlify 最新一筆 production deploy 是不是對應到剛剛那個 commit，而且是 Published。前者確認程式沒問題，後者才確認使用者看得到。

結果隔天，Dependabot 又發了一次同樣的 TypeScript 7 升級，我又合了，main 又壞了一次。這才想通：降版只是把問題往後推一週，Dependabot 每週都會再提一次。所以這次除了降版，還在 `dependabot.yml` 加了一條 `ignore`，先跳過 TypeScript 的 major 升級，等 `@astrojs/check` 支援 7 再拿掉，並在旁邊寫明原因，免得以後忘了為什麼有這條。

至於 Dependabot，我還是會繼續用，只是升級 PR 我會一個一個合，每合一個就等 main 的 CI 跑完，再合下一個。連續合併省下的幾分鐘，不值得換來一個不知道是哪個 PR 弄壞的 main。
