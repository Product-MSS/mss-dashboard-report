import { useState, useEffect, useCallback, useMemo } from 'react'
import type {
  CustomerGrowthFilters,
  CustomerGrowthKpiSummary,
  GrowthTrendPoint,
  OnboardingFunnelData,
  RegionalDiagnosticRecord,
  SellingAgentRecord,
  GrowthAnomalyAlert,
} from '../models/types'
import { CustomerGrowthRepository } from '../repositories/CustomerGrowthRepository'

const DEFAULT_FILTERS: CustomerGrowthFilters = {
  dateRange: {
    startDate: '2026-01-01',
    endDate: '2026-08-31',
    label: '01/01/2026 - 08/31/2026',
  },
  region: 'ALL',
  groupRegion: 'ALL',
  verificationMethod: 'ALL',
  sellingAgent: 'ALL',
}

export function useCustomerGrowthData() {
  const [filters, setFilters] = useState<CustomerGrowthFilters>(DEFAULT_FILTERS)
  const [kpiSummary, setKpiSummary] = useState<CustomerGrowthKpiSummary | null>(null)
  const [trendData, setTrendData] = useState<GrowthTrendPoint[]>([])
  const [funnelData, setFunnelData] = useState<OnboardingFunnelData | null>(null)
  const [regionalDiagnostics, setRegionalDiagnostics] = useState<RegionalDiagnosticRecord[]>([])
  const [sellingAgents, setSellingAgents] = useState<SellingAgentRecord[]>([])
  const [anomalyAlerts, setAnomalyAlerts] = useState<GrowthAnomalyAlert[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const repository = useMemo(() => new CustomerGrowthRepository(), [])

  const fetchData = useCallback(
    async (currentFilters: CustomerGrowthFilters) => {
      setIsLoading(true)
      try {
        const [summary, trend, funnel, regional, agents, alerts] = await Promise.all([
          repository.getKpiSummary(currentFilters),
          repository.getTrendData(currentFilters),
          repository.getFunnelData(currentFilters),
          repository.getRegionalDiagnostics(currentFilters),
          repository.getSellingAgents(currentFilters),
          repository.getAnomalyAlerts(currentFilters),
        ])

        setKpiSummary(summary)
        setTrendData(trend)
        setFunnelData(funnel)
        setRegionalDiagnostics(regional)
        setSellingAgents(agents)
        setAnomalyAlerts(alerts)
      } catch (err) {
        console.error('Error fetching customer growth data:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [repository]
  )

  useEffect(() => {
    let isMounted = true
    repository
      .getKpiSummary(filters)
      .then(async (summary) => {
        if (!isMounted) return
        const [trend, funnel, regional, agents, alerts] = await Promise.all([
          repository.getTrendData(filters),
          repository.getFunnelData(filters),
          repository.getRegionalDiagnostics(filters),
          repository.getSellingAgents(filters),
          repository.getAnomalyAlerts(filters),
        ])
        if (!isMounted) return
        setKpiSummary(summary)
        setTrendData(trend)
        setFunnelData(funnel)
        setRegionalDiagnostics(regional)
        setSellingAgents(agents)
        setAnomalyAlerts(alerts)
        setIsLoading(false)
      })
      .catch((err) => {
        if (!isMounted) return
        console.error('Error loading customer growth data:', err)
        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [filters, repository])

  const updateFilters = useCallback((updates: Partial<CustomerGrowthFilters>) => {
    setFilters((prev) => ({ ...prev, ...updates }))
  }, [])

  const setPresetDateRange = useCallback((type: 'YTD' | 'MTD' | 'LAST_30') => {
    if (type === 'YTD') {
      setFilters((prev) => ({
        ...prev,
        dateRange: {
          startDate: '2026-01-01',
          endDate: '2026-08-31',
          label: '01/01/2026 - 08/31/2026',
        },
      }))
    } else if (type === 'MTD' || type === 'LAST_30') {
      setFilters((prev) => ({
        ...prev,
        dateRange: {
          startDate: '2026-08-01',
          endDate: '2026-08-31',
          label: '08/01/2026 - 08/31/2026',
        },
      }))
    }
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  return {
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
    refresh: () => fetchData(filters),
  }
}

