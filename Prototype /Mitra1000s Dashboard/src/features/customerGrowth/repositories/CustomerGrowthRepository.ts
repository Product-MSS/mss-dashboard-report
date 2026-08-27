import type {
  CustomerGrowthFilters,
  CustomerGrowthKpiSummary,
  GrowthTrendPoint,
  OnboardingFunnelData,
  RegionalDiagnosticRecord,
  SellingAgentRecord,
  GrowthAnomalyAlert,
} from '../models/types'
import {
  mockMonthlyGrowthTrend,
  mockDailyGrowthTrend,
  mockFunnelData,
  mockRegionalDiagnostics,
  mockSellingAgents,
  mockGrowthAnomalyAlerts,
} from '../dataSources/mockCustomerGrowthData'

export class CustomerGrowthRepository {
  public static isOneMonthRange(startDate: string, endDate: string): boolean {
    if (!startDate || !endDate) return false
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
    return diffDays <= 32
  }

  public static getDynamicComparisonLabel(startDate: string, endDate: string): string {
    const isOneMonth = this.isOneMonthRange(startDate, endDate)
    if (isOneMonth) {
      return 'vs July 2026'
    }
    return 'vs May 2025 - Dec 2025'
  }

  public async getKpiSummary(filters: CustomerGrowthFilters): Promise<CustomerGrowthKpiSummary> {
    const isOneMonth = CustomerGrowthRepository.isOneMonthRange(
      filters.dateRange.startDate,
      filters.dateRange.endDate
    )
    const comparisonLabel = CustomerGrowthRepository.getDynamicComparisonLabel(
      filters.dateRange.startDate,
      filters.dateRange.endDate
    )

    let regionMultiplier = 1.0
    if (filters.groupRegion === 'CPD') regionMultiplier = 0.67
    else if (filters.groupRegion === 'BNN') regionMultiplier = 0.33
    else if (filters.region !== 'ALL') regionMultiplier = 0.42

    const baseReg = isOneMonth ? 460 : 2430
    const basePending = isOneMonth ? 62 : 310
    const baseVer = isOneMonth ? 400 : 2120
    const baseAct = isOneMonth ? 148 : 726
    const baseGmv = isOneMonth ? 425500000 : 2048500000

    const regVal = Math.round(baseReg * regionMultiplier)
    const pendingVal = Math.round(basePending * regionMultiplier)
    const verVal = Math.round(baseVer * regionMultiplier)
    const actVal = Math.round(baseAct * regionMultiplier)
    const gmvVal = Math.round(baseGmv * regionMultiplier)

    return {
      newRegistrants: {
        value: regVal,
        deltaPercent: 8.2,
        priorValue: Math.round(regVal / 1.082),
        target: Math.round(regVal * 0.92),
        formattedValue: regVal.toLocaleString(),
      },
      pendingQueue: {
        value: pendingVal,
        deltaPercent: -4.1,
        priorValue: Math.round(pendingVal * 1.041),
        slaTarget: Math.round(pendingVal * 0.65),
        formattedValue: pendingVal.toLocaleString(),
      },
      verifiedStores: {
        value: verVal,
        deltaPercent: 10.4,
        priorValue: Math.round(verVal / 1.104),
        autoMatchRate: 74.9,
        verificationRate: Number(((verVal / regVal) * 100).toFixed(1)),
        formattedValue: verVal.toLocaleString(),
      },
      activatedStores: {
        value: actVal,
        deltaPercent: 12.4,
        priorValue: Math.round(actVal / 1.124),
        activationRate: Number(((actVal / verVal) * 100).toFixed(1)),
        cohortGmv: gmvVal,
        formattedValue: actVal.toLocaleString(),
      },
      comparisonLabel,
    }
  }

  public async getTrendData(filters: CustomerGrowthFilters): Promise<GrowthTrendPoint[]> {
    const isOneMonth = CustomerGrowthRepository.isOneMonthRange(
      filters.dateRange.startDate,
      filters.dateRange.endDate
    )
    let baseTrend = isOneMonth ? mockDailyGrowthTrend : mockMonthlyGrowthTrend

    let regionMultiplier = 1.0
    if (filters.groupRegion === 'CPD') regionMultiplier = 0.67
    else if (filters.groupRegion === 'BNN') regionMultiplier = 0.33
    else if (filters.region !== 'ALL') regionMultiplier = 0.42

    if (regionMultiplier !== 1.0) {
      return baseTrend.map((pt) => ({
        ...pt,
        registered: Math.round(pt.registered * regionMultiplier),
        verified: Math.round(pt.verified * regionMultiplier),
        activated: Math.round(pt.activated * regionMultiplier),
        cohortGmv: Math.round(pt.cohortGmv * regionMultiplier),
      }))
    }
    return baseTrend
  }

  public async getFunnelData(filters: CustomerGrowthFilters): Promise<OnboardingFunnelData> {
    let regionMultiplier = 1.0
    if (filters.groupRegion === 'CPD') regionMultiplier = 0.67
    else if (filters.groupRegion === 'BNN') regionMultiplier = 0.33
    else if (filters.region !== 'ALL') regionMultiplier = 0.42

    if (regionMultiplier !== 1.0) {
      return {
        newRegistrants: Math.round(mockFunnelData.newRegistrants * regionMultiplier),
        autoMatched: Math.round(mockFunnelData.autoMatched * regionMultiplier),
        pendingReview: Math.round(mockFunnelData.pendingReview * regionMultiplier),
        manualApproved: Math.round(mockFunnelData.manualApproved * regionMultiplier),
        verifiedTotal: Math.round(mockFunnelData.verifiedTotal * regionMultiplier),
        activatedTotal: Math.round(mockFunnelData.activatedTotal * regionMultiplier),
        pendingFirstOrder: Math.round(mockFunnelData.pendingFirstOrder * regionMultiplier),
      }
    }
    return mockFunnelData
  }

  public async getRegionalDiagnostics(filters: CustomerGrowthFilters): Promise<RegionalDiagnosticRecord[]> {
    let list = [...mockRegionalDiagnostics]
    if (filters.groupRegion !== 'ALL') {
      list = list.filter((item) => item.groupRegion === filters.groupRegion)
    }
    if (filters.region !== 'ALL') {
      list = list.filter((item) => item.region.toLowerCase().includes(filters.region.toLowerCase()))
    }
    return list
  }

  public async getSellingAgents(filters: CustomerGrowthFilters): Promise<SellingAgentRecord[]> {
    let list = [...mockSellingAgents]
    if (filters.groupRegion !== 'ALL') {
      list = list.filter((item) => item.groupRegion === filters.groupRegion)
    }
    if (filters.region !== 'ALL') {
      list = list.filter((item) => item.region.toLowerCase().includes(filters.region.toLowerCase()))
    }
    if (filters.sellingAgent !== 'ALL') {
      list = list.filter((item) => item.agentName.toLowerCase() === filters.sellingAgent.toLowerCase())
    }
    return list
  }

  public async getAnomalyAlerts(filters: CustomerGrowthFilters): Promise<GrowthAnomalyAlert[]> {
    if (filters.groupRegion === 'CPD') {
      return mockGrowthAnomalyAlerts.filter((a) => a.severity !== 'CRITICAL')
    }
    return mockGrowthAnomalyAlerts
  }
}
