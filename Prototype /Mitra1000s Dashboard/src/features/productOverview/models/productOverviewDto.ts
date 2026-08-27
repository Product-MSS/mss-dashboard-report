// ==============================================================================
// Product Overview Models & DTOs — Mitra1000s Control Tower
// Reference: planning/Product_Overview.md & PM_Metrics_Playbook.md
// ==============================================================================

export type RegionOption =
  | 'all'
  | 'area_cpd'
  | 'area_bnn'
  | 'dki_jakarta'
  | 'jawa_barat'
  | 'jawa_tengah'
  | 'jawa_timur'
  | 'banten'
  | 'luar_jawa';

export type SupplierOption =
  | 'all'
  | 'semen_indonesia'
  | 'krakatau_steel'
  | 'holcim_indonesia'
  | 'arwana_citramulia';

export type SellingAgentOption =
  | 'all'
  | 'sa_semen_gresik_jabar'
  | 'sa_baja_perkasa'
  | 'sa_cat_nusantara'
  | 'sa_mitra_distrindo';

export interface GlobalFilterState {
  startYear: number;
  startMonth: number; // 1 - 12
  endYear: number;
  endMonth: number; // 1 - 12
  region: RegionOption;
  supplierId: SupplierOption;
  sellingAgentId: SellingAgentOption;
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
  categoryLabel: string; // e.g. "ACQUISITION"
  metricTitle: string; // e.g. "New Verified Stores"
  currentValueFormatted: string; // e.g. "2,430" or "36.4%"
  currentValueRaw: number;
  isPercentage: boolean;
  delta: MetricDelta;
  comparisonPeriodText: string; // e.g. "vs Jul 2026" or "vs May 2025 - Dec 2025"
  targetValue: number;
  targetFormatted: string;
  targetGapFormatted: string;
  isTargetAchieved: boolean;
  drillDownLabel: string; // e.g. "View Growth Funnel"
  drillDownRoute: string;
}

export type TrendGranularity = 'daily' | 'monthly';

export interface GmvTrendDayDto {
  pointIndex: number;
  dayIndex?: number;
  date: string; // e.g. "2026-08-18" or "2026-01"
  dateLabel: string; // e.g. "Day 18 (Aug 18)" or "January 2026"
  shortLabel: string; // e.g. "Aug 18" or "Jan '26"
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

export interface GmvTrendSummaryDto {
  granularity: TrendGranularity;
  chartTitle: string; // e.g. "30-Day GMV Trend (August 2026)" or "8-Month GMV Trend (Jan 2026 - Aug 2026)"
  peakFormatted: string; // e.g. "Rp 623M (Aug 18)" or "Rp 1.72B (Aug 2026)"
  avgFormatted: string; // e.g. "Rp 381M/day" or "Rp 1.56B/month"
  currentPeriodLegend: string; // e.g. "Current Period (Aug 2026)" or "Current Period (Jan - Aug 2026)"
  priorPeriodLegend: string; // e.g. "Previous Period (Jul 2026)" or "Prior Period (May - Dec 2025)"
  points: GmvTrendDayDto[];
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
  comparisonPeriodText: string;
  northStar: NorthStarSummaryDto;
  kpiDrivers: KpiDriverCardDto[];
  trend: GmvTrendSummaryDto;
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
