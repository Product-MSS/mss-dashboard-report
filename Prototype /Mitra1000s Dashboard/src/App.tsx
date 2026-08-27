import { useState } from 'react';
import './index.css';
import './App.css';
import { DashboardShell } from './shared/components/DashboardShell';
import { ProductOverviewPage } from './features/productOverview';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [isOverviewLoading, setIsOverviewLoading] = useState<boolean>(false);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  const handleRefreshTopBar = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleNavigateFromOverview = (route: string) => {
    if (route.includes('revenue')) setActiveTab('revenue');
    else if (route.includes('growth')) setActiveTab('growth');
    else if (route.includes('activation')) setActiveTab('activation');
    else if (route.includes('retention')) setActiveTab('retention');
    else if (route.includes('diagnostics') || route.includes('health') || route.includes('search'))
      setActiveTab('health');
  };

  return (
    <DashboardShell
      activeTab={activeTab}
      onTabChange={handleTabChange}
      onRefresh={handleRefreshTopBar}
      isRefreshing={isOverviewLoading}
      syncInfo={{
        status: 'Live',
        lag: '14 min ago',
        updateTime: '14:32 WIB',
      }}
    >
      {activeTab === 'overview' && (
        <ProductOverviewPage
          onNavigateToDashboard={handleNavigateFromOverview}
          refreshKey={refreshTrigger}
          onLoadingChange={setIsOverviewLoading}
        />
      )}

      {activeTab === 'revenue' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">💰</span>
          <h2 className="db-tab-placeholder__title">Revenue & Order Analysis Dashboard</h2>
          <p className="db-tab-placeholder__desc">
            Analisis mendalam tren transaksi harian, AOV basket size, kontribusi per distributor, dan
            payment method mix.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Kembali ke Control Tower
          </button>
        </div>
      )}

      {activeTab === 'growth' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">👥</span>
          <h2 className="db-tab-placeholder__title">Growth & Akuisisi Toko Dashboard</h2>
          <p className="db-tab-placeholder__desc">
            Monitoring registrasi toko baru, approval NIK/KYC PT CPD & PT BNN, produktivitas tim Sales
            Force, dan channel attribution.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Kembali ke Control Tower
          </button>
        </div>
      )}

      {activeTab === 'activation' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">⚡</span>
          <h2 className="db-tab-placeholder__title">Activation & Onboarding Funnel</h2>
          <p className="db-tab-placeholder__desc">
            Visualisasi drop-off alur First Order (Register ➔ KYC Approved ➔ First Login ➔ Cart View ➔
            Checkout Submit) dan konversi D-7 / D-30.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Kembali ke Control Tower
          </button>
        </div>
      )}

      {activeTab === 'retention' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">🔄</span>
          <h2 className="db-tab-placeholder__title">Cohort Retention & Churn Matrix</h2>
          <p className="db-tab-placeholder__desc">
            Analisis matriks cohort bulanan, repeat order frequency, early churn prediction, dan
            evaluasi dampak MOQ distributor pada Toko Tier C.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Kembali ke Control Tower
          </button>
        </div>
      )}

      {activeTab === 'health' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">🏥</span>
          <h2 className="db-tab-placeholder__title">Product Health & Technical Diagnostics</h2>
          <p className="db-tab-placeholder__desc">
            Monitoring error gateway payment, zero-result search term logs, camera crash telemetry pada
            Android 11, dan SLA data pipeline freshness.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Kembali ke Control Tower
          </button>
        </div>
      )}
    </DashboardShell>
  );
}

export default App;
