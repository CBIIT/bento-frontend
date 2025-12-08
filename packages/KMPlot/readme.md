# Kaplan–Meier Chart (React + SVG)

A lightweight, dependency-free Kaplan–Meier (KM) survival plot component intended for inclusion in the **bento-core** NPM package. It supports multiple groups, right-censoring, and a two-sample log‑rank test (df=1) with p‑value.

> **Component**: `KaplanMeierChart`
>
> **Tech**: React, SVG (no external chart libs)

---

## ✨ Features
- Multiple groups in a single chart (legend included)
- Right-censoring markers at last known times
- Two-sample log‑rank test with χ² and p‑value (displayed when there are exactly two groups)
- Clean, minimal UI with sensible defaults
- Pure React + SVG, no runtime dependencies beyond React

---

## 📦 Installation (planned packaging)
When this component is added to **bento-core**:

```bash
npm install @bento-core/kmplot
# or
pnpm add @bento-core/kmplot
# or
yarn add @bento-core/kmplot
```

Then import:

```tsx
import { KaplanMeierChart } from "@bento-core/kmplot";
```

> **Note:** Until published, you can import directly from your local module path.

---

## 🔧 API Reference

### `KaplanMeierChart`
A reusable chart component.

#### Props
| Prop | Type | Default | Description |
|---|---|---:|---|
| `data` | `Array<Record<string, any>>` | **required** | Input rows. Each row has survival `time`, event indicator `event` (1=event, 0=censored), and grouping key `group`. |
| `width` | `number` | `700` | Total SVG width. |
| `height` | `number` | `420` | Total SVG height. |
| `margin` | `number` | `48` | Uniform margin around plotting area. |
| `groupKey` | `string` | `'group'` | Field name for group membership. |
| `timeKey` | `string` | `'time'` | Field name for survival time. Must be non‑negative. |
| `eventKey` | `string` | `'event'` | Field name for event indicator (1=event, 0=censored). |
| `title` | `string` | `'Kaplan–Meier Curves'` | Chart title and `<svg aria-label>`. |

> **Colors:** The current implementation uses an internal fixed palette (see `colors` constant). Exposing a `palette` prop is a potential enhancement.

---

## 🧪 Data Format
Each row represents a subject:

```ts
interface KMRow {
  id?: string;         // optional unique id
  time: number;        // >= 0; time to event/censoring
  event: 0 | 1;        // 1 = event occurred; 0 = right-censored
  group: string;       // group/stratum name
}
```

Example:

```json
[
  { "id": "P1", "time": 120, "event": 1, "group": "Medulloblastoma" },
  { "id": "P2", "time": 220, "event": 0, "group": "Medulloblastoma" },
  { "id": "P3", "time": 180, "event": 1, "group": "Ependymoma" }
]
```

Validation rules:
- `time` must be finite and ≥ 0
- `event` ∈ {0,1}
- `group` must be a non-empty string

---

## 📈 Usage

### Basic
```tsx
import React from "react";
import { KaplanMeierChart } from "@bento-core/kmplot"; // once published

export default function Example() {
  const myData = [
    { id: "P1", time: 120, event: 1, group: "Medulloblastoma" },
    { id: "P2", time: 220, event: 0, group: "Medulloblastoma" },
    { id: "P3", time: 180, event: 1, group: "Ependymoma" },
  ];

  return (
    <KaplanMeierChart
      data={myData}
      title="Overall Survival by Diagnosis"
      width={760}
      height={480}
    />
  );
}
```

### With custom field names
```tsx
<KaplanMeierChart
  data={rows}
  groupKey="dx"    // custom key
  timeKey="t_months"
  eventKey="status" // 1=death, 0=censored
/>
```

---

## 🧠 Methods & Math (under the hood)

### Kaplan–Meier estimate per group
For each unique time `t` within a group, let `d_t` be the number of events and `n_t` the number at risk just prior to `t`. The survival step is:

\[ S(t) = \prod_{u \le t} \left(1 - \frac{d_u}{n_u}\right) \]

- Censored individuals at time `t` reduce the **risk set after** the survival step at `t`.
- The implementation stores `points` (KM steps) and `censorMarks` for plotting.

### Two-sample log‑rank test (df=1)
For exactly two groups, at each event time across **both** groups:
- `n1, n2`: at-risk counts just before `t`
- `d1, d2`: observed events at `t`
- `d = d1 + d2`, `n = n1 + n2`
- Expected events in group 1: `E1 = (n1/n) * d`
- Variance contribution: \( V_t = \frac{n_1 n_2 d (n-d)}{n^2 (n-1)} \)

Test statistic: \( \chi^2 = (\sum_t (d_1 - E_1))^2 / \sum_t V_t \), p‑value from χ² CDF with 1 df. Displayed only if exactly 2 groups are present.

> Assumptions: non-informative censoring, proportional hazards for optimal power, independent samples.

---

## ♿ Accessibility
- `<svg role="img" aria-label={title}>`
- Axis labels and tick values are text elements (screen-reader friendly)
- Ensure sufficient color contrast when theming; consider patterns/markers if expanding beyond color-only encodings

---

## 🎨 Styling & Theming
- Uses an internal color palette: `['#1f77b4', '#d62728', '#2ca02c', '#9467bd', '#8c564b']`
- Legend shows group color swatches
- Censor marks use small `+` markers at `(time, S(t))`

**Potential extension** (see Roadmap):
- `palette` prop to override colors
- `axisLabelX`, `axisLabelY` props
- `tickFormatters` for time/probability axes

---

## ⚙️ Performance Characteristics
- KM per group: sort cost `O(m log m)` where `m` = group size
- Two-group log‑rank: iterates unique event times (≤ `n`) with simple counts
- Suitable for datasets up to low tens of thousands of rows in the browser; consider pre-aggregation if larger

---

## 🧩 Integration Notes (bento-core)
- Place the component under a package subpath that groups all packages, e.g. `@bento-core/kmplot`
- Re-export from an index for cleaner imports:

```ts
// packages/src/index.ts
export { default as KaplanMeierChart } from './KaplanMeierChart';
```

---

## ✅ Testing Guidance

### Unit tests (logic)
- `computeKM()`
  - Monotone non-increasing `S(t)`
  - Correct step changes at event times only
  - Censors adjust risk set after step
- `logRankTest()`
  - Symmetry when swapping group labels
  - Zero χ² for identical groups; increasing separation yields larger χ²
  - Handles corner cases (no events, single subject, ties)

### Snapshot / visual tests
- Render deterministic SVG (fixed width/height/margins)
- Verify legend entries match unique groups

---

## 🧱 Edge Cases & Error Handling
- **No events**: flat survival at 1; log‑rank hidden
- **Single group**: no log‑rank calculation
- **>2 groups**: KM curves render; log‑rank hidden
- **All censored**: flat line at 1 with censor marks only
- **Non-positive/NaN times**: validate upstream; filter or throw

---

## 🔒 TypeScript Hints (optional)
Although the implementation is plain JS, you can add JSDoc types for editor IntelliSense:

```ts
/**
 * @typedef KMRow
 * @property {string=} id
 * @property {number} time
 * @property {0|1} event
 * @property {string} group
 */

/** @typedef {Object} KMProps
 * @property {KMRow[]} data
 * @property {number=} width
 * @property {number=} height
 * @property {number=} margin
 * @property {string=} groupKey
 * @property {string=} timeKey
 * @property {string=} eventKey
 * @property {string=} title
 */
```

---

## 🚧 Roadmap
- `palette` prop to override colors
- Optional Y-axis label and custom tick formatters
- Tooltip/hover details per step
- Export utilities (`computeKM`, `logRankTest`) for reuse in analytics pipelines
- Optional stratified log‑rank for >2 groups; hazard ratio estimates via Cox PH (separate utility)

---

---

## 📎 Notes
- P-value formatting uses `formatP(p)` (e.g., `< 1e-4`)
- The chart extends to the last observed time
- Axes include gridlines and numeric ticks

---

