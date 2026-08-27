// ==============================================================================
// Product Overview (Control Tower) Master Page Component
// Slices the complete Control Tower with 4 UI States & Interactive Drill-down
// Reference: planning/Product_Overview.md & react-prd-to-code-skill
// ==============================================================================

import React from 'react';
import { useProductOverview } from '../hooks/useProductOverview';
import { GlobalFilterBar } from '../components/GlobalFilterBar';
import { HeroNorthStarCard } from '../components/HeroNorthStarCard';
import { KpiDriversGrid } from '../components/KpiDriversGrid';
import { GmvTrendChart } from '../components/GmvTrendChart';
import { GmvDriverMatrix } from '../components/GmvDriverMatrix';
import { ProductHealthPanel } from '../components/ProductHealthPanel';
import { WhatNeedsAttention } from '../components/WhatNeedsAttention';
import { DrillDownModal } from '../components/DrillDownModal';
import { Button } from '@/shared/components/Button';
import type { GmvTrendDayDto } from '../models/productOverviewDto';
import './styles.css';

interface ProductOverviewPageProps {
  onNavigateToDashboard?: (route: string) => void;
  refreshKey?: number;
  onLoadingChange?: (isLoading: boolean) => void;
}

export const ProductOverviewPage: React.FC<ProductOverviewPageProps> = ({
  onNavigateToDashboard,
  refreshKey,
  onLoadingChange,
}) => {
  const {
    summaryState,
    isLoading,
    filter,
    updateFilter,
    resetFilter,
    loadSummary,
    activeDrillDown,
    inspectItem,
    closeDrillDown,
    feedbackNotification,
    triggerActionNotification,
  } = useProductOverview();

  React.useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  React.useEffect(() => {
    if (refreshKey !== undefined && refreshKey > 0) {
      loadSummary(filter);
    }
  }, [refreshKey, loadSummary, filter]);

  const handleNavigate = (route: string) => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard(route);
    } else {
      triggerActionNotification(`Navigating to dashboard: ${route}`);
    }
  };

  const handleSecondaryAction = (actionKey: string, alertTitle: string) => {
    if (actionKey === 'add_alias') {
      triggerActionNotification(`✅ Keyword catalog alias request submitted for: "${alertTitle}"`);
    } else if (actionKey === 'trigger_campaign') {
      triggerActionNotification(`🚀 Voucher push notification campaign scheduled successfully!`);
    } else if (actionKey === 'export_churn') {
      triggerActionNotification(`📥 Exported 200 churned store records to the Sales Force team.`);
    } else {
      triggerActionNotification(`Action ${actionKey} executed successfully.`);
    }
  };

  return (
    <div className="ct-page">
      {/* Toast Notification */}
      {feedbackNotification && (
        <div className="ui-toast" role="status">
          <span>🔔 {feedbackNotification}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="ct-page__header">
        <div className="ct-page__title-group">
          <h1 className="ct-page__title">Executive Summary</h1>
        </div>
      </header>

      {/* Global Filter Bar */}
      <GlobalFilterBar
        filter={filter}
        onFilterChange={updateFilter}
        isLoading={isLoading}
      />

      {/* ── 1. Loading State (Skeleton) ────────────────────────────────── */}
      {summaryState.kind === 'loading' && (
        <main className="ct-skeleton-grid" aria-busy="true" aria-label="Loading Control Tower metrics...">
          <div className="ct-skeleton-hero" />
          <div className="ct-skeleton-kpi-row">
            <div className="ct-skeleton-kpi-card" />
            <div className="ct-skeleton-kpi-card" />
            <div className="ct-skeleton-kpi-card" />
            <div className="ct-skeleton-kpi-card" />
          </div>
          <div className="ct-skeleton-chart" />
        </main>
      )}

      {/* ── 2. Error / Failure State ───────────────────────────────────── */}
      {summaryState.kind === 'failure' && (
        <main className="ct-error-state" role="alert">
          <h2 className="ct-error-state__title">⚠️ Failed to Load Control Tower Data</h2>
          <p className="ct-error-state__msg">{summaryState.error.message}</p>
          <Button
            variant="primary"
            onClick={() => loadSummary(filter)}
          >
            🔄 Try Again
          </Button>
        </main>
      )}

      {/* ── 3. Empty State ─────────────────────────────────────────────── */}
      {summaryState.kind === 'empty' && (
        <main className="ct-empty-state">
          <span style={{ fontSize: '48px' }}>📂</span>
          <h2>No Transaction Data Found</h2>
          <p>No transactions matched the selected filter criteria.</p>
          <Button variant="primary" onClick={resetFilter}>
            Reset Filters
          </Button>
        </main>
      )}

      {/* ── 4. Populated / Success State ───────────────────────────────── */}
      {summaryState.kind === 'success' && (
        <main className="ct-content-zone">
          {/* =============================================================
              FIRST VIEWPORT (Above the Fold — Zero Scroll)
              Outcome -> Drivers -> Macro Trend
              ============================================================= */}

          {/* 1. Hero North Star Metric (GMV Net + Quality Decomposition) */}
          <HeroNorthStarCard
            data={summaryState.data.northStar}
            onInspect={() => inspectItem('kpi_card', 'revenue')}
          />

          {/* 2. 4 Core KPI Drivers (Acquisition, Activation, Retention, Revenue) */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <KpiDriversGrid
              drivers={summaryState.data.kpiDrivers}
              onInspect={(driverId) => inspectItem('kpi_card', driverId)}
            />
          </div>

          {/* 3. Dynamic GMV Dual-Line Trend Chart with Drill-down nodes */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <GmvTrendChart
              trendSummary={summaryState.data.trend}
              trendData={summaryState.data.trend30Days}
              onPointClick={(point: GmvTrendDayDto) => inspectItem('trend_day', point.date)}
            />
          </div>

          {/* =============================================================
              SECOND VIEWPORT (Below the Fold — Scroll Down)
              Diagnosis -> Action Alerts
              ============================================================= */}

          {/* 4. Lower Grid: GMV Driver Impact Matrix + Product Health */}
          <div className="ct-lower-grid" style={{ marginTop: 'var(--space-xl)' }}>
            {/* 4a. GMV Driver Matrix (3-lever waterfall impact) */}
            <GmvDriverMatrix
              drivers={summaryState.data.driversImpact.drivers}
              totalGmvDeltaFormatted={summaryState.data.driversImpact.totalGmvDeltaFormatted}
              totalGmvDeltaPercent={summaryState.data.driversImpact.totalGmvDeltaPercent}
              onInspectDriver={(driverId) => inspectItem('kpi_card', driverId.replace('driver_', ''))}
            />

            {/* 4b. Product Health Telemetry (5 indicators) */}
            <ProductHealthPanel
              metrics={summaryState.data.productHealth.metrics}
              healthyCount={summaryState.data.productHealth.healthyCount}
              warningCount={summaryState.data.productHealth.warningCount}
              criticalCount={summaryState.data.productHealth.criticalCount}
              onOpenDiagnostics={() => handleNavigate('/analytics/diagnostics')}
            />
          </div>

          {/* 5. What Needs Attention Anomaly Section */}
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <WhatNeedsAttention
              anomalies={summaryState.data.anomalies}
              onActionClick={(route) => handleNavigate(route)}
              onSecondaryActionClick={handleSecondaryAction}
            />
          </div>
        </main>
      )}

      {/* Interactive Drill-Down Inspection Modal */}
      <DrillDownModal
        data={activeDrillDown}
        isOpen={Boolean(activeDrillDown)}
        onClose={closeDrillDown}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
