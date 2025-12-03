/* eslint-disable no-use-before-define, no-continue, max-len, no-undef, no-restricted-syntax,
no-restricted-properties, no-param-reassign, no-plusplus, no-shadow, no-unused-vars */
import React, {
  useMemo, useRef, useEffect, useState,
} from 'react';

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
// Default color palette
const defaultColors = ['#1f77b4', '#d62728', '#2ca02c', '#9467bd', '#8c564b'];

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
  const colors = customColors && customColors.length > 0 ? customColors : defaultColors;

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
