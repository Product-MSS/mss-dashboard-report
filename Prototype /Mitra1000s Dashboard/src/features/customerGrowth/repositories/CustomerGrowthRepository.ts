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
  mockFunnelData,
  mockRegionalDiagnostics,
  mockSellingAgents,
  mockGrowthAnomalyAlerts,
} from '../dataSources/mockCustomerGrowthData'

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const MONTH_FULL_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export class CustomerGrowthRepository {
  public static isOneMonthRange(startDate: string, endDate: string): boolean {
    if (!startDate || !endDate) return false
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
    if (diffMonths === 0) return true
    const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
    return diffDays <= 32
  }

  public static getDynamicComparisonLabel(startDate: string, endDate: string): string {
    const isOneMonth = this.isOneMonthRange(startDate, endDate)
    if (isOneMonth) {
      return 'vs Previous Period'
    }
    return 'vs May 2025 - Dec 2025'
  }

  public static generateDailyTrendForMonth(startDateStr: string): GrowthTrendPoint[] {
    const d = new Date(startDateStr || '2026-08-01')
    const year = d.getFullYear()
    const monthIdx = d.getMonth()
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate()
    const monthShort = MONTH_NAMES[monthIdx]
    const monthFull = MONTH_FULL_NAMES[monthIdx]

    let cumulativeReg = 12
    let cumulativeVer = 10
    let cumulativeAct = 3
    let cumulativeGmv = 8500000

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const dayPad = day < 10 ? `0${day}` : `${day}`

      // Progressive cumulative trajectory for the month
      const dailyNewReg = Math.max(8, Math.round(14 + Math.sin(day / 3) * 6 + (day > 18 ? 5 : 0)))
      const dailyNewVer = Math.round(dailyNewReg * 0.88)
      const dailyNewAct = Math.round(dailyNewVer * 0.38)
      const dailyGmv = dailyNewAct * 2800000

      cumulativeReg += dailyNewReg
      cumulativeVer += dailyNewVer
      cumulativeAct += dailyNewAct
      cumulativeGmv += dailyGmv

      return {
        date: `${dayPad} ${monthShort}`,
        fullDate: `${dayPad} ${monthFull} ${year}`,
        registered: cumulativeReg,
        verified: cumulativeVer,
        activated: cumulativeAct,
        cohortGmv: cumulativeGmv,
      }
    })
  }

  public static generateMonthlyTrend(startDateStr: string, endDateStr: string): GrowthTrendPoint[] {
    const sParts = (startDateStr || '2026-01-01').split('-').map(Number)
    const eParts = (endDateStr || '2026-08-31').split('-').map(Number)

    const sYear = sParts[0] || 2026
    const sMonth = sParts[1] || 1
    const eYear = eParts[0] || 2026
    const eMonth = eParts[1] || 8

    const totalMonths = Math.max(1, (eYear - sYear) * 12 + (eMonth - sMonth) + 1)

    const points: GrowthTrendPoint[] = []
    let curYear = sYear
    let curMonth = sMonth

    for (let i = 0; i < totalMonths; i++) {
      const monthIdx = curMonth - 1
      const monthShort = MONTH_NAMES[monthIdx]
      const monthFull = MONTH_FULL_NAMES[monthIdx]
      const yearShort = `'${String(curYear).slice(2)}`

      // If multi-year range, label as "Jan '25", if single year label as "Jan 2026"
      const dateLabel = totalMonths > 12 || sYear !== eYear ? `${monthShort} ${yearShort}` : `${monthShort} ${curYear}`
      const fullDateLabel = `${monthFull} ${curYear}`

      // Progressive realistic growth curve across months
      const progress = (i + 1) / totalMonths
      const seasonalWave = Math.sin((curMonth / 12) * Math.PI * 2) * 20
      const baseMonthlyReg = 190 + i * 14 + seasonalWave
      const reg = Math.max(150, Math.round(baseMonthlyReg))
      const ver = Math.round(reg * (0.83 + progress * 0.08))
      const act = Math.round(ver * (0.31 + progress * 0.07))
      const gmv = act * 2800000

      points.push({
        date: dateLabel,
        fullDate: fullDateLabel,
        registered: reg,
        verified: ver,
        activated: act,
        cohortGmv: gmv,
      })

      curMonth++
      if (curMonth > 12) {
        curMonth = 1
        curYear++
      }
    }

    return points
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

    let baseTrend: GrowthTrendPoint[]
    if (isOneMonth) {
      baseTrend = CustomerGrowthRepository.generateDailyTrendForMonth(filters.dateRange.startDate)
    } else {
      baseTrend = CustomerGrowthRepository.generateMonthlyTrend(
        filters.dateRange.startDate,
        filters.dateRange.endDate
      )
    }

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

  public async getRegionalDiagnostics(
    filters: CustomerGrowthFilters
  ): Promise<RegionalDiagnosticRecord[]> {
    let list = [...mockRegionalDiagnostics]
    if (filters.groupRegion !== 'ALL') {
      list = list.filter((r) => r.groupRegion === filters.groupRegion)
    }
    if (filters.region !== 'ALL') {
      list = list.filter((r) => r.region === filters.region)
    }
    return list
  }

  public async getSellingAgents(filters: CustomerGrowthFilters): Promise<SellingAgentRecord[]> {
    let list = [...mockSellingAgents]
    if (filters.groupRegion !== 'ALL') {
      list = list.filter((a) => a.groupRegion === filters.groupRegion)
    }
    if (filters.region !== 'ALL') {
      list = list.filter((a) => a.region === filters.region)
    }
    if (filters.sellingAgent !== 'ALL') {
      list = list.filter((a) => a.agentName === filters.sellingAgent || a.agentId === filters.sellingAgent)
    }
    return list
  }

  public async getAnomalyAlerts(
    _filters: CustomerGrowthFilters
  ): Promise<GrowthAnomalyAlert[]> {
    return [...mockGrowthAnomalyAlerts]
  }
}
