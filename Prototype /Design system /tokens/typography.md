# 🔤 Design Tokens — Typography

> Standar Tipografi Mitra1000s: Menggunakan Inter untuk teks antarmuka dan JetBrains Mono untuk metrik numerik/finansial.

---

## 1. Font Families

```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono:    'JetBrains Mono', 'SF Mono', Consolas, monospace;
}
```

### Import Link:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
```

---

## 2. Type Scale & Hierarchy

| Token Level | Font Size | Weight | Line Height | Letter Spacing | Penggunaan Spesifik |
|---|---|---|---|---|---|
| `--text-display` | `32px` (2.00rem) | 700 (Bold) | 1.20 | -0.02em | Hero KPI Metrics, Total Balance, GMV Header |
| `--text-h1` | `24px` (1.50rem) | 600 (SemiBold) | 1.25 | -0.01em | Judul Halaman Utama ("Dashboard", "Daftar Pesanan") |
| `--text-h2` | `20px` (1.25rem) | 600 (SemiBold) | 1.30 | -0.01em | Judul Widget Kartu ("Sales Report", "Upcoming Due Date") |
| `--text-h3` | `16px` (1.00rem) | 600 (SemiBold) | 1.35 | 0.00em | Modal Title, Table Section Header, Group Label |
| `--text-body` | `14px` (0.875rem) | 400 (Regular) | 1.50 | 0.00em | Teks paragraf, sel tabel data, deskripsi bantuan |
| `--text-body-md` | `14px` (0.875rem) | 500 (Medium) | 1.50 | 0.00em | Label form input, navigasi menu, button text |
| `--text-body-sb` | `14px` (0.875rem) | 600 (SemiBold) | 1.50 | 0.00em | Nama toko pada tabel, highlight transaksi |
| `--text-caption` | `12px` (0.750rem) | 500 (Medium) | 1.40 | +0.01em | Status Badge, delta persentase KPI, sub-timestamp |
| `--text-micro` | `11px` (0.6875rem) | 600 (SemiBold) | 1.30 | +0.02em | Tag kategori mikro, watermark kode |

---

## 3. Financial & Numerical Typography Rules

1. **Monospace for Data Precision:**
   - Semua angka transaksi nominal Rupiah (`Rp 4.240.000`), kuantitas SKU (`1.500 Sak`), nomor faktur (`INV/2026/08/001`), dan persentase utilisasi plafon (`85.4%`) **wajib** menggunakan `--font-mono`.
   - Ini memastikan angka tetap sejajar secara vertikal pada tabel dan kartu metrik tanpa jitter saat data diperbarui.
2. **Thousand Separator:**
   - Gunakan format standar Indonesia dengan titik sebagai pemisah ribuan dan koma untuk desimal (`Rp 12.500.000,00` atau `Rp 12.500.000`).
3. **Headings Dominance:**
   - Judul kartu (`H2`) harus memiliki kontras visual yang kuat dibanding nilai deskripsi di bawahnya.
