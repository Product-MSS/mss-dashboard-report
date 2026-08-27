# 📈 Patterns — Dashboard & Analytics Widgets

> Spesifikasi Pola Layout Dashboard, KPI Metric Cards, Line Chart dengan Gradient Area, dan Concentric Ring Donut Chart.

---

## 1. Dashboard Layout Structure (Admetrics Style)

Dashboard Mitra1000s mengadopsi struktur modular 2-Zone Grid:

```
┌────────────────────────────────────────────────────────────┐
│ Greeting: "Welcome back Mike 👋"                           │
├──────────────────────────────┬─────────────────────────────┤
│ ┌──────────────────────────┐ │ ┌─────────────────────────┐ │
│ │ KPI 1: Total Active Store│ │ │ KPI 3: Product Breakdown│ │
│ │ 1,248 Toko   [↗ +25.5%]  │ │ │ (Donut Ring Chart)      │ │
│ ├──────────────────────────┤ │ │                         │ │
│ │ KPI 2: Total Sales (GMV) │ │ │ 🟣 Bahan Bangunan Utama │ │
│ │ Rp 4.240.000.000 [+15.5%]│ │ │ 🟠 Cat & Pelapis        │ │
│ └──────────────────────────┘ │ │ 🔵 Semen & Perekat      │ │
├──────────────────────────────┤ └─────────────────────────┘ │
│ ┌──────────────────────────┐ │ ┌─────────────────────────┐ │
│ │ Sales Report Line Chart  │ │ │ Upcoming Transactions   │ │
│ │ [Week] [Month] [Year]    │ │ │ 🔴 Bayar Listrik: -$120 │ │
│ │                          │ │ │ 🟢 Transfer Toko: +$520 │ │
│ │ (Smooth Curve + Gradient)│ │ │ 🔴 Jatuh Tempo TB Maju  │ │
│ └──────────────────────────┘ │ └─────────────────────────┘ │
└──────────────────────────────┴─────────────────────────────┘
```

---

## 2. KPI Metric Card Specification

- **Container:** Background `--surface` (`#FFFFFF`), Border `1px solid var(--border)`, Radius `16px`, Padding `20px`.
- **Top Row:**
  - Icon container: Box `36x36px`, Background `--primary-100`, Icon color `--primary-600`.
  - Title: `14px Regular` `--text-muted` (*"Total Sales"*).
  - Sub-label: `12px Regular` `--text-light` (*"In this month"*).
  - Context menu: Three dots icon `⋮` di kanan atas.
- **Bottom Row:**
  - Main Value: `24px Bold` `--text` (`Rp 4.240.000.000` atau `$4,240`).
  - Delta Badge (Kanan): Pill badge `background: --primary-100; color: --primary-700; border: 1px solid var(--primary-200); padding: 4px 8px; border-radius: 9999px;` berisi `↗ +15.5%`.

---

## 3. Sales Report Line Chart Specification

- **Header Widget:**
  - Judul Kiri: `H2` 18px SemiBold (*"Sales report"*).
  - Kontrol Kanan: Segmented switch `[Week] [Month] [Year]`.
- **Chart Visuals:**
  - Line stroke: `2.5px` `--primary-500` (`#6C5CE7`), tension smooth curve `0.35`.
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
