# 🌫️ Design Tokens — Shadows, Elevation & Borders

> Pedoman Elevasi dan Border: Menghindari bayangan tebal "AI-looking" dengan mengutamakan hairline border bersih dan soft elevation.

---

## 1. Elevation & Shadows Scale

```css
:root {
  /* Flat - Surface Card Normal */
  --shadow-none: none;

  /* Card Soft Elevation (Admetrics style) */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);

  /* Hover Elevation (Cards, Primary Buttons) */
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03);

  /* Primary Action Glow (Subtle brand focus) */
  --shadow-primary-glow: 0 4px 14px rgba(108, 92, 231, 0.28);

  /* Modal Dialog / Popover / Dropdown Menu */
  --shadow-dropdown: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  --shadow-modal:    0 16px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
}
```

---

## 2. Border Radius Tokens

```css
:root {
  --radius-xs:   4px;   /* Small tags, checkboxes */
  --radius-sm:   6px;   /* Inner elements, table cell badges */
  --radius-md:   8px;   /* Input fields, segmented buttons */
  --radius-lg:   10px;  /* Standard buttons, dropdown containers */
  --radius-xl:   12px;  /* Sub-cards, inner widgets */
  --radius-2xl:  16px;  /* Main outer cards, modal containers */
  --radius-pill: 9999px;/* Status badges, avatar frames, toggle tracks */
}
```

---

## 3. Focus Rings & Border Guidelines

1. **Hairline Border Standar:**
   - Semua kartu dan panel menggunakan `border: 1px solid var(--border)` (`#E2E4EB`).
2. **Focus Indicator:**
   - Elemen form dan tombol saat menerima fokus keyboard/mouse:
     ```css
     outline: none;
     border-color: var(--primary-500);
     box-shadow: 0 0 0 3px var(--primary-100);
     ```
3. **Anti-Rule:**
   - ❌ Dilarang menggunakan shadow hitam tebal (> 20% opacity) yang membuat elemen tampak melayang kotor.
