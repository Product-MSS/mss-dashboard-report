// ==============================================================================
// Mock Data Generator for Product Overview Control Tower
// Simulates realistic B2B e-commerce metrics for Mitra1000s
// ==============================================================================

import type {
  GlobalFilterState,
  ProductOverviewSummaryDto,
  GmvTrendDayDto,
  GmvDriverImpactDto,
  ProductHealthTelemetryDto,
  AnomalyAlertDto,
} from '../models/productOverviewDto';

export function getMockProductOverviewData(filter: GlobalFilterState): ProductOverviewSummaryDto {
  // Base multipliers depending on selected region or distributor
  let volumeMultiplier = 1.0;
  if (filter.region === 'jawa_barat') volumeMultiplier = 0.42;
  else if (filter.region === 'dki_jakarta') volumeMultiplier = 0.28;
  else if (filter.region === 'jawa_timur') volumeMultiplier = 0.18;
  else if (filter.region === 'jawa_tengah') volumeMultiplier = 0.12;

  if (filter.distributorId === 'semen_gresik_jabar') volumeMultiplier *= 0.55;
  else if (filter.distributorId === 'baja_perkasa') volumeMultiplier *= 0.30;
  else if (filter.distributorId === 'cat_nusantara') volumeMultiplier *= 0.15;

  const baseGmv = Math.round(12_480_000_000 * volumeMultiplier);
  const priorGmv = Math.round(11_533_500_000 * volumeMultiplier);
  const gmvGrowthPercent = 8.2;
  const nominalGrowthRp = baseGmv - priorGmv;

  const validOrders = Math.round(4420 * volumeMultiplier);
  const aov = Math.round(baseGmv / Math.max(1, validOrders));
  const activeBuyers = Math.round(1850 * volumeMultiplier);
  const orderFrequency = Number((validOrders / Math.max(1, activeBuyers)).toFixed(2));

  // Generate 30 Days of GMV Trend
  const trend30Days: GmvTrendDayDto[] = [];
  const daysInPeriod = filter.dateRange === 'last_7_days' ? 7 : 30;

  for (let i = 1; i <= daysInPeriod; i++) {
    const isPromoSpike = i === 18;
    const dayFactor = 0.85 + Math.sin(i / 3) * 0.15 + (i % 7 === 0 || i % 7 === 6 ? -0.2 : 0.1);
    const dayGmvBase = (baseGmv / daysInPeriod) * dayFactor;
    const currentGmv = Math.round(isPromoSpike ? dayGmvBase * 1.65 : dayGmvBase);
    const priorGmvDay = Math.round((priorGmv / daysInPeriod) * (0.88 + Math.cos(i / 3) * 0.12));

    const dayOrders = Math.round(currentGmv / Math.max(1, aov * (0.95 + (i % 5) * 0.02)));
    const dayBuyers = Math.round(dayOrders * 0.82);

    const pad = (n: number) => n.toString().padStart(2, '0');
    const dayStr = `2026-08-${pad(i)}`;

    trend30Days.push({
      dayIndex: i,
      date: dayStr,
      dateLabel: `Day ${i} (Aug ${i})`,
      currentGmv,
      currentGmvFormatted: `Rp ${(currentGmv / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`,
      priorGmv: priorGmvDay,
      priorGmvFormatted: `Rp ${(priorGmvDay / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 1 })} M`,
      validOrdersCount: dayOrders,
      aovFormatted: `Rp ${(currentGmv / Math.max(1, dayOrders)).toLocaleString('id-ID', { maximumFractionDigits: 0 })}`,
      activeBuyersCount: dayBuyers,
      isPromoSpike,
      spikeReason: isPromoSpike ? 'Flash Promo Voucher Semen 5% (LV-07)' : undefined,
      topDistributors: [
        {
          name: 'Distributor Semen Gresik Jabar',
          gmvFormatted: `Rp ${((currentGmv * 0.55) / 1_000_000).toFixed(1)} M`,
          sharePercent: 55.1,
        },
        {
          name: 'Distributor Baja Perkasa',
          gmvFormatted: `Rp ${((currentGmv * 0.31) / 1_000_000).toFixed(1)} M`,
          sharePercent: 31.0,
        },
        {
          name: 'Distributor Cat Nusantara',
          gmvFormatted: `Rp ${((currentGmv * 0.139) / 1_000_000).toFixed(1)} M`,
          sharePercent: 13.9,
        },
      ],
    });
  }

  // 3-Lever Waterfall Impact Matrix Drivers
  const driversImpactList: GmvDriverImpactDto[] = [
    {
      id: 'driver_aov',
      driverName: 'Basket Size (AOV Impact)',
      subLabel: 'Rata-rata nominal GMV per keranjang checkout',
      currentValueFormatted: `Rp ${(aov / 1_000_000).toFixed(2)} M`,
      changeFormatted: '▲ +4.2% MoM',
      nominalImpactRp: Math.round(520_000_000 * volumeMultiplier),
      nominalImpactFormatted: '+Rp 520 M',
      impactType: 'positive',
      relativeBarWidthPercent: 55,
      insightDescription: 'Rata-rata nominal GMV per keranjang checkout.',
    },
    {
      id: 'driver_buyers',
      driverName: 'Active Buyers (Buyer Volume Impact)',
      subLabel: 'Total akun toko bertransaksi dalam periode berjalan',
      currentValueFormatted: `${activeBuyers.toLocaleString('id-ID')} Toko`,
      changeFormatted: '▲ +2.1% MoM',
      nominalImpactRp: Math.round(250_000_000 * volumeMultiplier),
      nominalImpactFormatted: '+Rp 250 M',
      impactType: 'positive',
      relativeBarWidthPercent: 26,
      insightDescription: 'Total akun toko bertransaksi dalam periode berjalan.',
    },
    {
      id: 'driver_frequency',
      driverName: 'Order Frequency Impact',
      subLabel: 'Rasio pesanan dibagi total pembeli aktif',
      currentValueFormatted: `${orderFrequency}x / bulan`,
      changeFormatted: '▲ +1.8% MoM',
      nominalImpactRp: Math.round(176_500_000 * volumeMultiplier),
      nominalImpactFormatted: '+Rp 176.5 M',
      impactType: 'positive',
      relativeBarWidthPercent: 19,
      insightDescription: 'Rasio pesanan dibagi total pembeli aktif.',
    },
  ];

  // 4 Product Health Telemetry Indicators
  const productHealthMetrics: ProductHealthTelemetryDto[] = [
    {
      id: 'health_zero_search',
      name: 'Zero-Result Search Rate',
      valueFormatted: '8.70%',
      targetSlaFormatted: '<= 3.0%',
      status: 'critical',
      statusLabel: 'Critical',
      signalNote: 'Rasio pencarian kata kunci dengan hasil 0 SKU.',
    },
    {
      id: 'health_add_to_cart',
      name: 'Add to Cart Success Rate',
      valueFormatted: '94.20%',
      targetSlaFormatted: '>= 90.0%',
      status: 'healthy',
      statusLabel: 'Normal',
      signalNote: 'Rasio klik Add to Cart yang sukses tersimpan.',
    },
    {
      id: 'health_checkout_success',
      name: 'Checkout Success Rate',
      valueFormatted: '98.15%',
      targetSlaFormatted: '>= 97.0%',
      status: 'healthy',
      statusLabel: 'Normal',
      signalNote: 'Rasio konversi dari Cart ke halaman Pembayaran.',
    },
    {
      id: 'health_payment_success',
      name: 'Payment Success Rate',
      valueFormatted: '97.80%',
      targetSlaFormatted: '>= 95.0%',
      status: 'healthy',
      statusLabel: 'Normal',
      signalNote: 'Rasio pembayaran VA/QRIS/TOP yang berstatus lunas.',
    },
  ];

  // 4-Stage Funnel Anomaly Alerts
  const anomalies: AnomalyAlertDto[] = [
    {
      id: 'anomaly_zero_search',
      severity: 'critical',
      title: 'Zero-Result Search Spike (+67% WoW | Affecting 2,340 Searches)',
      badgeLabel: 'CRITICAL',
      rootCause: 'Permintaan material melonjak namun kata kunci alias katalog belum terdaftar di database search engine.',
      topAffectedQueries: ['Semen Tiga Roda 50kg (842x)', 'Baja Ringan 0.75 (612x)', 'Cat No Drop Grey (410x)'],
      affectedSegment: 'Retailer Wilayah Jawa Barat (Distributor Semen Gresik Jabar)',
      estimatedLostGmvFormatted: 'Estimasi Dampak: ~Rp 185.000.000',
      recommendedAction: 'Tambah sinonim/alias pencarian di CMS katalog dan rekomendasikan produk alternatif.',
      actionCtaPrimary: {
        label: '🔍 Investigate Zero-Search Queries',
        route: '/analytics/search-diagnostics',
      },
      actionCtaSecondary: {
        label: '➕ Request Catalog Keyword Alias',
        actionKey: 'add_alias',
      },
    },
    {
      id: 'anomaly_cart_failure',
      severity: 'warning',
      title: 'Add to Cart Failures on Cement SKU (Out-of-Stock & MOQ Issue)',
      badgeLabel: 'WARNING',
      rootCause: 'Stok distributor Semen Gresik 50kg di gudang habis dan aturan MOQ 200 sak memicu silent drop-off.',
      topAffectedQueries: ['Semen Gresik 50kg (610x gagal)', 'Baja Ringan C75 (320x gagal)', 'Pipa PVC 3 Inch (180x gagal)'],
      affectedSegment: 'Retailer Tier B & C di Wilayah Banten & Jawa Barat',
      estimatedLostGmvFormatted: 'Estimasi Dampak: ~Rp 112.800.000',
      recommendedAction: 'Aktifkan alert re-stock otomatis ke distributor dan sesuaikan batas MOQ untuk toko kecil.',
      actionCtaPrimary: {
        label: '🛒 Deep Dive Cart Funnel',
        route: '/analytics/cart-funnel',
      },
      actionCtaSecondary: {
        label: '📦 Request Distributor Stock Re-allocation',
        actionKey: 'restock_req',
      },
    },
    {
      id: 'anomaly_checkout_freight',
      severity: 'warning',
      title: 'Checkout Drop-off Spike on Logistics & Freight API Calculation',
      badgeLabel: 'WARNING',
      rootCause: 'API kalkulasi ongkos kirim armada truk distributor mengalami timeout untuk alamat toko di luar radius Ring 1.',
      topAffectedQueries: ['Radius > 25km (240x drop)', 'Plafon Kredit Habis (118x)', 'Tonase Truk < 4 Ton (62x)'],
      affectedSegment: 'Retailer Toko Bangunan Pinggiran (Kabupaten Bogor & Karawang)',
      estimatedLostGmvFormatted: 'Estimasi Dampak: ~Rp 101.000.000',
      recommendedAction: 'Implementasikan fallback flat-rate ongkos kirim saat API freight timeout terjadi.',
      actionCtaPrimary: {
        label: '🚛 Inspect Logistics & Freight Errors',
        route: '/analytics/checkout-logistics',
      },
      actionCtaSecondary: {
        label: '⚙️ Enable Flat-Rate Fallback',
        actionKey: 'enable_fallback',
      },
    },
  ];

  return {
    filter,
    lastUpdatedTime: '14:32 WIB',
    dataFreshnessLagMinutes: 14,
    northStar: {
      title: 'Total Gross Merchandise Value (GMV)',
      currentGmv: baseGmv,
      currentGmvFormatted: `Rp ${baseGmv.toLocaleString('id-ID')}`,
      currentGmvShort: `Rp ${(baseGmv / 1_000_000_000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Miliar`,
      priorGmv,
      priorGmvFormatted: `Rp ${priorGmv.toLocaleString('id-ID')}`,
      nominalGrowthRp,
      growthDelta: {
        value: gmvGrowthPercent,
        formatted: `+${gmvGrowthPercent}% (+Rp ${(nominalGrowthRp / 1_000_000).toFixed(1)} M)`,
        isPositiveDirection: true,
        status: 'good',
        comparisonPeriodLabel: 'vs previous 30 days (Jul 2 - Jul 31)',
      },
      validOrders,
      validOrdersGrowthPercent: 3.8,
      aov,
      aovFormatted: `Rp ${(aov / 1_000_000).toFixed(2)} M`,
      aovGrowthPercent: 4.2,
      activeBuyers,
      activeBuyersGrowthPercent: 2.1,
      orderFrequency,
    },
    kpiDrivers: [
      {
        id: 'acquisition',
        categoryLabel: 'ACQUISITION',
        metricTitle: 'New Verified Toko (CPD/BNN)',
        currentValueFormatted: (Math.round(2430 * volumeMultiplier)).toLocaleString('id-ID'),
        currentValueRaw: Math.round(2430 * volumeMultiplier),
        isPercentage: false,
        delta: {
          value: 12.4,
          formatted: '+12.4% (+268)',
          isPositiveDirection: true,
          status: 'good',
          comparisonPeriodLabel: 'WoW',
        },
        targetValue: Math.round(2200 * volumeMultiplier),
        targetFormatted: `${(Math.round(2200 * volumeMultiplier)).toLocaleString('id-ID')} Toko`,
        targetGapFormatted: '+230',
        isTargetAchieved: true,
        drillDownLabel: 'View Growth Funnel →',
        drillDownRoute: '/analytics/growth',
      },
      {
        id: 'activation',
        categoryLabel: 'ACTIVATION',
        metricTitle: 'D-7 Activation Rate',
        currentValueFormatted: '36.4%',
        currentValueRaw: 36.4,
        isPercentage: true,
        delta: {
          value: -5.4,
          formatted: '-5.4%',
          isPositiveDirection: false,
          status: 'warning',
          comparisonPeriodLabel: 'WoW',
        },
        targetValue: 40.0,
        targetFormatted: '40.0%',
        targetGapFormatted: '-3.6%',
        isTargetAchieved: false,
        drillDownLabel: 'View Activation Funnel →',
        drillDownRoute: '/analytics/activation',
      },
      {
        id: 'retention',
        categoryLabel: 'RETENTION',
        metricTitle: 'M1 Retention Rate',
        currentValueFormatted: '42.8%',
        currentValueRaw: 42.8,
        isPercentage: true,
        delta: {
          value: -3.2,
          formatted: '-3.2%',
          isPositiveDirection: false,
          status: 'warning',
          comparisonPeriodLabel: 'MoM',
        },
        targetValue: 45.0,
        targetFormatted: '45.0%',
        targetGapFormatted: '-2.2%',
        isTargetAchieved: false,
        drillDownLabel: 'View Retention Cohort →',
        drillDownRoute: '/analytics/retention',
      },
      {
        id: 'revenue',
        categoryLabel: 'REVENUE',
        metricTitle: 'Average Order Value (AOV)',
        currentValueFormatted: `Rp ${(aov / 1_000_000).toFixed(2)} M`,
        currentValueRaw: aov,
        isPercentage: false,
        delta: {
          value: 4.2,
          formatted: '+4.2%',
          isPositiveDirection: true,
          status: 'good',
          comparisonPeriodLabel: 'MoM',
        },
        targetValue: 2700000,
        targetFormatted: 'Rp 2.70 M',
        targetGapFormatted: '+Rp 120k',
        isTargetAchieved: true,
        drillDownLabel: 'View Order Analysis →',
        drillDownRoute: '/analytics/revenue',
      },
    ],
    trend30Days,
    driversImpact: {
      totalGmvDeltaRp: nominalGrowthRp,
      totalGmvDeltaFormatted: `+Rp ${(nominalGrowthRp / 1_000_000).toFixed(1)} M`,
      totalGmvDeltaPercent: gmvGrowthPercent,
      drivers: driversImpactList,
    },
    productHealth: {
      metrics: productHealthMetrics,
      healthyCount: 3,
      warningCount: 0,
      criticalCount: 1,
    },
    anomalies,
  };
}
