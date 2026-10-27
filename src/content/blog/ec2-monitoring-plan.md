---
title: 規劃 EC2 監控：該不該升級要看三種訊號
slug: ec2-monitoring-plan
lang: zh-Hant
draft: false
date: 2026-09-08
description: 一台 4GB 的 EC2 要扛資料庫、後端和前端，什麼時候該升級？先決定要看哪些訊號，再裝最少的告警。
tags:
  - AWS
  - CloudWatch
  - Planning
---
我們有一台 EC2 跑著全部的東西：Postgres 加 pgvector、一個內含 Playwright 和 Chromium 的 NestJS 後端、還有 Next.js 的前端，全部是 Coolify 部署的容器。機器是 t4g.medium，2 vCPU、4 GiB。我想知道它什麼時候會不夠用，所以先做了一份監控規劃。

第一個要面對的事實：CloudWatch 對 EC2 預設不回報記憶體和磁碟。這台機器最可能先爆的就是記憶體，偏偏預設看不到，所以不管怎麼設計，都得裝 CloudWatch agent，這是唯一非裝不可的理由。

接著我把「該不該升級」拆成三個互相獨立的訊號，而不是看一個 CPU 數字就決定。

記憶體是最可能先出事的。用量持續高於 85% 算黃燈，開始規劃；高於 92% 就該升級；如果容器被 `OOMKilled`，那已經不是警告而是事故。升級路徑也很單純，t4g.medium 換成 t4g.large，同架構、8 GiB，停機改類型再開機，大概幾分鐘的 downtime。

CPU credit 是 T 系列專屬的隱形天花板，最容易被忽略。t4g.medium 的基準是 CPU 使用率 20%，超過就是在燒 credit。如果 `CPUSurplusCreditCharged` 大於 0，代表已經在付超額費了。有時候這反而是「省錢型升級」：超額費如果比升一級的差價還貴，升級還比較便宜。

磁碟是第三種，而且不用換機器。用量過 80% 就把 gp3 線上擴容，零 downtime，跟升級機器是兩件分開的事。

落地時我只想裝五個告警：記憶體使用率、swap 使用率、CPU credit 餘額、磁碟使用率，以及 `StatusCheckFailed_Instance`，也就是機器本身掛了。全部通知同一個 SNS topic，寄到 email。依規劃估算，成本不到一個月 2 美元。

我也寫下了刻意不做的東西：不裝 Prometheus 和 Grafana，在一台要判斷「是不是記憶體不夠」的機器上再吃掉 1GB 等於火上加油；不做 APM，因為目前沒有效能問題要追；也不拆每個容器的 metric，先看總量，總量沒事就不必拆。

最後有個升級前要先做的檢查，可能直接省下升級費：確認瓶頸是不是 Playwright。Chromium 在後端容器裡單次啟動可能衝到幾百 MB，如果記憶體告警總是和爬蟲或產 PDF 的任務同時出現，那該做的是把 Playwright 拆成需要時才啟動或搬到別處，而不是多買 RAM。

要說明的是，這是規劃階段的內容，那次對話停在「這個架構方向對嗎」，所以上面的門檻和成本都是設計時的估計。後來我實際接手的是另一批已經存在、卻從來沒響過的告警，那是另一篇的故事。
