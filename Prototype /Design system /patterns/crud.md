# 🔄 Patterns — Standard B2B CRUD & Data Management

> Standar Alur CRUD (Create, Read, Update, Delete) dan Filter Pencarian pada Portal Mitra1000s.

---

## 1. Standard CRUD Workflow

```
[1. Halaman Index Tabel Data]
  Header: Judul Modul + Tombol Primary "+ Tambah [Entitas]"
  ↓
[2. Pencarian & Filter Instan]
  Input Search (Debounce 300ms) + Filter Chips Aktif
  ↓
[3. Aksi Entitas]
  - Klik Baris / Aksi "Detail" -> Buka Detail Drawer / Halaman Ringkasan
  - Klik "Edit" -> Buka Form Modal dengan data pre-filled
  - Klik "Hapus / Suspend" -> Buka Destructive Confirmation Modal
  ↓
[4. Feedback & Auto-Refresh]
  - Toast Notifikasi Hijau/Merah muncul di kanan bawah (4 detik auto-dismiss)
  - Tabel otomatis refresh tanpa me-reload seluruh browser
```

---

## 2. Search & Filter Bar Pattern

- **Search Field:** Lebar `320px`, placeholder kontekstual (*"Cari nama distributor, ID pesanan, SKU..."*).
- **Debounced Input:** Pengiriman query ke backend ditunda `300ms` setelah ketukan keyboard terakhir pengguna.
- **Active Filter Chips:**
  - Setiap filter yang dipilih (misal: Region: Jawa Timur, Status: Belum Lunas) muncul sebagai badge chip kecil yang dapat di-remove secara individual dengan tombol `✕`.
  - Tombol *"Reset Semua Filter"* muncul jika ada minimal 2 filter aktif.
