import React, { useState, useRef, useEffect, useMemo } from 'react'
import type { CustomerGrowthFilters } from '../models/types'
import { Icons8 } from '@/shared/components/Icons8'

interface CustomerGrowthHeaderProps {
  filters: CustomerGrowthFilters
  onUpdateFilters: (updates: Partial<CustomerGrowthFilters>) => void
  onPresetDateRange: (preset: 'YTD' | 'MTD' | 'LAST_30') => void
  onResetFilters: () => void
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
]

const YEARS = [2024, 2025, 2026, 2027]

type PresetMode = 'ytd' | 'mtd' | 'last_year' | 'custom'

export const CustomerGrowthHeader: React.FC<CustomerGrowthHeaderProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Determine active preset mode
  const currentPresetMode: PresetMode = useMemo(() => {
    if (filters.dateRange.startDate === '2026-01-01' && filters.dateRange.endDate === '2026-08-31') {
      return 'ytd'
    }
    if (filters.dateRange.startDate === '2026-08-01' && filters.dateRange.endDate === '2026-08-31') {
      return 'mtd'
    }
    if (filters.dateRange.startDate === '2025-01-01' && filters.dateRange.endDate === '2025-12-31') {
      return 'last_year'
    }
    return 'custom'
  }, [filters.dateRange.startDate, filters.dateRange.endDate])

  const [selectedMode, setSelectedMode] = useState<PresetMode>(currentPresetMode)
  const [draftStartMonth, setDraftStartMonth] = useState(1)
  const [draftStartYear, setDraftStartYear] = useState(2026)
  const [draftEndMonth, setDraftEndMonth] = useState(8)
  const [draftEndYear, setDraftEndYear] = useState(2026)

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const draftMonthsSpan = useMemo(() => {
    return (draftEndYear - draftStartYear) * 12 + (draftEndMonth - draftStartMonth) + 1
  }, [draftStartYear, draftStartMonth, draftEndYear, draftEndMonth])

  const isSpanExceeded = draftMonthsSpan > 24
  const isInvalidRange = draftMonthsSpan < 1

  const handleSelectPreset = (mode: PresetMode) => {
    setSelectedMode(mode)
    if (mode === 'ytd') {
      setDraftStartYear(2026)
      setDraftStartMonth(1)
      setDraftEndYear(2026)
      setDraftEndMonth(8)
    } else if (mode === 'mtd') {
      setDraftStartYear(2026)
      setDraftStartMonth(8)
      setDraftEndYear(2026)
      setDraftEndMonth(8)
    } else if (mode === 'last_year') {
      setDraftStartYear(2025)
      setDraftStartMonth(1)
      setDraftEndYear(2025)
      setDraftEndMonth(12)
    }
  }

  const handleApply = () => {
    const sMonthStr = String(draftStartMonth).padStart(2, '0')
    const eMonthStr = String(draftEndMonth).padStart(2, '0')
    const lastDay = new Date(draftEndYear, draftEndMonth, 0).getDate()

    const startDate = `${draftStartYear}-${sMonthStr}-01`
    const endDate = `${draftEndYear}-${eMonthStr}-${String(lastDay).padStart(2, '0')}`
    const label = `01/${sMonthStr}/${draftStartYear} - ${String(lastDay).padStart(2, '0')}/${eMonthStr}/${draftEndYear}`

    onUpdateFilters({
      dateRange: {
        startDate,
        endDate,
        label,
      },
    })
    setIsOpen(false)
  }

  return (
    <div className="ct-filter-bar ct-filter-bar--growth" aria-label="Global Context Filter Bar">
      <div className="ct-filter-bar__group">
        {/* Date Range Selector Field */}
        <div className="ct-filter-field ct-filter-field--date-dropdown" ref={popoverRef}>
          <label className="ct-filter-field__label">
            <Icons8 name="calendar" size={13} color="var(--text-muted)" />
            <span>Date Range</span>
          </label>
          <button
            type="button"
            className={`ct-date-trigger-btn ${isOpen ? 'ct-date-trigger-btn--active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <div className="ct-date-trigger-btn__body">
              <Icons8 name="calendar" size={14} color="var(--primary-600)" />
              <span className="ct-date-trigger-btn__text">
                {filters.dateRange.label || '01/01/2026 - 31/08/2026'}
              </span>
            </div>
            <span className={`ct-date-trigger-btn__icon ${isOpen ? 'ct-date-trigger-btn__icon--open' : ''}`}>
              ▼
            </span>
          </button>

          {/* Floating Date Popover Modal */}
          {isOpen && (
            <div className="ct-date-popover" role="dialog" aria-modal="true">
              <div className="ct-date-popover__header">
                <span className="ct-date-popover__title">Select Analysis Period</span>
                <span className="ct-date-popover__subtitle">
                  Max range span: 24 months (2 years). Realtime data scoping.
                </span>
              </div>

              {/* Presets */}
              <div className="ct-date-presets">
                <button
                  type="button"
                  className={`ct-date-preset-pill ${selectedMode === 'ytd' ? 'ct-date-preset-pill--active' : ''}`}
                  onClick={() => handleSelectPreset('ytd')}
                >
                  Year-to-Date (YTD)
                </button>
                <button
                  type="button"
                  className={`ct-date-preset-pill ${selectedMode === 'mtd' ? 'ct-date-preset-pill--active' : ''}`}
                  onClick={() => handleSelectPreset('mtd')}
                >
                  Month-to-Date (MTD)
                </button>
                <button
                  type="button"
                  className={`ct-date-preset-pill ${selectedMode === 'last_year' ? 'ct-date-preset-pill--active' : ''}`}
                  onClick={() => handleSelectPreset('last_year')}
                >
                  Full Year 2025
                </button>
              </div>

              {/* Custom Month/Year Pickers */}
              <div className="ct-date-custom-panel">
                <div className="ct-date-custom-grid">
                  <div className="ct-date-custom-col">
                    <span className="ct-date-custom-col__label">From Month / Year</span>
                    <div className="ct-date-custom-selects">
                      <select
                        className="ct-date-custom-select"
                        value={draftStartMonth}
                        onChange={(e) => {
                          setSelectedMode('custom')
                          setDraftStartMonth(Number(e.target.value))
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
                          setSelectedMode('custom')
                          setDraftStartYear(Number(e.target.value))
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

                  <div className="ct-date-custom-col">
                    <span className="ct-date-custom-col__label">To Month / Year</span>
                    <div className="ct-date-custom-selects">
                      <select
                        className="ct-date-custom-select"
                        value={draftEndMonth}
                        onChange={(e) => {
                          setSelectedMode('custom')
                          setDraftEndMonth(Number(e.target.value))
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
                          setSelectedMode('custom')
                          setDraftEndYear(Number(e.target.value))
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

                <div className="ct-date-custom-footer-info">
                  <span className="ct-date-custom-preview">
                    Span:{' '}
                    <strong>
                      {draftMonthsSpan} {draftMonthsSpan === 1 ? 'month' : 'months'}
                    </strong>
                  </span>
                  {isSpanExceeded && (
                    <span className="ct-date-custom-span-badge ct-date-custom-span-badge--error">
                      ⚠️ Max 24 months allowed
                    </span>
                  )}
                  {isInvalidRange && (
                    <span className="ct-date-custom-span-badge ct-date-custom-span-badge--error">
                      ⚠️ Invalid range
                    </span>
                  )}
                </div>
              </div>

              {/* Popover Actions */}
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

        {/* Group Region Filter */}
        <div className="ct-filter-field">
          <label className="ct-filter-field__label" htmlFor="growth-group-region-select">
            <Icons8 name="location" size={13} color="var(--text-muted)" />
            <span>Group Region</span>
          </label>
          <select
            id="growth-group-region-select"
            className="ct-filter-field__select"
            value={filters.groupRegion}
            onChange={(e) => onUpdateFilters({ groupRegion: e.target.value })}
          >
            <option value="ALL">All Group Regions</option>
            <option value="CPD">Area CPD (Jawa)</option>
            <option value="BNN">Area BNN (Luar Jawa)</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      <div className="ct-filter-bar__actions">
        <button
          type="button"
          className="ct-filter-reset-btn"
          onClick={onResetFilters}
          title="Reset all filters to defaults"
        >
          <Icons8 name="refresh" size={13} color="var(--text-muted)" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  )
}
