import React from 'react'
import type { CustomerGrowthKpiSummary } from '../models/types'
import { Badge } from '@/shared/components/Badge'
import { Icons8 } from '@/shared/components/Icons8'

interface CustomerGrowthKpiCardsProps {
  summary: CustomerGrowthKpiSummary | null
  isLoading?: boolean
}

export const CustomerGrowthKpiCards: React.FC<CustomerGrowthKpiCardsProps> = ({
  summary,
  isLoading,
}) => {
  if (isLoading || !summary) {
    return (
      <div className="ct-unified-kpi-card" aria-busy="true">
        <div className="ct-unified-kpi-card__header">
          <div className="ct-unified-kpi-card__title-group">
            <span className="ct-unified-kpi-card__tag">ONBOARDING & DIGITAL ADOPTION METRICS</span>
            <h2 className="ct-unified-kpi-card__title">Customer Growth & Funnel Milestones</h2>
          </div>
        </div>
        <div className="ct-unified-kpi-card__grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="ct-kpi-column" style={{ minHeight: '140px', opacity: 0.5 }}>
              <div className="ct-skeleton-kpi-card" style={{ height: '100%', width: '100%' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Calculate Target Diff values
  const regTarget = summary.newRegistrants.target || 2236
  const regDiff = summary.newRegistrants.value - regTarget
  const regDiffFormatted = regDiff >= 0 ? `+${regDiff.toLocaleString()}` : `${regDiff.toLocaleString()}`

  const pendingTarget = summary.pendingQueue.slaTarget || 202
  const pendingDiff = pendingTarget - summary.pendingQueue.value
  const pendingDiffFormatted = pendingDiff > 0 ? `+${pendingDiff.toLocaleString()}` : `${pendingDiff.toLocaleString()}`

  const verTarget = 2000
  const verDiff = summary.verifiedStores.value - verTarget
  const verDiffFormatted = verDiff >= 0 ? `+${verDiff.toLocaleString()}` : `${verDiff.toLocaleString()}`

  const actTarget = 700
  const actDiff = summary.activatedStores.value - actTarget
  const actDiffFormatted = actDiff >= 0 ? `+${actDiff.toLocaleString()}` : `${actDiff.toLocaleString()}`

  return (
    <div className="ct-unified-kpi-card" aria-label="Customer Growth Onboarding KPI Metrics">
      {/* Header matching North Star Style */}
      <div className="ct-unified-kpi-card__header">
        <div className="ct-unified-kpi-card__title-group">
          <span className="ct-unified-kpi-card__tag">ONBOARDING & DIGITAL ADOPTION METRICS</span>
          <h2 className="ct-unified-kpi-card__title">Customer Growth & Funnel Milestones</h2>
        </div>
      </div>

      {/* 4-Column Minimalist Grid */}
      <div className="ct-unified-kpi-card__grid">
        {/* Column 1: New Registrants */}
        <div className="ct-kpi-column">
          <div className="ct-kpi-column__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons8 name="growth" size={15} color="var(--text-muted)" />
              <h3 className="ct-kpi-column__title">New Registrants</h3>
            </div>
          </div>

          <div className="ct-kpi-column__body">
            <span className="ct-kpi-column__value">
              {summary.newRegistrants.formattedValue || summary.newRegistrants.value.toLocaleString()}
            </span>
            <Badge variant="success" size="sm">
              ▲ +{summary.newRegistrants.deltaPercent}%
            </Badge>
          </div>

          <div className="ct-kpi-column__footer">
            <span className="ct-kpi-column__comparison-label">
              {summary.comparisonLabel}
            </span>
            <span className="ct-kpi-column__target-label">
              Target: {regTarget.toLocaleString()} Stores{' '}
              <strong className={regDiff >= 0 ? 'ct-text-success' : 'ct-text-warning'}>
                ({regDiffFormatted})
              </strong>
            </span>
          </div>
        </div>

        {/* Column 2: Pending Review */}
        <div className="ct-kpi-column">
          <div className="ct-kpi-column__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons8 name="frequency" size={15} color="var(--text-muted)" />
              <h3 className="ct-kpi-column__title">Pending Review</h3>
            </div>
          </div>

          <div className="ct-kpi-column__body">
            <span className="ct-kpi-column__value">
              {summary.pendingQueue.formattedValue || summary.pendingQueue.value.toLocaleString()}
            </span>
            <Badge variant="success" size="sm">
              ▼ {summary.pendingQueue.deltaPercent}%
            </Badge>
          </div>

          <div className="ct-kpi-column__footer">
            <span className="ct-kpi-column__comparison-label">
              {summary.comparisonLabel}
            </span>
            <span className="ct-kpi-column__target-label">
              Target: ≤ {pendingTarget.toLocaleString()} Stores{' '}
              <strong className={pendingDiff >= 0 ? 'ct-text-success' : 'ct-text-warning'}>
                ({pendingDiffFormatted})
              </strong>
            </span>
          </div>
        </div>

        {/* Column 3: Verified & Mapped */}
        <div className="ct-kpi-column">
          <div className="ct-kpi-column__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons8 name="store" size={15} color="var(--text-muted)" />
              <h3 className="ct-kpi-column__title">Verified</h3>
            </div>
          </div>

          <div className="ct-kpi-column__body">
            <span className="ct-kpi-column__value">
              {summary.verifiedStores.formattedValue || summary.verifiedStores.value.toLocaleString()}
            </span>
            <Badge variant="success" size="sm">
              ▲ +{summary.verifiedStores.deltaPercent}%
            </Badge>
          </div>

          <div className="ct-kpi-column__footer">
            <span className="ct-kpi-column__comparison-label">
              {summary.comparisonLabel}
            </span>
            <span className="ct-kpi-column__target-label">
              Target: {verTarget.toLocaleString()} Stores{' '}
              <strong className={verDiff >= 0 ? 'ct-text-success' : 'ct-text-warning'}>
                ({verDiffFormatted})
              </strong>
            </span>
          </div>
        </div>

        {/* Column 4: Activated (1st Order) */}
        <div className="ct-kpi-column">
          <div className="ct-kpi-column__header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icons8 name="orders" size={15} color="var(--text-muted)" />
              <h3 className="ct-kpi-column__title">Activated (1st Order)</h3>
            </div>
          </div>

          <div className="ct-kpi-column__body">
            <span className="ct-kpi-column__value">
              {summary.activatedStores.formattedValue || summary.activatedStores.value.toLocaleString()}
            </span>
            <Badge variant="success" size="sm">
              ▲ +{summary.activatedStores.deltaPercent}%
            </Badge>
          </div>

          <div className="ct-kpi-column__footer">
            <span className="ct-kpi-column__comparison-label">
              {summary.comparisonLabel}
            </span>
            <span className="ct-kpi-column__target-label">
              Target: {actTarget.toLocaleString()} Stores{' '}
              <strong className={actDiff >= 0 ? 'ct-text-success' : 'ct-text-warning'}>
                ({actDiffFormatted})
              </strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
