import React from 'react';
import type { AnomalyAlertDto } from '../models/productOverviewDto';
import { Icons8 } from '@/shared/components/Icons8';

interface WhatNeedsAttentionProps {
  anomalies: AnomalyAlertDto[];
  onActionClick?: (route: string, actionKey?: string) => void;
  onSecondaryActionClick?: (actionKey: string, alertTitle: string) => void;
}

export const WhatNeedsAttention: React.FC<WhatNeedsAttentionProps> = ({ anomalies }) => {
  if (!anomalies || anomalies.length === 0) {
    return (
      <section className="ct-attention-section" aria-label="What Needs Attention">
        <div className="ct-attention-empty">
          <span className="ct-attention-empty__icon">
            <Icons8 name="sparkle" size={24} color="#10B981" />
          </span>
          <p>Semua metrik dan alur transaksi berjalan normal tanpa anomali kritis.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ct-attention-section" aria-label="What Needs Attention">
      {/* Clean Section Header */}
      <div className="ct-attention-section__header">
        <div className="ct-attention-section__title-group">
          <h3 className="ct-attention-section__title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons8 name="alert-triangle" size={18} color="#DC2626" />
            <span>WHAT NEEDS ATTENTION?</span>
          </h3>
          <span className="ct-attention-section__subtitle">
            Deteksi Anomali & Evaluasi Dampak Transaksi Otomatis (Proactive PM Alerts)
          </span>
        </div>
      </div>

      {/* Clean Minimalist Alert Cards */}
      <div className="ct-attention-list">
        {anomalies.map((alert) => {
          const isCritical = alert.severity === 'critical';
          const cardClass = isCritical
            ? 'ct-anomaly-card--critical'
            : 'ct-anomaly-card--warning';

          return (
            <div key={alert.id} className={`ct-anomaly-card ${cardClass}`}>
              {/* Top Row: Micro-tag + Incident Title + Lost GMV Highlight */}
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

                {alert.estimatedLostGmvFormatted && (
                  <span className="ct-anomaly-impact-badge">
                    {alert.estimatedLostGmvFormatted}
                  </span>
                )}
              </div>

              {/* Concise Narrative Summary */}
              <div className="ct-anomaly-card__summary">
                <p className="ct-anomaly-summary-text">
                  <span className="ct-anomaly-root-cause">{alert.rootCause}</span>
                  {alert.affectedSegment && (
                    <span className="ct-anomaly-segment"> • <em>{alert.affectedSegment}</em></span>
                  )}
                </p>
              </div>

              {/* Minimalist Micro Chips for Top Items / Queries */}
              {alert.topAffectedQueries && alert.topAffectedQueries.length > 0 && (
                <div className="ct-anomaly-query-chips">
                  {alert.topAffectedQueries.map((query, qIdx) => {
                    const isTruck = query.toLowerCase().includes('radius') || query.toLowerCase().includes('truk');
                    const isCart = query.toLowerCase().includes('gagal') || query.toLowerCase().includes('stok');
                    return (
                      <span key={qIdx} className="ct-query-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Icons8
                          name={isTruck ? 'truck' : isCart ? 'cart-alert' : 'search'}
                          size={11}
                          color="var(--text-muted)"
                        />
                        <span>{query}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

