# 📐 Design Tokens — Spacing & Layout Grid

> Sistem Spacing 8px Grid Framework untuk keselarasan margin, padding, dan struktur grid Mitra1000s.

---

## 1. Spacing Scale

Semua ukuran margin, padding, dan gap dihitung berbasis kelipatan **8px** (dengan 2px / 4px untuk penyesuaian mikro):

```css
:root {
  --space-3xs: 2px;   /* Micro border adjustment */
  --space-2xs: 4px;   /* Micro gap antar ikon dan teks badge */
  --space-xs:  8px;   /* Gap label ke input, list item gap kecil */
  --space-sm:  12px;  /* Padding button compact, menu gap */
  --space-md:  16px;  /* Standard field gap, card inner padding compact */
  --space-lg:  20px;  /* Card padding standard (Admetrics style) */
  --space-xl:  24px;  /* Grid gutter antar kartu, padding modal dialog */
  --space-2xl: 32px;  /* Jarak antar section besar */
  --space-3xl: 48px;  /* Page top/bottom outer padding */
}
```

---

## 2. Component Layout Dimensions

| Area / Komponen | Dimensi Standar | Keterangan |
|---|---|---|
| **Left Sidebar (Desktop)** | `260px` | Fixed / Sticky width |
| **Left Sidebar (Tablet Collapse)** | `72px` | Icon-only collapsed state |
| **Top Header Height** | `70px` | Sticky navigation bar |
| **Search Input Width** | `280px – 360px` | Header search field |
| **KPI Metric Card Height** | Auto (min `130px`) | Padding `20px` all sides |
| **Chart Widget Min Height** | `320px – 380px` | Memastikan visual kurva terbaca jelas |
| **Modal Width (Standard)** | `560px` | Dialog formulir dan konfirmasi |
| **Modal Width (Wide / Table)** | `840px` | Preview invoice & riwayat transaksi |

---

## 3. Responsive Column Grid

- **Desktop (≥ 1200px):** 12 Kolom, Gutter `20px` – `24px`, Max Container `1600px`.
- **Tablet (768px – 1199px):** 6-8 Kolom, Gutter `16px`.
- **Mobile (< 768px):** 4 Kolom (Single Column stack), Gutter `12px`, Horizontal Margin `16px`.
