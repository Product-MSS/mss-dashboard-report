import React, { useState } from 'react'
import type { OnboardingFunnelData } from '../models/types'

interface OnboardingFunnelWidgetProps {
  data: OnboardingFunnelData | null
  isLoading?: boolean
}

export const OnboardingFunnelWidget: React.FC<OnboardingFunnelWidgetProps> = ({
  data,
  isLoading,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (isLoading || !data) {
    return (
      <div className="ct-chart-card" aria-busy="true">
        <div className="ct-chart-card__header">
          <div className="ct-chart-card__title-group">
            <h2 className="ct-chart-card__title">Onboarding Funnel</h2>
          </div>
        </div>
        <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ct-skeleton-chart" style={{ width: '90%', height: '80%', background: '#F1F5F9', borderRadius: '8px' }} />
        </div>
      </div>
    )
  }

  const regTotal = data.newRegistrants || 2430
  const verTotal = data.verifiedTotal || 2120
  const actTotal = data.activatedTotal || 726

  const verRateOfReg = ((verTotal / regTotal) * 100).toFixed(1)
  const actRateOfReg = ((actTotal / regTotal) * 100).toFixed(1)

  const formatK = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2)}K`
    }
    return val.toLocaleString()
  }

  const stages = [
    {
      id: 1,
      name: 'Register',
      count: regTotal,
      formattedCount: formatK(regTotal),
      pct: 100,
      pctDisplay: '100%',
      subtext: 'New Signups',
    },
    {
      id: 2,
      name: 'Verified',
      count: verTotal,
      formattedCount: formatK(verTotal),
      pct: Number(verRateOfReg),
      pctDisplay: `${verRateOfReg}%`,
      subtext: 'tokocodeidcpd',
    },
    {
      id: 3,
      name: 'Active',
      count: actTotal,
      formattedCount: formatK(actTotal),
      pct: Number(actRateOfReg),
      pctDisplay: `${actRateOfReg}%`,
      subtext: '1st Order Done',
    },
  ]

  const yTicks = [100, 75, 50, 25, 0]

  return (
    <div className="ct-chart-card" aria-label="Onboarding Funnel Widget">
      {/* Header matching Customer Growth Trend */}
      <div className="ct-chart-card__header">
        <div className="ct-chart-card__title-group">
          <h2 className="ct-chart-card__title">Onboarding Funnel</h2>
        </div>
      </div>

      {/* Vertical Continuous Touching Blocks Funnel */}
      <div className="ct-col-funnel-container">
        {/* Y-Axis Grid & Labels */}
        <div className="ct-col-funnel-yaxis">
          {yTicks.map((tick) => (
            <div key={tick} className="ct-col-funnel-ytick">
              <span className="ct-col-funnel-ylabel">{tick}%</span>
            </div>
          ))}
        </div>

        {/* Chart Canvas Area */}
        <div className="ct-col-funnel-canvas">
          {/* Horizontal Gridlines */}
          <div className="ct-col-funnel-gridlines">
            {yTicks.map((tick) => (
              <div
                key={tick}
                className="ct-col-funnel-gridline"
                style={{ bottom: `${tick}%` }}
              />
            ))}
          </div>

          {/* 3 Continuous Touching Columns */}
          <div className="ct-col-funnel-columns">
            {stages.map((st, idx) => (
              <div
                key={st.id}
                className={`ct-col-funnel-column-wrapper ${
                  hoveredIndex === idx ? 'ct-col-funnel-column--hovered' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Wide Track with White Divider */}
                <div className="ct-col-funnel-track">
                  {/* Floating Badge Pill positioned at top of fill */}
                  <div
                    className="ct-col-funnel-badge"
                    style={{
                      bottom: `calc(${st.pct}% - 14px)`,
                    }}
                  >
                    <span className="ct-col-funnel-badge-pct">{st.pctDisplay}</span>
                    <span className="ct-col-funnel-badge-val">{st.formattedCount}</span>
                  </div>

                  {/* Gradient Bar Fill */}
                  <div
                    className="ct-col-funnel-fill"
                    style={{ height: `${st.pct}%` }}
                  />
                </div>

                {/* Bottom X-Axis Stage Label */}
                <div className="ct-col-funnel-xlabel">
                  <span className="ct-col-funnel-xnum">{st.id}</span>
                  <span className="ct-col-funnel-xname">{st.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
