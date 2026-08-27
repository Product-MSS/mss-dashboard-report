# 📱 UX Guidelines — Responsive & Device Adaptations

> Panduan Perilaku Responsif Antarmuka Mitra1000s pada Resolusi Desktop, Tablet, dan Mobile.

---

## 1. Breakpoints & Layout Matrix

| Breakpoint | Lebar Viewport | Sidebar Navigasi | Grid Kartu KPI | Layout Tabel |
|---|---|---|---|---|
| **Desktop L** | ≥ 1440px | Full Visible (260px) | 3-4 Kolom berdampingan | Full Data Grid dengan Sticky Header |
| **Desktop M** | 1200px – 1439px | Full Visible (260px) | 3-4 Kolom | Full Data Grid |
| **Tablet** | 768px – 1199px | Collapsed ke Icon-only (72px) | 2 Kolom per baris | Horizontal scrollable grid dengan shadow indicator |
| **Mobile** | < 768px | Off-Canvas Drawer (Hamburger Icon) | 1 Kolom Full Stack | Berubah menjadi Kartu Vertikal bertumpuk |

---

## 2. Perilaku Khusus pada Mobile (< 768px)

1. **Header Mobile:**
   - Menyajikan tombol hamburger di pojok kiri atas.
   - Search bar diperkecil menjadi icon toggle pencarian.
   - Avatar profil disederhanakan.
2. **Chart Adaptations:**
   - Tinggi grafik diturunkan menjadi `220px`.
   - Tooltip chart muncul saat user melakukan tap / sentuh pada titik kurva.
   - Legenda chart diletakkan di bawah kurva dalam bentuk flex horizontal.
3. **Modal & Bottom Sheet:**
   - Modal desktop berubah menjadi **Bottom Sheet Drawer** yang menempel di bagian bawah layar mobile untuk memudahkan jangkauan satu tangan (thumb zone).
