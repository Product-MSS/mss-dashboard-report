// ==============================================================================
// Product Overview Repository
// Implements business rules, metric derivations, and drilldown inspections
// ==============================================================================

import type { IProductOverviewRepository } from './IProductOverviewRepository';
import type { IProductOverviewDataSource } from '../dataSources/IProductOverviewDataSource';
import type {
  GlobalFilterState,
  ProductOverviewSummaryDto,
  DrillDownInspectionDto,
} from '../models/productOverviewDto';
import { UiErrorFactory } from '@/core/states/UiError';

export class ProductOverviewRepository implements IProductOverviewRepository {
  private readonly dataSource: IProductOverviewDataSource;

  constructor(dataSource: IProductOverviewDataSource) {
    this.dataSource = dataSource;
  }

  async getSummary(filter: GlobalFilterState): Promise<ProductOverviewSummaryDto> {
    try {
      const summary = await this.dataSource.getOverviewSummary(filter);

      // Business Rule B001/B002: Ensure Valid Orders & GMV Consistency
      // GMV = Active Buyers * Order Frequency * AOV
      if (summary.northStar.validOrders <= 0 && summary.northStar.currentGmv > 0) {
        throw UiErrorFactory.validation('Data inconsistency: Positive GMV recorded with zero Valid Orders.');
      }

      return summary;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'type' in error) {
        throw error;
      }
      throw UiErrorFactory.network('Failed to fetch Control Tower summary from data pipeline.');
    }
  }

  async getDrillDownInspection(
    type: 'trend_day' | 'kpi_card' | 'anomaly',
    targetId: string,
    filter: GlobalFilterState
  ): Promise<DrillDownInspectionDto> {
    const summary = await this.getSummary(filter);

    if (type === 'trend_day') {
      const points = summary.trend?.points || summary.trend30Days;
      const pointData = points.find(
        (d) =>
          d.date === targetId ||
          d.pointIndex.toString() === targetId ||
          (d.dayIndex && d.dayIndex.toString() === targetId)
      );

      if (!pointData) {
        throw UiErrorFactory.notFound(`Analytics data for ${targetId} was not found.`);
      }

      const isMonthly = summary.trend?.granularity === 'monthly';

      return {
        type: 'trend_day',
        title: `🔍 DRILL-DOWN INVESTIGATION: ${pointData.dateLabel}`,
        subtitle: pointData.isPromoSpike
          ? `Promo Spike Event: ${pointData.spikeReason}`
          : isMonthly
          ? 'Inspection of monthly transaction volume and distributor segment distribution'
          : 'Inspection of daily transaction performance and checkout basket size',
        dateOrCohort: pointData.date,
        summaryMetrics: [
          { label: isMonthly ? 'Monthly GMV' : 'Daily GMV', value: pointData.currentGmvFormatted, status: 'good' },
          { label: 'Valid Orders', value: `${pointData.validOrdersCount.toLocaleString('en-US')} orders` },
          { label: isMonthly ? 'Average AOV' : 'Daily AOV', value: pointData.aovFormatted },
          { label: 'Active Buyers', value: `${pointData.activeBuyersCount.toLocaleString('en-US')} stores` },
        ],
        breakdownTable: {
          headers: ['Selling Agent Entity', 'GMV Contribution', 'Market Share (%)'],
          rows: pointData.topDistributors.map((dist) => [
            dist.name,
            dist.gmvFormatted,
            `${dist.sharePercent}%`,
          ]),
        },
        rootCauseAnalysis: pointData.isPromoSpike
          ? (pointData.spikeReason ? `${pointData.spikeReason} successfully drove transaction acceleration.` : 'Spike driven by promotion event.')
          : 'Transaction volume and purchasing rhythms operate within healthy distribution limits.',
        actionCta: {
          label: 'View Order Details in Revenue Dashboard →',
          targetRoute: '/analytics/revenue',
        },
      };
    }

    if (type === 'kpi_card') {
      const card = summary.kpiDrivers.find((k) => k.id === targetId);
      if (!card) {
        throw UiErrorFactory.notFound(`KPI Driver metric ${targetId} was not found.`);
      }

      return {
        type: 'kpi_card',
        title: `📊 DEEP DIVE: ${card.metricTitle}`,
        subtitle: `Target evaluation: ${card.targetFormatted} | Gap: ${card.targetGapFormatted}`,
        summaryMetrics: [
          { label: 'Actual Value', value: card.currentValueFormatted, status: card.delta.status },
          { label: 'MoM / WoW Change', value: `${card.delta.formatted} (${card.delta.comparisonPeriodLabel})` },
          { label: 'KPI Target', value: card.targetFormatted },
          { label: 'Achievement Status', value: card.isTargetAchieved ? '🟢 Achieved' : '🟡 Below Target' },
        ],
        rootCauseAnalysis:
          card.id === 'activation'
            ? 'Activation velocity slowed in West Java due to new stores pending NIK/NIB document verification.'
            : card.id === 'retention'
            ? 'Month-2 retention on small stores (Tier C) dipped following distributor minimum order quantity (MOQ) adjustments.'
            : 'Metric performance is on-track with current quarterly growth targets.',
        actionCta: {
          label: `Open ${card.drillDownLabel}`,
          targetRoute: card.drillDownRoute,
        },
      };
    }

    // Default anomaly drilldown
    const anomaly = summary.anomalies.find((a) => a.id === targetId) || summary.anomalies[0];
    return {
      type: 'anomaly',
      title: anomaly.title,
      subtitle: `Affected Segment: ${anomaly.affectedSegment}`,
      summaryMetrics: [
        { label: 'Severity', value: anomaly.severity === 'critical' ? '🔴 Critical' : '🟡 Warning' },
        { label: 'Estimated GMV Impact', value: anomaly.estimatedLostGmvFormatted || 'Under Assessment' },
      ],
      rootCauseAnalysis: `${anomaly.rootCause}\n\nRecommended Action: ${anomaly.recommendedAction}`,
      actionCta: {
        label: anomaly.actionCtaPrimary.label,
        targetRoute: anomaly.actionCtaPrimary.route,
      },
    };
  }
}
