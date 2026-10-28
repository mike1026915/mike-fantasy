---
title: 把 CSP 從 Report-Only 轉正
slug: enforce-csp
lang: zh-Hant
draft: false
date: 2026-10-14
description: 個人網站的 Content-Security-Policy 掛了一陣子 Report-Only，這次改成強制執行，順便記下
  /admin 後台踩到的 unsafe-eval。
tags:
  - Security
  - Netlify
---
我的個人網站掛 Content-Security-Policy 的 Report-Only 模式掛了一陣子。它不擋任何東西，只會在 console 裡提醒我哪裡違規。這種設定很容易放著不管，因為什麼都沒壞，也就沒有理由去動它。

這次我把它轉正。表面上只改了一個 header 名稱：`Content-Security-Policy-Report-Only` 改成 `Content-Security-Policy`。真正要做的是改之前的確認：公開頁面在 console 裡沒有任何違規回報，所以 `/*` 可以直接上嚴格版，`default-src 'self'`、`object-src 'none'`，連 `connect-src` 都只留 `'self'`。

麻煩出在 `/admin`。這個站用 Decap CMS 管文章，它的 script 要從 unpkg.com 載入，要連 GitHub API 和 Netlify Identity，預覽用 blob:，而且它會用 eval 去解析設定和 widget。我一開始沒加 `'unsafe-eval'`，後台就載入不起來，補了一個 commit 才解決。

最後的做法是 `/admin/*` 另外給一份寬鬆的 policy，並在 config 裡寫明為什麼要放寬。我不想把整站的 policy 一起放寬，只為了遷就一個後台頁面。`unsafe-eval` 確實不漂亮，但範圍限定在 `/admin`，公開頁面完全碰不到。

過程中還有個小插曲：`Permissions-Policy` 裡有個 `interest-cohort`，那是 FLoC 時代的東西，Chrome 早就不認得了，每次載入都會多一行警告。我把它拿掉，console 就乾淨了。

這件事讓我再確認一次：Report-Only 只有在你真的去看報告的時候才有用。要轉正之前，先把每一種會載入的頁面都走過一遍，尤其是那些你平常不太會點開的後台。
