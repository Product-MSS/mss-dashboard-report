import React, { useState } from 'react'
import type { OnboardingFunnelData } from '../models/types'
import { Badge } from '@/shared/components/Badge'

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
      <div className="ct-widget-card" aria-busy="true">
        <div className="ct-widget-card__header">
          <div className="ct-widget-card__title-group">
            <h3 className="ct-widget-card__title">Onboarding Funnel</h3>
          </div>
        </div>
        <div className="ct-skeleton-chart" style={{ height: '280px' }} />
      </div>
    )
  }

  const regTotal = data.newRegistrants || 2430
  const verTotal = data.verifiedTotal || 2120
  const actTotal = data.activatedTotal || 726

  const verRate = ((verTotal / regTotal) * 100).toFixed(1)
  const actRateOfReg = ((actTotal / regTotal) * 100).toFixed(1)

  const formatK = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2)}K`
    }
    return val.toString()
  }

  const stages = [
    {
      id: 1,
      name: 'Register',
      count: regTotal,
      formattedCount: formatK(regTotal),
      pct: 100,
      pctDisplay: '100%',
    },
    {
      id: 2,
      name: 'Verified',
      count: verTotal,
      formattedCount: formatK(verTotal),
      pct: Number(verRate),
      pctDisplay: `${verRate}%`,
    },
    {
      id: 3,
      name: 'Active',
      count: actTotal,
      formattedCount: formatK(actTotal),
      pct: Number(actRateOfReg),
      pctDisplay: `${actRateOfReg}%`,
    },
  ]

  const yTicks = [100, 75, 50, 25, 0]

  return (
    <div className="ct-widget-card" aria-label="Onboarding Funnel Widget">
      {/* Header */}
      <div className="ct-widget-card__header">
        <div className="ct-widget-card__title-group">
          <h3 className="ct-widget-card__title">Onboarding Funnel</h3>
        </div>
        <Badge variant="primary" size="md">
          3-Stage Funnel
        </Badge>
      </div>

      {/* Vertical Column Funnel Chart */}
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

          {/* 3 Columns */}
          <div className="ct-col-funnel-columns">
            {stages.map((st, idx) => (
              <div
                key={st.id}
                className={`ct-col-funnel-column-wrapper ${hoveredIndex === idx ? 'ct-col-funnel-column--hovered' : ''
                  }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Full Height Track */}
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

                  {/* Solid Brand Violet Bar Fill */}
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
