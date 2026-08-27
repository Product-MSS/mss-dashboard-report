// ==============================================================================
// Global Filter Bar Component — Mitra1000s Control Tower
// Context Provider for all Downstream Metrics
// ==============================================================================

import React, { useState, useRef, useEffect, useMemo } from 'react';
import type {
  GlobalFilterState,
  RegionOption,
  SupplierOption,
  SellingAgentOption,
} from '../models/productOverviewDto';
import { Icons8 } from '@/shared/components/Icons8';

interface GlobalFilterBarProps {
  filter: GlobalFilterState;
  onFilterChange: (partial: Partial<GlobalFilterState>) => void;
  isLoading: boolean;
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const YEARS = [2024, 2025, 2026, 2027];

type PresetMode = 'ytd' | 'mtd' | 'last_year' | 'custom';

const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const formatDisplayDateRange = (
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
): string => {
  const startDay = '01';
  const endDay = String(getLastDayOfMonth(endYear, endMonth)).padStart(2, '0');
  const sMonth = String(startMonth).padStart(2, '0');
  const eMonth = String(endMonth).padStart(2, '0');
  return `${startDay}/${sMonth}/${startYear} - ${endDay}/${eMonth}/${endYear}`;
};

export const GlobalFilterBar: React.FC<GlobalFilterBarProps> = ({
  filter,
  onFilterChange,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Determine active preset mode
  const currentPresetMode: PresetMode = useMemo(() => {
    if (
      filter.startYear === 2026 &&
      filter.startMonth === 1 &&
      filter.endYear === 2026 &&
      filter.endMonth === 8
    ) {
      return 'ytd';
    }
    if (
      filter.startYear === 2026 &&
      filter.startMonth === 8 &&
      filter.endYear === 2026 &&
      filter.endMonth === 8
    ) {
      return 'mtd';
    }
    if (
      filter.startYear === 2025 &&
      filter.startMonth === 1 &&
      filter.endYear === 2025 &&
      filter.endMonth === 12
    ) {
      return 'last_year';
    }
    return 'custom';
  }, [filter.startYear, filter.startMonth, filter.endYear, filter.endMonth]);

  const [selectedMode, setSelectedMode] = useState<PresetMode>(currentPresetMode);

  // Draft state inside popover
  const [draftStartMonth, setDraftStartMonth] = useState(filter.startMonth);
  const [draftStartYear, setDraftStartYear] = useState(filter.startYear);
  const [draftEndMonth, setDraftEndMonth] = useState(filter.endMonth);
  const [draftEndYear, setDraftEndYear] = useState(filter.endYear);

  const handleToggleOpen = () => {
    if (!isOpen) {
      setDraftStartMonth(filter.startMonth);
      setDraftStartYear(filter.startYear);
      setDraftEndMonth(filter.endMonth);
      setDraftEndYear(filter.endYear);
      setSelectedMode(currentPresetMode);
    }
    setIsOpen((prev) => !prev);
  };

  // Click outside listener to close popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Compute total months span in draft
  const draftMonthsSpan = useMemo(() => {
    return (draftEndYear - draftStartYear) * 12 + (draftEndMonth - draftStartMonth) + 1;
  }, [draftStartYear, draftStartMonth, draftEndYear, draftEndMonth]);

  const isSpanExceeded = draftMonthsSpan > 24;
  const isInvalidRange = draftMonthsSpan < 1;

  // Handle Preset selection
  const handleSelectPreset = (mode: PresetMode) => {
    setSelectedMode(mode);
    if (mode === 'ytd') {
      setDraftStartYear(2026);
      setDraftStartMonth(1);
      setDraftEndYear(2026);
      setDraftEndMonth(8);
    } else if (mode === 'mtd') {
      setDraftStartYear(2026);
      setDraftStartMonth(8);
      setDraftEndYear(2026);
      setDraftEndMonth(8);
    } else if (mode === 'last_year') {
      setDraftStartYear(2025);
      setDraftStartMonth(1);
      setDraftEndYear(2025);
      setDraftEndMonth(12);
    }
  };

  const handleApply = () => {
    if (isSpanExceeded || isInvalidRange) return;
    onFilterChange({
      startYear: draftStartYear,
      startMonth: draftStartMonth,
      endYear: draftEndYear,
      endMonth: draftEndMonth,
    });
    setIsOpen(false);
  };

  const formattedDisplay = formatDisplayDateRange(
    filter.startYear,
    filter.startMonth,
    filter.endYear,
    filter.endMonth
  );

  return (
    <section className="ct-filter-bar" aria-label="Global Context Filter Layer">
      <div className="ct-filter-bar__group">
        {/* 1. Single Field Date Range Filter with Popover */}
        <div className="ct-filter-field ct-filter-field--date-dropdown" ref={popoverRef}>
          <label className="ct-filter-field__label" htmlFor="ct-date-trigger-btn">
            <Icons8 name="calendar" size={13} color="var(--text-muted)" />
            <span>Date Range</span>
          </label>

          <button
            id="ct-date-trigger-btn"
            type="button"
            className={`ct-date-trigger-btn ${isOpen ? 'ct-date-trigger-btn--active' : ''}`}
            onClick={handleToggleOpen}
            disabled={isLoading}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <div className="ct-date-trigger-btn__body">
              <Icons8 name="calendar" size={15} color="var(--primary-600)" />
              <span className="ct-date-trigger-btn__text">{formattedDisplay}</span>
            </div>
            <span className={`ct-date-trigger-btn__icon ${isOpen ? 'ct-date-trigger-btn__icon--open' : ''}`}>
              ▾
            </span>
          </button>

          {/* Floating Popover Modal */}
          {isOpen && (
            <div className="ct-date-popover" role="dialog" aria-modal="true" aria-label="Select Date Range">
              <div className="ct-date-popover__header">
                <span className="ct-date-popover__title">Select Date Range</span>
                <span className="ct-date-popover__subtitle">Maximum analysis span is 2 years (24 months)</span>
              </div>

              {/* Quick Presets Buttons (3 Options) */}
              <div className="ct-date-presets">
                <button
                  type="button"
                  className={`ct-date-preset-pill ${selectedMode === 'ytd' ? 'ct-date-preset-pill--active' : ''}`}
                  onClick={() => handleSelectPreset('ytd')}
                >
                  Current Year (YTD)
                </button>
                <button
                  type="button"
                  className={`ct-date-preset-pill ${selectedMode === 'mtd' ? 'ct-date-preset-pill--active' : ''}`}
                  onClick={() => handleSelectPreset('mtd')}
                >
                  Current Month (MTD)
                </button>
                <button
                  type="button"
                  className={`ct-date-preset-pill ${selectedMode === 'last_year' ? 'ct-date-preset-pill--active' : ''}`}
                  onClick={() => handleSelectPreset('last_year')}
                >
                  Last Year (2025)
                </button>
              </div>

              {/* Custom Date Picker Section */}
              <div className="ct-date-custom-panel">
                <div className="ct-date-custom-grid">
                  {/* Start Date */}
                  <div className="ct-date-custom-col">
                    <span className="ct-date-custom-col__label">Start Month & Year:</span>
                    <div className="ct-date-custom-selects">
                      <select
                        className="ct-date-custom-select"
                        value={draftStartMonth}
                        onChange={(e) => {
                          setSelectedMode('custom');
                          setDraftStartMonth(parseInt(e.target.value, 10));
                        }}
                      >
                        {MONTHS.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <select
                        className="ct-date-custom-select ct-date-custom-select--year"
                        value={draftStartYear}
                        onChange={(e) => {
                          setSelectedMode('custom');
                          setDraftStartYear(parseInt(e.target.value, 10));
                        }}
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <span className="ct-date-custom-arrow">➔</span>

                  {/* End Date */}
                  <div className="ct-date-custom-col">
                    <span className="ct-date-custom-col__label">End Month & Year:</span>
                    <div className="ct-date-custom-selects">
                      <select
                        className="ct-date-custom-select"
                        value={draftEndMonth}
                        onChange={(e) => {
                          setSelectedMode('custom');
                          setDraftEndMonth(parseInt(e.target.value, 10));
                        }}
                      >
                        {MONTHS.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                      <select
                        className="ct-date-custom-select ct-date-custom-select--year"
                        value={draftEndYear}
                        onChange={(e) => {
                          setSelectedMode('custom');
                          setDraftEndYear(parseInt(e.target.value, 10));
                        }}
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Range Preview & Validation Feedback */}
                <div className="ct-date-custom-footer-info">
                  <span className="ct-date-custom-preview">
                    Range: <strong>{formatDisplayDateRange(draftStartYear, draftStartMonth, draftEndYear, draftEndMonth)}</strong>
                  </span>
                  <span
                    className={`ct-date-custom-span-badge ${
                      isSpanExceeded || isInvalidRange ? 'ct-date-custom-span-badge--error' : ''
                    }`}
                  >
                    {isInvalidRange
                      ? '⚠️ Start date cannot be after end date'
                      : isSpanExceeded
                      ? `⚠️ ${draftMonthsSpan} Months (Exceeds max 24 months limit)`
                      : `✓ ${draftMonthsSpan} Months`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="ct-date-popover__actions">
                <button
                  type="button"
                  className="ct-date-popover__btn-cancel"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="ct-date-popover__btn-apply"
                  onClick={handleApply}
                  disabled={isSpanExceeded || isInvalidRange}
                >
                  Apply Filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Region Selector with CPD & BNN Top Priority */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-region" className="ct-filter-field__label">
            <Icons8 name="location" size={13} color="var(--text-muted)" />
            <span>Region</span>
          </label>
          <select
            id="ct-filter-region"
            className="ct-filter-field__select"
            value={filter.region}
            onChange={(e) => onFilterChange({ region: e.target.value as RegionOption })}
            disabled={isLoading}
          >
            <option value="all">All Regions (National)</option>
            <option value="area_cpd">⭐ Area CPD (Top 1)</option>
            <option value="area_bnn">⭐ Area BNN (Top 2)</option>
            <option value="dki_jakarta">DKI Jakarta</option>
            <option value="jawa_barat">West Java</option>
            <option value="jawa_tengah">Central Java</option>
            <option value="jawa_timur">East Java</option>
            <option value="banten">Banten</option>
            <option value="luar_jawa">Outside Java</option>
          </select>
        </div>

        {/* 3. Supplier Entity Selector */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-supplier" className="ct-filter-field__label">
            <Icons8 name="distributor" size={13} color="var(--text-muted)" />
            <span>Supplier</span>
          </label>
          <select
            id="ct-filter-supplier"
            className="ct-filter-field__select"
            value={filter.supplierId}
            onChange={(e) => onFilterChange({ supplierId: e.target.value as SupplierOption })}
            disabled={isLoading}
          >
            <option value="all">All Suppliers</option>
            <option value="semen_indonesia">PT Semen Indonesia Group</option>
            <option value="krakatau_steel">PT Krakatau Steel</option>
            <option value="holcim_indonesia">PT Solusi Bangun Indonesia (Holcim)</option>
            <option value="arwana_citramulia">PT Arwana Citramulia</option>
          </select>
        </div>

        {/* 4. Selling Agent Selector */}
        <div className="ct-filter-field">
          <label htmlFor="ct-filter-selling-agent" className="ct-filter-field__label">
            <Icons8 name="role" size={13} color="var(--text-muted)" />
            <span>Selling Agent</span>
          </label>
          <select
            id="ct-filter-selling-agent"
            className="ct-filter-field__select"
            value={filter.sellingAgentId}
            onChange={(e) => onFilterChange({ sellingAgentId: e.target.value as SellingAgentOption })}
            disabled={isLoading}
          >
            <option value="all">All Selling Agents</option>
            <option value="sa_semen_gresik_jabar">SA Semen Gresik Jabar</option>
            <option value="sa_baja_perkasa">SA Baja Perkasa Utama</option>
            <option value="sa_cat_nusantara">SA Cat Nusantara Abadi</option>
            <option value="sa_mitra_distrindo">SA Mitra Distrindo Jaya</option>
          </select>
        </div>
      </div>

      <div className="ct-filter-bar__actions">
        <button
          type="button"
          className="ct-filter-reset-btn"
          onClick={() => {
            onFilterChange({
              startYear: 2026,
              startMonth: 1,
              endYear: 2026,
              endMonth: 8,
            });
          }}
          title="Reset date range to Current Year 2026 (01/01/2026 - 31/08/2026)"
          disabled={isLoading}
        >
          ↺ Reset YTD
        </button>
      </div>
    </section>
  );
};
