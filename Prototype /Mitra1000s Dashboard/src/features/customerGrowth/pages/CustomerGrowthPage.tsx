import React from 'react'
import { useCustomerGrowthData } from '../hooks/useCustomerGrowthData'
import { CustomerGrowthHeader } from '../components/CustomerGrowthHeader'
import { CustomerGrowthKpiCards } from '../components/CustomerGrowthKpiCards'
import { CustomerGrowthStackedAreaChart } from '../components/CustomerGrowthStackedAreaChart'
import { OnboardingFunnelWidget } from '../components/OnboardingFunnelWidget'
import { RegionalDiagnosticTable } from '../components/RegionalDiagnosticTable'
import { SellingAgentPerformanceTable } from '../components/SellingAgentPerformanceTable'
import { GrowthDiagnosticsAlerts } from '../components/GrowthDiagnosticsAlerts'
import './styles.css'

export const CustomerGrowthPage: React.FC = () => {
  const {
    filters,
    kpiSummary,
    trendData,
    funnelData,
    regionalDiagnostics,
    sellingAgents,
    anomalyAlerts,
    isLoading,
    updateFilters,
    setPresetDateRange,
    resetFilters,
  } = useCustomerGrowthData()

  return (
    <div className="ct-page ct-page--growth" aria-label="Customer Growth & Acquisition Dashboard">
      {/* Top Header */}
      <header className="ct-page__header">
        <div className="ct-page__title-group">
          <h1 className="ct-page__title">Growth & Customer Acquisition</h1>
        </div>
      </header>

      {/* 1. Global Context Filter Bar Provider */}
      <CustomerGrowthHeader
        filters={filters}
        onUpdateFilters={updateFilters}
        onPresetDateRange={setPresetDateRange}
        onResetFilters={resetFilters}
      />

      {/* 2. 4 Core Unified KPI Cards Container */}
      <CustomerGrowthKpiCards summary={kpiSummary} isLoading={isLoading} />

      {/* 3. Split Row: Stacked Area Growth Flow & 3-Stage Onboarding Funnel */}
      <div className="ct-growth-split-grid">
        <CustomerGrowthStackedAreaChart data={trendData} isLoading={isLoading} />
        <OnboardingFunnelWidget data={funnelData} isLoading={isLoading} />
      </div>

      {/* 4. Regional Performance & Verification Diagnostic Table (Poin 5.5) */}
      <RegionalDiagnosticTable data={regionalDiagnostics} isLoading={isLoading} />

      {/* 5. Selling Agent Performance & Adoption Quality Table (Poin 5.6) */}
      <SellingAgentPerformanceTable data={sellingAgents} isLoading={isLoading} />

      {/* 6. Smart Growth Anomaly Engine Alerts (Poin 5.7) */}
      <GrowthDiagnosticsAlerts alerts={anomalyAlerts} isLoading={isLoading} />
    </div>
  )
}

export default CustomerGrowthPage
