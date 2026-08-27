# ♿ UX Guidelines — Accessibility (WCAG 2.2 AA)

> Standar Aksesibilitas Web untuk Portal Mitra1000s: Kontras Warna, Navigasi Keyboard, dan Non-Color Dependency.

---

## 1. Color Contrast Standards (WCAG 2.2 AA)

1. **Teks Normal (< 18px / < 14px Bold):**
   - Wajib memiliki rasio kontras minimal **4.5:1** terhadap background.
   - Contoh: Teks `--text` (`#1A1D27`) di atas background putih `#FFFFFF` (Rasio 14.8:1 - Sangat Aman).
   - Teks `--text-muted` (`#6B7280`) di atas `#FFFFFF` (Rasio 4.8:1 - Memenuhi Standar).
2. **Teks Besar (≥ 18px / ≥ 14px Bold) & Elemen UI:**
   - Wajib memiliki rasio kontras minimal **3.0:1**.
   - Contoh: Primary Button `--primary-500` (`#6C5CE7`) dengan teks putih `#FFFFFF` (Rasio 4.6:1 - Pass).

---

## 2. Keyboard Traversal & Focus Rings

- **Urutan Tab Logis:** Dari kiri atas (Header search/profile) ke Sidebar, lalu masuk ke konten tabel atau form utama.
- **Focus Rings:**
  ```css
  :focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }
  ```
- **Shortcut Standar:**
  - `Escape`: Menutup Modal Dialog, Drawer, atau Context Menu aktif.
  - `Enter` / `Space`: Memicu tombol atau memilih opsi dalam segmented control.

---

## 3. Non-Color Dependency

- **Aturan Mutlak:** Status sistem (Sukses, Peringatan, Gagal) tidak boleh disampaikan HANYA melalui warna titik atau background.
- **Solusi:**
  - Selalu sertakan label teks eksplisit (*"Lunas"*, *"Lewat Jatuh Tempo"*).
  - Sertakan ikon pembeda (Centang `✓` untuk sukses, Tanda Seru `⚠` untuk peringatan, Silang `✕` untuk gagal).
