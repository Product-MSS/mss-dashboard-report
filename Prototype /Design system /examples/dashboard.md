# 🖥️ Examples — Mitra1000s Dashboard Master Specifications

> Spesifikasi implementasi layar penuh Dashboard Mitra1000s:
> 1. **Screen 1 (Master Golden Standard):** Product Overview Control Tower (Executive & PM View)
> 2. **Screen 2:** Operations & Sales Portal Dashboard (Admetrics Style)

---

## 1. Screen 1: Product Overview Control Tower (Golden Standard)

Layar kendali utama untuk Executive dan Product Manager guna memantau GMV, 4 Core Funnel KPI Drivers, tren dinamis, matriks dekomposisi, dan deteksi anomali.

### 1.1 ASCII Wireframe & Component Layout

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [🟣 Mitra1000s Control Tower] ｜ [Search SKUs, agents, stores...] ｜ [🌙 Dark] [🔔 Alerts (2)] [👤 Product Lead] │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 📋 GLOBAL FILTER BAR                                                                                             │
│ [🗓️ 01/01/2026 - 08/31/2026 ▾]  [📍 Region: All (CPD/BNN Top) ▾]  [🏭 Supplier: All ▾]  [🏪 Agent: All ▾] [🔄 Reset]│
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                                  │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ NORTH STAR METRIC                                                                                         ↗  │ │
│ │ Total Gross Merchandise Value (GMV)                                                                          │ │
│ │                                                                                                              │ │
│ │ Rp 12.48 Billion   ▲ +8.2% (+Rp 946.5 M)  vs May 2025 - Dec 2025                                             │ │
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

### 1.2 Component Token Mapping Table (Control Tower)

| Section Visual | Komponen / Widget | Token Warna Utama | Token Tipografi | Spacing & Radius |
|---|---|---|---|---|
| **Global Filter Bar** | Filter Container | `--surface` (`#FFFFFF`), Border `--border` | 13px Inter Medium | Radius `16px`, Padding `16px 20px` |
| **Date Range Input** | Single Compact Trigger | Border `--border`, Icon `--text-muted` | 13px Monospace | Radius `8px`, Padding `8px 12px` |
| **North Star Card** | Hero Master Metric | Background `--surface`, Border `--border` | 40px JetBrains Mono Bold (GMV) | Radius `16px`, Padding `24px` |
| **Micro-KPI Labels** | Quality Decomposition | Icon `--text-muted`, Text `--text-muted` | 12px Inter (Vertically Centered) | Gap `6px`, Line Height `1.2` |
| **Unified KPI Card** | 4-Column Driver Container | Background `--surface`, Border `--border` | 18px Inter SemiBold (Section Title)| Radius `16px`, Padding `24px` |
| **KPI Column Sub-Card**| Interactive Funnel Column| Background `--surface-2`, Border `--border-light`| 24px JetBrains Mono Bold (Value)| Radius `12px`, Padding `16px` |
| **Delta Badge** | Status Pill Badge | Success `--success-bg` / Warning `--warning-bg` | 12px Inter SemiBold (Delta Only) | Radius `9999px`, Padding `4px 8px` |
| **GMV Spline Chart** | Dynamic Curve & Area | Line `--primary-500`, Fill Gradient Purple | 11px Inter (Axes), Monospace Tooltip| Radius `16px`, Padding `24px` |
| **Impact Matrix** | Factor Decomposition Table| Table Header `--surface-2`, Text `--text` | 13px Inter Regular / Monospace | Radius `16px`, Padding `20px` |
| **Health Telemetry** | SLA Telemetry Table | Status Chips `--danger` / `--success` | 13px Inter / 13px Monospace SLA | Radius `16px`, Padding `20px` |
| **Anomaly Section** | Proactive Alert Cards | Critical `--danger-bg`, Warning `--warning-bg` | 14px Inter SemiBold, Lost GMV Mono| Radius `16px`, Gap `12px` |

---

## 2. Screen 2: Operations & Sales Portal Dashboard (Admetrics Style)

Layar operasional untuk distributor dan admin toko bangunan dalam memantau aktivitas harian, jadwal jatuh tempo, dan order calls.

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [🟣 Logo Mitra1000s] │ 🔍 [Cari toko, faktur, SKU material...]               │ 🌙  🔔 (3)  👤 Annette Black [▾] │
├──────────────────────┬───────────────────────────────────────────────────────────────────────────────────────────┤
│                      │ Welcome back Mike 👋                                                                      │
│ [🏠 Dashboard (Act)] │                                                                                           │
│ [📊 Statistics]      │ ┌───────────────────────────┐ ┌───────────────────────────┐ ┌───────────────────────────┐ │
│ [⚙️ Services]        │ │ [👤] Total Active Stores  │ │ [💰] Total Sales (GMV)    │ │ Product Statistic       ⋮ │ │
│ [📋 Task list]       │ │      In this month        │ │      In this month        │ │                         │ │
│ [🔔 Notification]    │ │                           │ │                           │ │     ( Concentric )      │ │
│                      │ │ Rp 354.000.000  [↗ +25.5%]│ │ Rp 4.240.000.000[↗ +15.5%]│ │     ( Donut Ring )      │ │
│ ──────────────────── │ └───────────────────────────┘ └───────────────────────────┘ │        [ 89.98% ]       │ │
│ 📞 Order Calls [ O ] │                                                             │                           │ │
│                      │ ┌─────────────────────────────────────────────────────────┐ │ 🟣 Bahan Utama    Rp 332M │ │
│ 🚪 Log out           │ │ Sales report                     [Week] [Month] [Year*] │ │ 🟠 Cat & Pelapis  Rp 682M │ │
│                      │ │ 100 ─                                                   │ │ 🔵 Lainnya        Rp 482M │ │
│                      │ │  80 ─              [ Rp 3.540.000.000 ]                 │ └───────────────────────────┘ │
│                      │ │  60 ─  /\    /\        ●       /\                       │                               │
│                      │ │  40 ─ /  \  /  \  /\  / \     /  \   /\                 │ ┌───────────────────────────┐ │
│                      │ │  20 ─/    \/    \/  \/   \   /    \_/  \                │ │ Upcoming Transactions   ⋮ │ │
│                      │ │   0 ────────────────────────────────────                │ │ Hari ini:                 │ │
│ 👤 Annette Black     │ │      Jan  Feb  Mar  Apr  May  Jun  Jul                  │ │ 🔴 PLN Tagihan    -Rp 1,2J│ │
│    anblack@gmail.com │ │      (Smooth Purple Line + Soft Gradient Fill)          │ │ Besok:                    │ │
│                      │ └─────────────────────────────────────────────────────────┘ │ 🟢 TB Maju Jaya   +Rp 52M │ │
│                      │                                                             │ 🟢 TB Sumber Air  +Rp 82M │ │
│                      │ ┌───────────────────────────┐ ┌───────────────────────────┐ └───────────────────────────┘ │
│                      │ │ Jadwal Jatuh Tempo        │ │ Aktivitas Sales Lapangan  │                               │
│                      │ │ Desember 2026          [▾]│ │ Hari Ini                  │                               │
│                      │ │ [01] [02] [03] [04] [05]  │ │ 👤 Budi Santoso           │                               │
│                      │ │ [07] [08] [09*][10] [11]  │ │    TB Sinar Abadi (10:00) │                               │
│                      │ └───────────────────────────┘ └───────────────────────────┘                               │
└──────────────────────┴───────────────────────────────────────────────────────────────────────────────────────────┘
```

