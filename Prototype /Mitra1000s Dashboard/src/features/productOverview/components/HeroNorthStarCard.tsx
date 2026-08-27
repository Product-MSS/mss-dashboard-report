import React from 'react';
import type { NorthStarSummaryDto } from '../models/productOverviewDto';
import { Badge } from '@/shared/components/Badge';
import { Icons8 } from '@/shared/components/Icons8';

interface HeroNorthStarCardProps {
  data: NorthStarSummaryDto;
  onInspect: () => void;
}

export const HeroNorthStarCard: React.FC<HeroNorthStarCardProps> = ({ data, onInspect }) => {
  return (
    <div
      className="ct-hero-card"
      onClick={onInspect}
      role="button"
      tabIndex={0}
      title={`Full Amount: ${data.currentGmvFormatted} — Click for deep-dive analysis`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onInspect();
        }
      }}
    >
      {/* Header: Clean Tag, Title, and Subtle Arrow */}
      <div className="ct-hero-card__header">
        <div className="ct-hero-card__title-group">
          <span className="ct-hero-card__tag">NORTH STAR METRIC</span>
          <h2 className="ct-hero-card__title">{data.title}</h2>
        </div>
        <span className="ct-hero-card__arrow-btn" aria-label="Drill down">
          <Icons8 name="arrow-up-right" size={16} />
        </span>
      </div>

      {/* Main Stat & Growth Delta */}
      <div className="ct-hero-card__body">
        <div className="ct-hero-card__main-stat">
          <span className="ct-hero-card__value">{data.currentGmvShort}</span>
          <div className="ct-hero-card__delta-group">
            <Badge variant="success" size="md">
              ▲ {data.growthDelta.formatted}
            </Badge>
            <span className="ct-hero-card__delta-context">
              {data.growthDelta.comparisonPeriodLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Clean Inline Micro-KPIs Decomposition */}
      <div className="ct-hero-card__quality-section">
        <div className="ct-hero-card__micro-kpi">
          <span className="ct-micro-kpi__label">
            <Icons8 name="orders" size={13} color="var(--text-muted)" />
            <span>Valid Orders</span>
          </span>
          <div className="ct-micro-kpi__val-row">
            <strong className="ct-micro-kpi__value">{data.validOrders.toLocaleString('en-US')}</strong>
            <span className="ct-micro-kpi__delta ct-text-success">
              (+{data.validOrdersGrowthPercent}%)
            </span>
          </div>
        </div>

        <div className="ct-hero-card__micro-kpi">
          <span className="ct-micro-kpi__label">
            <Icons8 name="revenue" size={13} color="var(--text-muted)" />
            <span>Average Order Value</span>
          </span>
          <div className="ct-micro-kpi__val-row">
            <strong className="ct-micro-kpi__value">{data.aovFormatted}</strong>
            <span className="ct-micro-kpi__delta ct-text-success">
              (+{data.aovGrowthPercent}%)
            </span>
          </div>
        </div>

        <div className="ct-hero-card__micro-kpi">
          <span className="ct-micro-kpi__label">
            <Icons8 name="store" size={13} color="var(--text-muted)" />
            <span>Active Buyers</span>
          </span>
          <div className="ct-micro-kpi__val-row">
            <strong className="ct-micro-kpi__value">{data.activeBuyers.toLocaleString('en-US')} Stores</strong>
            <span className="ct-micro-kpi__delta ct-text-success">
              (+{data.activeBuyersGrowthPercent}%)
            </span>
          </div>
        </div>

        <div className="ct-hero-card__micro-kpi">
          <span className="ct-micro-kpi__label">
            <Icons8 name="frequency" size={13} color="var(--text-muted)" />
            <span>Order Frequency</span>
          </span>
          <div className="ct-micro-kpi__val-row">
            <strong className="ct-micro-kpi__value">{data.orderFrequency}x</strong>
            <span className="ct-micro-kpi__sub">/ buyer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

