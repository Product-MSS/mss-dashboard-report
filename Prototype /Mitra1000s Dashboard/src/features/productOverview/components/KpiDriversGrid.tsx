import React from 'react';
import type { KpiDriverCardDto } from '../models/productOverviewDto';
import { Badge, type BadgeVariant } from '@/shared/components/Badge';
import { Icons8, type Icons8Name } from '@/shared/components/Icons8';

interface KpiDriversGridProps {
  drivers: KpiDriverCardDto[];
  onInspect: (driverId: string) => void;
}

const getKpiIcon = (id: string): Icons8Name => {
  if (id.includes('activation')) return 'activation';
  if (id.includes('retention')) return 'retention';
  if (id.includes('reorder')) return 'frequency';
  if (id.includes('search')) return 'search-alert';
  return 'growth';
};

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icons8 name={getKpiIcon(kpi.id)} size={13} color="var(--text-muted)" />
                <span className="ct-kpi-card__category">{kpi.categoryLabel}</span>
              </div>
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
