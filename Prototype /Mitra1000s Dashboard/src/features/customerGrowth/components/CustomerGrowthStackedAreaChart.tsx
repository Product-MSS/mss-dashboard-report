import React, { useState, useRef, useMemo } from 'react'
import type { GrowthTrendPoint } from '../models/types'

interface CustomerGrowthStackedAreaChartProps {
  data: GrowthTrendPoint[]
  isLoading?: boolean
}

export const CustomerGrowthStackedAreaChart: React.FC<CustomerGrowthStackedAreaChartProps> = ({
  data,
  isLoading,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const width = 640
  const height = 280
  const padding = { top: 25, right: 25, bottom: 40, left: 50 }

  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom

  // Calculate scales
  const { maxVal, points } = useMemo(() => {
    if (!data || data.length === 0) {
      return { maxVal: 100, points: [] }
    }
    const max = Math.max(...data.map((d) => d.registered), 100) * 1.15
    const computedPoints = data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1 || 1)) * innerWidth
      const yReg = padding.top + innerHeight - (d.registered / max) * innerHeight
      const yVer = padding.top + innerHeight - (d.verified / max) * innerHeight
      const yAct = padding.top + innerHeight - (d.activated / max) * innerHeight
      return { ...d, x, yReg, yVer, yAct }
    })
    return { maxVal: max, points: computedPoints }
  }, [data, innerHeight, innerWidth, padding.left, padding.top])

  // Build SVG path generators
  const buildAreaPath = (yKey: 'yReg' | 'yVer' | 'yAct') => {
    if (points.length === 0) return ''
    const baseBottom = padding.top + innerHeight
    let path = `M ${points[0].x} ${points[0][yKey]}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cx1 = prev.x + (curr.x - prev.x) / 2
      const cx2 = cx1
      path += ` C ${cx1} ${prev[yKey]}, ${cx2} ${curr[yKey]}, ${curr.x} ${curr[yKey]}`
    }
    path += ` L ${points[points.length - 1].x} ${baseBottom} L ${points[0].x} ${baseBottom} Z`
    return path
  }

  const buildLinePath = (yKey: 'yReg' | 'yVer' | 'yAct') => {
    if (points.length === 0) return ''
    let path = `M ${points[0].x} ${points[0][yKey]}`
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const cx1 = prev.x + (curr.x - prev.x) / 2
      const cx2 = cx1
      path += ` C ${cx1} ${prev[yKey]}, ${cx2} ${curr[yKey]}, ${curr.x} ${curr[yKey]}`
    }
    return path
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || points.length === 0) return
    const rect = svgRef.current.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * width

    let closestIdx = 0
    let minDistance = Infinity
    points.forEach((pt, idx) => {
      const dist = Math.abs(pt.x - mouseX)
      if (dist < minDistance) {
        minDistance = dist
        closestIdx = idx
      }
    })
    setHoverIndex(closestIdx)
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
  }

  const activePoint = hoverIndex !== null ? points[hoverIndex] : null

  const formatGmv = (val: number) => {
    if (val >= 1_000_000_000) {
      return `Rp ${(val / 1_000_000_000).toFixed(2)} B`
    }
    return `Rp ${(val / 1_000_000).toFixed(1)} M`
  }

  if (isLoading || points.length === 0) {
    return (
      <div className="ct-chart-card" aria-busy="true">
        <div className="ct-skeleton-chart" style={{ height: '320px' }} />
      </div>
    )
  }

  const isDaily = points.length > 0 && !isNaN(Number(points[0].date.slice(0, 2)))

  return (
    <div className="ct-chart-card" aria-label="Customer Growth Trend Chart">
      <div className="ct-chart-card__header">
        <div className="ct-chart-card__title-group">
          <h2 className="ct-chart-card__title">Customer Growth Trend</h2>
        </div>

        <div className="ct-chart-legend">
          <div className="ct-chart-legend__item">
            <span className="ct-chart-legend__color" style={{ background: '#7C3AED' }} />
            <span>Registered</span>
          </div>
          <div className="ct-chart-legend__item">
            <span className="ct-chart-legend__color" style={{ background: '#0284C7' }} />
            <span>Verified (tokocodeidcpd)</span>
          </div>
          <div className="ct-chart-legend__item">
            <span className="ct-chart-legend__color" style={{ background: '#16A34A' }} />
            <span>Activated (1st Order)</span>
          </div>
        </div>
      </div>

      <div className="ct-chart-wrapper">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="ct-chart-svg ct-chart-svg--interactive"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id="growthGradReg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="growthGradVer" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="growthGradAct" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding.top + innerHeight * (1 - ratio)
            const labelVal = Math.round(maxVal * ratio)
            return (
              <g key={i} className="ct-chart-grid-line">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#94A3B8"
                  fontSize="11"
                  fontFamily="var(--font-mono, monospace)"
                >
                  {labelVal.toLocaleString()}
                </text>
              </g>
            )
          })}

          {/* Area Fills */}
          <path d={buildAreaPath('yReg')} fill="url(#growthGradReg)" />
          <path d={buildAreaPath('yVer')} fill="url(#growthGradVer)" />
          <path d={buildAreaPath('yAct')} fill="url(#growthGradAct)" />

          {/* Stroke Lines */}
          <path d={buildLinePath('yReg')} fill="none" stroke="#7C3AED" strokeWidth="2.5" />
          <path d={buildLinePath('yVer')} fill="none" stroke="#0284C7" strokeWidth="2.5" />
          <path d={buildLinePath('yAct')} fill="none" stroke="#16A34A" strokeWidth="2.5" />

          {/* Dynamic X Axis Labels: Daily vs Multi-Month vs Multi-Year (2 Years) */}
          {points.map((pt, idx) => {
            let showLabel = true
            if (isDaily) {
              showLabel =
                idx === 0 ||
                idx === 4 ||
                idx === 9 ||
                idx === 14 ||
                idx === 19 ||
                idx === 24 ||
                idx === points.length - 1
            } else if (points.length > 14) {
              // 2-Year range (e.g. 24 months): show every 3 months (Quarterly) + last month
              showLabel = idx % 3 === 0 || idx === points.length - 1
            }

            if (!showLabel) return null
            return (
              <text
                key={idx}
                x={pt.x}
                y={height - 12}
                textAnchor="middle"
                fill="#64748B"
                fontSize="11"
                fontWeight="500"
                fontFamily="var(--font-mono, monospace)"
              >
                {pt.date}
              </text>
            )
          })}

          {/* Hairline Cursor & Highlight Dots */}
          {activePoint && (
            <g className="ct-chart-scrubber">
              <line
                x1={activePoint.x}
                y1={padding.top}
                x2={activePoint.x}
                y2={padding.top + innerHeight}
                stroke="#7C3AED"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.yReg}
                r="5"
                fill="#7C3AED"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.yVer}
                r="5"
                fill="#0284C7"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.yAct}
                r="5"
                fill="#16A34A"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Minimalist 1-Line Clean Tooltip HUD */}
        {activePoint && (
          <div
            className="ct-chart-tooltip"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              transform:
                activePoint.x > width * 0.65
                  ? 'translateX(-105%)'
                  : 'translateX(10px)',
              minWidth: '190px',
              padding: '8px 12px',
              gap: '4px',
            }}
          >
            <div
              className="ct-chart-tooltip__header"
              style={{
                fontSize: '12.5px',
                paddingBottom: '4px',
                marginBottom: '2px',
                fontWeight: 700,
              }}
            >
              <span>{activePoint.fullDate || activePoint.date}</span>
            </div>
            <div className="ct-chart-tooltip__row">
              <span style={{ color: '#A78BFA' }}>● Registered:</span>
              <strong>{activePoint.registered.toLocaleString()}</strong>
            </div>
            <div className="ct-chart-tooltip__row">
              <span style={{ color: '#38BDF8' }}>● Verified:</span>
              <strong>{activePoint.verified.toLocaleString()}</strong>
            </div>
            <div className="ct-chart-tooltip__row">
              <span style={{ color: '#4ADE80' }}>● Activated:</span>
              <strong>{activePoint.activated.toLocaleString()}</strong>
            </div>
            <div
              className="ct-chart-tooltip__row"
              style={{
                borderTop: '1px dashed rgba(255,255,255,0.15)',
                paddingTop: '3px',
                marginTop: '2px',
              }}
            >
              <span style={{ color: '#FCD34D' }}>💰 GMV:</span>
              <strong style={{ color: '#34D399' }}>{formatGmv(activePoint.cohortGmv)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
