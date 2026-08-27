# 🪟 Components — Modals, Dialogs & Drawers

> Spesifikasi Dialog Modal, Drawer Samping, dan Konfirmasi Aksi Destruktif Mitra1000s.

---

## 1. Modal Dialog Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ Modal Header: Judul Modal                             [✕]   │
│ Sub-keterangan ringkas konteks modal                        │
├─────────────────────────────────────────────────────────────┤
│ Modal Body (Scrollable jika panjang)                        │
│                                                             │
│ [Form Inputs / Detail Transaksi / Review Plafon]            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Modal Footer:                      [Batal] [Simpan / Kirim] │
└─────────────────────────────────────────────────────────────┘
```

| Tipe Modal | Lebar Standar | Penggunaan |
|---|---|---|
| **Small / Confirmation Dialog** | `440px` | Konfirmasi hapus, penangguhan toko, persetujuan limit |
| **Standard Form Modal** | `560px` | Tambah distributor, penyesuaian plafon, buat invoice |
| **Wide Data Modal** | `760px – 840px` | Rincian faktur lengkap, riwayat pesanan bertingkat |
| **Right-Side Drawer** | `420px` (Full Height) | Filter lanjutan, detail kilat profil toko bangunan |

---

## 2. Visual Styling

- **Backdrop Overlay:** `rgba(15, 17, 23, 0.45)` dengan subtle blur `backdrop-filter: blur(4px)`.
- **Container Box:** Background `--surface` (`#FFFFFF`), Border-radius `16px`, Shadow `--shadow-modal`.
- **Header:** Padding `20px 24px`, Border-bottom `1px solid var(--border-light)`.
- **Body:** Padding `24px`, Max-height `calc(85vh - 140px)`, Overflow-y auto.
- **Footer:** Padding `16px 24px`, Background `--surface-2`, Border-top `1px solid var(--border-light)`.

---

## 3. Destructive Action Confirmation Rules

Ketika user melakukan aksi kritis (misal: "Suspend Akun Toko" atau "Hapus Data Distributor"):
1. **Icon Peringatan:** Tampilkan icon warning merah di header dialog.
2. **Deskripsi Dampak:** Jelaskan secara eksplisit: *"Toko tidak akan dapat melakukan order baru sampai status diaktifkan kembali."*
3. **Tombol Konfirmasi:**
   - Tombol Batal: Varian Outline (`--text`).
   - Tombol Eksekusi: Varian Danger (`--danger` `#EF4444`) bertuliskan *"Ya, Suspend Toko"*.
4. **Keyboard Support:** Tombol `Escape` wajib membatalkan dan menutup dialog.
