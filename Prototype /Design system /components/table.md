# 📊 Components — Data Table & Grid

> Standar Data Grid, Pengurutan Kolom, Penyelarasan Angka, dan Transformasi Mobile untuk Mitra1000s.

---

## 1. Table Layout & Hierarchy

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🔍 [Cari toko / nomor order...]   [Filter Status ▾]  [Pilih Region ▾]   [📥 Export CSV]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ☐ │ ID ORDER     │ NAMA TOKO          │ TANGGAL    │ STATUS      │ TOTAL NOMINAL    │ ⋯ │
├───┼──────────────┼────────────────────┼────────────┼─────────────┼──────────────────┼───┤
│ ☐ │ ORD-2026-081 │ Toko Maju Jaya     │ 24/08/2026 │ [● Selesai] │ Rp 42.500.000,00 │ ⋯ │
│ ☐ │ ORD-2026-082 │ TB Sumber Rejeki   │ 25/08/2026 │ [● Pending] │ Rp 18.200.000,00 │ ⋯ │
│ ☐ │ ORD-2026-083 │ Toko Bangunan Abadi│ 26/08/2026 │ [● Overdue] │ Rp 95.000.000,00 │ ⋯ │
├───┴──────────────┴────────────────────┴────────────┴─────────────┴──────────────────┴───┤
│ Menampilkan 1-10 dari 142 data                             [<<] [<] [1] [2] [3] [>] [>>]│
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Column Alignment Rules

| Tipe Data Kolom | Penyelarasan (Alignment) | Format Font | Contoh |
|---|---|---|---|
| **ID Transaksi, Kode SKU** | Rata Kiri (*Left*) | Monospace 13px | `ORD-2026-081` |
| **Nama Toko, Deskripsi, Nama Sales** | Rata Kiri (*Left*) | Inter Regular / SemiBold 14px | `TB Bangun Persada` |
| **Tanggal & Waktu** | Rata Kiri (*Left*) | Inter Regular 13px | `26 Agu 2026, 14:30` |
| **Status Badge, Jenis Tag** | Rata Tengah (*Center*) | Inter Medium 12px Pill | `[● Terverifikasi]` |
| **Kuantitas (Qty), Volume** | Rata Kanan (*Right*) | JetBrains Mono 14px | `250 Sak` |
| **Nilai Uang (Rupiah), Sisa Plafon** | Rata Kanan (*Right*) | JetBrains Mono 14px | `Rp 125.000.000` |
| **Aksi (Action Menu / Button)** | Rata Kanan / Tengah | Inter Medium 13px | `[⋯]` atau `[Detail]` |

---

## 3. Visual States & Interactions

- **Header Row:** Background `--surface-2` (`#F8F9FB`), Teks `--text-muted` 12px SemiBold Uppercase, Border-bottom `1px solid var(--border)`.
- **Data Rows:** Background `--surface` (`#FFFFFF`), Padding vertical `14px`, horizontal `16px`.
- **Hover Row:** Background `--surface-hover` (`#F0F2F6`) atau `--primary-50` (`#F5F3FF`) transisi 100ms.
- **Sticky Header:** Header tetap berada di bagian atas container saat tabel di-scroll vertikal.
- **Empty State Table:** Tampilkan ilustrasi netral di tengah container tabel dengan pesan: *"Tidak ada transaksi yang cocok dengan filter yang dipilih."*

---

## 4. Mobile Responsive Table Transformation

Pada layar mobile (< 768px), data tabel otomatis bertransformasi menjadi **Vertical Stacked Cards**:
- Setiap baris menjadi satu kartu independen dengan border `1px solid var(--border)` dan radius `12px`.
- Header kartu: `ID Order` (kiri) dan `Status Badge` (kanan).
- Body kartu: Grid 2 kolom berpasangan (*Key: Muted Text*, *Value: Bold Text*).
- Footer kartu: Tombol aksi utama (misal: "Lihat Detail Invoice").
