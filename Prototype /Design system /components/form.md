# 📝 Components — Forms & Inputs

> Form Controls, Input Formatting, Currency Handler, Global Filter Bar Inputs, and Validation Standards for Mitra1000s.

---

## 1. Input Fields Hierarchy

| Input Type | Height | Border & Radius | Typography | Specific Feature Context |
|---|---|---|---|---|
| **Text Input** | `42px` | `1px solid var(--border)`, Radius `10px` | 14px Inter Regular | Placeholder `--text-muted` |
| **Currency / Nominal** | `42px` | Same | 14px JetBrains Mono | Prefix fixed `Rp `, auto-thousand separator (`1.500.000`) |
| **Quantity / Stepper** | `42px` | Same | 14px JetBrains Mono | Increment `+` and decrement `−` buttons on sides |
| **Select / Dropdown** | `38px – 42px`| Same | 13px–14px Inter Medium | Chevron icon, optional search bar if > 8 items |
| **Date Range Trigger** | `38px` | `1px solid var(--border)`, Radius `8px` | 13px JetBrains Mono | Compact input trigger (`01/01/2026 - 08/31/2026`) |
| **Textarea** | Min `90px` | Same | 14px Inter Regular | Resizable vertical only |
| **Toggle Switch** | `22px x 40px` | Pill shape | — | Active `--primary-500`, Inactive `--border` |

---

## 2. Global Filter Bar Form Controls Pattern

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [🗓️ 01/01/2026 - 08/31/2026 ▾] [📍 Region: All (CPD/BNN Top) ▾] [🏭 Supplier: All ▾] [🏪 Agent: All ▾] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Single Compact Date Range Input with Popover Modal
- **Trigger Field:** Shows date range format `MM/DD/YYYY - MM/DD/YYYY` in monospace font with calendar icon on left and chevron on right.
- **Modal Popover Content:**
  1. **Quick Presets:**
     - `Year-to-Date (This Year)` — Auto-selects January 1st to Current Month of Current Year.
     - `Month-to-Date (This Month)` — Auto-selects Current Month only.
  2. **Custom Range Selectors:**
     - Start Month (`Jan`..`Dec`) & Start Year (`2024`..`2026`).
     - End Month (`Jan`..`Dec`) & End Year (`2024`..`2026`).
     - **Constraint Validation:** Maximum selectable range is **2 Years (24 Months)**. End date must be $\ge$ Start date.
  3. **Footer Actions:** `[Cancel]` and `[Apply Date Range]`.

### 2.2 Dimension Dropdowns (Region, Supplier, Selling Agent)
- **Region Dropdown:** Area CPD and Area BNN must be permanently pinned at **Top 1 and Top 2**, followed by provincial groups.
- **Supplier Dropdown:** Filter by product category suppliers (Semen Gresik, Krakatau Steel, etc.).
- **Selling Agent Dropdown:** Filter by regional distribution sales agents.
- **Reset Button:** Inline button `[🔄 Reset Filters]` aligned alongside the dropdowns to restore default dimensions in 1 click.

---

## 3. Plafon Kredit & Financial Form Controls

1. **Credit Utilization Preview:**
   - Always display real-time utilization bar: *"Sisa Plafon: Rp 120.000.000 (Terpakai: 65%)"*.
2. **Tempo Selector Widget:**
   - Structured radio cards: `Default Tempo: 30 Hari (0%)`, `+ 15 Hari (+ 0.75%)`, `+ 30 Hari (+ 1.5%)`, `+ 60 Hari (+ 3.0%)`.

---

## 4. Validation & Error Display

- **Inline Validation:** Triggers on `onBlur` or form submission.
- **Error State Styling:**
  - Input border changes to `1px solid var(--danger)` (`#EF4444`).
  - Error message renders below field in `12px Inter Medium`, color `--danger-text`, prefixed with `⚠`.
- **Mandatory Marker:** Mark required fields with red asterisk `*`.

