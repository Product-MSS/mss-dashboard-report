# AGENTS.md — Mitra1000s Dashboard B2B

> Instruksi utama untuk **AI Coding Agent** yang bekerja pada project ini.
> **Baca file ini setiap kali** sebelum membuat atau mengubah kode.

---

## 🏢 Konteks Produk

**Mitra1000s** adalah ekosistem digital B2B E-Commerce untuk:
- **Supplier** → **Distributor** → **Retailer (Toko Bangunan)**

Dashboard ini adalah command center operasional harian yang memprioritas **kecepatan operasional** dan **keterbacaan data finansial** untuk pengguna B2B.

---

## 🏛️ Arsitektur

**Stack**: React + TypeScript + Vite | **Arsitektur**: Feature-First (Vertical Slice) | **State**: `useAsyncState<T>` + `UiState<T>`

### Arah Dependensi (DILARANG dibalik):
```
UI Pages / Components (TSX)
  ↓
Feature Hooks [use[Feature].ts] — useAsyncState<T>
  ↓
Feature Repositories — logika bisnis & validasi B2B
  ↓
Feature DataSources — murni I/O (ApiClient / LocalStorage)
  ↓
Core Infrastructure (@/core/network, @/core/storage)
  ↓
Backend REST API
```

### Struktur Folder:
```
src/
├── core/        ← UiState, UiError, ApiClient, AuthHandler, Hooks, Storage
├── app/         ← routes, providers, config/env
├── features/    ← [NamaFitur]/ (6 subfolder: components, dataSources, models, repositories, hooks, pages)
└── shared/      ← Reusable components, hooks, utils, types, constants
```

---

## 🎨 Design System

**Design System Path**: `../Design system/` (relatif dari root project)

> [!IMPORTANT]
> **WAJIB** selalu gunakan token CSS dari `src/index.css`. Dilarang hardcode warna hex, spacing angka, atau shadow value langsung di file CSS komponen.

### Token Wajib Diingat:

| Kategori | Token Utama |
|---|---|
| **Brand** | `--primary-500` (#6C5CE7) — CTA, Active Nav |
| **Background** | `--bg` (#F4F5F7) Canvas, `--surface` (#FFF) Card |
| **Text** | `--text` (#1A1D27), `--text-muted` (#6B7280) |
| **Border** | `--border` (#E2E4EB) |
| **Font UI** | `var(--font-primary)` — Inter |
| **Font Angka** | `var(--font-mono)` — JetBrains Mono (WAJIB untuk Rp dan %) |
| **Spacing** | `--space-xs` (8px) → `--space-3xl` (48px) |
| **Radius** | `--radius-xl` (12px) Card, `--radius-2xl` (16px) Modal |
| **Shadow** | `--shadow-card` Card elevation, `--shadow-modal` Modal |

### Format Angka Finansial (WAJIB):
```
Rp 4.240.000.000   ← Titik sebagai pemisah ribuan (bukan koma)
85.4%              ← Gunakan font-family: var(--font-mono)
INV/2026/08/001    ← Nomor faktur menggunakan monospace
```

---

## 🛡️ Aturan Pengkodean

1. **Dilarang** memanggil `fetch`, `axios`, atau Browser Storage API langsung di komponen/halaman.
2. **Dilarang** menaruh logika bisnis di DataSource (hanya murni I/O).
3. **Dilarang** hardcode hex color, pixel spacing, atau shadow value di CSS komponen.
4. **Dilarang** deep import lintas fitur (wajib gunakan barrel `index.ts`).
5. **Selalu** tangani 4 UI states: `loading` (skeleton), `success`, `empty`, `failure` (+ retry button).
6. **Selalu** gunakan `var(--font-mono)` untuk semua angka finansial, persentase, dan kode/ID.
7. **Selalu** dokumentasikan aturan bisnis baru di `docs/business-rules.md`.

---

## 📖 Referensi Dokumentasi

| Dokumen | Path |
|---|---|
| Design Constitution | `../Design system/design.md` |
| Color Tokens | `../Design system/tokens/colors.md` |
| Typography Tokens | `../Design system/tokens/typography.md` |
| Spacing Tokens | `../Design system/tokens/spacing.md` |
| Shadow Tokens | `../Design system/tokens/shadows.md` |
| Dashboard Example | `../Design system/examples/dashboard.md` |
| Business Rules | `docs/business-rules.md` |
| API Contracts | `docs/api-contracts.md` |
| Architecture | `docs/architecture.md` |

---

## 🚀 Cara Menambah Fitur Baru

```bash
# Scaffold fitur dari root project (Mitra1000s/)
../../../../.agents/Skill/project-development-initiate/scripts/scaffold-feature.sh ./src [NamaFitur] /[route]

# Contoh:
../../../../.agents/Skill/project-development-initiate/scripts/scaffold-feature.sh ./src Dashboard /dashboard
../../../../.agents/Skill/project-development-initiate/scripts/scaffold-feature.sh ./src Order /orders
../../../../.agents/Skill/project-development-initiate/scripts/scaffold-feature.sh ./src Invoice /invoices
```

Setelah scaffolding:
1. Sesuaikan DTOs di `models/` dengan kontrak API di `docs/api-contracts.md`.
2. Implementasikan logika bisnis B2B di `repositories/` (filter status, kalkulasi plafon, aging).
3. Terapkan Design System tokens di `pages/styles.css`.
4. Tambahkan route ke `src/app/routes/`.
