import React, { useState, useMemo } from 'react'
import type { RegionalDiagnosticRecord } from '../models/types'
import { Badge } from '@/shared/components/Badge'
import { Icons8 } from '@/shared/components/Icons8'

interface RegionalDiagnosticTableProps {
  data: RegionalDiagnosticRecord[]
  isLoading?: boolean
}

type SortField =
  | 'region'
  | 'groupRegion'
  | 'registered'
  | 'verified'
  | 'pending'
  | 'slaBreachCount'
  | 'activated'
  | 'cohortGmv'
type SortOrder = 'asc' | 'desc'

export const RegionalDiagnosticTable: React.FC<RegionalDiagnosticTableProps> = ({
  data,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('registered')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (r) =>
          r.region.toLowerCase().includes(term) ||
          r.groupRegion.toLowerCase().includes(term)
      )
    }
    result.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = (bVal as string).toLowerCase()
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return result
  }, [data, searchTerm, sortField, sortOrder])

  const formatGmv = (val: number) => {
    if (val >= 1_000_000_000) {
      return `Rp ${(val / 1_000_000_000).toFixed(2)} B`
    }
    return `Rp ${(val / 1_000_000).toFixed(1)} M`
  }

  return (
    <div className="ct-widget-card" aria-label="Regional Performance Diagnostic Table">
      {/* Header: Title and Search Box */}
      <div className="ct-widget-card__header">
        <div className="ct-widget-card__title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons8 name="location" size={18} color="var(--primary-600)" />
            <h3 className="ct-widget-card__title">Regional Performance & Verification Diagnostics</h3>
          </div>
        </div>

        <div className="ct-table-search-box">
          <Icons8 name="search" size={13} color="var(--text-muted)" />
          <input
            type="text"
            className="ct-table-search-input"
            placeholder="Search region or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Clean Structured Table with Inner Scroll */}
      <div className="ct-widget-table-scroll">
        <table className="ct-growth-table">
          <thead>
            <tr>
              <th className="sortable-th" onClick={() => handleSort('region')}>
                Region {sortField === 'region' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="sortable-th" style={{ textAlign: 'center' }} onClick={() => handleSort('groupRegion')}>
                Group Region {sortField === 'groupRegion' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('registered')}>
                Registered {sortField === 'registered' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('verified')}>
                Verified (%) {sortField === 'verified' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('pending')}>
                Pending {sortField === 'pending' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('slaBreachCount')}>
                SLA Breach &gt;24h {sortField === 'slaBreachCount' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('activated')}>
                Activated Stores (%) {sortField === 'activated' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('cohortGmv')}>
                Cohort GMV {sortField === 'cohortGmv' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  Loading regional diagnostics data...
                </td>
              </tr>
            ) : filteredAndSortedData.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No regional diagnostic records found matching &quot;{searchTerm}&quot;.
                </td>
              </tr>
            ) : (
              filteredAndSortedData.map((row, idx) => {
                const hasSlaBreach = row.slaBreachPercent > 10
                return (
                  <tr key={idx} className="ct-growth-table__row">
                    <td>
                      <strong className="ct-driver-name">{row.region}</strong>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Badge variant={row.groupRegion === 'CPD' ? 'primary' : 'warning'} size="sm">
                        {row.groupRegion}
                      </Badge>
                    </td>
                    <td className="ct-text-right">
                      <span className="ct-driver-value">{row.registered.toLocaleString()}</span>
                    </td>
                    <td className="ct-text-right">
                      <strong className="ct-driver-value">{row.verified.toLocaleString()}</strong>{' '}
                      <span className="ct-driver-note">({row.verifiedPercent.toFixed(1)}%)</span>
                    </td>
                    <td className="ct-text-right">
                      <span className="ct-driver-value">{row.pending.toLocaleString()}</span>
                    </td>
                    <td className="ct-text-right">
                      {row.slaBreachCount > 0 ? (
                        <Badge variant={hasSlaBreach ? 'danger' : 'warning'} size="sm">
                          {row.slaBreachCount} ({row.slaBreachPercent.toFixed(1)}%)
                        </Badge>
                      ) : (
                        <span className="ct-text-muted">0 (0.0%)</span>
                      )}
                    </td>
                    <td className="ct-text-right">
                      <strong className="ct-driver-value ct-text-success">
                        {row.activated.toLocaleString()}
                      </strong>{' '}
                      <span className="ct-driver-note">({row.activatedPercent.toFixed(1)}%)</span>
                    </td>
                    <td className="ct-text-right">
                      <strong className="ct-driver-value ct-text-primary">
                        {formatGmv(row.cohortGmv)}
                      </strong>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
