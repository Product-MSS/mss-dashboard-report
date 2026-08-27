// ==============================================================================
// 4 Core KPI Drivers Grid Component — Mitra1000s Control Tower
// Clean, minimalist card design with clear visual hierarchy
// ==============================================================================

import React from 'react';
import type { KpiDriverCardDto } from '../models/productOverviewDto';
import { Badge, type BadgeVariant } from '@/shared/components/Badge';

interface KpiDriversGridProps {
  drivers: KpiDriverCardDto[];
  onInspect: (driverId: string) => void;
}

export const KpiDriversGrid: React.FC<KpiDriversGridProps> = ({ drivers, onInspect }) => {
  return (
    <section className="ct-kpi-grid" aria-label="4 Core KPI Drivers">
      {drivers.map((kpi) => {
        const isGood = kpi.delta.status === 'good';
        const isWarning = kpi.delta.status === 'warning';
        const isCritical = kpi.delta.status === 'critical';

        const badgeVariant: BadgeVariant = isGood
          ? 'success'
          : isWarning
          ? 'warning'
          : isCritical
          ? 'danger'
          : 'neutral';

        const deltaPrefix = kpi.delta.value > 0 ? '▲' : kpi.delta.value < 0 ? '▼' : '●';

        return (
          <div
            key={kpi.id}
            className="ct-kpi-card"
            onClick={() => onInspect(kpi.id)}
            role="button"
            tabIndex={0}
            title={`Klik untuk melihat detail ${kpi.metricTitle}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onInspect(kpi.id);
              }
            }}
          >
            {/* Header: Eyebrow Category & Metric Title */}
            <div className="ct-kpi-card__header">
              <span className="ct-kpi-card__category">{kpi.categoryLabel}</span>
              <h3 className="ct-kpi-card__title">{kpi.metricTitle}</h3>
            </div>

            {/* Body: Hero Big Value + Delta Trend Pill */}
            <div className="ct-kpi-card__body">
              <span className="ct-kpi-card__value">{kpi.currentValueFormatted}</span>
              <Badge variant={badgeVariant} size="sm">
                {deltaPrefix} {kpi.delta.formatted} {kpi.delta.comparisonPeriodLabel}
              </Badge>
            </div>

            {/* Footer: Clean Single-line Target Information */}
            <div className="ct-kpi-card__footer">
              <span className="ct-kpi-card__target-label">
                Target: {kpi.targetFormatted}{' '}
                <strong
                  className={kpi.isTargetAchieved ? 'ct-text-success' : 'ct-text-warning'}
                >
                  ({kpi.targetGapFormatted})
                </strong>
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
