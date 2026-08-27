import React from 'react'
import type { GrowthAnomalyAlert } from '../models/types'
import { Icons8 } from '@/shared/components/Icons8'

interface GrowthDiagnosticsAlertsProps {
  alerts: GrowthAnomalyAlert[]
  isLoading?: boolean
}

export const GrowthDiagnosticsAlerts: React.FC<GrowthDiagnosticsAlertsProps> = ({
  alerts,
  isLoading,
}) => {
  if (isLoading || alerts.length === 0) {
    return (
      <section className="ct-attention-section" aria-label="What Needs Attention">
        <div className="ct-attention-empty">
          <span className="ct-attention-empty__icon">
            <Icons8 name="sparkle" size={24} color="#10B981" />
          </span>
          <p>All store onboarding pipelines and verification SLAs are operating normally with no critical anomalies detected.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="ct-attention-section" aria-label="What Needs Attention">
      {/* Clean Section Header */}
      <div className="ct-attention-section__header">
        <div className="ct-attention-section__title-group">
          <h3
            className="ct-attention-section__title"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Icons8 name="alert-triangle" size={18} color="#DC2626" />
            <span>WHAT NEEDS ATTENTION?</span>
          </h3>
          <span className="ct-attention-section__subtitle">
            Automated Growth & Onboarding Diagnostic Reporting Summary
          </span>
        </div>
      </div>

      {/* Clean Minimalist Reporting Cards */}
      <div className="ct-attention-list">
        {alerts.map((alert) => {
          const isCritical = alert.severity === 'CRITICAL'
          const cardClass = isCritical
            ? 'ct-anomaly-card--critical'
            : 'ct-anomaly-card--warning'

          return (
            <div key={alert.id} className={`ct-anomaly-card ${cardClass}`}>
              {/* Top Row: Micro-tag + Incident Title + Impact Badge */}
              <div className="ct-anomaly-card__top">
                <div className="ct-anomaly-card__title-group">
                  <span
                    className={`ct-health-status-tag ${
                      isCritical
                        ? 'ct-health-status-tag--critical'
                        : 'ct-health-status-tag--warning'
                    }`}
                  >
                    ● {isCritical ? 'CRITICAL' : 'WARNING'}
                  </span>
                  <h4 className="ct-anomaly-card__title">{alert.title}</h4>
                </div>

                {alert.impactLabel && (
                  <span className="ct-anomaly-impact-badge">
                    {alert.impactLabel}
                  </span>
                )}
              </div>

              {/* Concise Reporting Narrative Summary */}
              <div className="ct-anomaly-card__summary">
                <p className="ct-anomaly-summary-text">
                  <span className="ct-anomaly-root-cause">
                    <strong>Summary:</strong> {alert.rootCause}
                  </span>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
