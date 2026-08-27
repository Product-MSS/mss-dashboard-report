// ==============================================================================
// Product Overview DataSource
// Pure I/O layer — fetching Control Tower summary data
// ==============================================================================

import type { IProductOverviewDataSource } from './IProductOverviewDataSource';
import type { GlobalFilterState, ProductOverviewSummaryDto } from '../models/productOverviewDto';
import { getMockProductOverviewData } from './mockProductOverviewData';
import { ApiClient } from '@/core/network/ApiClient';

export class ProductOverviewDataSource implements IProductOverviewDataSource {
  private readonly apiClient?: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.apiClient = apiClient;
  }

  async getOverviewSummary(filter: GlobalFilterState): Promise<ProductOverviewSummaryDto> {
    // If live API client is configured with valid URL, attempt fetch with graceful mock fallback
    if (this.apiClient) {
      try {
        const queryParams = new URLSearchParams({
          startYear: String(filter.startYear),
          startMonth: String(filter.startMonth),
          endYear: String(filter.endYear),
          endMonth: String(filter.endMonth),
          region: filter.region,
          supplierId: filter.supplierId,
          sellingAgentId: filter.sellingAgentId,
        });

        const response = await this.apiClient.get<ProductOverviewSummaryDto>(
          `api/v1/analytics/product-overview?${queryParams.toString()}`
        );

        if (response.success && response.data) {
          return response.data;
        }
      } catch {
        // Fallback to local mock engine
      }
    }

    // Simulate real-world network latency (300ms) for realistic loading transitions
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getMockProductOverviewData(filter);
  }
}
