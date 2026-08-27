# 🔤 Design Tokens — Typography

> Mitra1000s Global Typography Standards: `Inter` for all UI text, headings, and labels; `JetBrains Mono` for all numerical metrics, financial figures, GMV counters, and percentages.

---

## 1. Font Families

```css
:root {
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono:    'JetBrains Mono', 'SF Mono', Consolas, monospace;
}
```

### Import Link:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700;800&display=swap" rel="stylesheet">
```

---

## 2. Type Scale & Hierarchy

| Token Level | Font Size | Weight | Line Height | Letter Spacing | Specific UI Usage |
|---|---|---|---|---|---|
| `--text-hero` | `40px – 48px` (2.50rem) | 800 (ExtraBold) | 1.00 | -0.03em | North Star GMV Hero (`Rp 12.48 Billion`) |
| `--text-display` | `32px` (2.00rem) | 700 (Bold) | 1.15 | -0.02em | Large Widget Highlights, Total Balances |
| `--text-h1` | `24px` (1.50rem) | 700 (Bold) | 1.20 | -0.02em | KPI Card Hero Value (`2,430`, `36.4%`), Page Titles |
| `--text-h2` | `18px` (1.125rem) | 700 (Bold) | 1.25 | -0.01em | Card Titles (*"Key Performance Indicators"*, *"GMV Trend"*) |
| `--text-h3` | `14px` (0.875rem) | 700 (Bold) | 1.30 | -0.01em | Section Sub-headers, Modal Titles, Table Group Headers |
| `--text-body` | `14px` (0.875rem) | 400 (Regular) | 1.50 | 0.00em | Paragraph text, data table cells, descriptions |
| `--text-body-md` | `14px` (0.875rem) | 500 (Medium) | 1.50 | 0.00em | Form input labels, navigation links, button text |
| `--text-body-sb` | `14px` (0.875rem) | 600 (SemiBold) | 1.40 | 0.00em | Store names in table, metric column titles |
| `--text-caption` | `11px – 12px` (0.75rem)| 500 (Medium) | 1.35 | +0.01em | Comparison labels (`vs July 2026`), target status |
| `--text-micro` | `10px – 11px` (0.65rem)| 700 (Bold) | 1.20 | +0.08em | Uppercase Eyebrow Tags (`NORTH STAR METRIC`, `ACQUISITION`) |

---

## 3. Financial & Numerical Typography Rules

1. **Monospace for High-Precision Alignment:**
   - All monetary amounts (`Rp 12.48 Billion`, `Rp 2.82 M`), order counts (`4,420`), percentages (`+12.4%`, `36.4%`), and dates **must** use `--font-mono` (`JetBrains Mono`).
   - This prevents layout jitter during real-time updates and ensures vertical number alignment across tabular columns.
2. **Number Formatting Standards:**
   - Large Millions/Billions format: `Rp 12.48 Billion`, `Rp 2.82 M`, `Rp 520 M`.
   - Precise tabular currency: `Rp 4.240.000` or `Rp 125.000.000`.
   - Percentages & Deltas: Always include sign and precision: `▲ +8.2%`, `▼ -5.4%`, `+230`.
3. **Hierarchy & Scannability:**
   - Primary metric numbers must visually dominate over labels to allow instant 3-second comprehension for C-level & PM stakeholders.
