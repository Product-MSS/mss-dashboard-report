// ==============================================================================
// Product Overview Models & DTOs — Mitra1000s Control Tower
// Reference: planning/Product_Overview.md & PM_Metrics_Playbook.md
// ==============================================================================

export type DateRangeOption = 'last_7_days' | 'last_30_days' | 'mtd' | 'qtd' | 'custom';
export type RegionOption = 'all' | 'dki_jakarta' | 'jawa_barat' | 'jawa_tengah' | 'jawa_timur' | 'banten' | 'luar_jawa';
export type RoleOption = 'all' | 'retailer' | 'distributor' | 'supplier';
export type DistributorOption = 'all' | 'semen_gresik_jabar' | 'baja_perkasa' | 'cat_nusantara';
export type SalesForceOption = 'all' | 'sales_force' | 'organic';

export interface GlobalFilterState {
  dateRange: DateRangeOption;
  region: RegionOption;
  role: RoleOption;
  distributorId: DistributorOption;
  salesForceId: SalesForceOption;
}

export type MetricPolarityStatus = 'good' | 'warning' | 'critical' | 'neutral';

export interface MetricDelta {
  value: number; // e.g. 8.2 or -5.4
  formatted: string; // e.g. "+8.2%" or "-5.4%"
  isPositiveDirection: boolean;
  status: MetricPolarityStatus;
  comparisonPeriodLabel: string; // e.g. "vs previous 30 days" or "WoW"
}

export interface NorthStarSummaryDto {
  title: string;
  currentGmv: number; // in IDR
  currentGmvFormatted: string; // e.g. "Rp 12.480.000.000"
  currentGmvShort: string; // e.g. "Rp 12.48 B"
  priorGmv: number;
  priorGmvFormatted: string;
  nominalGrowthRp: number;
  growthDelta: MetricDelta;
  // GMV Quality Decomposition Breakdown
  validOrders: number;
  validOrdersGrowthPercent: number;
  aov: number;
  aovFormatted: string;
  aovGrowthPercent: number;
  activeBuyers: number;
  activeBuyersGrowthPercent: number;
  orderFrequency: number;
}

export interface KpiDriverCardDto {
  id: 'acquisition' | 'activation' | 'retention' | 'revenue';
  categoryLabel: string; // e.g. "1️⃣ ACQUISITION"
  metricTitle: string; // e.g. "New Verified Toko (CPD/BNN)"
  currentValueFormatted: string; // e.g. "2,430" or "36.4%"
  currentValueRaw: number;
  isPercentage: boolean;
  delta: MetricDelta;
  targetValue: number;
  targetFormatted: string;
  targetGapFormatted: string;
  isTargetAchieved: boolean;
  drillDownLabel: string; // e.g. "View Growth Funnel"
  drillDownRoute: string;
}

export interface GmvTrendDayDto {
  dayIndex: number;
  date: string; // e.g. "2026-08-18"
  dateLabel: string; // e.g. "Day 18 (Tue, Aug 18)"
  currentGmv: number;
  currentGmvFormatted: string;
  priorGmv: number;
  priorGmvFormatted: string;
  validOrdersCount: number;
  aovFormatted: string;
  activeBuyersCount: number;
  isPromoSpike?: boolean;
  spikeReason?: string;
  topDistributors: Array<{
    name: string;
    gmvFormatted: string;
    sharePercent: number;
  }>;
}

export interface GmvDriverImpactDto {
  id: string;
  driverName: string;
  subLabel: string;
  currentValueFormatted: string;
  changeFormatted: string;
  nominalImpactRp: number;
  nominalImpactFormatted: string;
  impactType: 'positive' | 'negative' | 'neutral';
  relativeBarWidthPercent: number; // 0 to 100% for bar chart
  insightDescription: string;
}

export interface ProductHealthTelemetryDto {
  id: string;
  name: string;
  valueFormatted: string;
  targetSlaFormatted: string;
  status: 'healthy' | 'warning' | 'critical';
  statusLabel: string; // e.g. "Normal", "Warning", "Critical"
  signalNote: string;
}

export interface AnomalyAlertDto {
  id: string;
  severity: 'critical' | 'warning';
  title: string;
  badgeLabel: string;
  rootCause: string;
  topAffectedQueries?: string[];
  affectedSegment: string;
  estimatedLostGmvFormatted?: string;
  recommendedAction: string;
  actionCtaPrimary: {
    label: string;
    route: string;
  };
  actionCtaSecondary?: {
    label: string;
    actionKey: string;
  };
}

export interface DrillDownInspectionDto {
  type: 'trend_day' | 'kpi_card' | 'anomaly';
  title: string;
  subtitle: string;
  dateOrCohort?: string;
  summaryMetrics: Array<{
    label: string;
    value: string;
    badge?: string;
    status?: MetricPolarityStatus;
  }>;
  breakdownTable?: {
    headers: string[];
    rows: Array<Array<string | number>>;
  };
  rootCauseAnalysis?: string;
  actionCta: {
    label: string;
    targetRoute: string;
  };
}

export interface ProductOverviewSummaryDto {
  filter: GlobalFilterState;
  lastUpdatedTime: string;
  dataFreshnessLagMinutes: number;
  northStar: NorthStarSummaryDto;
  kpiDrivers: KpiDriverCardDto[];
  trend30Days: GmvTrendDayDto[];
  driversImpact: {
    totalGmvDeltaRp: number;
    totalGmvDeltaFormatted: string;
    totalGmvDeltaPercent: number;
    drivers: GmvDriverImpactDto[];
  };
  productHealth: {
    metrics: ProductHealthTelemetryDto[];
    healthyCount: number;
    warningCount: number;
    criticalCount: number;
  };
  anomalies: AnomalyAlertDto[];
}
