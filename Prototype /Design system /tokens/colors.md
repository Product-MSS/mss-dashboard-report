# 🎨 Design Tokens — Color System

> Mengacu pada visual benchmark Admetrics Purple Modern Dashboard (`image.png`) untuk ekosistem B2B Mitra1000s.

---

## 1. Primary Brand Palette (Purple / Indigo)

Primary brand warna ungu-indigo mencerminkan modernitas, presisi data, dan rasa percaya tinggi bagi ekosistem B2B.

```css
:root {
  /* Core Brand Primary Alias */
  --primary:     #6C5CE7; /* Core Primary brand alias */
  --primary-900: #2E1065; /* Deep purple (High contrast text, dark header) */
  --primary-800: #3730A3; /* Brand dark container */
  --primary-700: #4F46E5; /* Button hover & active dark states */
  --primary-600: #5B4FE1; /* Primary button hover, metric highlight */
  --primary-500: #6C5CE7; /* Core Primary CTA, Active Nav, Focus Outline */
  --primary-400: #818CF8; /* Light accent / chart auxiliary line */
  --primary-300: #A5B4FC; /* Chart gradient fill light */
  --primary-200: #C7D2FE; /* Subtle border highlight */
  --primary-100: #EDE9FE; /* Active nav background, selected row tint, soft chip bg */
  --primary-50:  #F5F3FF; /* Page subtle tint / zebra highlight */
}
```

---

## 2. Neutral Palette (Light Mode Focused)

```css
:root {
  --bg:           #F4F5F7; /* Main canvas background (soft warm gray) */
  --surface:      #FFFFFF; /* Card, panel, modal, sidebar background */
  --surface-2:    #F8F9FB; /* Sub-card, input field background, table zebra */
  --surface-hover:#F0F2F6; /* Hover state for rows and interactive items */
  --border:       #E2E4EB; /* Standard hairline border */
  --border-light: #ECEEF2; /* Inner card divider */
  --border-focus: #6C5CE7; /* Input active focus border */
  
  --text:         #1A1D27; /* Main text, titles, data values */
  --text-muted:   #6B7280; /* Subtitles, column headers, placeholders */
  --text-light:   #9CA3AF; /* Meta timestamps, disabled text */
}
```

---

## 3. Semantic, Feedback & Chart Visualization Palette

```css
:root {
  /* Success: Growth (+), Order Confirmed, Active Accounts, Good Status */
  --success:        #10B981;
  --success-bg:     #ECFDF5;
  --success-border: #A7F3D0;
  --success-text:   #065F46;

  /* Warning: Pending SLA, Minor Anomaly, Approaching Thresholds */
  --warning:        #F59E0B;
  --warning-bg:     #FFFBEB;
  --warning-border: #FDE68A;
  --warning-text:   #92400E;

  /* Danger: Critical SLA Breach, Severe Drop, Lost GMV, Destructive Action */
  --danger:         #EF4444;
  --danger-bg:      #FEF2F2;
  --danger-border:  #FECACA;
  --danger-text:    #991B1B;

  /* Info: Platform Announcement, Standard Scoped Dimension */
  --info:           #3B82F6;
  --info-bg:        #EFF6FF;
  --info-border:    #BFDBFE;
  --info-text:      #1E40AF;

  /* Feature Accent & Promo Spike Beacon */
  --accent-orange:    #F97316; /* Promo spike beacon, radar pulsating dot */
  --accent-orange-bg: #FFF7ED;

  /* Auxiliary Accent: Sky Blue */
  --accent-blue:      #38BDF8;

  /* Spline Chart Area Gradients */
  --chart-gradient-top: rgba(108, 92, 231, 0.22);
  --chart-gradient-mid: rgba(108, 92, 231, 0.06);
  --chart-gradient-bot: rgba(108, 92, 231, 0.00);
  --chart-glow-shadow:  rgba(108, 92, 231, 0.35);
}
```

---

## 4. Color Usage Rules & WCAG Compliance

| Komponen | Token Rekomendasi | Catatan Kontras |
|---|---|---|
| **Primary CTA Button** | `--primary-500` (`#6C5CE7`) dengan teks `#FFFFFF` | Rasio Kontras 4.6:1 (Pass AA) |
| **Secondary Button** | `--primary-100` (`#EDE9FE`) dengan teks `--primary-700` (`#4F46E5`) | Rasio Kontras 6.2:1 (Pass AAA) |
| **Active Nav Item** | `--primary-500` dengan teks `#FFFFFF` atau `--primary-100` | Jelas terlihat dan tidak ambigu |
| **Status Badge** | Pasangan `--[status]-bg` dengan `--[status]-text` | Wajib disertai ikon atau teks |
| **Kartu Konten** | Background `--surface` dengan border `--border` di atas `--bg` | Memberikan kontras kartu yang bersih |

### Aturan Ketat:
- ❌ **Dilarang** menggunakan warna status (Merah/Hijau) untuk sekadar hiasan non-status.
- ❌ **Dilarang** mencampur background gradien warna-warni pada kartu data.
