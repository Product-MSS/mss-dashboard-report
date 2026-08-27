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
  if (id.includes('revenue')) return 'revenue';
  return 'growth';
};

export const KpiDriversGrid: React.FC<KpiDriversGridProps> = ({ drivers, onInspect }) => {
  return (
    <div className="ct-unified-kpi-card" aria-label="Key Performance Indicators">
      {/* Header matching North Star Style */}
      <div className="ct-unified-kpi-card__header">
        <div className="ct-unified-kpi-card__title-group">
          <span className="ct-unified-kpi-card__tag">CORE DRIVER METRICS</span>
          <h2 className="ct-unified-kpi-card__title">Key Performance Indicators</h2>
          <span className="ct-unified-kpi-card__note">
            * Funnel metrics are scoped by Date & Region only; Supplier & Selling Agent filters do not apply
          </span>
        </div>
      </div>

      {/* 4-Column Internal Grid with Interactive Hover Columns */}
      <div className="ct-unified-kpi-card__grid">
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
              className="ct-kpi-column"
              onClick={() => onInspect(kpi.id)}
              role="button"
              tabIndex={0}
              title={`Click to view deep-dive analysis for ${kpi.metricTitle}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onInspect(kpi.id);
                }
              }}
            >
              {/* Column Category & Title */}
              <div className="ct-kpi-column__header">
                <div className="ct-kpi-column__category-row">
                  <Icons8 name={getKpiIcon(kpi.id)} size={13} color="var(--text-muted)" />
                  <span className="ct-kpi-column__category">{kpi.categoryLabel}</span>
                </div>
                <h3 className="ct-kpi-column__title">{kpi.metricTitle}</h3>
              </div>

              {/* Big Value + Delta Badge */}
              <div className="ct-kpi-column__body">
                <span className="ct-kpi-column__value">{kpi.currentValueFormatted}</span>
                <Badge variant={badgeVariant} size="sm">
                  {deltaPrefix} {kpi.delta.formatted}
                </Badge>
              </div>

              {/* Footer: Dynamic Comparison text above Target with matching typography */}
              <div className="ct-kpi-column__footer">
                <span className="ct-kpi-column__comparison-label">
                  {kpi.comparisonPeriodText || kpi.delta.comparisonPeriodLabel}
                </span>
                <span className="ct-kpi-column__target-label">
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
      </div>
    </div>
  );
};
