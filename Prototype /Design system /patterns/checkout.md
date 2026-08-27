# 🛒 Patterns — B2B Order & Checkout Flow

> Alur Checkout B2B Mitra1000s: Pemilihan Tempo, Cek Plafon Kredit, Biaya Keterlambatan, dan Cashback Bayar Cepat.

---

## 1. Multi-Step Checkout Journey

```
Katalog Material & Keranjang
↓
[1. Alamat Pengiriman Toko]
  - Pilih lokasi gudang/toko bangunan yang terdaftar
↓
[2. Opsi Pengiriman & Distributor]
  - Pilihan distributor penyedia (Selling Agent)
↓
[3. Metode Pembayaran & Penyesuaian Tempo]
  - Plafon Kredit Aktif Toko (Real-time check)
  - Pilihan Durasi Tempo:
    * Default (30 Hari) -> 0% tambahan
    * +15 Hari -> Tambahan 0.75%
    * +30 Hari -> Tambahan 1.5%
    * +60 Hari (Maksimal) -> Tambahan 3.0%
↓
[4. Preview Cashback Bayar Cepat]
  - Prompt: "Bayar dalam 15 hari -> Dapatkan Cashback Saldo Rp 150.000"
↓
[5. Konfirmasi & Submit Order]
  - Validasi limit plafon tidak terlampaui
  - Status: Order Berhasil Dibuat (Faktur Terbit)
```

---

## 2. Plafon Limit Checking Logic & UX

1. **Plafon Cukup:**
   - Bar status berwarna Hijau `--success-bg` dengan teks: *"Sisa Plafon: Rp 85.000.000 (Cukup untuk pesanan ini)"*.
   - Tombol "Konfirmasi Pesanan" aktif (`--primary-500`).
2. **Plafon Tidak Cukup:**
   - Bar status berwarna Kuning/Merah `--danger-bg` dengan teks: *"Pesanan melebihi sisa plafon sebesar Rp 12.500.000. Silakan lakukan pelunasan tagihan lama terlebih dahulu."*
   - Tombol CTA berubah menjadi *"Bayar Tagihan Lama"* atau *"Ajukan Penyesuaian Plafon"*.

---

## 3. Aturan Biaya Keterlambatan & Perpanjangan Tempo

- **Terminology Kepatuhan:**
  - Gunakan istilah **"Biaya Perpanjangan Tempo"** atau **"Biaya Keterlambatan"** (hindari istilah "Bunga" atau "Denda" demi kenyamanan mitra toko dan kepatuhan regulasi).
- **Maksimum Perpanjangan:** Maksimal 1 kali perpanjangan dengan tambahan hingga 60 hari.
- **Konsekuensi Keterlambatan Parah:**
  - Blokir sementara order online baru di MSS.
  - Penurunan skor limit kredit secara otomatis.
