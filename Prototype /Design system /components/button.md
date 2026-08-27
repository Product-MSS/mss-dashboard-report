# 🔘 Components — Button

> Spesifikasi tombol untuk Mitra1000s: Varian fungsional, hierarki visual, ukuran, dan penanganan status interaktif.

---

## 1. Button Variants

| Varian | Styling Dasar | Hover & Active State | Penggunaan Utama |
|---|---|---|---|
| **Primary** | Background `--primary-500` (`#6C5CE7`), Teks `#FFFFFF`, Border `none`, Shadow `--shadow-primary-glow` (subtle) | Background `--primary-600`, Active `--primary-700` | CTA Tunggal Utama ("Buat Order", "Bayar Faktur", "Simpan") |
| **Secondary** | Background `--primary-100` (`#EDE9FE`), Teks `--primary-700` (`#4F46E5`), Border `none` | Background `--primary-200`, Active `--primary-300` | Aksi pendukung ("Filter Data", "Export CSV", "Tambah Baris") |
| **Outline** | Background `#FFFFFF`, Border `1px solid var(--border)`, Teks `--text` | Background `--surface-2`, Border `--text-muted` | Aksi sekunder netral ("Kembali", "Batal", "Tutup") |
| **Ghost** | Background `transparent`, Border `none`, Teks `--primary-500` | Background `--primary-50`, Teks `--primary-700` | Aksi inline link, navigasi tabel, pagination |
| **Danger** | Background `--danger` (`#EF4444`), Teks `#FFFFFF`, Border `none` | Background `#DC2626`, Active `#B91C1C` | Aksi destruktif ("Batalkan Order", "Suspend Akun", "Tolak") |

---

## 2. Button Sizes

| Size | Height | Padding Horizontal | Font Size / Weight | Icon Size |
|---|---|---|---|---|
| **Small (Sm)** | `32px` | `12px` | 13px / 500 Medium | `16px` |
| **Medium (Md - Default)** | `40px` | `16px` | 14px / 500 Medium | `18px` |
| **Large (Lg)** | `48px` | `20px` | 15px / 600 SemiBold | `20px` |

- **Corner Radius:** `10px` (`--radius-lg`) untuk seluruh tombol standar.

---

## 3. Button States & Interactive Rules

1. **Loading State:**
   - Tombol otomatis menjadi `disabled` (pointer-events none).
   - Tampilkan spinner berputar 16px di sisi kiri teks.
   - Teks berubah dari "Simpan" menjadi "Memproses...".
2. **Disabled State:**
   - Background `--surface-2`, Border `1px solid var(--border)`, Teks `--text-light` (`#9CA3AF`).
   - Kursor berubah menjadi `not-allowed`.
3. **Single Dominant Rule:**
   - Dalam 1 section, kartu, atau modal, **hanya boleh ada 1 tombol berstatus Primary**. Tombol kedua wajib bertipe Outline atau Secondary.
