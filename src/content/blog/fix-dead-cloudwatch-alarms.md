---
title: 三個從來沒響過的 CloudWatch alarm
slug: fix-dead-cloudwatch-alarms
lang: zh-Hant
draft: false
date: 2026-10-21
description: CloudWatch alarm 的狀態一直是 INSUFFICIENT_DATA，代表它從來沒有監看過任何東西。這篇記下常見的原因，以及 threshold 為什麼要用實際資料來定。
tags:
  - AWS
  - Terraform
  - CloudWatch
---
前陣子把一批 AWS resource 收進 Terraform，順手盤點了一遍 monitoring，才發現有幾個 alarm 的狀態是 `INSUFFICIENT_DATA`，而且一直都是。這個狀態很容易被當成「沒事」，其實意思是它從頭到尾沒收到過資料。resource 出問題的時候，它們一封信都不會寄。

原因各不相同，但都是設定寫錯，不是真的平安無事。這次碰到的有三種，都很值得留意。

第一種是 metric 名稱寫錯。多了一個 prefix，或是大小寫、空格不對，CloudWatch 不會報錯，只是找不到那條 metric，alarm 就一直沒資料。第二種是 region 對不上。像 Route53 health check 的 metric 只存在 us-east-1，alarm 卻建在別的 region，永遠讀不到；而且 alarm 只能通知同 region 的 SNS topic，所以搬過去之後，那邊也要新開 topic 和 subscription。第三種是 log metric filter 的問題：namespace 讀錯，加上 filter 每次寫進去的值是 0，就算讀對了，也數不到任何錯誤。

這些錯誤能活這麼久，是因為把 resource 收進 Terraform 的時候，我們刻意設定成「只 import，不改行為」，錯誤就被原樣保留下來。直到這次才第一次有意識地去改。

改法本身不複雜，把名稱、region、filter 值修正就好。比較花功夫的是 threshold。

AI 一開始給的 threshold，看起來都很合理：CPU credit 低於某個數字就 alarm、錯誤數大於等於 1 就 alarm。但沒有人拿真的資料驗證過。我把過去幾天的數據拉出來，把各種 threshold「會觸發幾次」算了一遍，結果發現兩個都不能直接用。

CPU credit 的例子特別有代表性。如果 resource 會定期停機，每次重啟後 credit 都從低點重新累積，那麼「低於 X」就會在每次重啟後固定響一次，等於每天寄一封 false alarm。改成「每小時最低值低於一個很小的數字，而且連續好幾小時」，才只抓得到真的耗盡。錯誤數也一樣：背景雜訊本來就會讓一部分時段出現錯誤，threshold 設成 1，一天會響十幾次，吵到最後沒人會當一回事，所以我是看 distribution 挑了一個一天只響幾次的值。這個數字是偏好，不是標準答案，太吵就調高。

改完 apply 之後，我確認線上設定和程式碼一致，`terraform plan` 顯示 `No changes.`，觀察了幾個小時也沒有任何 alarm 被誤觸發。

有一件事我還沒做，就是實際讓 alarm 響一次。目前「出事時真的會寄信」只是從設定推論出來的，沒有實測。要測的話可以用 `aws cloudwatch set-alarm-state` 手動把 alarm 設成 ALARM，看信箱收不收得到。

整件事讓我最有感的是：alarm 本身也要被驗證。建好 alarm 不等於有在 monitoring，至少該看一下它的狀態是不是 `INSUFFICIENT_DATA`，還有 threshold 在過去幾天的資料上會響幾次。
