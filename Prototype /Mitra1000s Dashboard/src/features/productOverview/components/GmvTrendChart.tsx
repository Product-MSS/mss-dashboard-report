// ==============================================================================
// 30-Day GMV Trend Chart Component — Mitra1000s Control Tower
// Smooth Cubic Spline Line Chart with Interactive Scrubber & Minimalist Event Beacon
// ==============================================================================

import React, { useState, useRef } from 'react';
import type { GmvTrendDayDto } from '../models/productOverviewDto';
import { Badge } from '@/shared/components/Badge';

interface GmvTrendChartProps {
  trendData: GmvTrendDayDto[];
  onPointClick: (day: GmvTrendDayDto) => void;
}

// Monotone Cubic Spline generator for ultra-smooth fluid curves
function getSmoothSplinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let path = `M ${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    // Catmull-Rom to Cubic Bezier conversion factor: 1/6
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`;
  }

  return path;
}

export const GmvTrendChart: React.FC<GmvTrendChartProps> = ({ trendData, onPointClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  if (!trendData || trendData.length === 0) {
    return (
      <div className="ct-chart-card ct-chart-card--empty">
        <p>Tidak ada data tren untuk filter yang dipilih.</p>
      </div>
    );
  }

  // Summary calculation: Peak day & Average daily GMV
  const peakDay = trendData.reduce((max, d) => (d.currentGmv > max.currentGmv ? d : max), trendData[0]);
  const avgGmv = Math.round(trendData.reduce((sum, d) => sum + d.currentGmv, 0) / trendData.length);
  const avgGmvFormatted = `Rp ${(avgGmv / 1_000_000).toFixed(0)}M/hari`;
  const peakGmvFormatted = `Rp ${(peakDay.currentGmv / 1_000_000).toFixed(0)}M (Aug ${peakDay.dayIndex})`;

  // Calculate SVG ViewBox metrics
  const width = 960;
  const height = 280;
  const padding = { top: 25, right: 25, bottom: 35, left: 65 };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find max GMV for Y scale
  const maxGmv = Math.max(
    ...trendData.map((d) => Math.max(d.currentGmv, d.priorGmv)),
    500_000_000
  );

  const getX = (index: number) => {
    return padding.left + (index / (trendData.length - 1 || 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return padding.top + chartHeight - (val / maxGmv) * chartHeight;
  };

  // Build point arrays
  const currentPoints = trendData.map((d, i) => ({ x: getX(i), y: getY(d.currentGmv) }));
  const priorPoints = trendData.map((d, i) => ({ x: getX(i), y: getY(d.priorGmv) }));

  // Smooth Spline Curves
  const currentSplineD = getSmoothSplinePath(currentPoints);
  const priorSplineD = getSmoothSplinePath(priorPoints);

  // Gradient area path
  const currentAreaD = `${currentSplineD} L ${getX(trendData.length - 1)},${padding.top + chartHeight} L ${getX(0)},${padding.top + chartHeight} Z`;

  // Y-axis ticks (4 intervals)
  const yTicks = [0, maxGmv * 0.33, maxGmv * 0.66, maxGmv];

  // Mouse move handler for interactive scrubber
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const svgX = (clientX / rect.width) * width;

    const relX = svgX - padding.left;
    const rawIdx = (relX / chartWidth) * (trendData.length - 1);
    const clampedIdx = Math.min(Math.max(0, Math.round(rawIdx)), trendData.length - 1);
    setHoveredIndex(clampedIdx);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const activeDay = hoveredIndex !== null ? trendData[hoveredIndex] : null;
  const activeX = hoveredIndex !== null ? getX(hoveredIndex) : null;
  const activeY = activeDay ? getY(activeDay.currentGmv) : null;

  // Find promo spike day point
  const promoSpikeIdx = trendData.findIndex((d) => d.isPromoSpike);
  const promoSpikeX = promoSpikeIdx >= 0 ? getX(promoSpikeIdx) : null;
  const promoSpikeY = promoSpikeIdx >= 0 ? getY(trendData[promoSpikeIdx].currentGmv) : null;

  return (
    <section className="ct-chart-card" aria-label="30-Day GMV Trend">
      {/* Header: Title, Peak & Avg Summary, and Clean Legend */}
      <div className="ct-chart-card__header">
        <div className="ct-chart-card__title-group">
          <h3 className="ct-chart-card__title">30-Day GMV Trend</h3>
          <span className="ct-chart-card__subtitle">
            Puncak: <strong>{peakGmvFormatted}</strong> • Rata-rata: <strong>{avgGmvFormatted}</strong>
          </span>
        </div>

        {/* Legend */}
        <div className="ct-chart-legend">
          <div className="ct-chart-legend__item">
            <span className="ct-chart-legend__color ct-chart-legend__color--primary" />
            <span className="ct-chart-legend__label">Current Period (Aug)</span>
          </div>
          <div className="ct-chart-legend__item">
            <span className="ct-chart-legend__color ct-chart-legend__color--prior" />
            <span className="ct-chart-legend__label">Previous Period (Jul)</span>
          </div>
        </div>
      </div>

      <div className="ct-chart-wrapper">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="ct-chart-svg ct-chart-svg--interactive"
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            if (activeDay) onPointClick(activeDay);
          }}
        >
          <defs>
            <linearGradient id="gmvSmoothGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6C5CE7" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#6C5CE7" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#6C5CE7" stopOpacity="0.0" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#6C5CE7" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Horizontal Grid Lines */}
          {yTicks.map((tick, idx) => {
            const y = getY(tick);
            return (
              <g key={`ytick-${idx}`}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="var(--border-light)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 12}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="var(--text-muted)"
                  fontFamily="var(--font-mono)"
                >
                  Rp {(tick / 1_000_000).toFixed(0)}M
                </text>
              </g>
            );
          })}

          {/* Area Fill under Current Period Spline */}
          <path d={currentAreaD} fill="url(#gmvSmoothGradient)" />

          {/* Previous Period Line (Smooth Dashed Curve) */}
          <path
            d={priorSplineD}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />

          {/* Current Period Line (Smooth Solid Vibrant Purple Spline with Glow) */}
          <path
            d={currentSplineD}
            fill="none"
            stroke="#6C5CE7"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowEffect)"
          />

          {/* Clean Minimalist Promo Spike Beacon (Aug 18) */}
          {promoSpikeX !== null && promoSpikeY !== null && (
            <g className="ct-chart-beacon">
              <circle
                cx={promoSpikeX}
                cy={promoSpikeY}
                r="8"
                fill="none"
                stroke="#F97316"
                strokeWidth="1.5"
                className="ct-beacon-pulse"
              />
              <circle
                cx={promoSpikeX}
                cy={promoSpikeY}
                r="4.5"
                fill="#F97316"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Interactive Vertical Scrubber Crosshair & Active Point Marker */}
          {activeX !== null && activeY !== null && activeDay && (
            <g className="ct-chart-active-scrubber">
              {/* Vertical Crosshair Line */}
              <line
                x1={activeX}
                y1={padding.top}
                x2={activeX}
                y2={padding.top + chartHeight}
                stroke="#6C5CE7"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.8"
              />

              {/* Glowing Active Marker Halo */}
              <circle
                cx={activeX}
                cy={activeY}
                r="9"
                fill="#6C5CE7"
                opacity="0.2"
              />
              {/* Inner Solid Marker Dot */}
              <circle
                cx={activeX}
                cy={activeY}
                r="5"
                fill="#FFFFFF"
                stroke={activeDay.isPromoSpike ? '#F97316' : '#6C5CE7'}
                strokeWidth="3"
              />
            </g>
          )}

          {/* X-axis Labels (Evenly spaced intervals) */}
          {trendData
            .filter((_, i) => i === 0 || (i + 1) % 5 === 0 || i === trendData.length - 1)
            .map((d) => {
              const idx = trendData.findIndex((item) => item.date === d.date);
              const x = getX(idx);
              return (
                <text
                  key={`x-${d.date}`}
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-muted)"
                  fontFamily="var(--font-primary)"
                  fontWeight="500"
                >
                  Aug {d.dayIndex}
                </text>
              );
            })}
        </svg>

        {/* Hover Floating Tooltip Card */}
        {activeDay && activeX !== null && (
          <div
            className="ct-chart-tooltip"
            style={{
              left: `${Math.min(Math.max((activeX / width) * 100, 16), 84)}%`,
            }}
          >
            <div className="ct-chart-tooltip__header">
              <strong>{activeDay.dateLabel}</strong>
              {activeDay.isPromoSpike && (
                <Badge variant="warning" size="sm">
                  ⚡ Promo Spike
                </Badge>
              )}
            </div>

            {activeDay.spikeReason && (
              <div className="ct-chart-tooltip__spike-note">
                <span>{activeDay.spikeReason}</span>
              </div>
            )}

            <div className="ct-chart-tooltip__row">
              <span>Daily GMV:</span>
              <strong className="ct-text-primary">{activeDay.currentGmvFormatted}</strong>
            </div>
            <div className="ct-chart-tooltip__row">
              <span>Prior Period (Jul):</span>
              <span>{activeDay.priorGmvFormatted}</span>
            </div>
            <div className="ct-chart-tooltip__row">
              <span>Valid Orders:</span>
              <span>{activeDay.validOrdersCount} orders</span>
            </div>
            <div className="ct-chart-tooltip__row">
              <span>AOV:</span>
              <span>{activeDay.aovFormatted}</span>
            </div>
            <div className="ct-chart-tooltip__row">
              <span>Active Buyers:</span>
              <span>{activeDay.activeBuyersCount} toko</span>
            </div>

            <div className="ct-chart-tooltip__action-hint">
              <span>💡 Klik untuk analisis drill-down</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
