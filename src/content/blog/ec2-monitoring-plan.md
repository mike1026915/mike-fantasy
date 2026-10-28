---
title: 規劃單機 monitoring：該不該升級要看三種 signal
slug: ec2-monitoring-plan
lang: zh-Hant
draft: false
date: 2026-10-18
description: 一台 EC2 同時扛著資料庫、後端和前端，什麼時候該升級？先決定要看哪些 signal，再裝最少的 alarm。
tags:
  - AWS
  - CloudWatch
  - Planning
---
有一台 EC2 同時跑著資料庫、後端和前端，全部擠在一台小機器上。我想知道它什麼時候會不夠用，所以先做了一份 monitoring 規劃，而不是直接去裝一堆工具。

第一個要面對的事實：CloudWatch 對 EC2 預設不回報 memory 和 disk。這種機器最可能先爆的就是 memory，偏偏預設看不到，所以不管怎麼設計，都得裝 CloudWatch agent，這是唯一非裝不可的理由。

接著我把「該不該升級」拆成三個互相獨立的 signal，而不是看一個 CPU 數字就決定。

memory 是最可能先出事的。用量持續高於 85% 算黃燈，開始規劃；高於 92% 就該升級；如果 container 被 `OOMKilled`，那已經不是警告而是事故。升級路徑也很單純，換成同 architecture、memory 加倍的下一個 size，停機改類型再開機，大概幾分鐘的 downtime。

CPU credit 是 T 系列這類可突發 instance type 專屬的隱形天花板，最容易被忽略。utilization 超過 baseline 就是在燒 credit，如果 `CPUSurplusCreditCharged` 大於 0，代表已經在付超額費了。有時候這反而是「省錢型升級」：超額費如果比升一級的差價還貴，升級還比較便宜。

disk 是第三種，而且不用換機器。用量過 80% 就把 EBS 線上擴容，零 downtime，跟升級機器是兩件分開的事。

落地時我只想裝五個 alarm：memory utilization、swap utilization、CPU credit balance、disk utilization，以及 `StatusCheckFailed_Instance`，也就是機器本身掛了。全部通知同一個 SNS topic，寄到 email。自訂 metric 和前十個 alarm 的成本很低，一個月幾美元以內就能裝完。

我也寫下了刻意不做的東西：不裝 Prometheus 和 Grafana，在一台要判斷「是不是 memory 不夠」的機器上再吃掉一大塊 memory，等於火上加油；不做 APM，因為目前沒有效能問題要追；也不拆每個 container 的 metric，先看總量，總量沒事就不必拆。

最後有個升級前要先做的檢查，可能直接省下升級費：確認吃掉 memory 的是不是某一個特定元件。比如 headless browser 這種一啟動就衝到幾百 MB 的東西，如果 memory alarm 總是和它的任務同時出現，那該做的是讓它只在需要時才啟動，或是搬到別處，而不是多買 RAM。

要說明的是，這是規劃階段的內容，threshold 和成本都是設計時的估計，還沒有經過實際運轉的驗證。
