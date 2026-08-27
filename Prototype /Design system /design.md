# 🎨 Design System Constitution — Mitra1000s B2B E-Commerce

**Versi:** 1.0 (Modular Architecture)  
**Status:** Active · Single Source of Truth  
**Platform Target:** Web Desktop (Primary 1280px–1440px) · Tablet (768px–1024px) · Mobile Responsive (375px–430px)  
**Produk:** Mitra1000s — Ekosistem Digital B2B E-Commerce (Supplier → Distributor → Retailer / Toko Bangunan)  
**Visual Benchmark:** Clean Admetrics Purple/Indigo Modern SaaS Dashboard (Referenced from `image.png`)  
**Last Updated:** 2026-08-26  

---

## 🧭 Struktur Modular Design System

Untuk mempermudah pemeliharaan dan menghindari context noise pada AI agent / developer, spesifikasi desain dipecah menjadi modul-modul berikut:

```text
Design system/
│
├── design.md                      <-- Dokumen ini: Filosofi, Prinsip, Konstitusi Utama, & AI Framework
│
├── tokens/
│   ├── colors.md                  <-- Palet Purple/Indigo, Netral, Semantik, & Kontras WCAG
│   ├── typography.md              <-- Font Inter & JetBrains Mono, Type Scale, Monospace Numbers
│   ├── spacing.md                 <-- 8px Grid Framework, Padding, Margin, Container Layout
│   └── shadows.md                 <-- Soft Elevation, Hairline Borders, Focus Rings
│
├── components/
│   ├── button.md                  <-- Varian Primary, Secondary, Outline, Ghost, Danger & Loading
│   ├── form.md                    <-- Input, Currency Format, Plafon Selector, Toggle, Validation
│   ├── table.md                   <-- Data Table, Sticky Header, Alignment, Mobile Card Transform
│   ├── modal.md                   <-- Dialogs, Confirmation, Drawers, Destructive Warnings
│   └── navigation.md              <-- Left Sidebar, Top Header, Segmented Switcher, Tabs
│
├── patterns/
│   ├── dashboard.md               <-- KPI Metric Cards, Line + Area Fill Chart, Concentric Donut
│   ├── checkout.md                <-- B2B Checkout, Pemilihan Tempo, Plafon Check, Early Cashback
│   └── crud.md                    <-- Standard B2B CRUD Workflow, Search & Filter Debounce
│
├── ux/
│   ├── writing.md                 <-- UX Copywriting, Kamus Terminologi Bisnis B2B Mitra1000s
│   ├── accessibility.md           <-- Standar WCAG 2.2 AA, Keyboard Traversal, Non-Color Cues
│   └── responsive.md              <-- Breakpoints, Layout Shifts, Mobile Stacking Rules
│
└── examples/
    └── dashboard.md               <-- Spesifikasi Layar Penuh Dashboard Mitra1000s (Admetrics Style)
```

---

## 1. Design Philosophy

### Karakter & Nuansa Produk
Mitra1000s dirancang khusus untuk pelaku usaha B2B (distributor, agen penjualan, dan pemilik toko bangunan) yang membutuhkan efisiensi tinggi, visibilitas arus transaksi, serta kejelasan status kredit/tempo.

Produk ini harus terasa:
- **Professional & Trustworthy** — Memberikan keyakinan penuh saat mengelola transaksi bernilai besar, manajemen faktur, dan plafon kredit usaha.
- **Clean & High-Contrast Scannable** — Memprioritaskan keterbacaan data metrik (GMV, AOV, invoice aging, sisa plafon) dengan visual noise seminimal mungkin.
- **Modern & Structured** — Layout kartu modular dengan pembagian area kerja yang simetris, rounded corner elegan (12px–16px), dan visual padding yang seimbang.
- **Operational-First (Low Cognitive Friction)** — Menghilangkan interaksi rumit demi kecepatan tugas operasional harian (approval akun, verifikasi sales, checkout order, monitoring piutang).

### Prinsip Utama (Design Principles)
1. **Clarity over Decoration** — Setiap komponen, badge warna, dan garis pembatas memiliki fungsi informatif atau interaktif.
2. **Function over Visual Complexity** — Alur kerja transaksi dan approval tidak boleh terganggu oleh animasi atau ornamen berlebih.
3. **Data Hierarchy & Scannability** — Angka KPI utama dan status kritis langsung terlihat dalam 3 detik pertama saat membuka halaman.
4. **Intentional Whitespace** — Menggunakan ruang kosong (spacing 8px grid) sebagai separator alami untuk membedakan kelompok informasi.
5. **Progressive Disclosure** — Sajikan ringkasan penting di awal (dashboard/tabel), simpan detail teknis pada modal dialog atau collapsible drawer.

### ⛔ Anti-Principles (Menghindari Pola Desain "AI-Looking"):
- ❌ **Excessive & Random Gradients** — Dilarang menggunakan gradien multi-warna mencolok pada kartu atau background area kerja.
- ❌ **Over-Elevation & Heavy Shadows** — Hindari drop shadow hitam tebal berlapis. Gunakan border tipis `1px solid var(--border)` dan soft elevation `0 1px 3px rgba(0,0,0,0.04)`.
- ❌ **Color Overload & Confusion** — Maksimal 1 warna primer dominan (`--primary-500`) dan 1 warna aksen ungu/indigo lembut, di luar warna semantik status.
- ❌ **Dense & Cluttered Layouts** — Hindari menjejalkan seluruh form dan filter tanpa hierarki visual.
- ❌ **Inconsistent Pill Shape** — Jangan gunakan radius pill untuk semua kartu/kontainer kotak; batasi bentuk pill hanya untuk Badge Status dan Toggle Switch.
- ❌ **Laggy/Unnecessary Motion** — Hindari animasi transisi > 250ms yang memperlambat pekerjaan pengguna.

---

## 2. Brand & Visual Personality

- **Brand Name:** Mitra1000s
- **Brand Personality:** Handal, Tangguh, Transparan, Solutif, Mitra Bisnis Strategis.
- **Visual Personality:** Premium SaaS, Minimalist Indigo-Purple Theme, High Clarity Light Interface, Struktur Modular Rapi.
- **Tone of Voice:** Lugas, profesional, jelas, solutif, dan kooperatif.

---

## 3. The 6 Mandatory System States

Setiap layar atau komponen data **wajib** menangani 6 kondisi status sistem:

1. **Loading State:** Skeleton loader abu-abu beranimasi pulse lembut pada area KPI card dan baris tabel (bukan layar putih kosong).
2. **Populated / Success State:** Tampilan normal berisi data riil pengguna.
3. **Empty State:** Ikon ilustrasi outline netral, judul *"Belum Ada Data Order"*, deskripsi panduan, dan tombol aksi *"Mulai Buat Order"*.
4. **Error State:** Panel border merah lembut `--danger-border`, teks penjelasan masalah, serta tombol *"Coba Muat Ulang"*.
5. **Partial / Incomplete State:** Indikator progress *"2 dari 3 data terverifikasi"*.
6. **Disabled State:** Opacity `50%`, pointer events `none`, kursor `not-allowed`.

---

## 4. AI Decision-Making Framework

Ketika AI agent mengembangkan fitur atau tampilan baru untuk Mitra1000s:
1. **Prioritas Utama:** Kecepatan dan kemudahan operasional pengguna B2B.
2. **Komponen Reusable:** Gunakan token CSS dan komponen standar dari sub-folder `tokens/` dan `components/` sebelum membuat styling custom.
3. **Pilihan Warna:** Gunakan token CSS yang telah didefinisikan (Primary `#6C5CE7`, Neutral `#F4F5F7` & `#FFFFFF`). Dilarang menambahkan warna acak baru.
4. **Layout Fallback:** Jika instruksi tata letak kurang spesifik, gunakan layout standar **2 Kolom (70% Data Utama / 30% Summary & Aksi Samping)**.
5. **Format Angka:** Selalu gunakan font monospace untuk angka keuangan dengan separator ribuan titik (`Rp 4.240.000.000`).

---

## 5. AI Implementation Checklist

Sebelum merilis antarmuka atau kode komponen:
- [ ] Apakah warna menggunakan variabel token CSS dari `tokens/colors.md`?
- [ ] Apakah font `Inter` digunakan untuk teks dan `JetBrains Mono` / Monospace untuk angka finansial (`tokens/typography.md`)?
- [ ] Apakah spacing mengacu pada 8px grid (`tokens/spacing.md`)?
- [ ] Apakah state Loading (Skeleton) dan Empty State sudah terdefinisi?
- [ ] Apakah kontras warna memenuhi standar WCAG 2.2 AA (`ux/accessibility.md`)?
- [ ] Apakah tombol hanya memiliki 1 Primary CTA yang dominan (`components/button.md`)?
- [ ] Apakah tampilan sudah responsif dan adaptif terhadap resolusi tablet/mobile (`ux/responsive.md`)?
- [ ] Apakah terminologi menggunakan bahasa bisnis standar Mitra1000s (`ux/writing.md`)?

---
*Dokumen ini adalah acuan resmi sistem desain antarmuka Mitra1000s.*  
*Maintained by Product & Engineering Team Mitra1000s*
