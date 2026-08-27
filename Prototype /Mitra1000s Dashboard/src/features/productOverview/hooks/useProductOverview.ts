// ==============================================================================
// Feature Hook: useProductOverview
// Bridge connecting React UI to ProductOverviewRepository & UiState
// ==============================================================================

import { useState, useCallback, useEffect } from 'react';
import { useAsyncState } from '@/core/hooks/useAsyncState';
import { ProductOverviewRepository } from '../repositories/ProductOverviewRepository';
import { ProductOverviewDataSource } from '../dataSources/ProductOverviewDataSource';
import type {
  GlobalFilterState,
  ProductOverviewSummaryDto,
  DrillDownInspectionDto,
} from '../models/productOverviewDto';

const defaultFilter: GlobalFilterState = {
  dateRange: 'last_30_days',
  region: 'all',
  role: 'retailer',
  distributorId: 'all',
  salesForceId: 'all',
};

const dataSource = new ProductOverviewDataSource();
const repository = new ProductOverviewRepository(dataSource);

export function useProductOverview() {
  const [filter, setFilterState] = useState<GlobalFilterState>(defaultFilter);
  const [activeDrillDown, setActiveDrillDown] = useState<DrillDownInspectionDto | null>(null);
  const [isDrillDownLoading, setIsDrillDownLoading] = useState<boolean>(false);
  const [feedbackNotification, setFeedbackNotification] = useState<string | null>(null);

  const { execute, state: asyncState, isLoading: isAsyncLoading } = useAsyncState<ProductOverviewSummaryDto>();

  const loadSummary = useCallback(
    async (currentFilter: GlobalFilterState) => {
      await execute(() => repository.getSummary(currentFilter));
    },
    [execute]
  );

  useEffect(() => {
    loadSummary(filter);
  }, [filter, loadSummary]);

  const updateFilter = useCallback((partial: Partial<GlobalFilterState>) => {
    setFilterState((prev) => {
      const next = { ...prev, ...partial };

      // Cascading logic: If distributor is selected, auto adjust region
      if (partial.distributorId === 'semen_gresik_jabar' && prev.region !== 'jawa_barat') {
        next.region = 'jawa_barat';
      }
      return next;
    });
  }, []);

  const resetFilter = useCallback(() => {
    setFilterState(defaultFilter);
  }, []);

  const inspectItem = useCallback(
    async (type: 'trend_day' | 'kpi_card' | 'anomaly', targetId: string) => {
      try {
        setIsDrillDownLoading(true);
        const inspection = await repository.getDrillDownInspection(type, targetId, filter);
        setActiveDrillDown(inspection);
      } catch (err) {
        console.error('Failed to load drill down:', err);
      } finally {
        setIsDrillDownLoading(false);
      }
    },
    [filter]
  );

  const closeDrillDown = useCallback(() => {
    setActiveDrillDown(null);
  }, []);

  const triggerActionNotification = useCallback((message: string) => {
    setFeedbackNotification(message);
    setTimeout(() => {
      setFeedbackNotification(null);
    }, 4000);
  }, []);

  return {
    summaryState: asyncState,
    isLoading: isAsyncLoading,
    filter,
    updateFilter,
    resetFilter,
    loadSummary,
    activeDrillDown,
    isDrillDownLoading,
    inspectItem,
    closeDrillDown,
    feedbackNotification,
    triggerActionNotification,
  };
}
