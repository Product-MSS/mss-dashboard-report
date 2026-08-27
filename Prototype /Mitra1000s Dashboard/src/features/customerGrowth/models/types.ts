export interface DateRangePreset {
  id: string
  label: string
  startDate: string
  endDate: string
}

export interface CustomerGrowthFilters {
  dateRange: {
    startDate: string
    endDate: string
    label?: string
  }
  region: string // 'ALL' | 'Jawa Barat' | 'Jawa Tengah' | 'Sumatera' | 'Kalbar' | 'Others'
  groupRegion: string // 'ALL' | 'CPD' | 'BNN'
  verificationMethod: string // 'ALL' | 'VERIFIED' | 'PENDING'
  sellingAgent: string // 'ALL' | agentName
}

export interface KpiMetricItem {
  value: number
  deltaPercent: number
  priorValue: number
  target?: number
  slaTarget?: number
  secondaryLabel?: string
  formattedValue?: string
}

export interface CustomerGrowthKpiSummary {
  newRegistrants: KpiMetricItem
  pendingQueue: KpiMetricItem
  verifiedStores: KpiMetricItem & { autoMatchRate: number; verificationRate: number }
  activatedStores: KpiMetricItem & { activationRate: number; cohortGmv: number }
  comparisonLabel: string
}

export interface GrowthTrendPoint {
  date: string
  fullDate?: string
  registered: number
  verified: number
  activated: number
  cohortGmv: number
}

export interface OnboardingFunnelData {
  newRegistrants: number
  autoMatched: number
  pendingReview: number
  manualApproved: number
  verifiedTotal: number
  activatedTotal: number
  pendingFirstOrder: number
}

export interface RegionalDiagnosticRecord {
  region: string
  groupRegion: 'CPD' | 'BNN'
  registered: number
  verified: number
  verifiedPercent: number
  pending: number
  slaBreachCount: number
  slaBreachPercent: number
  activated: number
  activatedPercent: number
  cohortGmv: number
}

export interface SellingAgentRecord {
  agentId: string
  agentName: string
  region: string
  groupRegion: 'CPD' | 'BNN'
  assignedVerifiedStores: number
  activatedStores: number
  activationRate: number
  cohortGmv: number
  avgGmvPerActiveBuyer: number
}

export interface GrowthAnomalyAlert {
  id: string
  severity: 'CRITICAL' | 'WARNING' | 'INFO'
  title: string
  impactLabel: string
  rootCause: string
  recommendation: string
  actionLabel?: string
}
