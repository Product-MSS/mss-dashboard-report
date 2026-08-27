# 📈 Patterns — Dashboard & Analytics Widgets

> Spesifikasi Pola Layout Dashboard, Control Tower Architecture, KPI Metric Cards, Dynamic Spline Trend Charts, Global Filter Bar, dan Executive Widget Matrices.
> **Standard Acuan:** Halaman *Product Overview Control Tower* (`src/features/productOverview`).

---

## 1. Executive Control Tower Architecture (Mitra1000s Master Standard)

Control Tower dirancang khusus untuk level Executive, C-Level, dan Product Manager guna memonitor kesehatan produk, dekomposisi GMV, dan anomali sistem secara instan dalam 2 viewport (Above the Fold & Below the Fold).

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL FILTER BAR: [🗓️ Date Range (YTD/MTD/Custom ▾)] [📍 Region ▾] [🏭 Supplier ▾] [🏪 Selling Agent ▾] [🔄 Reset]│
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ NORTH STAR METRIC                                                                                         ↗  │ │
│ │ Total Gross Merchandise Value (GMV)                                                                          │ │
│ │ Rp 12.48 Billion   ▲ +8.2% (+Rp 946.5 M) vs May 2025 - Dec 2025                                              │ │
│ │ ──────────────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ 📦 Valid Orders     💵 Average Order Value     🏪 Active Buyers          ⏰ Order Frequency                  │ │
│ │ 4,420 (+3.8%)       Rp 2.82 M (+4.2%)          1,850 Stores (+2.1%)      2.39x / buyer                       │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ CORE DRIVER METRICS                                                                                          │ │
│ │ Key Performance Indicators                                                                                   │ │
│ │ * Funnel metrics are scoped by Date & Region only; Supplier & Selling Agent filters do not apply             │ │
│ │ ──────────────────────────────────────────────────────────────────────────────────────────────────────────── │ │
│ │ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐                          │ │
│ │ │ 📈 ACQUISITION   │ │ ⚡ ACTIVATION    │ │ 🔄 RETENTION     │ │ 💰 REVENUE       │                          │ │
│ │ │ New Verified St. │ │ D-7 Activation   │ │ M1 Retention     │ │ Average Order Val│                          │ │
│ │ │ 2,430 ▲+12.4%    │ │ 36.4%  ▼-5.4%    │ │ 42.8%  ▼-3.2%    │ │ Rp 2.82M ▲+4.2%  │                          │ │
│ │ │ vs May 25-Dec 25 │ │ vs May 25-Dec 25 │ │ vs May 25-Dec 25 │ │ vs May 25-Dec 25 │                          │ │
│ │ │ Target: 2,200    │ │ Target: 40.0%    │ │ Target: 45.0%    │ │ Target: Rp 2.70M │                          │ │
│ │ └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘                          │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 8-Month GMV Trend (Jan 2026 - Aug 2026)      ━ Current Period (Jan-Aug '26)  ╌ Prior Period (May-Dec '25)    │ │
│ │ Peak: Rp 1.78B (Aug '26) • Average: Rp 1.62B/month                                                           │ │
│ │ Rp 1.7B ┤                                                          ╭────────╮  (Aug '26: Promo Beacon)       │ │
│ │ Rp 1.1B ┤                                               ╭──────────╯        ╰──────────────╮                 │ │
│ │ Rp 0.5B ┤                               ╭───────────────╯                                  ╰────────         │ │
│ │ Rp 0.0B └───────────────────────────────╯─────────────────────────────────────────────────────────────────── │ │
│ │             Jan '26        Feb '26        Mar '26        Apr '26        May '26        Jun '26        Aug '26│ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────┐ ┌─────────────────────────────────────────────────────────────┐ │
│ │ GMV Driver Impact Matrix  ▲ +8.2% (+Rp 946M) │ │ Product Health Telemetry                                    │ │
│ │ GMV Growth Drivers & Waterfall Decomposition │ │ Early Warning Indicators for System Stability & UX          │ │
│ │ ──────────────────────────────────────────── │ │ ─────────────────────────────────────────────────────────── │ │
│ │ Basket Size (AOV)     Rp 2.82 M    ▲ +4.2%   │ │ 🔴 CRITICAL  Zero-Result Search Rate   8.70% (SLA ≤ 3.0%)   │ │
│ │ Active Buyers Volume  1,850 Stores ▲ +2.1%   │ │ 🟢 NORMAL    Add to Cart Success Rate  94.2% (SLA ≥ 90.0%)  │ │
│ │ Order Frequency       2.39x/period ▲ +1.8%   │ │ 🟢 NORMAL    Checkout Success Rate     98.1% (SLA ≥ 97.0%)  │ │
│ └──────────────────────────────────────────────┘ └─────────────────────────────────────────────────────────────┘ │
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚠️ WHAT NEEDS ATTENTION? (Automated Anomaly Detection & Impact Evaluation)                                   │ │
│ │ 🔴 [CRITICAL] Zero-Result Search Anomaly: 8.70% (Est. Lost GMV: -Rp 420.0 M)        [Investigate Funnel ↗]   │ │
│ │ 🟡 [WARNING]  D-7 Toko Baru Drop 5.4% di Jawa Barat                                  [Review Onboarding ↗]   │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Specifications

### 2.1 Unified Global Filter Bar
- **Container:** Background `--surface` (`#FFFFFF`), Border `1px solid var(--border)`, Radius `var(--radius-xl)`, Padding `16px 20px`.
- **Date Range Field (Single Compact Input with Popover Modal):**
  - Display format: `01/01/2026 - 08/31/2026` (atau `08/01/2026 - 08/31/2026`).
  - Modal Presets: `Year-to-Date (This Year)` dan `Month-to-Date (This Month)`.
  - Custom Selectors: Dropdown Start Month & Year + Dropdown End Month & Year (maksimal rentang 2 tahun).
- **Dimension Dropdowns:**
  - `Region`: Area CPD dan Area BNN selalu diposisikan pada urutan paling atas (Top 1 & 2), diikuti provinsi lainnya.
  - `Supplier`: Pilihan supplier semen/baja/material.
  - `Selling Agent`: Pilihan agen distributor penjualan.
- **Reset Button:** Sejajar rapi di sebelah kanan filter bar dengan icon `🔄 Reset Filters`.

---

### 2.2 Hero North Star Metric Card
- **Container:** Background `--surface`, Border `1px solid var(--border)`, Radius `var(--radius-xl)`, Padding `var(--space-xl)` (`24px`).
- **Header:**
  - Micro Tag: `NORTH STAR METRIC` (Purple uppercase bold, `var(--text-micro)`, `var(--primary-700)`).
  - Main Title: `Total Gross Merchandise Value (GMV)` (H2 bold, `var(--text)`).
  - Drill-down Button (Kanan): Kotak `32x32px` dengan icon `↗` (`Icons8 arrow-up-right`).
- **Hero Main Stat Row:**
  - Nilai Nominal Utama: Font Monospace `JetBrains Mono`, `40px` Bold (`Rp 12.48 Billion`).
  - Delta Badge Pill: `▲ +8.2% (+Rp 946.5 M)` berlatar hijau `--success-bg`.
  - Context Label: `vs May 2025 - Dec 2025` (dihitung dinamis dari periode pembanding).
- **Quality Decomposition Breakdown (4 Micro-KPIs):**
  - Dipisahkan garis horizontal `border-top: 1px solid var(--border-light)`.
  - Grid 4 kolom berisi: `Valid Orders`, `Average Order Value`, `Active Buyers`, `Order Frequency`.
  - Label dan Icon Icons8 dibuat **rata tengah vertikal (*vertically centered*)** menggunakan `display: inline-flex; align-items: center; gap: 6px; line-height: 1.2;`.

---

### 2.3 Unified KPI Drivers Container Card
- **Single Container Design:** Membungkus seluruh funnel driver dalam 1 kartu besar terpadu (*North Star visual harmony*).
- **Header:**
  - Tag: `CORE DRIVER METRICS` (Purple uppercase bold).
  - Title: `Key Performance Indicators` (H2 bold).
  - Scope Note: `* Funnel metrics are scoped by Date & Region only; Supplier & Selling Agent filters do not apply`.
- **4 Interactive Metric Columns:**
  - 1. **Acquisition:** `New Verified Stores` (Nilai nominal + Delta Badge + Periode Pembanding Dinamis + Target Gap).
  - 2. **Activation:** `D-7 Activation Rate` (Persentase + Delta Badge + Target Gap).
  - 3. **Retention:** `M1 Retention Rate` (Persentase + Delta Badge + Target Gap).
  - 4. **Revenue:** `Average Order Value (AOV)` (Nominal IDR + Delta Badge + Target Gap).
  - **Interaksi:** Setiap kolom memiliki subtle background hover tint (`--surface-2`) dan dapat diklik secara independen untuk memicu modal investigasi drill-down.

---

### 2.4 Dynamic GMV Dual-Line Spline Chart
- **Timeline Granularity Adaptif:**
  - **1 Bulan:** Menampilkan kurva harian 30/31 hari (`Aug 1`, `Aug 5`, `Aug 10`, dst.).
  - **2–24 Bulan:** Menampilkan kurva agregasi bulanan (`Jan '26`, `Feb '26`, `Mar '26`, dst.).
- **Kurva Spline:** Menggunakan Catmull-Rom to Cubic Bezier curve dengan koordinat titik akhir presisi (`p2.x, p2.y`) tanpa distorsi gelombang.
- **Gradient Fill:** Area di bawah kurva diisi linear gradient ungu lembut (`rgba(108, 92, 231, 0.22)` ke `0.00`).
- **Interactive Scrubber:** Tooltip melayang saat cursor digerakkan di atas grafik yang menampilkan GMV periode berjalan, periode pembanding, valid orders, AOV, dan active buyers.
- **Promo Spike Beacon:** Titik oranye beranimasi radar pulsasi yang menandai puncak promo musiman atau anomali kenaikan signifikan.

---

### 2.5 Executive Structured Widget Matrices
- **GMV Driver Impact Matrix:** Dekomposisi faktor waterfall pertumbuhan GMV (Basket Size, Volume Pembeli, Frekuensi Order). Header dan teks dibuat rata kiri (*flush left*) rapi.
- **Product Health Telemetry:** Indikator stabilitas sistem dan UX funnel (Zero-Result Search Rate, Add to Cart Success, Checkout Success, Payment Success) lengkap dengan badge status (`CRITICAL`, `NORMAL`) dan target SLA.

---

### 2.6 Proactive Anomaly Detection Alerts (What Needs Attention?)
- **Severity Classification:**
  - `🔴 Critical`: Dampak kerugian GMV tinggi (misal: Zero-Result Search spike, Payment Gateway timeout).
  - `🟡 Warning`: Penurunan laju pertumbuhan di regional tertentu (misal: Drop aktivasi di Jawa Barat).
- **Struktur Kartu Alert:**
  - Header: Severity Badge + Judul Anomali + Estimated Lost GMV.
  - Body: Deskripsi akar masalah (*Root Cause Diagnosis*) + breakdown faktor penyebab.
  - Action CTA: Tombol direct drill-down untuk membuka alur investigasi spesifik.
5`.
  - Area Fill: Linear gradient vertikal dari `rgba(108, 92, 231, 0.20)` di puncak memudar ke `rgba(108, 92, 231, 0.00)` di baseline sumbu X.
  - Sumbu X: Label bulan (*"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"*).
  - Sumbu Y: Skala nilai (*"0", "20", "40", "60", "80", "100"*).
  - Active Data Tooltip: Floating callout pill di atas titik aktif: `background: #6C5CE7; color: white; padding: 4px 8px; border-radius: 6px; font-weight: 600; font-size: 12px;` menampilkan `$3,540` / `Rp 35.400.000`.

---

## 4. Product Statistic (Concentric Ring Chart)

- **Chart Visual:** Donut bertingkat (concentric ring) 3 lapisan:
  - Ring Luar (Ungu `--primary-500`): Kategori mayoritas.
  - Ring Tengah (Orange `--accent-orange` `#F97316`): Kategori sekunder.
  - Ring Dalam (Biru Muda `--accent-blue` `#38BDF8`): Kategori lainnya.
- **Center Highlight:** Persentase dominasi `89.98%` (Bold Display font).
- **Legend List:**
  - Baris 1: 🟣 Shopping / Bahan Utama — Nilai monospaced di kanan.
  - Baris 2: 🟠 Services / Cat & Pelapis — Nilai monospaced di kanan.
  - Baris 3: 🔵 Others / Logistik — Nilai monospaced di kanan.
