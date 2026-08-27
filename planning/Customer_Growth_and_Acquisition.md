# 📈 Customer Growth & Acquisition (Digital Onboarding & Customer Funnel)
### Spesifikasi Teknis, Desain Wireframe, Business Logic & Anomaly Engine (Mitra1000s B2B)

> **Versi:** 2.2 (Updated: Minimalist KPI Target Variance, Vertical Column Funnel, Full Granular Regions, PT Selling Agent Entities & Pure Reporting Anomaly Summary)  
> **Status:** Approved Architecture & Prototype-Aligned Specification  
> **Dibuat oleh:** Tim Product Manager Mitra1000s  
> **Tanggal:** 2026-08-27  
> **Target Audiens:** Product Manager, Lead BI/Data Engineer, Product Designer (UI/UX), Frontend Engineer  
> **Companion Docs:** 
> - [Product Overview Control Tower Specification](./Product_Overview.md)
> - [PM Metrics Playbook](./PM_Metrics_Playbook.md)
> - [Mitra1000s Design System](../Prototype%20/Design%20system/design.md)
> **Platform Target:** Web Control Tower App (`React + TypeScript + Vite`) & Power BI Embedded

---

## 📑 Daftar Isi
1. [Latar Belakang & Karakteristik Pelanggan Rekanan GRC](#1-latar-belakang--karakteristik-pelanggan-rekanan-grc)
2. [Alur Onboarding & Digitalisasi Toko Bangunan (tokocodeidcpd Engine)](#2-alur-onboarding--digitalisasi-toko-bangunan-tokocodeidcpd-engine)
3. [4 Pertanyaan Kritis yang Wajib Terjawab dalam 1 Layar](#3-4-pertanyaan-kritis-yang-wajib-terjawab-dalam-1-layar)
4. [Master Wireframe UI & Mockup Layout](#4-master-wireframe-ui--mockup-layout)
5. [Spesifikasi Komponen, Logic, & Formula Matematis](#5-spesifikasi-komponen-logic--formula-matematis)
   - [5.1 Topbar & Global Context Filter Layer](#51-topbar--global-context-filter-layer)
   - [5.2 4 Core Unified KPI Cards (Register, Pending, Verified, Activated)](#52-4-core-unified-kpi-cards-register-pending-verified-activated)
   - [5.3 Customer Growth Trend (Stacked Area Cohort Chart)](#53-customer-growth-trend-stacked-area-cohort-chart)
   - [5.4 Onboarding Funnel Widget (Vertical Column Chart)](#54-onboarding-funnel-widget-vertical-column-chart)
   - [5.5 Regional Performance & Verification Diagnostic Table](#55-regional-performance--verification-diagnostic-table)
   - [5.6 Selling Agent Performance & Adoption Quality Table (Nama PT)](#56-selling-agent-performance--adoption-quality-table-nama-pt)
   - [5.7 🚨 "What Needs Attention?" Smart Growth Anomaly Engine (Reporting Summary)](#57--what-needs-attention-smart-growth-anomaly-engine-reporting-summary)
6. [Metric Polarity, Direction, & Dynamic Threshold Engine](#6-metric-polarity-direction--dynamic-threshold-engine)
7. [Interaksi & On-Screen Direct Scannability](#7-interaksi--on-screen-direct-scannability)
8. [Data Lineage, Event Tracking, & Database Warehouse Mapping](#8-data-lineage-event-tracking--database-warehouse-mapping)

---

## 1. Latar Belakang & Karakteristik Pelanggan Rekanan GRC

### Profil Pelanggan & Model Bisnis
Pelanggan platform Mitra1000s (MSS) adalah **toko-toko bangunan fisik yang merupakan rekanan resmi dari Grup GRC (GRC Board / material rekanan)**. Toko-toko ini sebelumnya telah memiliki relasi dagang *offline* dengan distributor resmi (PT Selling Agent) di berbagai wilayah operasional yang dibagi menjadi 2 **Group Region**:
- **Group Region CPD:** Meliputi wilayah operasional Jawa (Jawa Barat, DKI Jakarta, Jawa Tengah, Jawa Timur, Banten, DI Yogyakarta).
- **Group Region BNN:** Meliputi wilayah operasional Luar Jawa (Sumatera Utara, Sumatera Selatan, Riau & Kepri, Lampung, Kalimantan Barat, Kalimantan Timur, Sulawesi Selatan, Bali & Nusa Tenggara).

### Proses Registrasi di MSS (Standard Simple Registration)
1. **Pendaftaran Standar:** Registrasi toko di aplikasi MSS dibuat sangat ringkas dan mudah (nama toko, nama pemilik, nomor telepon/WhatsApp, dan alamat toko) **tanpa kewajiban mengunggah NIK / NIB** di awal.
2. **Definisi Teknis Status `Verified` vs `Pending Review`:**
   - **`Verified` (Toko Rekanan Resmi Terverifikasi):** Toko yang pada database seller **sudah memiliki `tokocodeidcpd`** (`tokocodeidcpd IS NOT NULL`). Kolom `tokocodeidcpd` ini digunakan sebagai identifier resmi toko rekanan GRC untuk **kedua group region (baik CPD maupun BNN)**. Begitu `tokocodeidcpd` terisi, toko otomatis ter-mapping ke Selling Agent (PT Distributor) wilayah terkait.
   - **`Pending Review` (Menunggu Verifikasi Manual):** Toko yang mendaftar dari aplikasi Mitra1000s dan **belum / tidak memiliki `tokocodeidcpd`** (`tokocodeidcpd IS NULL`). Toko ini masuk antrean *Pending* untuk diperiksa oleh tim admin/sales guna dicocokkan dan diterbitkan kode toko CPD-nya.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         ALUR REGISTRASI & ONBOARDING TOKO REKANAN GRC                            │
│                                                                                                  │
│   [ 1. REGISTER ]                  [ 2. VERIFICATION & MAPPING ]                 [ 3. ACTIVATION]│
│                                                                                                  │
│   Registrasi Standar ──► Punya tokocodeidcpd? ──┬─► [YA] ──► VERIFIED & MAPPED ──────► TRANSAKSI │
│   (Nama, No HP, Lokasi)                         │            (tokocodeidcpd terisi,    DIGITAL   │
│   (Tanpa NIK/NIB)                               │             ter-mapping ke PT Agen)  PERDANA   │
│                                                 └─► [TIDAK]► PENDING REVIEW MANUAL ─┘ (ACTIVATED)│
│                                                              (tokocodeidcpd NULL,                │
│                                                               antrean Admin / SLA)               │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Alur Onboarding & Digitalisasi Toko Bangunan (tokocodeidcpd Engine)

Dengan identifikasi berbasis `tokocodeidcpd`, alur digitalisasi toko rekanan GRC diukur melalui **4 status inti**:

1. **New Registrants (📥):** Toko rekanan yang mendaftar akun di aplikasi MSS pada periode filter.
2. **Pending Review (⏳):** Toko yang belum memiliki `tokocodeidcpd` dan sedang dalam antrean review manual admin/sales.
3. **Verified & Mapped (🛡️):** Toko yang telah memiliki `tokocodeidcpd` (baik di Group Region CPD maupun BNN) dan otomatis terhubung dengan Selling Agent (PT Distributor).
4. **Activated Stores (🚀):** **Toko yang telah menyelesaikan transaksi digital perdananya (*First Order Completed*).**

---

## 3. 4 Pertanyaan Kritis yang Wajib Terjawab dalam 1 Layar

| No | Pertanyaan Kritis PM / Executive | Komponen yang Menjawab | Indikator Kunci |
|---|---|---|---|
| **1** | **Berapa banyak toko rekanan GRC yang mendaftar dan berapa yang sudah Verified (`tokocodeidcpd`)?** | Top 4 KPI Cards & Funnel Widget | *New Registrants* (`2,430` • `+194 vs Target`), *Verified Stores* (`2,120` • `87.2%` • `+120 vs Target`). |
| **2** | **Berapa banyak pendaftaran tanpa `tokocodeidcpd` yang tertahan di antrean Pending dan melewati SLA?** | Top KPI Card (Pending) & Regional Table | *Current Pending* (`310 Toko` • `-108 vs Target ≤202`), *SLA Breach > 24h* (`73 Toko` • `23.5% antrean BNN`). |
| **3** | **Berapa rasio toko rekanan terverifikasi yang berhasil melakukan order perdana (*Activation*)?** | Top KPI Card (Activated) & Funnel Widget | *Activated Stores* (`726 Toko` • `29.9% Funnel` • `+26 vs Target`), *Total Cohort GMV* (`Rp 2.05 B`). |
| **4** | **Bagaimana perbandingan performa verifikasi antar Group Region (CPD vs BNN) dan produktivitas PT distributor?** | Regional Diagnostic Table & Selling Agent Table | *Group Region CPD Verified 96.8%* vs *Group Region BNN Verified 90.4%*, *PT Bangun Prima Sejahtera (68.4% Act)*. |

---

## 4. Master Wireframe UI & Mockup Layout

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Customer Growth & Acquisition                                                🗓️ 01/01/2026 - 08/31/2026 ▾        │
│ Digital growth, verification & first-order activation for GRC partner stores                                     │
│                                                                                                                  │
│ [🗓️ Date Range ▾] [📍 Region (All Regions) ▾] [🏢 Group Region (CPD/BNN) ▾]                        [🔄 Reset]    │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ONBOARDING & DIGITAL ADOPTION METRICS                                                                        │ │
│ │ Customer Growth & Funnel Milestones                                                                          │ │
│ │ ──────────────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────────────┐ │ │
│ │ │ 📈 New Registrants   │ │ ⏱️ Pending Review    │ │ 🏪 Verified & Mapped │ │ 📦 Activated (1st Order)     │ │ │
│ │ │                      │ │                      │ │                      │ │                              │ │ │
│ │ │ 2,430       ▲ +8.2%  │ │ 310         ▼ -4.1%  │ │ 2,120       ▲ +10.4% │ │ 726                 ▲ +12.4% │ │ │
│ │ │ ──────────────────── │ │ ──────────────────── │ │ ──────────────────── │ │ ──────────────────────────── │ │ │
│ │ │ vs May 2025-Dec 2025 │ │ vs May 2025-Dec 2025 │ │ vs May 2025-Dec 2025 │ │ vs May 2025 - Dec 2025       │ │ │
│ │ │ Target: 2,236 (+194) │ │ Target: ≤202 (-108)  │ │ Target: 2,000 (+120) │ │ Target: 700 Stores (+26)     │ │ │
│ │ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘ └──────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌───────────────────────────────────────────────────────┬──────────────────────────────────────────────────────┐ │
│ │ 📈 Customer Growth Trend                              │ 🧭 Onboarding Funnel                                 │ │
│ │ Cumulative Cohort Flow (Jan '26 - Aug '26)            │ 100% ┤ ┌───┐ (100% / 2.43K)                          │ │
│ │                                                       │  75% ┤ │   │         ┌───┐ (87.2% / 2.12K)           │ │
│ │ 2,400 ┤                             ╭───────────────  │  50% ┤ │ 1 │         │ 2 │                           │ │
│ │ 1,800 ┤                     ╭───────╯ █ Registered    │  25% ┤ │   │         │   │         ┌───┐ (29.9%/726) │ │
│ │ 1,200 ┤             ╭───────╯ ▒ Verified & Mapped     │   0% └─┴───┴─────────┴───┴─────────┴───┴───────────  │ │
│ │   600 ┤     ╭───────╯ ▓ Activated (First Order)       │         1 Register    2 Verified     3 Active          │ │
│ │     0 └─────╯──────────────────────────────────────── │        (Lavender Track + Brand Violet + Floating Pill)│ │
│ │        Jan   Feb   Mar   Apr   May   Jun   Jul   Aug  │                                                      │ │
│ └───────────────────────────────────────────────────────┴──────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 📍 Regional Performance & Verification Diagnostics                           🔍 [Search region or group...]  │ │
│ │ ──────────────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ (Inner Scroll Container • Sticky Header)                                                                     │ │
│ │ REGION          GROUP REGION  REGISTERED  VERIFIED (%)    PENDING  SLA BREACH >24H  ACTIVATED (%)  COHORT GMV│ │
│ │ Jawa Barat      [CPD]              620     598 (96.5%)         22       2 (9.1%)      310 (51.8%)  Rp 540.5 M│ │
│ │ DKI Jakarta     [CPD]              400     392 (98.0%)          8       0 (0.0%)      210 (53.6%)  Rp 380.0 M│ │
│ │ Jawa Tengah     [CPD]              350     335 (95.7%)         15       1 (6.7%)      160 (47.8%)  Rp 282.0 M│ │
│ │ Jawa Timur      [CPD]              250     243 (97.2%)          7       0 (0.0%)      120 (49.4%)  Rp 220.0 M│ │
│ │ Banten          [CPD]              180     172 (95.6%)          8       1 (12.5%)      85 (49.4%)  Rp 155.0 M│ │
│ │ DI Yogyakarta   [CPD]               70      68 (97.1%)          2       0 (0.0%)       32 (47.1%)  Rp  58.0 M│ │
│ │ Sumatera Utara  [BNN]              210     188 (89.5%)         62      18 (29.0%)      75 (39.9%)  Rp 185.0 M│ │
│ │ Sumatera Selatan[BNN]              160     142 (88.8%)         45      14 (31.1%)      58 (40.8%)  Rp 140.0 M│ │
│ │ Riau & Kepri    [BNN]              110      98 (89.1%)         28       8 (28.6%)      42 (42.9%)  Rp  98.0 M│ │
│ │ Lampung         [BNN]               90      82 (91.1%)         20       5 (25.0%)      35 (42.7%)  Rp  78.0 M│ │
│ │ Kalimantan Barat[BNN]              180     164 (91.1%)         58      16 (27.6%)      56 (34.1%)  Rp 112.0 M│ │
│ │ Kalimantan Timur[BNN]               80      72 (90.0%)         22       6 (27.3%)      28 (38.9%)  Rp  62.0 M│ │
│ │ Sulawesi Selatan[BNN]               70      62 (88.6%)         18       5 (27.8%)      24 (38.7%)  Rp  52.0 M│ │
│ │ Bali & Nusa Tgr [BNN]               60      54 (90.0%)         12       2 (16.7%)      20 (37.0%)  Rp  42.0 M│ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 📦 Selling Agent Performance & Adoption Quality                               🔍 [Search agent or region...]  │ │
│ │ ──────────────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ (Inner Scroll Container • Sticky Header • Nama PT Distributor)                                               │ │
│ │ SELLING AGENT (PT)             REGION       GROUP REGION  VERIFIED STORES  ACTIVATED  ACTIVATION %  COHORT GMV   │ │
│ │ PT Bangun Prima Sejahtera (SA01)Jawa Barat   [CPD]                     380        260   68.4% (🟩)   Rp 390.5 M   │ │
│ │ PT Cipta Sarana Mandiri (SA02) DKI Jakarta  [CPD]                     290        195   67.2% (🟩)   Rp 340.0 M   │ │
│ │ PT Sinar Distribusi Nsntr(SA03) Jawa Tengah  [CPD]                     280        175   62.5% (🟩)   Rp 260.0 M   │ │
│ │ PT Mega Niaga Utama (SA04)     Jawa Timur   [CPD]                     240        150   62.5% (🟩)   Rp 230.0 M   │ │
│ │ PT Karya Bersama Abadi (SA05)  Sumatera Utr [BNN]                     180         88   48.9% (🟨)   Rp 155.0 M   │ │
│ │ PT Sumber Abadi Rezeki (SA06)  Kalbar       [BNN]                     160         65   40.6% (🟨)   Rp 110.0 M   │ │
│ │ PT Mitra Distribusi Jaya (SA07)Sumatera Slt [BNN]                     140         60   42.9% (🟨)   Rp  98.0 M   │ │
│ │ PT Cahaya Inti Sejahtera (SA08)Sulawesi Slt [BNN]                      60         24   40.0% (🟨)   Rp  52.0 M   │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚠️ WHAT NEEDS ATTENTION?                                                                                     │ │
│ │ Automated Growth & Onboarding Diagnostic Reporting Summary                                                   │ │
│ │ ──────────────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ ● CRITICAL  High Pending SLA Breaches in Sumatera Utara & Selatan                    [32 Stores >24h]    │ │ │
│ │ │ Summary: Manual verification backlog without tokocodeidcpd in BNN regions.                               │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│ │ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ ● WARNING   First-Order Conversion Lag in Kalimantan Barat                    [34.1% Activation (Lagging)]│ │ │
│ │ │ Summary: Tingkat aktivasi order perdana di Kalbar hanya 34.1%, tertinggal dibandingkan rata-rata 43.0%.   │ │ │
│ │ └──────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Spesifikasi Komponen, Logic, & Formula Matematis

### 5.1 Topbar & Global Context Filter Layer
- **Date Range Input:** Single compact trigger format `01/01/2026 - 08/31/2026` dengan popover kalender dan preset dinamis.
- **Dimension Dropdowns:**
  1. `Region`: `All Regions` atau pilihan provinsi spesifik.
  2. `Group Region`: `All Groups`, `CPD` (Jawa), `BNN` (Luar Jawa).
  3. `Verification Method`: `All Methods`, `Verified (tokocodeidcpd)`, `Pending Review`.
- **Reset Button:** `[🔄 Reset Filters]` mengembalikan seluruh filter ke default.

---

### 5.2 4 Core Unified KPI Cards (Register, Pending, Verified, Activated)

Membungkus 4 metrik inti dalam 1 kontainer terpadu (*Unified Card Container*):
- Header icon menggunakan warna abu-abu netral (`var(--text-muted)`).
- Footer terstruktur 2 baris rapi:
  - **Baris 1:** Periode pembanding dinamis (`vs May 2025 - Dec 2025` atau `vs July 2026`).
  - **Baris 2:** `Target: <Target Value> (<Variance Diff>)`.

#### 1. New Registrants (📥)
- **Definisi:** Total toko bangunan rekanan unik yang mendaftar akun di MSS pada periode filter.
- **Formula:**
  $$\text{New Registrants} = \text{COUNT}(\text{DISTINCT } \text{customer\_id}) \quad \text{WHERE } \text{registered\_at} \in [\text{start\_date}, \text{end\_date}]$$
  $$\text{Target Variance} = \text{Current Value} - \text{Target} = 2,430 - 2,236 = \mathbf{+194}$$
- **Format:** Nilai integer tebal (`2,430`), Delta badge pill (`▲ +8.2%`), Footer target (`Target: 2,236 Stores (+194)` hijau).

#### 2. Pending Review (⏳)
- **Definisi:** Toko yang saat ini mendaftar namun **belum memiliki `tokocodeidcpd`** (`tokocodeidcpd IS NULL`) dan sedang dalam antrean peninjauan manual.
- **Formula:**
  $$\text{Pending} = \text{COUNT}(\text{DISTINCT } \text{customer\_id}) \quad \text{WHERE } \text{tokocodeidcpd IS NULL} \text{ AND } \text{status} = \text{'PENDING'}$$
  $$\text{Target Variance (Cap Metric)} = \text{Target (202)} - \text{Current Value (310)} = \mathbf{-108}$$
- **Format:** Nilai integer tebal (`310`), Delta badge pill (`▼ -4.1%`), Footer target (`Target: ≤ 202 Stores (-108)` oranye/warning).

#### 3. Verified & Mapped (🛡️)
- **Definisi:** Toko rekanan resmi Grup GRC yang **telah memiliki `tokocodeidcpd`** (`tokocodeidcpd IS NOT NULL`), berlaku untuk kedua Group Region (CPD maupun BNN), dan otomatis ter-mapping ke Selling Agent.
- **Formula:**
  $$\text{Verified Stores} = \text{COUNT}(\text{DISTINCT } \text{customer\_id}) \quad \text{WHERE } \text{tokocodeidcpd IS NOT NULL}$$
  $$\text{Target Variance} = \text{Current Value} - \text{Target} = 2,120 - 2,000 = \mathbf{+120}$$
- **Format:** Nilai integer tebal (`2,120`), Delta badge pill (`▲ +10.4%`), Footer target (`Target: 2,000 Stores (+120)` hijau).

#### 4. Activated (1st Order) (🚀)
- **Definisi:** Toko rekanan yang telah resmi menghasilkan transaksi digital perdananya (*First Order Completed*).
- **Formula:**
  $$\text{Activated Stores} = \text{COUNT}(\text{DISTINCT } \text{customer\_id}) \quad \text{WHERE } \text{first\_order\_at} \in [\text{start\_date}, \text{end\_date}]$$
  $$\text{Target Variance} = \text{Current Value} - \text{Target} = 726 - 700 = \mathbf{+26}$$
- **Format:** Nilai integer tebal (`726`), Delta badge pill (`▲ +12.4%`), Footer target (`Target: 700 Stores (+26)` hijau).

---

### 5.3 Customer Growth Trend (Stacked Area Cohort Chart)
- **Visualisasi:** Spline Stacked Area Chart dengan 3 lapisan bertumpuk yang mencerminkan aliran volume:
  1. 🟣 **Registered Stores** (Total akumulatif) — Soft Purple Gradient.
  2. 🔵 **Verified Stores (`tokocodeidcpd`)** — Sky Indigo Gradient.
  3. 🟢 **Activated Stores (First Order)** — Emerald Green Gradient.
- **Interactive Scrubber Tooltip:** Menampilkan ringkasan data instan pada titik koordinat kursor.

---

### 5.4 Onboarding Funnel Widget (Vertical Column Chart)
Visualisasi konversi digital 3 tahap berbentuk **Vertical Column Funnel**:
- **3 Tahap Utama:**
  1. `1 Register` (`2.43K` • `100.0%`)
  2. `2 Verified` (`2.12K` • `87.2%`)
  3. `3 Active` (`726` • `29.9%`)
- **Desain & Tipografi:**
  - **Full-height track:** Lavender background (`#F3E8FF`).
  - **Progress Fill:** Solid Brand Violet (`#6C5CE7`).
  - **Floating White Badge Pills:** Menampilkan persentase dan format angka ringkas 'K' (`100% / 2.43K`, `87.2% / 2.12K`, `29.9% / 726`).
  - **Y-Axis Reference Grid:** Skala `0%`, `25%`, `50%`, `75%`, `100%` dengan garis horizontal putus-putus.

---

### 5.5 Regional Performance & Verification Diagnostic Table
Memetakan performa verifikasi dan aktivasi secara granular di seluruh provinsi operasional (tanpa kategori gabungan 'Others'):

- **Inner Scroll Container:** Dibungkus dalam container ber-scroll internal (`max-height: 290px; overflow-y: auto`) dengan **Sticky Table Header** (`position: sticky; top: 0; background: #FFFFFF; z-index: 3`).
- **Granularitas Region Lengkap:**
  - **Group Region CPD:** Jawa Barat, DKI Jakarta, Jawa Tengah, Jawa Timur, Banten, DI Yogyakarta.
  - **Group Region BNN:** Sumatera Utara, Sumatera Selatan, Riau & Kepri, Lampung, Kalimantan Barat, Kalimantan Timur, Sulawesi Selatan, Bali & Nusa Tenggara.

| Kolom | Alignment | Format Tipografi | Deskripsi & Fungsi |
|---|---|---|---|
| **Region** | Left | Inter Bold 13px | Nama Provinsi / Wilayah operasional |
| **Group Region** | Center | Badge Chip (`CPD`/`BNN`) | Klasifikasi Group Region |
| **Registered** | Right | JetBrains Mono 13px | Volume toko rekanan yang mendaftar |
| **Verified (%)** | Right | JetBrains Mono 13px | Volume & rasio toko dengan `tokocodeidcpd` |
| **Pending** | Right | JetBrains Mono 13px | Jumlah toko tanpa `tokocodeidcpd` (dalam review) |
| **SLA Breach >24h** | Right | Badge Chip (Warning/Danger)| Antrean pending yang melanggar batas SLA 24 jam |
| **Activated Stores (%)**| Right | JetBrains Mono 13px (Green)| Toko yang sudah menyelesaikan first order (% vs Verified) |
| **Cohort GMV** | Right | JetBrains Mono 13px (Primary)| Total nominal transaksi order perdana cohort toko baru |

---

### 5.6 Selling Agent Performance & Adoption Quality Table (Nama PT)
Menampilkan performa penugasan dan konversi digital per entitas **PT Distributor resmi GRC**:

- **Tampilan Bersih:** Tanpa icon avatar inisial bulat, langsung menampilkan Nama PT dan ID agen di bawahnya.
- **Inner Scroll Container:** Menggunakan `max-height: 290px; overflow-y: auto` dengan sticky header.
- **Entitas Data:**
  - `PT Bangun Prima Sejahtera` (SA-01 • Jawa Barat - CPD)
  - `PT Cipta Sarana Mandiri` (SA-02 • DKI Jakarta - CPD)
  - `PT Sinar Distribusi Nusantara` (SA-03 • Jawa Tengah - CPD)
  - `PT Mega Niaga Utama` (SA-04 • Jawa Timur - CPD)
  - `PT Karya Bersama Abadi` (SA-05 • Sumatera Utara - BNN)
  - `PT Sumber Abadi Rezeki` (SA-06 • Kalimantan Barat - BNN)
  - `PT Mitra Distribusi Jaya` (SA-07 • Sumatera Selatan - BNN)
  - `PT Cahaya Inti Sejahtera` (SA-08 • Sulawesi Selatan - BNN)

| Kolom | Alignment | Format Tipografi | Deskripsi |
|---|---|---|---|
| **Selling Agent (PT)** | Left | Inter Bold 13px + ID 10.5px | Nama PT Distributor resmi & ID agen |
| **Region** | Left | Inter Regular 12.5px | Wilayah operasional agen |
| **Group Region** | Center | Badge Chip (`CPD`/`BNN`) | Group Region agen |
| **Verified Stores** | Right | JetBrains Mono 13px | Jumlah toko terverifikasi (`tokocodeidcpd`) di bawah naungan PT |
| **Activated** | Right | JetBrains Mono 13px (Green) | Jumlah toko yang berhasil order perdana |
| **Activation Rate** | Right | JetBrains Mono + Mini Bar | Persentase aktivasi ($\frac{\text{Activated}}{\text{Verified}} \times 100\%$) |
| **Cohort GMV** | Right | JetBrains Mono 13px (Primary)| Total omzet transaksi order perdana |
| **Avg GMV / Active** | Right | JetBrains Mono 13px | Rata-rata nilai belanja order perdana per toko |

---

### 5.7 🚨 "What Needs Attention?" Smart Growth Anomaly Engine (Reporting Summary)
Komponen deteksi anomali onboarding difokuskan sebagai **Pure Reporting Summary** (tanpa Actionable Playbook dan tanpa tombol aksi):

1. **🔴 [CRITICAL] High Pending SLA Breaches in Sumatera Utara & Selatan:**
   - **Status Tag:** `● CRITICAL`
   - **Impact Badge:** `32 Stores >24h`
   - **Summary:** *Manual verification backlog without tokocodeidcpd in BNN regions.*
2. **🟡 [WARNING] First-Order Conversion Lag in Kalimantan Barat:**
   - **Status Tag:** `● WARNING`
   - **Impact Badge:** `34.1% Activation (Lagging)`
   - **Summary:** *Tingkat aktivasi order perdana di Kalbar hanya 34.1%, tertinggal dibandingkan rata-rata 43.0%.*

---

## 6. Metric Polarity, Direction, & Dynamic Threshold Engine

| Metrik | Polaritas | Target Sehat (Green) | Peringatan (Yellow) | Kritis (Red) |
|---|---|---|---|---|
| **Verification Rate (`tokocodeidcpd`)** | Positif (Higher is better) | $\ge 85.0\%$ | $75.0\% - 84.9\%$ | $< 75.0\%$ |
| **Pending Queue (No `tokocodeidcpd`)** | Negatif (Lower is better) | $\le 202 \text{ stores}$ | $203 - 350 \text{ stores}$ | $> 350 \text{ stores}$ |
| **SLA Breach Rate (>24h)**| Negatif (Lower is better) | $\le 10.0\%$ | $10.1\% - 20.0\%$ | $> 20.0\%$ |
| **Activation Rate** | Positif (Higher is better) | $\ge 45.0\%$ | $35.0\% - 44.9\%$ | $< 35.0\%$ |

---

## 7. Interaksi & On-Screen Direct Scannability

Sesuai kesepakatan desain, Page 2 **tidak menggunakan popup modal drill-down terpisah**, melainkan mengoptimalkan interaksi langsung di layar (*On-Screen Direct Scannability*):
1. **Filter-Driven State:** Mengubah dropdown filter di Topbar langsung menyaring data pada 4 KPI card, stacked area chart, funnel diagram, tabel regional, dan tabel agen secara sinkron.
2. **Compact Card Layout:** Spacing vertikal yang rapat dengan kontainer scroll internal pada tabel mencegah halaman memanjang berlebihan saat membuka banyak data region/agen.

---

## 8. Data Lineage, Event Tracking, & Database Warehouse Mapping

### A. Event Tracking Payload

```json
// 1. Store Registration Event (Simple Form without NIK/NIB)
{
  "event_name": "store_registered",
  "customer_id": "CUST-GRC-1049",
  "store_name": "TB Sumber Makmur",
  "registered_at": "2026-08-14T08:30:00Z",
  "region": "Sumatera Utara",
  "group_region": "BNN",
  "tokocodeidcpd": null
}

// 2. Verification & Auto-Mapping Event (tokocodeidcpd Assigned)
{
  "event_name": "store_verified_and_mapped",
  "customer_id": "CUST-GRC-1049",
  "tokocodeidcpd": "CPD-SM-0042",
  "verification_status": "VERIFIED",
  "group_region": "BNN",
  "selling_agent_id": "SA-05",
  "selling_agent_company": "PT Karya Bersama Abadi",
  "verified_at": "2026-08-14T08:34:00Z",
  "verification_duration_seconds": 240
}

// 3. First Digital Order Event (ACTIVATED)
{
  "event_name": "first_order_completed",
  "customer_id": "CUST-GRC-1049",
  "tokocodeidcpd": "CPD-SM-0042",
  "order_id": "ORD-2026-9921",
  "gross_amount": 4250000,
  "completed_at": "2026-08-18T14:10:00Z"
}
```

### B. BigQuery / PostgreSQL Aggregation View

```sql
-- Aggregated Regional Onboarding Diagnostic View
CREATE OR REPLACE VIEW analytics.v_regional_onboarding_performance AS
SELECT 
    c.region,
    c.group_region, -- CPD or BNN
    COUNT(DISTINCT c.customer_id) AS new_registrants,
    COUNT(DISTINCT CASE WHEN c.tokocodeidcpd IS NOT NULL THEN c.customer_id END) AS verified_stores,
    COUNT(DISTINCT CASE WHEN c.tokocodeidcpd IS NULL AND c.status = 'PENDING' THEN c.customer_id END) AS pending_stores,
    COUNT(DISTINCT CASE WHEN c.tokocodeidcpd IS NULL AND c.status = 'PENDING' AND TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), c.registered_at, HOUR) > 24 THEN c.customer_id END) AS sla_breach_count,
    COUNT(DISTINCT CASE WHEN fo.first_order_id IS NOT NULL THEN c.customer_id END) AS activated_stores,
    COALESCE(SUM(fo.gross_amount), 0) AS cohort_first_order_gmv
FROM raw.dim_customers c
LEFT JOIN (
    SELECT customer_id, MIN(order_id) AS first_order_id, SUM(gross_amount) AS gross_amount
    FROM raw.fct_orders
    WHERE order_status = 'COMPLETED'
    GROUP BY customer_id
) fo ON c.customer_id = fo.customer_id
GROUP BY 1, 2;
```

---
*Dokumen ini merupakan spesifikasi resmi pengembangan Page 2: Customer Growth & Acquisition Mitra1000s.*  
*Disahkan oleh Product Management & Engineering Leads Mitra1000s.*
