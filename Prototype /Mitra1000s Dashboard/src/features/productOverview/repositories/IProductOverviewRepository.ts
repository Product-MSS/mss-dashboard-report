import type {
  GlobalFilterState,
  ProductOverviewSummaryDto,
  DrillDownInspectionDto,
} from '../models/productOverviewDto';

export interface IProductOverviewRepository {
  getSummary(filter: GlobalFilterState): Promise<ProductOverviewSummaryDto>;
  getDrillDownInspection(type: 'trend_day' | 'kpi_card' | 'anomaly', targetId: string, filter: GlobalFilterState): Promise<DrillDownInspectionDto>;
}
