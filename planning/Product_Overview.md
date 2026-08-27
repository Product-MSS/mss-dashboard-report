# 🗼 Product Overview (Executive Summary)
### Spesifikasi Teknis, Desain Wireframe, Business Logic & Anomaly Engine (Mitra1000s B2B)

> **Versi:** 2.0 (Updated to Live Prototype State)  
> **Status:** Approved Architecture & Implemented Prototype  
> **Dibuat oleh:** Tim Product Manager Mitra1000s  
> **Tanggal:** 2026-08-26  
> **Target Audiens:** Product Manager, Lead BI/Data Engineer, Product Designer (UI/UX), Frontend Engineer  
> **Companion Docs:** 
> - [PM Metrics Playbook](./PM_Metrics_Playbook.md)
> - [B2B Ecommerce Data Tracking Plan](./B2B_Ecommerce_Data_Tracking_Plan.md)
> **Platform Target:** Web Control Tower App (`React + TypeScript + Vite`) & Power BI Embedded

---

## 📑 Daftar Isi
1. [Latar Belakang & Filosofi "Control Tower" PM](#1-latar-belakang--filosofi-control-tower-pm)
2. [5 Pertanyaan Kritis yang Wajib Terjawab dalam 1 Layar](#2-5-pertanyaan-kritis-yang-wajib-terjawab-dalam-1-layar)
3. [Arsitektur Viewport & Hierarchy Informasi](#3-arsitektur-viewport--hierarchy-informasi)
4. [Master Wireframe UI & Mockup](#4-master-wireframe-ui--mockup)
5. [Spesifikasi Komponen, Logic, & Formula Matematis](#5-spesifikasi-komponen-logic--formula-matematis)
   - [5.1 Topbar & Global Context Filter Layer](#51-topbar--global-context-filter-layer)
   - [5.2 North Star Metric (GMV) & Quality Breakdown Area](#52-north-star-metric-gmv--quality-breakdown-area)
   - [5.3 Empat Core KPI Drivers (Minimalist Layout)](#53-empat-core-kpi-drivers-minimalist-layout)
   - [5.4 30-Day GMV Trend (Smooth Spline & Scrubber)](#54-30-day-gmv-trend-smooth-spline--scrubber)
   - [5.5 GMV Driver Impact Matrix Table](#55-gmv-driver-impact-matrix-table)
   - [5.6 Product Health Telemetry Table](#56-product-health-telemetry-table)
   - [5.7 🚨 "What Needs Attention?" Smart Anomaly Section](#57--what-needs-attention-smart-anomaly-section)
6. [Metric Polarity, Direction, & Dynamic Threshold Engine](#6-metric-polarity-direction--dynamic-threshold-engine)
7. [Interaction & Drill-Down Routing Matrix](#7-interaction--drill-down-routing-matrix)
8. [Data Lineage & Mapping Database Warehouse](#8-data-lineage--mapping-database-warehouse)

---

## 1. Latar Belakang & Filosofi "Control Tower" PM

### Masalah pada Dashboard Laporan Tradisional
Sebagian besar dashboard analytics di industri hanya berfungsi sebagai **"Laporan Statis"**. Karakteristik dashboard laporan yang gagal membantu PM:
1. **Information Overload:** Menampilkan 30+ angka dan grafik tanpa hierarki yang jelas.
2. **Lack of Causality:** Memberitahu bahwa GMV turun, tetapi tidak menjelaskan *mengapa* turun (apakah karena pembeli berkurang, frekuensi order anjlok, atau keranjang belanja mengecil?).
3. **High Cognitive Load:** PM harus menghabiskan waktu 20-30 menit mencari anomali secara manual, membuka 4-5 tab laporan berbeda, dan mencocokkan tanggal.
4. **No Direct Action:** Tidak ada jembatan langsung antara melihat data anomali dengan tindakan investigasi atau eskalasi ke tim engineering/bisnis.

### Konsep "PM Control Tower"
Dashboard **Product Overview (Executive Summary)** Mitra1000s dirancang dengan paradigma **Control Tower**:
- **Satu Layar Utama (Cockpit View):** Memberikan sinyal instan tentang kesehatan bisnis dan produk dalam hitungan < 10 detik.
- **Pola Kognitif Terstruktur:** Mengikuti alur visual hierarkis:
  $$\mathbf{Outcome\ (Hasil)} \longrightarrow \mathbf{Drivers\ (Pendorong)} \longrightarrow \mathbf{Diagnosis\ (Akar\ Masalah)} \longrightarrow \mathbf{Action\ (Tindakan)}$$
- **Proactive Alerting:** Bagian *“What Needs Attention?”* secara otomatis menyorot anomali signifikan dan memotong waktu diagnosis PM dari jam menjadi detik.
- **Interactive Drill-down:** Setiap elemen chart dan KPI card adalah pintu masuk (*entry point*) menuju deep-dive view spesifik.

```
┌──────────────────────────────────────────────────────────────────┐
│                   PM COGNITIVE FLOW HIERARCHY                    │
│                                                                  │
│  1. OUTCOME   ───► [ GMV North Star & Quality Decomposition ]   │
│                             │                                    │
│  2. DRIVERS   ───► [ Acquisition · Activation · Retention · AOV ]│
│                             │                                    │
│  3. DIAGNOSIS ───► [ GMV Driver Matrix & Product Health Telemetry]│
│                             │                                    │
│  4. ACTION    ───► [ 🚨 What Needs Attention? Anomaly Engine ]   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. 5 Pertanyaan Kritis yang Wajib Terjawab dalam 1 Layar

Sebelum membuka halaman analisis lain, seorang Product Manager yang membuka Control Tower wajib mendapatkan jawaban langsung atas 5 pertanyaan bisnis berikut:

| No | Pertanyaan Kritis PM | Komponen yang Menjawab | Indikator Utama |
|---|---|---|---|
| **1** | **Apakah produk tumbuh?** | North Star Hero & Acquisition KPI Card | Total GMV (`Rp 12,48 Miliar`), GMV Growth vs Prior Period (`+8.2%`), New Verified Toko (`2.430 Toko`, `+12.4% WoW`). |
| **2** | **Apakah user mendapatkan value?** | Activation KPI Card & Add to Cart/Checkout Telemetry | D-7 Activation Rate (`36.4%`), Add to Cart Success (`94.20%`), Checkout Success (`98.15%`). |
| **3** | **Apakah user kembali bertransaksi?** | Retention KPI Card & Order Frequency Metric | M1 Retention Rate (`42.8%`), Active Buyers (`1.850 Toko`), Order Frequency (`2.39x / bulan`). |
| **4** | **Apakah transaksi & revenue sehat?** | GMV Quality Decomposition & AOV Driver | Average Order Value (`Rp 2.82 M`), Total Valid Orders (`4.420`), Payment Success Rate (`97.80%`). |
| **5** | **Apakah ada masalah produk yang perlu segera diinvestigasi?** | Product Health Panel & "What Needs Attention?" | Zero-Result Search spikes (`8.70%` • 🔴 Critical), Drop di New Retailer Jabar (🟡 Warning). |

---

## 3. Arsitektur Viewport & Hierarchy Informasi

Tata letak layar dibagi menjadi 2 zona viewport utama untuk mengoptimalkan pengalaman PM di resolusi standar ($1920 \times 1080$ / $1440 \times 900$):

### 🟢 First Viewport (Above the Fold — Zero Scroll)
Fokus pada **Status & Tren Makro**:
1. **Topbar:** Breadcrumb `Dashboard Mitra1000s / Executive Summary`, status `🟢 Live`, Data Lag info, Update time, Tombol `⚡ Refresh Data`, dan Profil User (Avatar squircle `Annette Black - Lead Product Owner`).
2. **Global Context Filter Bar:** Date range selector, Region, User Role, Distributor, Sales Channel.
3. **Hero North Star (GMV):** Angka besar bersih (`Rp 12,48 Miliar`), delta vs prior period (`▲ +8.2% (+Rp 946.5 M)`), dan 4 micro-KPI inline tanpa box borders (`Valid Orders`, `AOV`, `Active Buyers`, `Order Frequency`).
4. **4 Core Driver KPI Cards:** Acquisition (New Verified Toko), Activation (D-7 Rate), Retention (M1 Rate), Revenue (AOV). Format: Minimalist Modern (Eyebrow category, Metric title, Hero value + Delta badge, Clean single-line target footer).
5. **Primary GMV Trend Chart (30 Days):** Smooth Monotone Cubic Spline curve dengan area gradient glow, interactive hover crosshair scrubber, dan pulsing radar beacon dot di tanggal spike promo (Aug 18).

### 🟡 Second Viewport (Below the Fold — Scroll Down)
Fokus pada **Kausalitas & Anomaly Hunting**:
1. **GMV Driver Impact Matrix (Kiri):** Tabel 4-kolom (`Faktor Penggerak (34%)`, `Nilai Aktual (22%)`, `Perubahan MoM (22%)`, `Kontribusi ΔGMV (22%)`) dengan nilai terkunci `nowrap` dalam 1 baris.
2. **Product Health Telemetry (Kanan):** Tabel 3-kolom (`Indikator Metrik (56%)`, `Nilai Aktual (22%)`, `SLA Target (22%)`) dengan micro status tag (`● CRITICAL`, `● NORMAL`) di atas judul metrik.
3. **🚨 "What Needs Attention?" Anomaly Section (Paling Bawah):** Card pintar yang menyorot deviasi metrics di luar batas normal toleransi lengkap dengan segmen terdampak dan tombol aksi investigasi.

---

## 4. Master Wireframe UI & Mockup

### 4.1 Full Control Tower Wireframe (Text/ASCII Specification)

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ 🏢 MSS Report   Dashboard Mitra1000s / Executive Summary   🟢 Live  Data Lag: 14 min ago  Update: 14:32 WIB  ⚡ Refresh [AB] Annette Black │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [ GLOBAL FILTER LAYER ]                                                                                                │
│ Periode: [ 01/01/2026 - 31/08/2026 ▼ ]   Wilayah: [ Semua Wilayah ▼ ]   Supplier: [ Semua Supplier ▼ ]              │
│ Selling Agent: [ Semua Selling Agent ▼ ]                                                                               │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 🌟 NORTH STAR METRIC                                                                                     [ ↗ Detail ]  │
│ ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  TOTAL GROSS MERCHANDISE VALUE (GMV)                                                                               │ │
│ │  Rp 12,48 Miliar   ▲ +8.2% (+Rp 946.5 M) vs previous 30 days (Jul 2 - Jul 31)                                      │ │
│ │                                                                                                                    │ │
│ │  Valid Orders: 4.420 (+3.8%)  •  AOV: Rp 2.82 M (+4.2%)  •  Active Buyers: 1.850 (+2.1%)  •  Order Freq: 2.39x    │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────┬──────────────────────────────────┬────────────────────────────────┬─────────────────┤
│ ACQUISITION                      │ ACTIVATION                       │ RETENTION                      │ REVENUE         │
│ New Verified Stores              │ D-7 Activation Rate              │ M1 Retention Rate              │ Average Order   │
│ 2.430   ▲ +12.4% (+268)          │ 36.4%   ▼ -5.4%                  │ 42.8%   ▼ -3.2%                │ Rp 2.82 M  ▲+4.2│
│ vs Jul 2026                      │ vs Jul 2026                      │ vs Jul 2026                    │ vs Jul 2026     │
│ Target: 2.200 (+230)             │ Target: 40.0% (-3.6%)            │ Target: 45.0% (-2.2%)          │ Target: Rp 2.70M│
├──────────────────────────────────┴──────────────────────────────────┴────────────────────────────────┴─────────────────┤
│ 📈 30-DAY GMV TREND                                                    Puncak: Rp 623M (Aug 18) • Rata-rata: Rp 381M/h │
│                                                                                                                        │
│  Rp 623M ┤                                                    ╭────────╮  (Aug 18: Radar Beacon Dot)                   │
│  Rp 411M ┤                                         ╭──────────╯        ╰──────────────╮                                │
│  Rp 206M ┤                         ╭───────────────╯                                  ╰────────── (Current Period: Aug)│
│  Rp   0M └─ ─ ─ ─ ─ ─╭────────────╯ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ (Previous Period: Jul)│
│            Aug 1            Aug 5            Aug 10           Aug 15           Aug 20           Aug 25           Aug 30│
│                                                                                                                        │
│  💡 Scrubber: Hover atau gerakkan kursor di sepanjang grafik untuk melihat tooltip data harian dinamis.                │
├──────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────┤
│ 📊 GMV DRIVER IMPACT MATRIX      ▲ +8.2% (+Rp 946.5 M│ 🏥 PRODUCT HEALTH TELEMETRY                                     │
│ Dekomposisi Faktor Pendorong Pertumbuhan GMV         │ Indikator Early Warning Stabilitas Sistem & Pengalaman Pengguna │
├──────────────────────────┬───────────┬───────────────┼──────────────────────────┬───────────┬───────────────┬──────────┤
│ FAKTOR PENGGERAK (34%)   │ NILAI (22%│ PERUB. (22%)  │ INDIKATOR METRIK (56%)   │ NILAI AKTUAL (22%) │ SLA TARGET (22%)│
├──────────────────────────┼───────────┼───────────────┼──────────────────────────┼────────────────────┼─────────────────┤
│ Basket Size (AOV Impact) │ Rp 2.82 M │ ▲ +4.2% MoM   │ ● CRITICAL               │ 8.70%              │ <= 3.0%         │
│ Rata-rata nominal GMV    │           │ +Rp 520 M     │ Zero-Result Search Rate  │                    │                 │
│ per keranjang checkout.  │           │               │ Rasio cari hasil 0 SKU.  │                    │                 │
├──────────────────────────┼───────────┼───────────────┼──────────────────────────┼────────────────────┼─────────────────┤
│ Active Buyers Impact     │ 1.850 Toko│ ▲ +2.1% MoM   │ ● NORMAL                 │ 94.20%             │ >= 90.0%        │
│ Total akun toko belanja  │           │ +Rp 250 M     │ Add to Cart Success Rate │                    │                 │
│ dalam periode berjalan.  │           │               │ Rasio klik cart sukses.  │                    │                 │
├──────────────────────────┼───────────┼───────────────┼──────────────────────────┼────────────────────┼─────────────────┤
│ Order Frequency Impact   │ 2.39x / bl│ ▲ +1.8% MoM   │ ● NORMAL                 │ 98.15%             │ >= 97.0%        │
│ Rasio pesanan dibagi     │           │ +Rp 176.5 M   │ Checkout Success Rate    │                    │                 │
│ total pembeli aktif.     │           │               │ Rasio cart ke payment.   │                    │                 │
├──────────────────────────┴───────────┴───────────────┼──────────────────────────┼────────────────────┼─────────────────┤
│                                                      │ ● NORMAL                 │ 97.80%             │ >= 95.0%        │
│                                                      │ Payment Success Rate     │                    │                 │
│                                                      │ Rasio transaksi lunas.   │                    │                 │
├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 🚨 WHAT NEEDS ATTENTION?                                                                                               │
│ Deteksi Anomali & Evaluasi Dampak Transaksi Otomatis (Proactive PM Alerts)                                             │
│ ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ▌ ● CRITICAL  Zero-Result Search Spike (+67% WoW | Affecting 2,340 Searches)          Estimasi Dampak: ~Rp 185.000.000 │
│ │   Permintaan material melonjak namun kata kunci alias katalog belum terdaftar. • Retailer Wilayah Jawa Barat       │
│ │   [🔍 Semen Tiga Roda 50kg (842x)]  [🔍 Baja Ringan 0.75 (612x)]  [🔍 Cat No Drop Grey (410x)]                      │
│ ├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ ▌ ● WARNING   Add to Cart Failures on Cement SKU (Out-of-Stock & MOQ Issue)           Estimasi Dampak: ~Rp 112.800.000 │
│ │   Stok distributor Semen Gresik 50kg habis & MOQ 200 sak memicu silent drop-off. • Retailer Tier B & C Jabar/Banten│
│ │   [🔍 Semen Gresik 50kg (610x gagal)]  [🔍 Baja Ringan C75 (320x gagal)]  [🔍 Pipa PVC 3" (180x gagal)]             │
│ ├────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│ │ ▌ ● WARNING   Checkout Drop-off Spike on Logistics & Freight API Calculation          Estimasi Dampak: ~Rp 101.000.000 │
│ │   API kalkulasi ongkos kirim armada truk distributor timeout untuk toko luar ring 1. • Toko Bangunan Pinggiran Jabar│
│ │   [🔍 Radius > 25km (240x drop)]  [🔍 Plafon Kredit Habis (118x)]  [🔍 Tonase Truk < 4 Ton (62x)]                   │
│ └────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Spesifikasi Komponen, Logic, & Formula Matematis

---

### 5.1 Topbar & Global Context Filter Layer

Filter di bagian atas berfungsi sebagai **Context Provider** yang memengaruhi seluruh komputasi metrik di Control Tower.

#### Dimensi Filter yang Didukung
1. **Date Range (`dim_date`):**
   - **Tampilan UI (Single-Field Trigger):** Menggunakan **satu input field terpadu** yang menampilkan format rentang tanggal ringkas: `DD/MM/YYYY - DD/MM/YYYY` (contoh: `01/01/2026 - 31/08/2026` atau `08/10/2026 - 08/10/2027`).
   - **Mekanisme Popover Modal:** Saat field diklik, muncul floating popover dialog interaktif yang menyediakan:
     1. **Quick Presets:** `Tahun Ini (YTD) [Default]`, `Bulan Ini (MTD)`, `Tahun Lalu (Full Year)`.
     2. **Kustom Rentang Kalender (Custom Month-Year Range):** Memilih **Bulan Awal & Tahun Awal** serta **Bulan Akhir & Tahun Akhir** (*Month & Year Picker*).
   - **Batasan Maksimal (Max Span Limit):** Maksimal rentang yang dapat dipilih adalah **2 Tahun (24 Bulan)** untuk menjaga efisiensi beban query warehouse/Power BI serta relevansi komparasi data multi-tahun.
2. **Region (`dim_geography` / `dim_users.region`):**
   - Hierarki opsi filter wilayah dengan penempatan prioritas khusus:
     1. `Semua Wilayah [Default]`
     2. `Area CPD (Top 1)`
     3. `Area BNN (Top 2)`
     4. `DKI Jakarta`
     5. `Jawa Barat`
     6. `Jawa Tengah`
     7. `Jawa Timur`
     8. `Banten`
     9. `Luar Jawa`
3. **Supplier (`dim_supplier.supplier_id` / `dim_supplier.supplier_name`):**
   - Options: `Semua Supplier [Default]`, multi-select dropdown daftar entitas supplier manufaktur/prinsipal aktif (misal: *PT Semen Indonesia Group*, *PT Krakatau Steel*, *PT Holcim*, dsb.).
4. **Selling Agent (`dim_selling_agent.selling_agent_id` / `dim_selling_agent.agent_name`):**
   - Options: `Semua Selling Agent [Default]`, multi-select dropdown daftar badan selling agent / keagenan distributor aktif yang melayani pemenuhan pesanan toko bangunan.

---

### 5.2 North Star Metric (GMV) & Quality Breakdown Area

#### 1. Definisi Bisnis
Gross Merchandise Value (GMV) adalah nilai transaksi bersih (*net transaction amount*) dari seluruh pesanan barang yang berhasil dibuat oleh buyer dan sah masuk ke sistem (mengecualikan pesanan batal/reject).

#### 2. Formula Matematis & SQL/DAX

$$\mathbf{GMV} = \sum (\text{net\_amount}) \quad \forall \text{ fact\_orders WHERE } \text{order\_status} \notin ('\text{cancelled}', '\text{rejected}') \text{ AND } \text{is\_valid\_transaction} = \text{true}$$

$$\mathbf{GMV\ Growth\ (\%)} = \left( \frac{\mathbf{GMV}_{\text{Current Period}} - \mathbf{GMV}_{\text{Prior Equivalent Period}}}{\mathbf{GMV}_{\text{Prior Equivalent Period}}} \right) \times 100\%$$

#### 3. Formula Dekomposisi Kualitas GMV (*GMV Quality Breakdown*)

$$\mathbf{GMV} = \mathbf{Active\ Buyers\ (MAB)} \times \mathbf{Order\ Frequency} \times \mathbf{Average\ Order\ Value\ (AOV)}$$

| Metrik Sub-Komponen | Nilai Aktual & Delta | Formula Kalkulasi | Deskripsi & Tujuan Bisnis |
|---|---|---|---|
| **Valid Orders** | `4.420` (`+3.8%`) | `COUNT(order_id) WHERE status NOT IN ('cancelled','rejected')` | Total seluruh pesanan sah yang masuk ke sistem. |
| **Average Order Value (AOV)** | `Rp 2.82 M` (`+4.2%`) | $\frac{\mathbf{GMV}}{\text{Valid Orders}}$ | Rata-rata nominal GMV per keranjang checkout. |
| **Active Buyers** | `1.850 Toko` (`+2.1%`) | $\text{COUNT}(\text{DISTINCT } \text{buyer\_id})$ | Total akun toko bertransaksi dalam periode berjalan. |
| **Order Frequency** | `2.39x / buyer` | $\frac{\text{Valid Orders}}{\text{Active Buyers}}$ | Rasio pesanan dibagi total pembeli aktif. |

---

### 5.3 Empat Core KPI Drivers (Unified Container Card ala North Star)

Struktur komponen KPI Drivers disatukan dalam **1 Card Besar Terpadu (*Single Container Card*)** yang harmonis dan simetris dengan North Star Metric Card di atasnya:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CORE DRIVER METRICS                                                                                                │
│ Key Performance Indicators                                                                                         │
│ * Funnel metrics are scoped by Date & Region only; Supplier & Selling Agent filters do not apply                   │
├──────────────────────────────────┬──────────────────────────────────┬───────────────────────────────┬──────────────┤
│ ACQUISITION                      │ ACTIVATION                       │ RETENTION                     │ REVENUE      │
│ New Verified Stores              │ D-7 Activation Rate              │ M1 Retention Rate             │ AOV          │
│ 2.430   ▲ +12.4% (+268)          │ 36.4%   ▼ -5.4%                  │ 42.8%   ▼ -3.2%               │ Rp 2.82 M  ▲+│
│ vs Jul 2026                      │ vs Jul 2026                      │ vs Jul 2026                   │ vs Jul 2026  │
│ Target: 2.200 (+230)             │ Target: 40.0% (-3.6%)            │ Target: 45.0% (-2.2%)         │ Target: Rp 2.│
└──────────────────────────────────┴──────────────────────────────────┴───────────────────────────────┴──────────────┘
```

1. **Header Card:**
   - **Tag:** `CORE DRIVER METRICS` (*purple micro uppercase badge*).
   - **Title:** `Key Performance Indicators` (H2 bold).
   - **Note:** `* Funnel metrics are scoped by Date & Region only; Supplier & Selling Agent filters do not apply`.
2. **4 Kolom Terpadu Interaktif:**
   - Masing-masing kolom memiliki hover background lembut dan dapat diklik secara independen untuk memunculkan modal investigasi drill-down.
   - **Acquisition (New Verified Stores):** `2,430 Stores` (`▲ +12.4% (+268)` • `vs July 2026` • `Target: 2,200 Stores (+230)`).
   - **Activation (D-7 Activation Rate):** `36.4%` (`▼ -5.4%` • `vs July 2026` • `Target: 40.0% (-3.6%)`).
   - **Retention (M1 Retention Rate):** `42.8%` (`▼ -3.2%` • `vs July 2026` • `Target: 45.0% (-2.2%)`).
   - **Revenue (Average Order Value):** `Rp 2.82 M` (`▲ +4.2%` • `vs July 2026` • `Target: Rp 2.70 M (+Rp 120k)`).

---

### 5.4 Dynamic GMV Dual-Line Trend Chart (Daily vs Monthly)

Visualisasi tren GMV beradaptasi secara otomatis berdasarkan rentang tanggal yang dipilih di Global Filter Bar:
1. **Mode 1 Bulan (Daily Granularity):**
   - Menampilkan titik harian (Hari 1 s.d. Hari 28/30/31).
   - Sumbu X: Interval tanggal harian (`Aug 1`, `Aug 5`, `Aug 10`, `Aug 15`, `Aug 20`, `Aug 25`, `Aug 31`).
   - Judul & Rata-rata: `Daily GMV Trend (August 2026)` • `Average: Rp 381M/day` • `Peak: Rp 623M (Aug 18)`.
   - Tooltip Scrubber: Rincian transaksi harian (`Daily GMV`, `Valid Orders`, `AOV`, `Active Buyers`).
2. **Mode 2 Bulan s.d. 2 Tahun (Monthly Granularity):**
   - Mengubah grafik menjadi agregasi per bulan (`Jan 2026`, `Feb 2026`, ... `Aug 2026`).
   - Sumbu X: Daftar bulan dalam rentang filter.
   - Judul & Rata-rata: `8-Month GMV Trend (Jan 2026 - Aug 2026)` • `Average: Rp 1.56B/month` • `Peak: Rp 1.72B (Aug 2026)`.
   - Tooltip Scrubber: Rincian transaksi bulanan (`Monthly GMV`, `Valid Orders`, `Average Order Value`, `Active Buyers`).
3. **Spline Rendering & Beacon:** Kurva halus Monotone Cubic Spline (Catmull-Rom to Bezier) dengan beacon event promosi dan interactive vertical scrubber.

---

### 5.5 GMV Driver Impact Matrix Table

Tabel ini membedah secara matematis **3 Tuas Pendorong GMV** (*GMV Drivers*) untuk mengisolasi faktor mana yang berkontribusi paling dominan terhadap pertumbuhan atau penurunan GMV pada periode berjalan.

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GMV DRIVER IMPACT MATRIX                                                                                               │
├──────────────────────────────────────┬────────────────────────┬─────────────────────┬──────────────────┬───────────────┤
│ FAKTOR PENGGERAK (34%)               │ DEFINISI OPERASIONAL   │ NILAI AKTUAL (22%)  │ PERUBAHAN (22%)  │ KONTRIBUSI    │
├──────────────────────────────────────┼────────────────────────┼─────────────────────┼──────────────────┼───────────────┤
│ Basket Size (AOV Impact)             │ Rata-rata GMV / order  │ Rp 2.82 M           │ ▲ +4.2% MoM      │ +Rp 520 M     │
│ Active Buyers (Buyer Volume Impact)  │ Akun toko belanja      │ 1.850 Toko          │ ▲ +2.1% MoM      │ +Rp 250 M     │
│ Order Frequency Impact               │ Pesanan / pembeli      │ 2.39x / bulan       │ ▲ +1.8% MoM      │ +Rp 176.5 M   │
└──────────────────────────────────────┴────────────────────────┴─────────────────────┴──────────────────┴───────────────┘
```

| Faktor Penggerak (34%) | Sub-Keterangan (Definisi Operasional) | Nilai Aktual (22%) | Perubahan MoM (22%) | Kontribusi ΔGMV (22%) |
| :--- | :--- | :---: | :---: | :---: |
| **Basket Size (AOV Impact)** | *Rata-rata nominal GMV per keranjang checkout.* | `Rp 2.82 M` | `▲ +4.2% MoM` | `+Rp 520 M` |
| **Active Buyers (Buyer Volume Impact)** | *Total akun toko bertransaksi dalam periode berjalan.* | `1.850 Toko` | `▲ +2.1% MoM` | `+Rp 250 M` |
| **Order Frequency Impact** | *Rasio pesanan dibagi total pembeli aktif.* | `2.39x / bulan` | `▲ +1.8% MoM` | `+Rp 176.5 M` |

---

#### A. Kerangka Kerja Dekomposisi GMV (Mathematical Attribution Model)

Secara fundamental, GMV merupakan hasil perkalian dari 3 variabel independen:

$$\mathbf{GMV} = \mathbf{Active\ Buyers\ (B)} \times \mathbf{Order\ Frequency\ (F)} \times \mathbf{Average\ Order\ Value\ (A)}$$

$$\text{Dimana: } \mathbf{Total\ Valid\ Orders\ (O)} = B \times F \implies \mathbf{GMV} = O \times A$$

Perubahan total GMV antara periode berjalan ($t$) dengan periode pembanding ($t-1$) adalah:

$$\Delta \mathbf{GMV} = \mathbf{GMV}_t - \mathbf{GMV}_{t-1} = (B_t \times F_t \times A_t) - (B_{t-1} \times F_{t-1} \times A_{t-1})$$

Agar total kontribusi dari ketiga faktor penggerak **100% merekonsiliasi $\Delta\mathbf{GMV}$ tanpa selisih/residual**, digunakan metode **Stepwise Sequential Attribution (Waterfall Factor Model)**:

$$\Delta \mathbf{GMV} = \mathbf{Impact}_{\text{Buyers}} + \mathbf{Impact}_{\text{Frequency}} + \mathbf{Impact}_{\text{AOV}}$$

---

#### B. Rumus Hitungan Detail Per Kolom GMV Driver

##### 1. Kolom "Nilai Aktual" ($X_t$)
Menghitung nilai riil masing-masing metrik pada periode yang dipilih di filter context ($t$):

- **Basket Size (AOV - $A_t$):**
  $$A_t = \frac{\mathbf{GMV}_t}{\text{Total Valid Orders}_t} = \frac{\sum \text{net\_amount}_t}{\text{COUNT}(\text{order\_id}_t)}$$
- **Active Buyers ($B_t$):**
  $$B_t = \text{COUNT}(\text{DISTINCT } \text{buyer\_id}_t) \quad \forall \text{ valid orders in period } t$$
- **Order Frequency ($F_t$):**
  $$F_t = \frac{\text{Total Valid Orders}_t}{\text{Active Buyers}_t} = \frac{\text{COUNT}(\text{order\_id}_t)}{B_t}$$

##### 2. Kolom "Perubahan MoM / WoW" ($\Delta X\%$)
Menghitung laju pertumbuhan relatif terhadap periode pembanding ($t-1$):

$$\Delta X\% = \left( \frac{X_t - X_{t-1}}{X_{t-1}} \right) \times 100\%$$

- **Perubahan AOV ($\Delta A\%$):** $\left( \frac{A_t - A_{t-1}}{A_{t-1}} \right) \times 100\%$
- **Perubahan Active Buyers ($\Delta B\%$):** $\left( \frac{B_t - B_{t-1}}{B_{t-1}} \right) \times 100\%$
- **Perubahan Frequency ($\Delta F\%$):** $\left( \frac{F_t - F_{t-1}}{F_{t-1}} \right) \times 100\%$

##### 3. Kolom "Kontribusi $\Delta\mathbf{GMV}$" (Impact Attribution Value)
Menghitung porsi nominal rupiah (IDR) kenaikan/penurunan GMV yang disebabkan murni oleh pergeseran masing-masing tuas pendorong:

1. **Active Buyers Volume Impact ($\mathbf{Impact}_{\text{Buyers}}$):**
   $$\mathbf{Impact}_{\text{Buyers}} = (B_t - B_{t-1}) \times F_{t-1} \times A_{t-1} = \Delta B \times F_{t-1} \times A_{t-1}$$
   *Tujuan Bisnis:* Mengukur seberapa besar rupiah GMV bertambah/berkurang semata-mata karena akuisisi/reaktivasi jumlah toko pembeli, dengan asumsi frekuensi dan ukuran keranjang tetap pada level baseline periode lalu.

2. **Order Frequency Impact ($\mathbf{Impact}_{\text{Frequency}}$):**
   $$\mathbf{Impact}_{\text{Frequency}} = B_t \times (F_t - F_{t-1}) \times A_{t-1} = B_t \times \Delta F \times A_{t-1}$$
   *Tujuan Bisnis:* Mengukur dampak kenaikan/penurunan kebiasaan repeat order per toko dari seluruh basis pembeli aktif saat ini, dengan asumsi nominal belanja per order tetap pada baseline periode lalu.

3. **Basket Size / AOV Impact ($\mathbf{Impact}_{\text{AOV}}$):**
   $$\mathbf{Impact}_{\text{AOV}} = B_t \times F_t \times (A_t - A_{t-1}) = \text{Orders}_t \times \Delta A$$
   *Tujuan Bisnis:* Mengukur dampak membesarnya/mengecilnya nominal keranjang checkout dari seluruh total pesanan sah yang berhasil terbentuk di periode berjalan.

4. **Persentase Kontribusi Relatif Terhadap Total Pertumbuhan:**
   $$\mathbf{Share\ of\ Growth\ (\%)} = \left( \frac{\mathbf{Impact}_X}{\Delta \mathbf{GMV}} \right) \times 100\%$$

---

#### C. Tabel Ringkasan Formula & DAX Measures (GMV Driver Matrix)

| Komponen Kolom | Variabel | Formula Matematis | DAX Measure Expression (Power BI) | SQL Expression |
| :--- | :---: | :--- | :--- | :--- |
| **Nilai Aktual (AOV)** | $A_t$ | $\frac{\text{GMV}_t}{\text{Orders}_t}$ | `DIVIDE([GMV_Current], [Orders_Current])` | `SUM(net_amount) / COUNT(order_id)` |
| **Nilai Aktual (Buyers)** | $B_t$ | $\text{Distinct}(Buyers_t)$ | `DISTINCTCOUNT(fact_orders[buyer_id])` | `COUNT(DISTINCT buyer_id)` |
| **Nilai Aktual (Freq)** | $F_t$ | $\frac{\text{Orders}_t}{B_t}$ | `DIVIDE([Orders_Current], [Buyers_Current])` | `COUNT(order_id)::FLOAT / COUNT(DISTINCT buyer_id)` |
| **Perubahan MoM (%)** | $\Delta X\%$ | $\frac{X_t - X_{t-1}}{X_{t-1}} \times 100\%$ | `DIVIDE([X_Current] - [X_Prior], [X_Prior]) * 100` | `((val_curr - val_prev) / NULLIF(val_prev, 0)) * 100` |
| **Kontribusi Buyers** | $\text{Impact}_B$ | $\Delta B \times F_{t-1} \times A_{t-1}$ | `([Buyers_Current] - [Buyers_Prior]) * [Freq_Prior] * [AOV_Prior]` | `(b_curr - b_prev) * f_prev * aov_prev` |
| **Kontribusi Freq** | $\text{Impact}_F$ | $B_t \times \Delta F \times A_{t-1}$ | `[Buyers_Current] * ([Freq_Current] - [Freq_Prior]) * [AOV_Prior]` | `b_curr * (f_curr - f_prev) * aov_prev` |
| **Kontribusi AOV** | $\text{Impact}_A$ | $\text{Orders}_t \times \Delta A$ | `[Orders_Current] * ([AOV_Current] - [AOV_Prior])` | `orders_curr * (aov_curr - aov_prev)` |

> [!TIP]
> **Total Rekonsiliasi Otomatis:**
> $\text{Impact}_B + \text{Impact}_F + \text{Impact}_A = \text{Rp } 250\text{M} + \text{Rp } 176.5\text{M} + \text{Rp } 520\text{M} = \mathbf{+\text{Rp } 946.5\text{M}} \equiv \Delta\mathbf{GMV}$.
> Ketiga baris ini menjamin eksekutif dan PM dapat langsung melihat tuas mana yang paling efektif menggerakkan omset bisnis.

---

### 5.6 Product Health Telemetry Table

Menampilkan **4 Indikator Early Warning Telemetri Kesehatan Produk** untuk memantau kelancaran teknis dan user experience di setiap checkpoint alur transaksi e-commerce.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ PRODUCT HEALTH TELEMETRY                                                                         │
├──────────────────────────────────────┬────────────────────────┬─────────────────┬────────────────┤
│ INDIKATOR METRIK (56%)               │ DEFINISI OPERASIONAL   │ AKTUAL (22%)    │ SLA TARGET(22%)│
├──────────────────────────────────────┼────────────────────────┼─────────────────┼────────────────┤
│ ● CRITICAL  Zero-Result Search Rate  │ Rasio keyword 0 hasil  │ 8.70%           │ ≤ 3.0%         │
│ ● NORMAL    Add to Cart Success Rate │ Klik ATC sukses simpan │ 94.20%          │ ≥ 90.0%        │
│ ● NORMAL    Checkout Success Rate    │ Konversi Cart ke Bayar │ 98.15%          │ ≥ 97.0%        │
│ ● NORMAL    Payment Success Rate     │ VA/QRIS/TOP lunas      │ 97.80%          │ ≥ 95.0%        │
└──────────────────────────────────────┴────────────────────────┴─────────────────┴────────────────┘
```

| Indikator Metrik (56%) | Sub-Keterangan (Definisi Operasional) | Nilai Aktual (22%) | SLA Target (22%) |
| :--- | :--- | :---: | :---: |
| `● CRITICAL`<br>**Zero-Result Search Rate** | *Rasio pencarian kata kunci dengan hasil 0 SKU.* | `8.70%` | `≤ 3.0%` |
| `● NORMAL`<br>**Add to Cart Success Rate** | *Rasio klik Add to Cart yang sukses tersimpan.* | `94.20%` | `≥ 90.0%` |
| `● NORMAL`<br>**Checkout Success Rate** | *Rasio konversi dari Cart ke halaman Pembayaran.* | `98.15%` | `≥ 97.0%` |
| `● NORMAL`<br>**Payment Success Rate** | *Rasio pembayaran VA/QRIS/TOP yang berstatus lunas.* | `97.80%` | `≥ 95.0%` |

---

#### A. Logika, Rumus Matematis & Filter Rules 4 Indikator Telemetri

---

#### 1. Zero-Result Search Rate (Search Discovery Health)
Mengukur efektivitas sistem pencarian dan kelengkapan katalog/sinonim produk.

##### a. Rumus Matematis:
$$\text{Zero-Result Search Rate} = \left( \frac{\text{Total Sesi Pencarian dengan Hasil } 0\text{ SKU}}{\text{Total Seluruh Sesi Pencarian yang Dilakukan}} \right) \times 100\%$$

$$\text{Formula Detail} = \left( \frac{\text{COUNT}(\text{search\_id WHERE results\_count} = 0)}{\text{COUNT}(\text{search\_id})} \right) \times 100\%$$

##### b. Filter & Aturan Pengecualian (Data Sanitization):
- **Include:** Semua query pencarian teks di kolom search bar aplikasi mobile dan web.
- **Exclude:** Query kosong (`TRIM(query_text) = ''`), query dengan panjang $< 2$ karakter, dan trafik scraping/bot otomatis (`user_agent NOT LIKE '%bot%'`).

##### c. SLA Target & Aturan Status UI:
- 🟢 **NORMAL:** $\le 3.0\%$ (Katalog dan sinonim pencarian berfungsi prima).
- 🟡 **WARNING:** $3.1\% - 6.0\%$ (Mulai terjadi gap kata kunci populer yang belum terdaftar di CMS).
- 🔴 **CRITICAL:** $> 6.0\%$ (Terjadi lonjakan kata kunci gagal / issue indexing Elasticsearch).

##### d. DAX Measure (Power BI):
```dax
Zero_Result_Search_Rate = 
VAR TotalSearches = COUNTROWS(fact_searches)
VAR ZeroResults = CALCULATE(COUNTROWS(fact_searches), fact_searches[results_count] = 0)
RETURN
    DIVIDE(ZeroResults, TotalSearches, 0)
```

---

#### 2. Add to Cart Success Rate (Cart Pipeline Health)
Mengukur keandalan tombol *Add to Cart* saat buyer memilih barang, termasuk validasi stok dan MOQ distributor.

##### a. Rumus Matematis:
$$\text{Add to Cart Success Rate} = \left( \frac{\text{Total Percobaan Add to Cart yang Berhasil Tersimpan}}{\text{Total Percobaan Add to Cart Keseluruhan}} \right) \times 100\%$$

$$\text{Formula Detail} = \left( \frac{\text{COUNT}(\text{event\_id WHERE action\_status} = '\text{success}')}{\text{COUNT}(\text{event\_id WHERE action\_type} = '\text{add\_to\_cart}')} \right) \times 100\%$$

##### b. Filter & Aturan Pengecualian:
- **Numerator (Berhasil):** Event penambahan barang ke keranjang yang menerima response `HTTP 200 OK` dan item tersimpan di tabel session/cart.
- **Denominator (Total):** Seluruh klik tombol *Tambah ke Keranjang* (termasuk yang gagal akibat Out-of-Stock, MOQ rule failure, atau API timeout).
- **Exclude:** Klik beruntun cepat (*double-click debouncing* $< 500\text{ms}$).

##### c. SLA Target & Aturan Status UI:
- 🟢 **NORMAL:** $\ge 90.0\%$ (Aliran simpan keranjang lancar).
- 🟡 **WARNING:** $85.0\% - 89.9\%$ (Toko mulai sering terbentur stok habis semu atau validasi MOQ).
- 🔴 **CRITICAL:** $< 85.0\%$ (Kendala teknis database cart service atau integrasi stok distributor offline).

##### d. DAX Measure (Power BI):
```dax
ATC_Success_Rate = 
VAR TotalAttempts = COUNTROWS(fact_cart_events)
VAR SuccessAttempts = CALCULATE(COUNTROWS(fact_cart_events), fact_cart_events[action_status] = "success")
RETURN
    DIVIDE(SuccessAttempts, TotalAttempts, 0)
```

---

#### 3. Checkout Success Rate (Checkout Funnel Health)
Mengukur kelancaran alur pemesanan dari keranjang belanja menuju penerbitan tagihan pembayaran (mengevaluasi kendala ongkos kirim truk dan limit kredit).

##### a. Rumus Matematis:
$$\text{Checkout Success Rate} = \left( \frac{\text{Total Sesi Checkout yang Sukses Submit ke Pembayaran}}{\text{Total Sesi Checkout yang Diinisiasi (Checkout Initiated)}} \right) \times 100\%$$

$$\text{Formula Detail} = \left( \frac{\text{COUNT}(\text{checkout\_id WHERE step\_status} = '\text{completed\_to\_payment}')}{\text{COUNT}(\text{checkout\_id WHERE step\_status} \in ('\text{completed\_to\_payment}', '\text{dropped}', '\text{failed}'))} \right) \times 100\%$$

##### b. Filter & Aturan Pengecualian:
- **Numerator (Sukses):** Buyer menekan tombol *"Lanjut ke Pembayaran"* dan sistem sukses menghasilkan `order_id` / tagihan pembayaran.
- **Denominator (Inisiasi):** Buyer membuka halaman checkout dan memulai kalkulasi ongkir/metode bayar.
- **Root Cause Drop Tracked:** Timeout integrasi API ongkir truk distributor, limit plafon kredit CPD/BNN habis, dan gagal validasi minimum muatan (tonase).

##### c. SLA Target & Aturan Status UI:
- 🟢 **NORMAL:** $\ge 97.0\%$ (Kalkulasi logistik dan plafon kredit berjalan mulus).
- 🟡 **WARNING:** $94.0\% - 96.9\%$ (Toko di perbatasan ring logistik mengalami timeout ongkir).
- 🔴 **CRITICAL:** $< 94.0\%$ (Kegagalan checkout masif akibat API pihak ketiga down).

##### d. DAX Measure (Power BI):
```dax
Checkout_Success_Rate = 
VAR TotalCheckouts = COUNTROWS(fact_checkouts)
VAR CompletedCheckouts = CALCULATE(COUNTROWS(fact_checkouts), fact_checkouts[step_status] = "completed_to_payment")
RETURN
    DIVIDE(CompletedCheckouts, TotalCheckouts, 0)
```

---

#### 4. Payment Success Rate (Payment Settlement Health)
Mengukur efektivitas penyelesaian transaksi keuangan (Virtual Account Bank, QRIS, dan Term of Payment) hingga pesanan sah berstatus *Paid/Settled*.

##### a. Rumus Matematis:
$$\text{Payment Success Rate} = \left( \frac{\text{Total Pesanan Berstatus Lunas (Settled / Paid)}}{\text{Total Transaksi Pembayaran yang Dibuat (Final State)}} \right) \times 100\%$$

$$\text{Formula Detail} = \left( \frac{\text{COUNT}(\text{payment\_id WHERE payment\_status} = '\text{settled}')}{\text{COUNT}(\text{payment\_id WHERE payment\_status} \in ('\text{settled}', '\text{failed}', '\text{expired}'))} \right) \times 100\%$$

##### b. Filter & Aturan Pengecualian:
- **Numerator (Lunas):** Transaksi yang menerima *Payment Notification Webhook* sukses dari Payment Gateway / Core Banking.
- **Denominator:** Seluruh transaksi yang telah mencapai status final (`settled`, `failed`, `expired`).
- **Exclude:** Transaksi yang masih berstatus `pending` di dalam jendela masa aktif pembayaran (grace period 24 jam belum lewat).
- **Exclude:** Akun pengujian internal QA (`is_internal_test = false`).

##### c. SLA Target & Aturan Status UI:
- 🟢 **NORMAL:** $\ge 95.0\%$ (Gateway bank responsif dan settlement tepat waktu).
- 🟡 **WARNING:** $90.0\% - 94.9\%$ (Gangguan intermiten pada salah satu channel VA bank).
- 🔴 **CRITICAL:** $< 90.0\%$ (Downtime payment gateway atau sistem approval TOP macet).

##### d. DAX Measure (Power BI):
```dax
Payment_Success_Rate = 
VAR FinalizedPayments = CALCULATE(
    COUNTROWS(fact_payments), 
    fact_payments[payment_status] IN {"settled", "failed", "expired"}
)
VAR SettledPayments = CALCULATE(
    COUNTROWS(fact_payments), 
    fact_payments[payment_status] = "settled"
)
RETURN
    DIVIDE(SettledPayments, FinalizedPayments, 0)
```

---

#### B. Matriks Spesifikasi Formula Telemetri Lengkap

| Indikator Metrik | Event ID Tracking | Pembilang (Numerator) | Penyebut (Denominator) | Arah Optimasi | Target SLA | Aturan Ambang Batas Evaluasi |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **Zero-Result Search Rate** | `C-01` (`catalog_searched`) | `COUNT(results = 0)` | `COUNT(searches)` | $\downarrow$ *Lower is better* | $\le 3.0\%$ | $\le 3.0\% \rightarrow 🟢$<br>$3.1-6.0\% \rightarrow 🟡$<br>$> 6.0\% \rightarrow 🔴$ |
| **Add to Cart Success Rate** | `CT-02` (`cart_item_added`) | `COUNT(status = 'success')` | `COUNT(cart_attempts)` | $\uparrow$ *Higher is better* | $\ge 90.0\%$ | $\ge 90\% \rightarrow 🟢$<br>$85-89.9\% \rightarrow 🟡$<br>$< 85\% \rightarrow 🔴$ |
| **Checkout Success Rate** | `CO-01` (`checkout_initiated`) | `COUNT(status = 'paid_submit')`| `COUNT(checkouts)` | $\uparrow$ *Higher is better* | $\ge 97.0\%$ | $\ge 97\% \rightarrow 🟢$<br>$94-96.9\% \rightarrow 🟡$<br>$< 94\% \rightarrow 🔴$ |
| **Payment Success Rate** | `P-01` (`payment_settled`) | `COUNT(status = 'settled')` | `COUNT(final_payments)`| $\uparrow$ *Higher is better* | $\ge 95.0\%$ | $\ge 95\% \rightarrow 🟢$<br>$90-94.9\% \rightarrow 🟡$<br>$< 90\% \rightarrow 🔴$ |

---

### 5.7 🚨 "What Needs Attention?" Smart Funnel Anomaly & Attribution Engine

Fitur ini adalah **otak utama** yang membedakan *Control Tower* dari dashboard pasif biasa. Mesin ini secara otomatis mengevaluasi **4 Tahap Siklus Transaksi E-Commerce (Full-Funnel Value Chain)** secara *real-time*:

$$\mathbf{1.\ Search\ (Discovery)} \longrightarrow \mathbf{2.\ Add\ to\ Cart} \longrightarrow \mathbf{3.\ Checkout\ Flow} \longrightarrow \mathbf{4.\ Payment\ Settlement}$$

Setiap kali salah satu dari 4 indikator kesehatan transaksi mengalami penurunan di luar batas toleransi SLA, sistem secara otomatis:
1. **Mendeteksi anomali** (*Trigger Layer*).
2. **Membedah akar penyebab masalah** (*Root Cause Attribution Sub-Query*).
3. **Menghitung estimasi nilai rupiah GMV yang hilang** (*Lost GMV Impact Engine*).
4. **Menyajikan rekomendasi aksi PM** (*Action Dispatcher*).

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                          4-STAGE FUNNEL ANOMALY VALUE CHAIN                              │
│                                                                                          │
│ 1. SEARCH STAGE    ──► Loss = Failed Searches  × CVR(Search → Order)   × AOV             │
│                                           │                                              │
│ 2. CART STAGE      ──► Loss = Failed Cart Adds × CVR(Cart → Order)     × AOV             │
│                                           │                                              │
│ 3. CHECKOUT STAGE  ──► Loss = Dropped Checkouts× CVR(Checkout → Paid)  × AOV             │
│                                           │                                              │
│ 4. PAYMENT STAGE   ──► Loss = Failed Payments  × 100% (Direct 1:1 Loss)× AOV             │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

---

#### A. Logika & Formula Hitungan Detail 4 Modul Funnel Anomali

---

#### 1. Tahap 1: Search & Discovery Anomaly (Zero-Result Search Spike)
- **Fokus Funnel:** Katalog, Pencarian, & Ketersediaan SKU.
- **Severity Level:** 🔴 **CRITICAL** (jika Rate $> 6.0\%$) / 🟡 **WARNING** (jika Rate $3.1\% - 6.0\%$).

##### a. Logika Pemicu (Trigger Condition):
$$\text{Zero-Result Search Rate} > 6.0\% \quad (\text{SLA: } \le 3.0\%) \quad \mathbf{ATAU} \quad \text{Failed Search WoW Spike} \ge +20.0\%$$

##### b. Logika Atribusi Akar Masalah (Attribution Query):
Sistem mencari 3 kata kunci pencarian dengan frekuensi hasil $0$ tertinggi:
```sql
SELECT query_text, COUNT(*) AS failed_count, region_name
FROM fact_searches
WHERE results_count = 0 AND searched_at >= NOW() - INTERVAL '7 DAYS'
GROUP BY query_text, region_name
ORDER BY failed_count DESC LIMIT 3;
```
*Hasil Atribusi:* Menemukan kata kunci `Semen Tiga Roda 50kg (842x)`, `Baja Ringan 0.75 (612x)`, dan `Cat No Drop Grey (410x)` mendominasi kegagalan karena alias sinonim belum terdaftar di CMS katalog.

##### c. Formula Hitungan Estimasi Dampak Finansial (Lost GMV):
$$\mathbf{Lost\ GMV}_{\text{Search}} = \mathbf{Failed\ Searches\ Count} \times \mathbf{CVR}_{\text{Search}\rightarrow\text{Order}} \times \mathbf{AOV}$$
* **Simulasi Nyata:**
  - Total Pencarian Gagal ($N$): $2.340\text{ searches}$
  - $\text{CVR}_{\text{Search}\rightarrow\text{Order}}$: $2.8\%$ (rasio pencarian yang berujung jadi transaksi)
  - $\text{AOV}$: $\text{Rp } 2.820.000$
  $$\mathbf{Lost\ GMV} = 2.340 \times 0.028 \times \text{Rp } 2.820.000 = \mathbf{Rp\ 184.766.400} \approx \mathbf{\sim Rp\ 185.000.000}$$

---

#### 2. Tahap 2: Add to Cart Failure Anomaly (Kegagalan Simpan Keranjang)
- **Fokus Funnel:** Interaksi Keranjang, Validasi MOQ, & Stok Distributor.
- **Severity Level:** 🔴 **CRITICAL** (jika Rate $< 85.0\%$) / 🟡 **WARNING** (jika Rate $85.0\% - 89.9\%$).

##### a. Logika Pemicu (Trigger Condition):
$$\text{Add to Cart Success Rate} < 90.0\% \quad (\text{SLA: } \ge 90.0\%) \quad \mathbf{ATAU} \quad \text{Cart Error WoW} \ge +15.0\%$$

##### b. Logika Atribusi Akar Masalah (Attribution Query):
Sistem membedah jenis error saat tombol *Add to Cart* diklik:
```sql
SELECT error_type, sku_name, distributor_name, COUNT(*) AS error_count
FROM fact_cart_events
WHERE action_status = 'failed' AND created_at >= NOW() - INTERVAL '7 DAYS'
GROUP BY error_type, sku_name, distributor_name
ORDER BY error_count DESC LIMIT 3;
```
*Hasil Atribusi:*
1. **Out-of-Stock (OOS) Silent Block (58%):** Stok semen distributor di sistem habis saat buyer klik Add to Cart.
2. **MOQ Validation Error (31%):** Pembeli memasukkan kuantitas di bawah batas minimal order distributor tanpa notifikasi inline yang jelas.
3. **Cart Microservice Timeout (11%):** Kendala konektivitas database redis session.

##### c. Formula Hitungan Estimasi Dampak Finansial (Lost GMV):
$$\mathbf{Lost\ GMV}_{\text{Cart}} = \mathbf{Failed\ Cart\ Additions} \times \mathbf{CVR}_{\text{Cart}\rightarrow\text{Order}} \times \mathbf{AOV}$$
* **Simulasi Nyata:**
  - Total Klik Cart Gagal ($N$): $1.250\text{ gagal simpan}$
  - $\text{CVR}_{\text{Cart}\rightarrow\text{Order}}$: $32.0\%$ (probabilitas cart berhasil checkout)
  - $\text{AOV}$: $\text{Rp } 2.820.000$
  $$\mathbf{Lost\ GMV} = 1.250 \times 0.32 \times \text{Rp } 2.820.000 = \mathbf{Rp\ 112.800.000}$$

---

#### 3. Tahap 3: Checkout Drop-off Anomaly (Kendala Alamat, Ongkir & Limit Kredit)
- **Fokus Funnel:** Pengisian Alamat Proyek, Freight Rate Truk, & Credit Term.
- **Severity Level:** 🔴 **CRITICAL** (jika Rate $< 94.0\%$) / 🟡 **WARNING** (jika Rate $94.0\% - 96.9\%$).

##### a. Logika Pemicu (Trigger Condition):
$$\text{Checkout Success Rate} < 97.0\% \quad (\text{SLA: } \ge 97.0\%) \quad \mathbf{ATAU} \quad \text{Checkout Drop-off WoW} \ge +10.0\%$$

##### b. Logika Atribusi Akar Masalah (Attribution Query):
Sistem menganalisis titik kegagalan pada form checkout:
```sql
SELECT failure_step, failure_reason, COUNT(*) AS drop_count
FROM fact_checkouts
WHERE step_status = 'dropped' AND created_at >= NOW() - INTERVAL '7 DAYS'
GROUP BY failure_step, failure_reason
ORDER BY drop_count DESC LIMIT 3;
```
*Hasil Atribusi:*
1. **Freight / Logistics API Timeout (62%):** Integrasi armada truk distributor gagal mengembalikan kalkulasi ongkir untuk alamat toko di luar ring 1.
2. **CPD/BNN Credit Term Exceeded (28%):** Plafon limit kredit toko habis sehingga tombol checkout terkunci.
3. **Minimum Delivery Threshold (10%):** Total muatan belum memenuhi syarat muat truk (tonase minimum).

##### c. Formula Hitungan Estimasi Dampak Finansial (Lost GMV):
$$\mathbf{Lost\ GMV}_{\text{Checkout}} = \mathbf{Dropped\ Checkout\ Sessions} \times \mathbf{CVR}_{\text{Checkout}\rightarrow\text{Paid}} \times \mathbf{AOV}$$
* **Simulasi Nyata:**
  - Total Sesi Checkout Drop ($N$): $420\text{ sesi}$
  - $\text{CVR}_{\text{Checkout}\rightarrow\text{Paid}}$: $85.0\%$ (tingkat keberhasilan checkout ke payment)
  - $\text{AOV}$: $\text{Rp } 2.820.000$
  $$\mathbf{Lost\ GMV} = 420 \times 0.85 \times \text{Rp } 2.820.000 = \mathbf{Rp\ 100.674.000} \approx \mathbf{\sim Rp\ 101.000.000}$$

---

#### 4. Tahap 4: Payment Failure Anomaly (Kegagalan Transaksi & Gateway Error)
- **Fokus Funnel:** Virtual Account Bank, QRIS, TOP Settlement.
- **Severity Level:** 🔴 **CRITICAL** (jika Rate $< 90.0\%$) / 🟡 **WARNING** (jika Rate $90.0\% - 94.9\%$).

##### a. Logika Pemicu (Trigger Condition):
$$\text{Payment Success Rate} < 95.0\% \quad (\text{SLA: } \ge 95.0\%) \quad \mathbf{ATAU} \quad \text{Payment Error Spike} \ge +2.0\%$$

##### b. Logika Atribusi Akar Masalah (Attribution Query):
Sistem memecah error log berdasarkan metode pembayaran dan kode error gateway:
```sql
SELECT payment_method, bank_code, error_code, COUNT(*) AS failed_orders
FROM fact_payments
WHERE payment_status = 'failed' AND created_at >= NOW() - INTERVAL '7 DAYS'
GROUP BY payment_method, bank_code, error_code
ORDER BY failed_orders DESC LIMIT 3;
```
*Hasil Atribusi:*
1. **Virtual Account Timeout (BCA/Mandiri VA Gateway Downtime - 65%):** API respon bank partner $> 30\text{s}$.
2. **Expired Payment Window (25%):** Waktu pembayaran 24 jam terlewati tanpa pengingat otomatis ke pembeli.
3. **TOP Approval Incomplete (10%):** Transaksi kredit Term of Payment belum di-approve oleh admin distributor.

##### c. Formula Hitungan Estimasi Dampak Finansial (Lost GMV):
Karena pesanan sudah masuk ke tahap akhir pembayaran, setiap kegagalan pembayaran adalah **kerugian langsung 1:1 ($100\%$ Lost GMV)**:

$$\mathbf{Lost\ GMV}_{\text{Payment}} = \mathbf{Failed\ Payment\ Orders} \times \mathbf{100\%} \times \mathbf{AOV}$$
* **Simulasi Nyata:**
  - Total Order Gagal Bayar ($N$): $85\text{ pesanan}$
  - $\text{AOV}$: $\text{Rp } 2.820.000$
  $$\mathbf{Lost\ GMV} = 85 \times 1.0 \times \text{Rp } 2.820.000 = \mathbf{Rp\ 239.700.000}$$

---

#### B. Ringkasan Matriks Anomaly Engine 4 Tahap Funnel

| Tahap Funnel | Indikator Telemetry | Trigger Batas Alert (🔴/🟡) | Akar Masalah Dominan | Formula Lost GMV |
| :--- | :--- | :---: | :--- | :--- |
| **1. Search** | `Zero-Result Search Rate` | $> 6.0\%$ (🔴) / $3.1-6.0\%$ (🟡) | Kata kunci tidak ada sinonim di katalog | $N_{\text{Search}} \times 2.8\% \times \text{AOV}$ |
| **2. Cart** | `Add to Cart Success Rate` | $< 85\%$ (🔴) / $85-89.9\%$ (🟡) | Out-of-Stock & Aturan MOQ distributor | $N_{\text{Cart}} \times 32\% \times \text{AOV}$ |
| **3. Checkout** | `Checkout Success Rate` | $< 94\%$ (🔴) / $94-96.9\%$ (🟡) | Timeout API Ongkir Truk & Plafon Kredit | $N_{\text{Checkout}} \times 85\% \times \text{AOV}$ |
| **4. Payment** | `Payment Success Rate` | $< 90\%$ (🔴) / $90-94.9\%$ (🟡) | Downtime Gateway VA Bank & Expired Order | $N_{\text{Payment}} \times 100\% \times \text{AOV}$ |

---

#### C. Aturan Prioritas & Siklus Hidup Anomaly Card di Tampilan UI

1. **Ranking Prioritas (Sorting Hierarchy):**
   - **Tingkat 1 — Severity:** `🔴 Critical` selalu ditempatkan paling atas, diikuti oleh `🟡 Warning`, lalu `🔵 Opportunity / Info`.
   - **Tingkat 2 — Estimasi Dampak Finansial:** Jika ada 2 alert dengan severity sama, kartu dengan **Lost GMV terbesar** akan tampil lebih dulu.
2. **Kapasitas Maksimal Tampilan:** Menampilkan maksimal **Top 3 Anomaly Cards** secara bersamaan untuk mencegah *information overload*.
3. **Interactive Action CTA Routing:**
   - Tombol primer (kiri): Membuka modul investigasi / filter terfokus (misal: membuka query search error atau membuka funnel aktivasi).
   - Tombol sekunder (kanan): Memicu workflow resolusi (misal: mengirim tiket alias CMS ke tim katalog atau meluncurkan kampanye broadcast push notification).

---

## 6. Metric Polarity, Direction, & Dynamic Threshold Engine

| Metric Name | Unit | Directional Polarity | Target Baseline | Warning Threshold (🟡) | Critical Threshold (🔴) | UI Status Rule |
|---|---|---|---|---|---|---|
| **Gross Merchandise Value (GMV)** | Rp (IDR) | **Higher is Better ($\uparrow$)** | Target Bulanan | Turun $> 5\%$ vs Target | Turun $> 10\%$ vs Target | $\ge 0\% \rightarrow 🟢$<br>$-5\% \text{ to } -10\% \rightarrow 🟡$<br>$< -10\% \rightarrow 🔴$ |
| **New Verified Toko (CPD/BNN)**| Count | **Higher is Better ($\uparrow$)** | Target Mingguan | Turun $> 10\%$ WoW | Turun $> 20\%$ WoW | $\ge 0\% \rightarrow 🟢$<br>$-10\% \text{ to } -20\% \rightarrow 🟡$<br>$< -20\% \rightarrow 🔴$ |
| **D-7 Activation Rate** | Percentage | **Higher is Better ($\uparrow$)** | $\ge 40.0\%$ | $< 40.0\%$ (atau drop $> 5\%$ WoW) | $< 36.0\%$ (atau drop $> 10\%$ WoW) | $\ge 40\% \rightarrow 🟢$<br>$36.0-39.9\% \rightarrow 🟡$<br>$< 36.0\% \rightarrow 🔴$ |
| **M1 Retention Rate** | Percentage | **Higher is Better ($\uparrow$)** | $\ge 45.0\%$ | $< 45.0\%$ (atau drop $> 5\%$ MoM) | $< 40.0\%$ (atau drop $> 10\%$ MoM) | $\ge 45\% \rightarrow 🟢$<br>$40.0-44.9\% \rightarrow 🟡$<br>$< 40.0\% \rightarrow 🔴$ |
| **Average Order Value (AOV)** | Rp (IDR) | **Higher is Better ($\uparrow$)** | $\ge \text{Rp } 2.7\text{M}$ | Turun $> 5\%$ MoM | Turun $> 10\%$ MoM | $\ge \text{Rp } 2.7\text{M} \rightarrow 🟢$<br>$-5\% \text{ to } -10\% \rightarrow 🟡$<br>$< -10\% \rightarrow 🔴$ |
| **Zero-Result Search Rate** | Percentage | **Lower is Better ($\downarrow$)** | $\le 3.0\%$ | $3.1\% - 6.0\%$ | $> 6.0\%$ | $\le 3.0\% \rightarrow 🟢$<br>$3.1-6.0\% \rightarrow 🟡$<br>$> 6.0\% \rightarrow 🔴$ |
| **Add to Cart Success Rate** | Percentage | **Higher is Better ($\uparrow$)** | $\ge 90.0\%$ | $85.0\% - 89.9\%$ | $< 85.0\%$ | $\ge 90\% \rightarrow 🟢$<br>$85-89.9\% \rightarrow 🟡$<br>$< 85\% \rightarrow 🔴$ |
| **Checkout Success Rate** | Percentage | **Higher is Better ($\uparrow$)** | $\ge 97.0\%$ | $94.0\% - 96.9\%$ | $< 94.0\%$ | $\ge 97\% \rightarrow 🟢$<br>$94-96.9\% \rightarrow 🟡$<br>$< 94\% \rightarrow 🔴$ |
| **Payment Success Rate** | Percentage | **Higher is Better ($\uparrow$)** | $\ge 95.0\%$ | $90.0\% - 94.9\%$ | $< 90.0\%$ | $\ge 95\% \rightarrow 🟢$<br>$90-94.9\% \rightarrow 🟡$<br>$< 90\% \rightarrow 🔴$ |

---

## 7. Interaction & Drill-Down Routing Matrix

```
                          ┌────────────────────────┐
                          │    PRODUCT OVERVIEW    │
                          │   EXECUTIVE SUMMARY    │
                          └───────────┬────────────┘
                                      │
     ┌──────────────────┬─────────────┼───────────────┬──────────────────┐
     ▼                  ▼             ▼               ▼                  ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  PAGE 1      │ │  PAGE 2      │ │  PAGE 3      │ │  PAGE 4      │ │  PAGE 5      │
│  Revenue &   │ │   Growth &   │ │  Activation  │ │  Retention & │ │   Product    │
│    Orders    │ │   Akuisisi   │ │    Funnel    │ │   Cohorts    │ │ Health & UX  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

| Elemen UI di Control Tower | Aksi Interaksi | Parameter yang Diteruskan | Target Halaman Deep Dive |
|---|---|---|---|
| **Hero GMV Card** | Klik tombol drill-down `↗` | `date_range`, `region`, `supplier_id`, `selling_agent_id` | **Revenue & Orders** |
| **KPI Acquisition Card** | Klik kartu "New Verified Toko" | `cohort_week`, `region`, `kyc_channel` | **Growth & Akuisisi** |
| **KPI Activation Card** | Klik kartu "D-7 Activation Rate" | `registration_cohort`, `kyc_channel` | **Activation Funnel** |
| **KPI Retention Card** | Klik kartu "M1 Retention Rate" | `buyer_cohort_month`, `retailer_tier` | **Retention & Cohorts** |
| **GMV Trend Line Point** | Hover / Klik titik tanggal $T$ | `selected_date = T` | **Daily Breakdown Inspector** |
| **GMV Driver Impact Row** | Klik baris driver | `driver_id` | **Driver Diagnosis Modal** |
| **Zero-Search Anomaly Card** | Klik tombol *"Investigate Queries"* | `filter_status = zero_results` | **Search Performance Deep Dive** |

---

## 8. Data Lineage & Mapping Database Warehouse

```
  RAW APPLICATION DB               DATA PIPELINE                DATA WAREHOUSE / POWER BI
┌──────────────────────┐        ┌──────────────────┐         ┌───────────────────────────────┐
│ • orders             │        │                  │         │ • fact_orders                 │
│ • order_items        │  ───►  │ Airbyte / Fivetran│  ───►   │ • dim_users (Retailer/Distrib)│
│ • users & kyc_records│        │ + dbt Transform  │         │ • fact_app_events (Tracking)  │
│ • payment_transactions│       │                  │         │ • agg_daily_product_health    │
│ • search_logs        │        │                  │         │ • agg_gmv_drivers_snapshot    │
└──────────────────────┘        └──────────────────┘         └───────────────────────────────┘
```

| Komponen Dashboard | Sumber Tabel / Model dbt | Key Fields yang Digunakan | Event ID Tracking Plan |
|---|---|---|---|
| **GMV, Orders, AOV** | `analytics.fact_orders` | `order_id`, `gross_amount`, `net_amount`, `order_status`, `order_submitted_at` | `order_submitted` (OR-08) |
| **Acquisition (Verified Toko)**| `analytics.dim_users` | `user_id`, `idtokocpd`, `kyc_status`, `approved_by` (CPD/BNN), `account_approved_at`, `registered_by` | `onboarding_account_approved` (O-08) |
| **D-7 Activation** | `analytics.mart_user_activation` | `user_id`, `account_approved_at`, `first_order_at`, `days_to_first_order` | O-08 $\rightarrow$ OR-08 |
| **M1 Retention** | `analytics.mart_buyer_retention` | `buyer_id`, `cohort_month`, `order_month`, `is_retained` | `fact_orders` |
| **Health: Zero-Result Search**| `analytics.fact_searches` | `search_id`, `query_text`, `results_count`, `searched_at`, `user_id` | `catalog_searched` (C-01) |
| **Health: Add to Cart** | `analytics.fact_cart_events`| `cart_id`, `user_id`, `sku_id`, `action_status`, `timestamp` | `cart_item_added` (CT-02) |
| **Health: Checkout Success** | `analytics.fact_checkouts`  | `checkout_id`, `user_id`, `step_status`, `timestamp` | `checkout_initiated` (CO-01) |
| **Health: Payment Success** | `analytics.fact_payments`   | `payment_id`, `order_id`, `payment_status`, `error_code`, `gateway_name` | `payment_settled` (P-01) |

---

*Dokumen ini merupakan standar spesifikasi arsitektur resmi Product Overview Mitra1000s versi 2.0 yang telah disinkronkan 100% dengan implementasi Prototype Control Tower.*
