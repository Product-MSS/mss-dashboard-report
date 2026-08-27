# ✍️ UX Guidelines — Writing, Microcopy & Terminology

> Official UX Writing & Copywriting Constitution for Mitra1000s B2B E-Commerce & Executive Control Tower.
> **Language Standard:** Professional English for all Executive Dashboards, Control Tower analytics, metrics, and alerts.

---

## 1. Tone of Voice & Core Writing Principles

1. **Concise & Data-First:** Business leaders and product managers require immediate clarity. Eliminate fluff, preamble, and unnecessary filler words.
2. **Transparent & Actionable:** When highlighting an anomaly or metric drop, state the factual metric delta, estimated business impact (e.g. *Estimated Lost GMV*), and provide a direct path to resolution (*"Investigate Funnel"*, *"Review Onboarding"*).
3. **Non-Punitive & Collaborative:** Frame negative deltas or SLA breaches as optimization opportunities rather than accusatory errors.
4. **Professional Global English:** Use standardized modern SaaS analytics terms (e.g., *North Star Metric*, *Active Buyers*, *Order Frequency*, *SLA Target*, *Conversion Funnel*).

---

## 2. Official Metrics & Funnel Terminology Glossary

| UI Term | Description & Formula Context | Usage Example |
|---|---|---|
| **Total Gross Merchandise Value (GMV)** | Core North Star: Total value of paid & confirmed transactions | *"Rp 12.48 Billion"* |
| **Valid Orders** | Total completed & confirmed checkout orders | *"4,420 Orders (+3.8%)"* |
| **Average Order Value (AOV)** | $\frac{\text{GMV}}{\text{Valid Orders}}$ — Average cart size | *"Rp 2.82 M (+4.2%)"* |
| **Active Buyers** | Count of distinct transacting store accounts | *"1,850 Stores (+2.1%)"* |
| **Order Frequency** | $\frac{\text{Valid Orders}}{\text{Active Buyers}}$ — Orders per active store | *"2.39x / buyer"* |
| **New Verified Stores** | Core Acquisition: Stores completing KYC & onboarding | *"2,430 Stores"* (Do not append CPD/BNN to title) |
| **D-7 Activation Rate** | Core Activation: % new stores making first order $\le 7$ days | *"36.4% (Target: 40.0%)"* |
| **M1 Retention Rate** | Core Retention: % stores reordering in Month+1 | *"42.8% (Target: 45.0%)"* |

---

## 3. Delta Badge & Dynamic Comparison Period Rules

### 3.1 Badge Pill Format (Delta Only)
- ❌ **Forbidden:** `▲ +12.4% WoW` or `▼ -5.4% MoM` (Do not hardcode static WoW/MoM abbreviations inside badges).
- ✅ **Standard:** Badges must contain **ONLY the numerical delta and direction arrow**:
  - Positive growth: `▲ +12.4% (+268)` or `▲ +8.2% (+Rp 946.5 M)`
  - Negative decline: `▼ -5.4%` or `▼ -3.2%`
  - Neutral / Unchanged: `● 0.0%`

### 3.2 Dynamic Comparison Period Context
The comparison period is dynamically calculated based on the selected Global Date Filter and rendered in caption typography directly above the target line:
- **When 1 Month is selected (e.g. August 2026):**
  - Text: `vs July 2026` (Preceding month).
- **When a Multi-Month Range is selected (e.g. Jan 2026 - Aug 2026, 8 months):**
  - Text: `vs May 2025 - Dec 2025` (Equivalent preceding 8-month window).

### 3.3 Scope Footnote
When rendering funnel KPI cards that reflect platform-wide health, always include the standard scope footnote:
> `* Funnel metrics are scoped by Date & Region only; Supplier & Selling Agent filters do not apply`

---

## 4. Filter Bar & Interactive Controls Copywriting

| Element | Copy Standard | Behavior Note |
|---|---|---|
| **Date Range Trigger** | `01/01/2026 - 08/31/2026` | Shows start date - end date in compact input |
| **Preset 1** | `Year-to-Date (This Year)` | Sets Jan 1 to current month of current year |
| **Preset 2** | `Month-to-Date (This Month)` | Sets current month only |
| **Custom Selectors** | `Start Month & Year` to `End Month & Year` | Max allowed range is 2 years (24 months) |
| **Reset Action** | `Reset Filters` | Resets all dimensions to default state |
| **Region Dimension** | `All Regions (CPD/BNN Top)` | Area CPD & Area BNN always pinned at Top 1 & 2 |

---

## 5. Anomaly Detection & Telemetry Microcopy

### 5.1 Telemetry Status Chips
- 🔴 **Critical:** Used when SLA target is breached (e.g. `Zero-Result Search Rate: 8.70% (SLA ≤ 3.0%)`).
- 🟡 **Warning:** Used when metric is approaching breach threshold.
- 🟢 **Normal:** Used when metric complies with SLA (e.g. `Checkout Success Rate: 98.15% (SLA ≥ 97.0%)`).

### 5.2 Anomaly Alert Section (`WHAT NEEDS ATTENTION?`)
- **Card Title:** `[CRITICAL] Zero-Result Search Anomaly: 8.70%`
- **Impact Badge:** `Est. Lost GMV: -Rp 420.0 M`
- **Root Cause Line:** `Root Cause: 42 top cement & steel SKUs missing distributor regional catalog mapping.`
- **Action Buttons:**
  - Primary CTA: `Investigate Funnel ↗` (Opens diagnostic drill-down).
  - Secondary CTA: `Fix SKU Mapping` (Triggers corrective workflow).

---

## 6. System State Microcopy (Loading, Empty & Error)

### 6.1 Loading States
- ❌ **Bad:** *"Loading..."*
- ✅ **Standard:** *"Loading Control Tower metrics..."* (Accompanied by pulse skeleton loader).

### 6.2 Error States
- ❌ **Bad:** *"Error 500: Server error occurred."*
- ✅ **Standard:** *"Failed to fetch Control Tower summary from data pipeline. Check your connection or retry."* with button `[Retry Connection]`.

### 6.3 Empty States
- ❌ **Bad:** *"No data."*
- ✅ **Standard:** *"No transactions found for the selected date range and filter criteria. Try adjusting your filters."* with button `[Reset Filters]`.

