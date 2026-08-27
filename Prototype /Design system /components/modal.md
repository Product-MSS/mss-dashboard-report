# 🪟 Components — Modals, Dialogs & Drawers

> Spesifikasi Dialog Modal, Drawer Samping, Drill-Down Investigation Modal, dan Konfirmasi Aksi Destruktif Mitra1000s.

---

## 1. Modal Dialog Hierarchy

```text
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

| Tipe Modal | Lebar Standar | Penggunaan Spesifik |
|---|---|---|
| **Small / Confirmation Dialog** | `440px` | Konfirmasi hapus, penangguhan toko, persetujuan limit |
| **Standard Form Modal** | `560px` | Tambah distributor, penyesuaian plafon, buat invoice |
| **Drill-Down Investigation Modal** | `680px – 740px` | Root cause analysis, breakdown kontribusi distributor, detail harian/bulanan |
| **Wide Data Modal** | `760px – 840px` | Rincian faktur lengkap, riwayat pesanan bertingkat |
| **Right-Side Drawer** | `420px` (Full Height) | Filter lanjutan, detail kilat profil toko bangunan |

---

## 2. Control Tower Drill-Down Modal Pattern

Digunakan saat user mengklik titik kurva grafik (*trend node*), kartu KPI driver (*Acquisition/Activation/Retention/Revenue*), atau kartu anomali:

```text
┌───────────────────────────────────────────────────────────────────────────┐
│ 🔍 Daily GMV Investigation — Day 18 (Aug 18, 2026)                  [✕]   │
│ Detailed factor decomposition and regional distribution for this period   │
├───────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────────────────────┐ │
│ │ 💰 GMV: Rp 623 M (+24.2%)  •  📦 Orders: 245  •  🏪 Active Buyers: 128│ │
│ └───────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│ Top Contributing Distributors:                                            │
│ 1. SA Semen Gresik Jabar    Rp 336.4 M (54.2% Share)                      │
│ 2. SA Baja Perkasa Utama    Rp 193.1 M (31.0% Share)                      │
│ 3. SA Cat Nusantara Abadi   Rp  92.1 M (14.8% Share)                      │
│                                                                           │
│ Root Cause Diagnosis:                                                     │
│ • Peak Q3 Builder Season Promotion triggered 2.4x surge in bulk orders.   │
├───────────────────────────────────────────────────────────────────────────┤
│ [Export Diagnostic PDF]                                      [Close Window]│
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Visual Styling & Mechanics

- **Backdrop Overlay:** `rgba(15, 17, 23, 0.45)` dengan subtle blur `backdrop-filter: blur(4px)`.
- **Container Box:** Background `--surface` (`#FFFFFF`), Border `1px solid var(--border)`, Radius `16px`, Shadow `--shadow-modal`.
- **Header:** Padding `20px 24px`, Border-bottom `1px solid var(--border-light)`.
- **Body:** Padding `24px`, Max-height `calc(85vh - 140px)`, Overflow-y auto.
- **Footer:** Padding `16px 24px`, Background `--surface-2`, Border-top `1px solid var(--border-light)`, Display flex, Justify-content space-between.

---

## 4. Destructive Action Confirmation Rules

Ketika user melakukan aksi kritis (misal: "Suspend Akun Toko" atau "Hapus Data Distributor"):
1. **Icon Peringatan:** Tampilkan icon warning merah di header dialog.
2. **Deskripsi Dampak:** Jelaskan secara eksplisit: *"Toko tidak akan dapat melakukan order baru sampai status diaktifkan kembali."*
3. **Tombol Konfirmasi:**
   - Tombol Batal: Varian Outline (`--text`).
   - Tombol Eksekusi: Varian Danger (`--danger` `#EF4444`) bertuliskan *"Ya, Suspend Toko"*.
4. **Keyboard Support:** Tombol `Escape` wajib membatalkan dan menutup dialog.

