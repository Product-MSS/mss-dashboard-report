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
  // Base multipliers depending on selected region, supplier, or selling agent
  let volumeMultiplier = 1.0;
  if (filter.region === 'area_cpd') volumeMultiplier = 0.58;
  else if (filter.region === 'area_bnn') volumeMultiplier = 0.46;
  else if (filter.region === 'jawa_barat') volumeMultiplier = 0.42;
  else if (filter.region === 'dki_jakarta') volumeMultiplier = 0.28;
  else if (filter.region === 'jawa_timur') volumeMultiplier = 0.18;
  else if (filter.region === 'jawa_tengah') volumeMultiplier = 0.12;
  else if (filter.region === 'banten') volumeMultiplier = 0.10;
  else if (filter.region === 'luar_jawa') volumeMultiplier = 0.14;

  if (filter.supplierId === 'semen_indonesia') volumeMultiplier *= 0.60;
  else if (filter.supplierId === 'krakatau_steel') volumeMultiplier *= 0.32;
  else if (filter.supplierId === 'holcim_indonesia') volumeMultiplier *= 0.25;
  else if (filter.supplierId === 'arwana_citramulia') volumeMultiplier *= 0.15;

  if (filter.sellingAgentId === 'sa_semen_gresik_jabar') volumeMultiplier *= 0.55;
  else if (filter.sellingAgentId === 'sa_baja_perkasa') volumeMultiplier *= 0.30;
  else if (filter.sellingAgentId === 'sa_cat_nusantara') volumeMultiplier *= 0.15;
  else if (filter.sellingAgentId === 'sa_mitra_distrindo') volumeMultiplier *= 0.20;

  const totalMonths = Math.max(
    1,
    (filter.endYear - filter.startYear) * 12 + (filter.endMonth - filter.startMonth) + 1
  );
  const periodScaling = totalMonths / 8;
  volumeMultiplier *= periodScaling;

  const baseGmv = Math.round(12_480_000_000 * volumeMultiplier);
  const priorGmv = Math.round(11_533_500_000 * volumeMultiplier);
  const gmvGrowthPercent = 8.2;
  const nominalGrowthRp = baseGmv - priorGmv;

  const validOrders = Math.round(4420 * volumeMultiplier);
  const aov = Math.round(baseGmv / Math.max(1, validOrders));
  const activeBuyers = Math.round(1850 * volumeMultiplier);
  const orderFrequency = Number((validOrders / Math.max(1, activeBuyers)).toFixed(2));

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const MONTH_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Helper to compute comparison period string
  const computeComparisonPeriod = (
    sYear: number,
    sMonth: number,
    _eYear: number,
    _eMonth: number,
    tMonths: number
  ): { comparisonText: string; priorStartMonth: number; priorStartYear: number; priorEndMonth: number; priorEndYear: number } => {
    if (tMonths === 1) {
      const prevDate = new Date(sYear, sMonth - 2, 1);
      const pMonth = prevDate.getMonth() + 1;
      const pYear = prevDate.getFullYear();
      return {
        comparisonText: `vs ${MONTH_NAMES[pMonth - 1]} ${pYear}`,
        priorStartMonth: pMonth,
        priorStartYear: pYear,
        priorEndMonth: pMonth,
        priorEndYear: pYear,
      };
    } else {
      const currentStartTotal = sYear * 12 + sMonth;
      const priorEndTotal = currentStartTotal - 1;
      const priorStartTotal = priorEndTotal - tMonths + 1;

      const pStartYear = Math.floor((priorStartTotal - 1) / 12);
      const pStartMonth = ((priorStartTotal - 1) % 12) + 1;
      const pEndYear = Math.floor((priorEndTotal - 1) / 12);
      const pEndMonth = ((priorEndTotal - 1) % 12) + 1;

      return {
        comparisonText: `vs ${MONTH_SHORT[pStartMonth - 1]} ${pStartYear} - ${MONTH_SHORT[pEndMonth - 1]} ${pEndYear}`,
        priorStartMonth: pStartMonth,
        priorStartYear: pStartYear,
        priorEndMonth: pEndMonth,
        priorEndYear: pEndYear,
      };
    }
  };

  const {
    comparisonText,
    priorStartMonth,
    priorStartYear,
    priorEndMonth,
    priorEndYear,
  } = computeComparisonPeriod(
    filter.startYear,
    filter.startMonth,
    filter.endYear,
    filter.endMonth,
    totalMonths
  );

  // Dynamic Trend Generation: Daily (1 Month) vs Monthly (2 to 24 Months)
  const trendPoints: GmvTrendDayDto[] = [];
  let chartTitle = '';
  let currentPeriodLegend = '';
  let priorPeriodLegend = '';
  let avgFormatted = '';
  let peakFormatted = '';

  if (totalMonths === 1) {
    // 1 Month = Daily Timeline (Day 1 to Days in Month)
    const selectedYear = filter.startYear;
    const selectedMonth = filter.startMonth;
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const monthShort = MONTH_SHORT[selectedMonth - 1];

    for (let day = 1; day <= daysInMonth; day++) {
      const isPromoSpike = day === 18;
      const dayFactor = 0.82 + Math.sin(day / 2.8) * 0.18 + (day % 7 === 0 || day % 7 === 6 ? -0.22 : 0.08);
      const dayGmvBase = (baseGmv / daysInMonth) * dayFactor;
      const currentGmvDay = Math.round(isPromoSpike ? dayGmvBase * 1.65 : dayGmvBase);
      const priorGmvDay = Math.round((priorGmv / daysInMonth) * (0.85 + Math.cos(day / 3) * 0.15));

      const dayOrders = Math.round(currentGmvDay / Math.max(1, aov * (0.94 + (day % 5) * 0.02)));
      const dayBuyers = Math.round(dayOrders * 0.82);

      const pad = (n: number) => n.toString().padStart(2, '0');
      const dateStr = `${selectedYear}-${pad(selectedMonth)}-${pad(day)}`;

      trendPoints.push({
        pointIndex: day,
        dayIndex: day,
        date: dateStr,
        dateLabel: `Day ${day} (${monthShort} ${day}, ${selectedYear})`,
        shortLabel: `${monthShort} ${day}`,
        currentGmv: currentGmvDay,
        currentGmvFormatted: `Rp ${(currentGmvDay / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })} M`,
        priorGmv: priorGmvDay,
        priorGmvFormatted: `Rp ${(priorGmvDay / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })} M`,
        validOrdersCount: dayOrders,
        aovFormatted: `Rp ${(currentGmvDay / Math.max(1, dayOrders)).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        activeBuyersCount: dayBuyers,
        isPromoSpike,
        spikeReason: isPromoSpike ? 'Flash Promo Voucher Semen 5% (LV-07)' : undefined,
        topDistributors: [
          {
            name: 'SA Semen Gresik Jabar',
            gmvFormatted: `Rp ${((currentGmvDay * 0.55) / 1_000_000).toFixed(1)} M`,
            sharePercent: 55.1,
          },
          {
            name: 'SA Baja Perkasa Utama',
            gmvFormatted: `Rp ${((currentGmvDay * 0.31) / 1_000_000).toFixed(1)} M`,
            sharePercent: 31.0,
          },
          {
            name: 'SA Cat Nusantara Abadi',
            gmvFormatted: `Rp ${((currentGmvDay * 0.139) / 1_000_000).toFixed(1)} M`,
            sharePercent: 13.9,
          },
        ],
      });
    }

    const peakPoint = trendPoints.reduce((max, p) => (p.currentGmv > max.currentGmv ? p : max), trendPoints[0]);
    const avgDailyGmv = Math.round(trendPoints.reduce((sum, p) => sum + p.currentGmv, 0) / trendPoints.length);

    chartTitle = `Daily GMV Trend (${MONTH_NAMES[selectedMonth - 1]} ${selectedYear})`;
    currentPeriodLegend = `Current Period (${monthShort} ${selectedYear})`;
    priorPeriodLegend = `Previous Period (${MONTH_SHORT[priorStartMonth - 1]} ${priorStartYear})`;
    avgFormatted = `Rp ${(avgDailyGmv / 1_000_000).toFixed(0)}M/day`;
    peakFormatted = `Rp ${(peakPoint.currentGmv / 1_000_000).toFixed(0)}M (${monthShort} ${peakPoint.pointIndex})`;
  } else {
    // 2 to 24 Months = Monthly Timeline
    let currentCursorYear = filter.startYear;
    let currentCursorMonth = filter.startMonth;
    let pointIdx = 1;

    let priorCursorYear = priorStartYear;
    let priorCursorMonth = priorStartMonth;

    const monthlyAvgGmv = baseGmv / totalMonths;
    const priorMonthlyAvg = priorGmv / totalMonths;

    while (
      currentCursorYear < filter.endYear ||
      (currentCursorYear === filter.endYear && currentCursorMonth <= filter.endMonth)
    ) {
      const monthShort = MONTH_SHORT[currentCursorMonth - 1];
      const monthYearStr = `${monthShort} '${String(currentCursorYear).slice(2)}`;
      const monthProgress = pointIdx / totalMonths;
      
      // Growth progression curve across months with smooth natural trajectory
      const seasonalFactor = 0.88 + (monthProgress * 0.22) + Math.sin((currentCursorMonth / 12) * Math.PI) * 0.05;
      const currentMonthGmv = Math.round(monthlyAvgGmv * seasonalFactor);
      const priorMonthGmv = Math.round(priorMonthlyAvg * (seasonalFactor * 0.93));

      const monthOrders = Math.round(validOrders / totalMonths * seasonalFactor);
      const monthBuyers = Math.round(activeBuyers / totalMonths * (0.88 + monthProgress * 0.12) * totalMonths * 0.35);

      const pad = (n: number) => n.toString().padStart(2, '0');
      const dateStr = `${currentCursorYear}-${pad(currentCursorMonth)}`;

      trendPoints.push({
        pointIndex: pointIdx,
        dayIndex: pointIdx,
        date: dateStr,
        dateLabel: `${MONTH_NAMES[currentCursorMonth - 1]} ${currentCursorYear}`,
        shortLabel: monthYearStr,
        currentGmv: currentMonthGmv,
        currentGmvFormatted: `Rp ${(currentMonthGmv / 1_000_000_000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} B`,
        priorGmv: priorMonthGmv,
        priorGmvFormatted: `Rp ${(priorMonthGmv / 1_000_000_000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} B`,
        validOrdersCount: monthOrders,
        aovFormatted: `Rp ${(currentMonthGmv / Math.max(1, monthOrders)).toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        activeBuyersCount: monthBuyers,
        isPromoSpike: currentCursorMonth === 8 && currentCursorYear === 2026,
        spikeReason: currentCursorMonth === 8 && currentCursorYear === 2026 ? 'Peak Q3 Builder Season Promotion' : undefined,
        topDistributors: [
          {
            name: 'SA Semen Gresik Jabar',
            gmvFormatted: `Rp ${((currentMonthGmv * 0.54) / 1_000_000_000).toFixed(2)} B`,
            sharePercent: 54.2,
          },
          {
            name: 'SA Baja Perkasa Utama',
            gmvFormatted: `Rp ${((currentMonthGmv * 0.31) / 1_000_000_000).toFixed(2)} B`,
            sharePercent: 31.0,
          },
          {
            name: 'SA Cat Nusantara Abadi',
            gmvFormatted: `Rp ${((currentMonthGmv * 0.148) / 1_000_000_000).toFixed(2)} B`,
            sharePercent: 14.8,
          },
        ],
      });

      // Increment cursor
      pointIdx++;
      currentCursorMonth++;
      if (currentCursorMonth > 12) {
        currentCursorMonth = 1;
        currentCursorYear++;
      }

      priorCursorMonth++;
      if (priorCursorMonth > 12) {
        priorCursorMonth = 1;
        priorCursorYear++;
      }
    }

    const peakPoint = trendPoints.reduce((max, p) => (p.currentGmv > max.currentGmv ? p : max), trendPoints[0]);
    const avgMonthlyGmv = Math.round(trendPoints.reduce((sum, p) => sum + p.currentGmv, 0) / trendPoints.length);

    chartTitle = `${totalMonths}-Month GMV Trend (${MONTH_SHORT[filter.startMonth - 1]} ${filter.startYear} - ${MONTH_SHORT[filter.endMonth - 1]} ${filter.endYear})`;
    currentPeriodLegend = `Current Period (${MONTH_SHORT[filter.startMonth - 1]} - ${MONTH_SHORT[filter.endMonth - 1]} ${filter.endYear})`;
    priorPeriodLegend = `Prior Period (${MONTH_SHORT[priorStartMonth - 1]} ${priorStartYear} - ${MONTH_SHORT[priorEndMonth - 1]} ${priorEndYear})`;
    avgFormatted = `Rp ${(avgMonthlyGmv / 1_000_000_000).toFixed(2)}B/month`;
    peakFormatted = `Rp ${(peakPoint.currentGmv / 1_000_000_000).toFixed(2)}B (${peakPoint.shortLabel})`;
  }

  // 3-Lever Waterfall Impact Matrix Drivers
  const driversImpactList: GmvDriverImpactDto[] = [
    {
      id: 'driver_aov',
      driverName: 'Basket Size (AOV Impact)',
      subLabel: 'Average nominal GMV per checkout basket',
      currentValueFormatted: `Rp ${(aov / 1_000_000).toFixed(2)} M`,
      changeFormatted: '▲ +4.2%',
      nominalImpactRp: Math.round(520_000_000 * volumeMultiplier),
      nominalImpactFormatted: '+Rp 520 M',
      impactType: 'positive',
      relativeBarWidthPercent: 55,
      insightDescription: 'Average nominal GMV per checkout basket.',
    },
    {
      id: 'driver_buyers',
      driverName: 'Active Buyers (Buyer Volume Impact)',
      subLabel: 'Total distinct transacting store accounts in the period',
      currentValueFormatted: `${activeBuyers.toLocaleString('en-US')} Stores`,
      changeFormatted: '▲ +2.1%',
      nominalImpactRp: Math.round(250_000_000 * volumeMultiplier),
      nominalImpactFormatted: '+Rp 250 M',
      impactType: 'positive',
      relativeBarWidthPercent: 26,
      insightDescription: 'Total distinct transacting store accounts in the period.',
    },
    {
      id: 'driver_frequency',
      driverName: 'Order Frequency Impact',
      subLabel: 'Ratio of valid orders to active buyers',
      currentValueFormatted: `${orderFrequency}x / period`,
      changeFormatted: '▲ +1.8%',
      nominalImpactRp: Math.round(176_500_000 * volumeMultiplier),
      nominalImpactFormatted: '+Rp 176.5 M',
      impactType: 'positive',
      relativeBarWidthPercent: 19,
      insightDescription: 'Ratio of valid orders to active buyers.',
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
      signalNote: 'Ratio of search queries returning 0 catalog SKUs.',
    },
    {
      id: 'health_add_to_cart',
      name: 'Add to Cart Success Rate',
      valueFormatted: '94.20%',
      targetSlaFormatted: '>= 90.0%',
      status: 'healthy',
      statusLabel: 'Normal',
      signalNote: 'Ratio of Add to Cart clicks successfully saved.',
    },
    {
      id: 'health_checkout_success',
      name: 'Checkout Success Rate',
      valueFormatted: '98.15%',
      targetSlaFormatted: '>= 97.0%',
      status: 'healthy',
      statusLabel: 'Normal',
      signalNote: 'Conversion ratio from active Cart to Payment submission.',
    },
    {
      id: 'health_payment_success',
      name: 'Payment Success Rate',
      valueFormatted: '97.80%',
      targetSlaFormatted: '>= 95.0%',
      status: 'healthy',
      statusLabel: 'Normal',
      signalNote: 'Ratio of settlements (VA/QRIS/TOP) successfully marked as Paid.',
    },
  ];

  // 4-Stage Funnel Anomaly Alerts
  const anomalies: AnomalyAlertDto[] = [
    {
      id: 'anomaly_zero_search',
      severity: 'critical',
      title: 'Zero-Result Search Spike (+67% WoW | Affecting 2,340 Searches)',
      badgeLabel: 'CRITICAL',
      rootCause: 'Sudden spike in material demand with missing catalog alias entries in the search index.',
      topAffectedQueries: ['Semen Tiga Roda 50kg (842x)', 'Baja Ringan 0.75 (612x)', 'Cat No Drop Grey (410x)'],
      affectedSegment: 'West Java Retailers (SA Semen Gresik Jabar)',
      estimatedLostGmvFormatted: 'Est. GMV Impact: ~Rp 185,000,000',
      recommendedAction: 'Add synonyms/aliases in the catalog CMS and enable alternative product recommendations.',
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
      rootCause: 'Depleted Semen Gresik 50kg distributor warehouse stock and strict 200-sack MOQ triggering silent buyer drop-offs.',
      topAffectedQueries: ['Semen Gresik 50kg (610x failed)', 'Baja Ringan C75 (320x failed)', 'Pipa PVC 3 Inch (180x failed)'],
      affectedSegment: 'Tier B & C Retailers in Banten & West Java',
      estimatedLostGmvFormatted: 'Est. GMV Impact: ~Rp 112,800,000',
      recommendedAction: 'Trigger automated re-stock alerts to the distributor and configure flexible MOQ tiers for small retailers.',
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
      rootCause: 'Distributor truck freight calculation API timeout for retailer delivery addresses beyond Ring 1 radius.',
      topAffectedQueries: ['Radius > 25km (240x drop)', 'Credit Limit Exceeded (118x)', 'Truck Weight < 4 Ton (62x)'],
      affectedSegment: 'Suburban Hardware Stores (Bogor & Karawang Regencies)',
      estimatedLostGmvFormatted: 'Est. GMV Impact: ~Rp 101,000,000',
      recommendedAction: 'Implement a fallback flat-rate delivery matrix when freight calculation API times out.',
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
    comparisonPeriodText: comparisonText,
    northStar: {
      title: 'Total Gross Merchandise Value (GMV)',
      currentGmv: baseGmv,
      currentGmvFormatted: `Rp ${baseGmv.toLocaleString('en-US')}`,
      currentGmvShort: `Rp ${(baseGmv / 1_000_000_000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Billion`,
      priorGmv,
      priorGmvFormatted: `Rp ${priorGmv.toLocaleString('en-US')}`,
      nominalGrowthRp,
      growthDelta: {
        value: gmvGrowthPercent,
        formatted: `+${gmvGrowthPercent}% (+Rp ${(nominalGrowthRp / 1_000_000).toFixed(1)} M)`,
        isPositiveDirection: true,
        status: 'good',
        comparisonPeriodLabel: comparisonText,
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
        metricTitle: 'New Verified Stores',
        currentValueFormatted: (Math.round(2430 * volumeMultiplier)).toLocaleString('en-US'),
        currentValueRaw: Math.round(2430 * volumeMultiplier),
        isPercentage: false,
        delta: {
          value: 12.4,
          formatted: '+12.4% (+268)',
          isPositiveDirection: true,
          status: 'good',
          comparisonPeriodLabel: comparisonText,
        },
        comparisonPeriodText: comparisonText,
        targetValue: Math.round(2200 * volumeMultiplier),
        targetFormatted: `${(Math.round(2200 * volumeMultiplier)).toLocaleString('en-US')} Stores`,
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
          comparisonPeriodLabel: comparisonText,
        },
        comparisonPeriodText: comparisonText,
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
          comparisonPeriodLabel: comparisonText,
        },
        comparisonPeriodText: comparisonText,
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
          comparisonPeriodLabel: comparisonText,
        },
        comparisonPeriodText: comparisonText,
        targetValue: 2700000,
        targetFormatted: 'Rp 2.70 M',
        targetGapFormatted: '+Rp 120k',
        isTargetAchieved: true,
        drillDownLabel: 'View Order Analysis →',
        drillDownRoute: '/analytics/revenue',
      },
    ],
    trend: {
      granularity: totalMonths === 1 ? 'daily' : 'monthly',
      chartTitle,
      peakFormatted,
      avgFormatted,
      currentPeriodLegend,
      priorPeriodLegend,
      points: trendPoints,
    },
    trend30Days: trendPoints,
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
