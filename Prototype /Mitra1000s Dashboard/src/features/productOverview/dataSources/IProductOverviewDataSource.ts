import type { GlobalFilterState, ProductOverviewSummaryDto } from '../models/productOverviewDto';

export interface IProductOverviewDataSource {
  getOverviewSummary(filter: GlobalFilterState): Promise<ProductOverviewSummaryDto>;
}
