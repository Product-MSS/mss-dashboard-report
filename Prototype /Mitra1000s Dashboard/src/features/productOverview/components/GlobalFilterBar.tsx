// ==============================================================================
// Global Filter Bar Component — Mitra1000s Control Tower
// Context Provider for all Downstream Metrics
// ==============================================================================

import React from 'react';
import type {
  GlobalFilterState,
  DateRangeOption,
  RegionOption,
  RoleOption,
  DistributorOption,
  SalesForceOption,
} from '../models/productOverviewDto';

interface GlobalFilterBarProps {
  filter: GlobalFilterState;
  onFilterChange: (partial: Partial<GlobalFilterState>) => void;
  isLoading: boolean;
}

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({
  filter,
  onFilterChange,
  isLoading,
}) => {
  return (
    <section className="ct-filter-bar" aria-label="Global Context Filter Layer">
      <div className="ct-filter-bar__group">
        {/* Date Range Selector */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-date" className="ct-filter-field__label">
            Period
          </label>
          <select
            id="ct-filter-date"
            className="ct-filter-field__select"
            value={filter.dateRange}
            onChange={(e) => onFilterChange({ dateRange: e.target.value as DateRangeOption })}
            disabled={isLoading}
          >
            <option value="today">Hari Ini (Real-time)</option>
            <option value="7d">7 Hari Terakhir</option>
            <option value="30d">30 Hari Terakhir</option>
            <option value="mtd">Month to Date (MTD)</option>
            <option value="qtd">Quarter to Date (QTD)</option>
            <option value="ytd">Year to Date (YTD)</option>
          </select>
        </div>

        {/* Region Geography Selector */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-region" className="ct-filter-field__label">
            Region
          </label>
          <select
            id="ct-filter-region"
            className="ct-filter-field__select"
            value={filter.region}
            onChange={(e) => onFilterChange({ region: e.target.value as RegionOption })}
            disabled={isLoading}
          >
            <option value="all">All Regions (Nasional)</option>
            <option value="jawa_barat">Jawa Barat</option>
            <option value="jawa_tengah">Jawa Tengah</option>
            <option value="jawa_timur">Jawa Timur</option>
            <option value="luar_jawa">Luar Jawa (Sumatera/Bali)</option>
          </select>
        </div>

        {/* User Role / Ecosystem Actor */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-role" className="ct-filter-field__label">
            Category
          </label>
          <select
            id="ct-filter-role"
            className="ct-filter-field__select"
            value={filter.role}
            onChange={(e) => onFilterChange({ role: e.target.value as RoleOption })}
            disabled={isLoading}
          >
            <option value="all">All Actors</option>
            <option value="retailer">Retailer (Toko Bangunan)</option>
            <option value="distributor">Distributor Utama</option>
            <option value="supplier">Supplier Material</option>
          </select>
        </div>

        {/* Distributor Entity */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-distributor" className="ct-filter-field__label">
            Distributor
          </label>
          <select
            id="ct-filter-distributor"
            className="ct-filter-field__select"
            value={filter.distributorId}
            onChange={(e) => onFilterChange({ distributorId: e.target.value as DistributorOption })}
            disabled={isLoading}
          >
            <option value="all">All Distributors</option>
            <option value="semen_gresik_jabar">Semen Gresik Jabar</option>
            <option value="baja_perkasa">Baja Perkasa</option>
            <option value="cat_nusantara">Cat Nusantara</option>
          </select>
        </div>

        {/* Sales Force Channel */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-sf" className="ct-filter-field__label">
            Sales Force
          </label>
          <select
            id="ct-filter-sf"
            className="ct-filter-field__select"
            value={filter.salesForceId}
            onChange={(e) => onFilterChange({ salesForceId: e.target.value as SalesForceOption })}
            disabled={isLoading}
          >
            <option value="all">All Channels</option>
            <option value="sales_force">Assisted by Sales Force</option>
            <option value="organic">Organic Self-Register</option>
          </select>
        </div>
      </div>
    </section>
  );
};
