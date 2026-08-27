# 🧭 Components — Navigation & Header

> Spesifikasi Left Sidebar, Top Navigation Bar, Breadcrumbs, dan Segmented Switcher.

---

## 1. Left Sidebar Navigation

Mengacu pada benchmark visual Admetrics Purple Dashboard (`image.png`):

```
┌───────────────────────────┐
│ 🟣 Admetrics / Mitra1000s │
├───────────────────────────┤
│ [🏠 Dashboard]            │  <-- Active: Background --primary-500 (#6C5CE7), Text White
│ [📊 Statistics]           │
│ [⚙️ Services]             │
│ [📋 Task list]            │
│ [🔔 Notification]         │
│                           │
│ ───────────────────────── │
│ 📞 Calls            [ O ] │  <-- Toggle feature item
│                           │
│ 🚪 Log out                │
│                           │
│ ───────────────────────── │
│ 👤 Annette Black          │
│    Anblack@gmail.com      │
└───────────────────────────┘
```

### Styling Detail Sidebar:
- **Lebar Fixed:** `260px` (Desktop) · Collapse ke `72px` (Tablet) · Drawer (Mobile).
- **Background:** `--surface` (`#FFFFFF`) dengan border kanan `1px solid var(--border)`.
- **Nav Item Active:**
  - Background: `--primary-500` (`#6C5CE7`).
  - Text: `#FFFFFF` (14px Medium).
  - Icon: `#FFFFFF` (20px).
  - Border Radius: `10px` dengan padding `12px 16px`.
  - Shadow: `0 4px 12px rgba(108, 92, 231, 0.25)`.
- **Nav Item Inactive:**
  - Background: `transparent`.
  - Text: `--text-muted` (`#6B7280`).
  - Hover: Background `--surface-hover` (`#F0F2F6`), Text `--text` (`#1A1D27`).
- **User Profile Footer:** Menampilkan avatar bulat 40px, nama user bold 13px, email/role muted 12px.

---

## 2. Top Header Bar

- **Tinggi Fixed:** `70px` (Sticky on top).
- **Elemen Penyusun:**
  1. **Page Title / Greeting (Kiri):** *"Welcome back, Mike 👋"* (20px SemiBold).
  2. **Global Search (Tengah/Kanan):** Input field dengan icon search 🔍 di kiri, background `--surface-2`, radius `10px`, lebar `280px–360px`.
  3. **Action Icons (Kanan):**
     - Dark mode toggle 🌙 / ☀️.
     - Notification bell 🔔 dengan red dot indicator jika ada update belum dibaca.
     - Profile dropdown compact dengan thumbnail avatar dan chevron ▾.

---

## 3. Segmented Time Switcher (Week / Month / Year)

Mengacu pada switcher grafik di `image.png`:

```
[ Week ]  [ Month ]  [ Year (Active) ]
```

- **Container Track:** Background `--surface-2` (`#F0F2F6`), Radius `10px`, Padding `4px`, Display inline-flex.
- **Item Inactive:** Background transparent, Text `--text-muted` (12px Medium), Padding `6px 12px`.
- **Item Active:** Background `--primary-500` (`#6C5CE7`), Text `#FFFFFF`, Radius `8px`, Shadow `0 2px 4px rgba(0,0,0,0.08)`.
