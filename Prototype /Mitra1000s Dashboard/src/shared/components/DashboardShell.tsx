// ==============================================================================
// Dashboard Shell Component — Mitra1000s Design System
// Clean layout with Grouped Platform Navigation, Top Header Sync Info & User Profile
// ==============================================================================

import React, { useState } from 'react';

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface NavGroup {
  platformTitle: string;
  items: NavItem[];
}

export interface SyncInfo {
  status?: string;
  lag?: string;
  updateTime?: string;
}

interface DashboardShellProps {
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  syncInfo?: SyncInfo;
  children: React.ReactNode;
}

const navigationGroups: NavGroup[] = [
  {
    platformTitle: 'DASHBOARD MITRA1000S',
    items: [
      { key: 'overview', label: 'Executive Summary', icon: '🗼', badge: 'Live' },
      { key: 'revenue', label: 'Revenue & Orders', icon: '💰' },
      { key: 'growth', label: 'Growth & Akuisisi', icon: '👥' },
      { key: 'activation', label: 'Activation Funnel', icon: '⚡' },
      { key: 'retention', label: 'Retention & Cohorts', icon: '🔄' },
      { key: 'health', label: 'Product Health & Logs', icon: '🏥', badge: '1 Warn' },
    ],
  },
];

export const DashboardShell: React.FC<DashboardShellProps> = ({
  activeTab,
  onTabChange,
  onRefresh,
  isRefreshing = false,
  syncInfo = {
    status: 'Live',
    lag: '14 min ago',
    updateTime: '14:32 WIB',
  },
  children,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="db-shell">
      {/* ── Left Sidebar ─────────────────────────────────────────────────── */}
      <aside className={`db-sidebar ${sidebarCollapsed ? 'db-sidebar--collapsed' : ''}`}>
        <div className="db-sidebar__brand">
          <div className="db-sidebar__logo-icon">🟣</div>
          {!sidebarCollapsed && (
            <div className="db-sidebar__logo-text">
              <strong>MSS Report</strong>
            </div>
          )}
        </div>

        {/* Grouped Platform Navigation */}
        <nav className="db-sidebar__nav" aria-label="Main Navigation">
          {navigationGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="db-sidebar__group">
              <div className="db-sidebar__section-label">
                {!sidebarCollapsed ? group.platformTitle : '•••'}
              </div>
              <div className="db-sidebar__group-items">
                {group.items.map((item) => {
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={`db-nav-item ${isActive ? 'db-nav-item--active' : ''}`}
                      onClick={() => onTabChange(item.key)}
                      title={item.label}
                    >
                      <span className="db-nav-item__icon">{item.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="db-nav-item__label">{item.label}</span>
                      )}
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`db-nav-item__badge ${
                            item.badge === 'Live' ? 'db-badge-live' : 'db-badge-warn'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer — Collapse Action only */}
        <div className="db-sidebar__footer">
          <button
            type="button"
            className="db-sidebar__collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? '▶' : '◀ Sembunyikan'}
          </button>
        </div>
      </aside>

      {/* ── Main Canvas ──────────────────────────────────────────────────── */}
      <div className="db-main-area">
        {/* Top Header Bar */}
        <header className="db-top-header">
          <div className="db-top-header__left">
            <div className="db-top-header__breadcrumb">
              <span className="db-breadcrumb__platform">Dashboard Mitra1000s</span>
              <span className="db-breadcrumb__divider">/</span>
              <strong className="db-breadcrumb__current">
                {activeTab === 'overview'
                  ? 'Executive Summary'
                  : navigationGroups
                      .flatMap((g) => g.items)
                      .find((i) => i.key === activeTab)?.label || activeTab}
              </strong>
            </div>
          </div>

          <div className="db-top-header__actions">
            {/* Data Sync Information & Refresh Action in Topbar */}
            <div className="db-sync-pill">
              <span className="db-sync-pill__status">🟢 {syncInfo.status || 'Live'}</span>
              <span className="db-sync-pill__divider">|</span>
              <span className="db-sync-pill__info">
                Data Lag: <strong>{syncInfo.lag || '14 min ago'}</strong>
              </span>
              <span className="db-sync-pill__divider">|</span>
              <span className="db-sync-pill__info">
                Update: <strong>{syncInfo.updateTime || '14:32 WIB'}</strong>
              </span>
              {onRefresh && (
                <button
                  type="button"
                  className="db-sync-pill__refresh-btn"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  title="Muat ulang data terbaru"
                >
                  <span className={isRefreshing ? 'db-spin' : ''}>⚡</span>
                  <span>{isRefreshing ? 'Loading...' : 'Refresh Data'}</span>
                </button>
              )}
            </div>

            {/* User Profile in Top Header */}
            <div className="db-header-user">
              <div className="db-header-user__avatar">
                <span>AB</span>
              </div>
              <div className="db-header-user__info">
                <strong className="db-header-user__name">Annette Black</strong>
                <span className="db-header-user__role">Lead Product Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="db-content-canvas">{children}</div>
      </div>
    </div>
  );
};
