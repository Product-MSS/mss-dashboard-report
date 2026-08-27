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
        throw UiErrorFactory.validation('Inkonsistensi data: GMV positif tercatat tanpa ada Valid Orders.');
      }

      return summary;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'type' in error) {
        throw error;
      }
      throw UiErrorFactory.network('Gagal mengambil ringkasan Control Tower dari data pipeline.');
    }
  }

  async getDrillDownInspection(
    type: 'trend_day' | 'kpi_card' | 'anomaly',
    targetId: string,
    filter: GlobalFilterState
  ): Promise<DrillDownInspectionDto> {
    const summary = await this.getSummary(filter);

    if (type === 'trend_day') {
      const dayData = summary.trend30Days.find(
        (d) => d.date === targetId || d.dayIndex.toString() === targetId
      );

      if (!dayData) {
        throw UiErrorFactory.notFound(`Data analitik untuk tanggal ${targetId} tidak ditemukan.`);
      }

      return {
        type: 'trend_day',
        title: `🔍 DRILL-DOWN INVESTIGATION: ${dayData.dateLabel}`,
        subtitle: dayData.isPromoSpike
          ? `Anomali Lonjakan Promo: ${dayData.spikeReason}`
          : 'Pemeriksaan performa transaksi dan keranjang belanja harian',
        dateOrCohort: dayData.date,
        summaryMetrics: [
          { label: 'Daily GMV', value: dayData.currentGmvFormatted, status: 'good' },
          { label: 'Valid Orders', value: `${dayData.validOrdersCount.toLocaleString('id-ID')} orders` },
          { label: 'Daily AOV', value: dayData.aovFormatted },
          { label: 'Active Buyers', value: `${dayData.activeBuyersCount.toLocaleString('id-ID')} toko` },
        ],
        breakdownTable: {
          headers: ['Distributor Entitas', 'Kontribusi GMV', 'Pangsa Pasar (%)'],
          rows: dayData.topDistributors.map((dist) => [
            dist.name,
            dist.gmvFormatted,
            `${dist.sharePercent}%`,
          ]),
        },
        rootCauseAnalysis: dayData.isPromoSpike
          ? 'Lonjakan didorong oleh flash promo voucher semen 5% yang diklaim oleh 142 toko di Jawa Barat.'
          : 'Aktivitas transaksi harian berjalan normal sesuai pola ritme belanja toko bangunan di hari kerja.',
        actionCta: {
          label: 'Buka Detail Transaksi di Revenue Dashboard →',
          targetRoute: '/analytics/revenue',
        },
      };
    }

    if (type === 'kpi_card') {
      const card = summary.kpiDrivers.find((k) => k.id === targetId);
      if (!card) {
        throw UiErrorFactory.notFound(`Metrik driver ${targetId} tidak ditemukan.`);
      }

      return {
        type: 'kpi_card',
        title: `📊 DEEP DIVE: ${card.metricTitle}`,
        subtitle: `Evaluasi target: ${card.targetFormatted} | Status: ${card.targetGapFormatted}`,
        summaryMetrics: [
          { label: 'Nilai Aktual', value: card.currentValueFormatted, status: card.delta.status },
          { label: 'Perubahan', value: `${card.delta.formatted} (${card.delta.comparisonPeriodLabel})` },
          { label: 'Target KPI', value: card.targetFormatted },
          { label: 'Status Pencapaian', value: card.isTargetAchieved ? '🟢 Tercapai' : '🟡 Dibawah Target' },
        ],
        rootCauseAnalysis:
          card.id === 'activation'
            ? 'Aktivasi melambat di wilayah Jawa Barat akibat toko baru belum menyelesaikan verifikasi dokumen NIK/NIB.'
            : card.id === 'retention'
            ? 'Retensi bulan ke-2 pada toko kecil (Tier C) menurun karena kenaikan batas minimum order distributor.'
            : 'Performa metrik on-track dengan laju pertumbuhan kuartal ini.',
        actionCta: {
          label: `Buka ${card.drillDownLabel}`,
          targetRoute: card.drillDownRoute,
        },
      };
    }

    // Default anomaly drilldown
    const anomaly = summary.anomalies.find((a) => a.id === targetId) || summary.anomalies[0];
    return {
      type: 'anomaly',
      title: anomaly.title,
      subtitle: `Segmen Terdampak: ${anomaly.affectedSegment}`,
      summaryMetrics: [
        { label: 'Severity', value: anomaly.severity === 'critical' ? '🔴 Critical' : '🟡 Warning' },
        { label: 'Estimasi Dampak', value: anomaly.estimatedLostGmvFormatted || 'Dalam Pengukuran' },
      ],
      rootCauseAnalysis: `${anomaly.rootCause}\n\nRekomendasi Tindakan: ${anomaly.recommendedAction}`,
      actionCta: {
        label: anomaly.actionCtaPrimary.label,
        targetRoute: anomaly.actionCtaPrimary.route,
      },
    };
  }
}
