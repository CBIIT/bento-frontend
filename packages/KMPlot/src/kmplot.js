/* eslint-disable no-use-before-define, no-continue, max-len, no-undef, no-restricted-syntax,
no-restricted-properties, no-param-reassign, no-plusplus, no-shadow, no-unused-vars */
import React, {
  useMemo, useRef, useEffect, useState,
} from 'react';
import data from './examples/brain_tumor_data.json';

/**
 * Kaplan–Meier working prototype in pure React + SVG (no extra libs).
 * - Supports multiple groups
 * - Handles right-censoring
 * - Computes log-rank test (2 groups) and p-value (df = 1)
 * - Minimal, clean styling
 *
 * Usage:
 *   <KaplanMeierDemo />
 * or reuse <KaplanMeierChart data={...} groupKey="group" timeKey="time" eventKey="event" />
 */

// ---- Sample data (derived from the document):
// Each item: { id, time, event, group }
// event: 1 = event occurred, 0 = censored
// const sampleData = [
//   // Medulloblastoma (subset)
//   {
//     id: 'PBBHMA', time: 758, event: 1, group: 'Medulloblastoma',
//   },
// ];

// ---- Utilities ----
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

/** Compute KM step curve for one group. */
function computeKM(data, timeKey = 'time', eventKey = 'event') {
  const rows = [...data].sort((a, b) => a[timeKey] - b[timeKey]);
  const n = rows.length;
  let atRisk = n;
  let S = 1;
  const points = [{ t: 0, S: 1 }];

  // group rows by time
  const timeMap = new Map();
  for (const r of rows) {
    const t = r[timeKey];
    if (!timeMap.has(t)) timeMap.set(t, { events: 0, censored: 0 });
    const obj = timeMap.get(t);
    if (r[eventKey] === 1) obj.events += 1; else obj.censored += 1;
  }

  const times = [...timeMap.keys()].sort((a, b) => a - b);
  const censorMarks = [];

  for (const t of times) {
    const { events, censored } = timeMap.get(t);
    if (events > 0) {
      // KM update happens only at event times
      S *= (1 - events / atRisk);
      points.push({ t, S }); // vertical drop at t
    }
    // After time t, reduce risk set by both events and censors at t
    if (censored > 0) {
      // Keep track of censor marks to draw
      censorMarks.push({ t, S });
    }
    atRisk -= (events + censored);
  }

  // Ensure the curve extends to the last observed time
  if (points[points.length - 1].t !== times[times.length - 1]) {
    points.push({ t: times[times.length - 1] || 0, S });
  }

  return { points, censorMarks };
}

/** Log-rank test for two groups (approximate; df=1). */
function logRankTest(twoGroups, timeKey = 'time', eventKey = 'event') {
  const [g1Key, g2Key] = Object.keys(twoGroups);
  const g1 = twoGroups[g1Key];
  const g2 = twoGroups[g2Key];
  const all = [...g1, ...g2].sort((a, b) => a[timeKey] - b[timeKey]);

  // Unique event times across ALL groups
  const eventTimes = Array.from(
    new Set(all.filter((r) => r[eventKey] === 1).map((r) => r[timeKey])),
  ).sort((a, b) => a - b);

  let O1minusE1 = 0;
  let V = 0;

  for (const t of eventTimes) {
    const n1 = g1.filter((r) => r[timeKey] >= t).length;
    const n2 = g2.filter((r) => r[timeKey] >= t).length;
    const n = n1 + n2;

    const d1 = g1.filter((r) => r[timeKey] === t && r[eventKey] === 1).length;
    const d2 = g2.filter((r) => r[timeKey] === t && r[eventKey] === 1).length;
    const d = d1 + d2;

    if (n <= 1) continue; // avoid division by zero in variance

    const E1 = (n1 / n) * d;
    O1minusE1 += (d1 - E1);

    // Variance for two-sample log-rank at time t
    V += (n1 * n2 * d * (n - d)) / (n * n * (n - 1));
  }

  const chi2 = (O1minusE1 * O1minusE1) / (V || 1e-12);
  const p = 1 - chiSquareCDF(chi2, 1);

  return { chi2, p, groups: [g1Key, g2Key] };
}

// Chi-square CDF for df=1 and general df fallback (uses regularized gamma)
function chiSquareCDF(x, k) {
  if (k === 1) {
    // CDF(x; k=1) = erf( sqrt(x/2) )
    return erf(Math.sqrt(x / 2));
  }
  return lowerIncompleteGamma(k / 2, x / 2) / gamma(k / 2);
}

// Error function approximation (Abramowitz & Stegun 7.1.26)
function erf(x) {
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592; const a2 = -0.284496736; const a3 = 1.421413741;
  const a4 = -1.453152027; const a5 = 1.061405429; const
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

// Lower incomplete gamma (series) – adequate for small k used here
function lowerIncompleteGamma(s, x) {
  let sum = 0;
  let term = 1 / s;
  let n = 0;
  while (term > 1e-12) {
    sum += term;
    n += 1;
    term *= x / (s + n);
    if (n > 2000) break;
  }
  return Math.pow(x, s) * Math.exp(-x) * sum;
}

function gamma(z) {
  // Lanczos approximation
  const p = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  const g = 7;
  if (z < 0.5) {
    return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  }
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) {
    x += p[i] / (z + i + 1);
  }
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

// Format p-values nicely
function formatP(p) {
  if (p < 1e-4) return '< 1e-4';
  return p.toFixed(4);
}

// ---- Reusable Chart Component ----
export default function KaplanMeierChart({
  data, width = '100%', height = 420, margin = 48, groupKey = 'group', timeKey = 'time', eventKey = 'event', title = 'Kaplan–Meier Curves', colors: customColors, showLegend = true,
}) {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(700);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const groups = useMemo(() => groupBy(data, groupKey), [data, groupKey]);
  const groupKeys = Object.keys(groups);

  const kmResults = useMemo(() => {
    const res = {};
    for (const k of groupKeys) {
      res[k] = computeKM(groups[k], timeKey, eventKey);
    }
    return res;
  }, [groups, groupKeys, timeKey, eventKey]);

  const maxT = useMemo(() => Math.max(1, ...data.map((d) => d[timeKey])), [data, timeKey]);

  // Use custom colors if provided, otherwise use default palette
  const defaultColors = ['#1f77b4', '#d62728', '#2ca02c', '#9467bd', '#8c564b'];
  const colors = customColors && customColors.length > 0 ? customColors : defaultColors;

  // Log-rank (only when there are exactly 2 groups)
  const logRank = useMemo(() => {
    if (groupKeys.length === 2) return logRankTest(groups, timeKey, eventKey);
    return null;
  }, [groupKeys, groups, timeKey, eventKey]);

  // Scales - use containerWidth for calculations
  const innerW = containerWidth - margin * 2;
  const innerH = height - margin * 2;
  // Add small offset to prevent curve from overlapping y-axis
  const xAxisOffset = 0.5;
  const x = (t) => margin + xAxisOffset + (t / maxT) * innerW;
  const y = (s) => margin + innerH * (1 - s);

  // Axis ticks
  const xTicks = 6;
  const yTicks = 5;

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
    >
      <div style={{
        marginBottom: 8, display: 'flex', alignItems: 'baseline', gap: 12,
      }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>

      </div>
      <div ref={containerRef} style={{ width: '100%' }}>
        <svg width={width} height={height} role="img" aria-label={title}>
          {/* Axes */}
          <line x1={margin + xAxisOffset} y1={margin + innerH} x2={margin + innerW + xAxisOffset} y2={margin + innerH} stroke="#333" />
          <line x1={margin} y1={margin} x2={margin} y2={margin + innerH} stroke="#333" />

          {/* X-axis ticks & labels */}
          {Array.from({ length: xTicks + 1 }, (_, i) => {
            const t = (i / xTicks) * maxT;
            return (
              <g key={`xt${i}`}>
                <line x1={x(t)} y1={margin + innerH} x2={x(t)} y2={margin + innerH + 6} stroke="#333" />
                <text x={x(t)} y={margin + innerH + 18} textAnchor="middle" fontSize={12}>{Math.round(t)}</text>
              </g>
            );
          })}
          <text x={margin + innerW / 2 + xAxisOffset} y={height - 4} textAnchor="middle" fontSize={12} style={{ opacity: 0.85 }}>Time</text>

          {/* Y-axis ticks & labels */}
          {Array.from({ length: yTicks + 1 }, (_, i) => {
            const s = i / yTicks;
            return (
              <g key={`yt${i}`}>
                <line x1={margin - 6} y1={y(s)} x2={margin} y2={y(s)} stroke="#333" />
                <text x={margin - 10} y={y(s) + 4} textAnchor="end" fontSize={12}>{s.toFixed(1)}</text>
                <line x1={margin + xAxisOffset} y1={y(s)} x2={margin + innerW + xAxisOffset} y2={y(s)} stroke="#ddd" />
              </g>
            );
          })}
          {/* <text x={14} y={margin - 10} fontSize={12} style={{ opacity: 0.85 }}>
            Survival Probability
          </text> */}

          {/* Curves and censor marks */}
          {groupKeys.map((k, gi) => {
            const { points, censorMarks } = kmResults[k];
            const color = colors[gi % colors.length];

            // Build step path
            const path = [];
            const lastX = x(0); const
              lastY = y(1);
            path.push(`M ${lastX} ${lastY}`);
            for (let i = 1; i < points.length; i++) {
              const prev = points[i - 1];
              const curr = points[i];
              // horizontal segment to current time at prev S
              path.push(`H ${x(curr.t)}`);
              // vertical drop to new S at time
              path.push(`V ${y(curr.S)}`);
            }

            return (
              <g key={k}>
                <path d={path.join(' ')} fill="none" stroke={color} strokeWidth={2} />
                {censorMarks.map((m, idx) => (
                  <g key={`${k}-c-${idx}`}>
                    <line x1={x(m.t) - 4} x2={x(m.t) + 4} y1={y(m.S)} y2={y(m.S)} stroke={color} />
                    <line x1={x(m.t)} x2={x(m.t)} y1={y(m.S) - 4} y2={y(m.S) + 4} stroke={color} />
                  </g>
                ))}
              </g>
            );
          })}

          {/* Legend */}
          {showLegend && (
            <g>
              {groupKeys.map((k, gi) => (
                <g key={`leg-${k}`} transform={`translate(${margin + gi * 180}, ${margin - 24})`}>
                  <rect width="14" height="14" fill={colors[gi % colors.length]} />
                  <text x={20} y={12} fontSize={12}>{k}</text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

export function KaplanMeierDemo() {
  return (
    <div style={{ padding: '16px' }}>
      <KaplanMeierChart
        data={data}
        title="Overall Survival by Diagnosis (Demo)"
        width={760}
        height={480}
      />
    </div>
  );
}
