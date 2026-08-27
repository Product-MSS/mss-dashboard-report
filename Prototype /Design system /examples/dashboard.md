# 🖥️ Examples — Mitra1000s Full Dashboard Screen Specification

> Spesifikasi implementasi layar penuh Dashboard Mitra1000s mengacu pada visual benchmark Admetrics Purple (`image.png`).

---

## 1. ASCII Wireframe & Component Layout

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

---

## 2. Component Token Mapping Table

| Section Visual | Komponen / Widget | Token Warna Utama | Token Tipografi | Spacing & Radius |
|---|---|---|---|---|
| **Left Sidebar** | Sidebar Container | `--surface` (`#FFFFFF`), Border `--border` | 14px Inter Medium | Lebar `260px`, Padding `16px` |
| **Active Nav Item** | Item `[Dashboard]` | Background `--primary-500`, Text `#FFFFFF` | 14px Inter Medium | Radius `10px`, Padding `12px 16px` |
| **Top Header** | Sticky Header Bar | Background `--surface`, Border `--border` | 20px Inter SemiBold (Greeting) | Tinggi `70px`, Padding `0 24px` |
| **KPI Card 1 & 2** | Metric Card Box | Background `--surface`, Delta `--primary-100` | 24px Inter Bold (Value) | Radius `16px`, Padding `20px` |
| **Main Chart** | Sales Report Area | Line `--primary-500`, Fill Gradient Purple | 12px Inter (Labels), Monospace | Min Height `340px`, Radius `16px` |
| **Segmented Switch** | `[Week] [Month] [Year]`| Active `--primary-500`, Track `--surface-2` | 12px Inter Medium | Radius `10px`, Inner `8px` |
| **Donut Ring** | Concentric Category Ring | Outer `#6C5CE7`, Middle `#F97316`, Inner `#38BDF8` | 32px Display Bold (89.98%) | Radius `16px`, Padding `20px` |
| **Transaction List** | Upcoming Due Date | Success `--success` (`+`), Danger `--danger` (`-`)| 14px Monospace (Nominal) | Radius `16px`, Divider `1px` |

---

## 3. Implementasi State Kosong (Empty State) Layar Dashboard

Jika akun retailer/distributor baru pertama kali login:
- Kartu KPI menampilkan nilai `Rp 0` dengan delta badge netral `0.0%`.
- Area chart menampilkan grafik flat horizontal dengan watermark ilustrasi dan tombol CTA *"Mulai Transaksi Pertama"*.
- Panel Upcoming Transactions menampilkan pesan *"Semua tagihan lunas! Tidak ada pembayaran yang jatuh tempo minggu ini."*
