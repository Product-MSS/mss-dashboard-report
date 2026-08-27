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
            Deep-dive analysis on daily transaction trends, AOV basket sizes, selling agent contributions, and
            payment method mix.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Back to Control Tower
          </button>
        </div>
      )}

      {activeTab === 'growth' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">👥</span>
          <h2 className="db-tab-placeholder__title">Growth & Store Acquisition Dashboard</h2>
          <p className="db-tab-placeholder__desc">
            Track new store registrations, KYC/NIK approvals across Area CPD & Area BNN, sales force
            productivity, and channel attribution.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Back to Control Tower
          </button>
        </div>
      )}

      {activeTab === 'activation' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">⚡</span>
          <h2 className="db-tab-placeholder__title">Activation & Onboarding Funnel</h2>
          <p className="db-tab-placeholder__desc">
            Visualize first-order funnel drop-offs (Register ➔ KYC Approved ➔ First Login ➔ Cart View ➔
            Checkout Submit) and D-7 / D-30 conversion velocity.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Back to Control Tower
          </button>
        </div>
      )}

      {activeTab === 'retention' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">🔄</span>
          <h2 className="db-tab-placeholder__title">Cohort Retention & Churn Matrix</h2>
          <p className="db-tab-placeholder__desc">
            Analyze monthly cohort retention matrices, repeat order frequency, early churn indicators, and
            distributor MOQ impact on Tier C stores.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Back to Control Tower
          </button>
        </div>
      )}

      {activeTab === 'health' && (
        <div className="db-tab-placeholder">
          <span className="db-tab-placeholder__icon">🏥</span>
          <h2 className="db-tab-placeholder__title">Product Health & Technical Diagnostics</h2>
          <p className="db-tab-placeholder__desc">
            Monitor payment gateway failures, zero-result search term logs, camera crash telemetry on
            Android devices, and data freshness pipeline SLAs.
          </p>
          <button
            type="button"
            className="ct-btn ct-btn--secondary"
            onClick={() => setActiveTab('overview')}
          >
            ← Back to Control Tower
          </button>
        </div>
      )}
    </DashboardShell>
  );
}

export default App;
