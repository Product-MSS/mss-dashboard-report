# 📝 Components — Forms & Inputs

> Form Controls, Input Formatting, Currency Handler, dan Validasi Mitra1000s.

---

## 1. Input Fields Hierarchy

| Tipe Input | Tinggi | Border & Radius | Typography | Spesifikasi Khusus |
|---|---|---|---|---|
| **Text Input** | `42px` | `1px solid var(--border)`, Radius `10px` | 14px Inter Regular | Placeholder `--text-muted` |
| **Currency / Nominal** | `42px` | Same | 14px JetBrains Mono | Prefix fixed `Rp `, auto-thousand separator (`1.500.000`) |
| **Quantity / Stepper** | `42px` | Same | 14px JetBrains Mono | Tombol `−` dan `+` di kedua sisi |
| **Select / Dropdown** | `42px` | Same | 14px Inter Medium | Chevron icon kanan, search bar terintegrasi jika > 8 item |
| **Textarea** | Min `90px` | Same | 14px Inter Regular | Resizable vertical only |
| **Toggle Switch** | `22px x 40px` | Pill shape | — | Active `--primary-500`, Inactive `--border` |

---

## 2. Plafon Kredit & Financial Form Controls

1. **Credit Utilization Preview:**
   - Di samping atau di bawah input nominal transaksi / penyesuaian limit, sertakan bar status pemakaian:
   - *"Sisa Plafon: Rp 120.000.000 (Terpakai: 65%)"*
2. **Tempo Selector Widget:**
   - Opsi radio box berbentuk kartu:
     - `Default Tempo: 30 Hari (0%)`
     - `+ 15 Hari (+ 0.75%)`
     - `+ 30 Hari (+ 1.5%)`
     - `+ 60 Hari (+ 3.0%)`

---

## 3. Validation & Error Display

- **Inline Validation:** Muncul saat user `onBlur` dari field atau saat submit form.
- **Error State Styling:**
  - Border input berubah menjadi `1px solid var(--danger)` (`#EF4444`).
  - Teks error muncul di bawah field: `12px Inter Medium`, warna `--danger-text`, didahului ikon ⚠.
- **Mandatory Marker:** Tandai field wajib dengan asterisk merah `*` di sebelah kanan label form.
