# 🎨 Design System Constitution — Mitra1000s B2B E-Commerce & Executive Control Tower

**Versi:** 2.0 (Executive Control Tower & Multi-Screen Standard)  
**Status:** Active · Single Source of Truth  
**Platform Target:** Web Desktop (Primary 1280px–1440px) · Tablet (768px–1024px) · Mobile Responsive (375px–430px)  
**Produk:** Mitra1000s — Ekosistem Digital B2B E-Commerce & Executive Control Tower  
**Visual Benchmark:** Clean Purple/Indigo Modern Control Tower (`src/features/productOverview`) & Admetrics SaaS Benchmark (`image.png`)  
**Language Standard:** English for Executive Dashboards, Control Tower Analytics, Metrik, & Anomali Alerts.  
**Last Updated:** 2026-08-27  

---

## 🧭 Struktur Modular Design System

```text
Design system/
│
├── design.md                      <-- Dokumen ini: Filosofi, Prinsip, Konstitusi Utama, & AI Framework
│
├── tokens/
│   ├── colors.md                  <-- Palet Purple/Indigo, Netral, Semantik, Chart Gradient, & Kontras WCAG
│   ├── typography.md              <-- Font Inter & JetBrains Mono, Type Scale, Monospace Numbers
│   ├── spacing.md                 <-- 8px Grid Framework, Padding, Margin, Container Layout
│   └── shadows.md                 <-- Soft Elevation, Hairline Borders, Focus Rings
│
├── components/
│   ├── button.md                  <-- Varian Primary, Secondary, Outline, Ghost, Danger & Loading
│   ├── form.md                    <-- Input, Compact Date Range Picker, Global Filter Bar, Plafon Selector
│   ├── table.md                   <-- Data Table, Structured Widget Matrices, Alignment, Mobile Card
│   ├── modal.md                   <-- Dialogs, Drill-Down Investigation Modal, Drawers, Destructive Warnings
│   └── navigation.md              <-- Left Sidebar, Top Header, Segmented Switcher, Filter Bar
│
├── patterns/
│   ├── dashboard.md               <-- Master Control Tower Architecture, Unified KPI Cards, Spline Line Chart
│   ├── checkout.md                <-- B2B Checkout, Pemilihan Tempo, Plafon Check, Early Cashback
│   └── crud.md                    <-- Standard B2B CRUD Workflow, Search & Filter Debounce
│
├── ux/
│   ├── writing.md                 <-- UX Writing (English Standard), Metric Glossary, Dynamic Comparison Rules
│   ├── accessibility.md           <-- Standar WCAG 2.2 AA, Keyboard Traversal, Non-Color Cues
│   └── responsive.md              <-- Breakpoints, Layout Shifts, Mobile Stacking Rules
│
└── examples/
    └── dashboard.md               <-- Full Screen Wireframes: Control Tower (Screen 1) & Operations (Screen 2)
```

---

## 1. Design Philosophy

### Karakter & Nuansa Produk
Mitra1000s dirancang khusus untuk pelaku usaha B2B (distributor, agen penjualan, dan pemilik toko bangunan) serta Executive / Product Manager yang membutuhkan efisiensi tinggi, visibilitas arus transaksi, serta kejelasan status performa produk.

Produk ini harus terasa:
- **Executive-Ready & Professional** — Memberikan data agregasi akurat (GMV, AOV, Active Buyers, Funnel Drivers) dalam hitungan detik.
- **Clean & High-Contrast Scannable** — Memprioritaskan keterbacaan angka metrik dengan font monospace `JetBrains Mono` dan layout terstruktur.
- **Unified Card Architecture** — Mengelompokkan metrik terkait ke dalam 1 kontainer terpadu (*Unified Container Card*) daripada memecahnya menjadi banyak kartu terpisah.
- **Operational-First & Actionable** — Setiap indikator anomali langsung disertai evaluasi kerugian (*Estimated Lost GMV*) dan tombol aksi investigasi (*Direct Drill-Down*).

### Prinsip Utama (Design Principles)
1. **Clarity over Decoration** — Setiap komponen, badge warna, dan garis pembatas memiliki fungsi informatif atau interaktif.
2. **Dynamic Period Comparison** — Setiap perbandingan tren wajib menampilkan konteks periode dinamis (`vs [Prior Period]`) di atas target, tanpa singkatan statis `WoW/MoM` di dalam badge.
3. **Data Hierarchy & Scannability** — Angka KPI utama dan status kritis langsung terlihat dalam 3 detik pertama saat membuka halaman.
4. **Intentional Whitespace** — Menggunakan ruang kosong (spacing 8px grid) sebagai separator alami untuk membedakan kelompok informasi.
5. **Progressive Disclosure** — Sajikan ringkasan penting di awal (dashboard/tabel), simpan detail teknis pada modal dialog drill-down.

### ⛔ Anti-Principles:
- ❌ **Excessive & Random Gradients** — Dilarang menggunakan gradien multi-warna mencolok pada background area kerja.
- ❌ **Static WoW/MoM Labels in Badges** — Dilarang menulis "WoW" atau "MoM" di dalam badge pill. Badge hanya boleh memuat delta angka dan arah panah.
- ❌ **Color Overload & Confusion** — Maksimal 1 warna primer dominan (`--primary-500` / `#6C5CE7`), di luar warna semantik status.
- ❌ **Unaligned Icons & Labels** — Label mikro dan icon Icons8 wajib dibuat rata tengah vertikal (*vertically centered*).

---

## 2. Brand & Visual Personality

- **Brand Name:** Mitra1000s
- **Brand Personality:** Handal, Tangguh, Transparan, Solutif, Mitra Bisnis Strategis.
- **Visual Personality:** Premium SaaS, Minimalist Indigo-Purple Theme, High Clarity Light Interface, Struktur Modular Rapi.
- **Tone of Voice:** Lugas, profesional, jelas, solutif, dan data-driven dalam Bahasa Inggris.

---

## 3. The 6 Mandatory System States

1. **Loading State:** Skeleton loader abu-abu beranimasi pulse lembut pada area KPI card dan baris tabel (bukan layar putih kosong).
2. **Populated / Success State:** Tampilan normal berisi data riil pengguna.
3. **Empty State:** Ikon ilustrasi outline netral, judul *"No data found"*, deskripsi panduan, dan tombol aksi *"Reset Filters"*.
4. **Error State:** Panel border merah lembut `--danger-border`, teks penjelasan masalah, serta tombol *"Retry Connection"*.
5. **Partial / Incomplete State:** Indikator progress *"2 of 3 steps verified"*.
6. **Disabled State:** Opacity `50%`, pointer events `none`, kursor `not-allowed`.

---

## 4. AI Decision-Making Framework

Ketika AI agent mengembangkan fitur atau tampilan baru untuk Mitra1000s:
1. **Bahasa Antarmuka:** Gunakan Bahasa Inggris profesional untuk seluruh teks dashboard, card title, badge, modal, dan alert.
2. **Komponen Reusable:** Gunakan token CSS dan komponen standar dari sub-folder `tokens/` dan `components/` sebelum membuat styling custom.
3. **Format Angka:** Selalu gunakan font monospace `JetBrains Mono` untuk angka keuangan, GMV, persentase, dan tanggal.
4. **Card Container:** Gunakan pola *Unified Container Card* untuk menyatukan kelompok KPI multi-kolom.
5. **Dynamic Comparison:** Pastikan perhitungan periode pembanding mengikuti rentang filter tanggal secara dinamis.

---

## 5. AI Implementation Checklist

Sebelum merilis antarmuka atau kode komponen:
- [ ] Apakah seluruh teks antarmuka menggunakan Bahasa Inggris profesional (`ux/writing.md`)?
- [ ] Apakah badge KPI hanya memuat delta angka/arah tanpa teks statis WoW/MoM (`patterns/dashboard.md`)?
- [ ] Apakah baris periode pembanding dinamis diletakkan di atas target (`patterns/dashboard.md`)?
- [ ] Apakah warna menggunakan variabel token CSS dari `tokens/colors.md`?
- [ ] Apakah font `Inter` digunakan untuk teks dan `JetBrains Mono` untuk angka finansial (`tokens/typography.md`)?
- [ ] Apakah icon dan teks pada micro-KPI sejajar rata tengah vertikal?
- [ ] Apakah state Loading (Skeleton) dan Empty State sudah terdefinisi?
- [ ] Apakah kontras warna memenuhi standar WCAG 2.2 AA (`ux/accessibility.md`)?
- [ ] Apakah tampilan sudah responsif dan adaptif terhadap resolusi tablet/mobile (`ux/responsive.md`)?

---
*Dokumen ini adalah acuan resmi sistem desain antarmuka Mitra1000s.*  
*Maintained by Product & Engineering Team Mitra1000s*

