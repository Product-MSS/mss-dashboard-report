import React, { useState, useMemo } from 'react'
import type { SellingAgentRecord } from '../models/types'
import { Badge } from '@/shared/components/Badge'
import { Icons8 } from '@/shared/components/Icons8'

interface SellingAgentPerformanceTableProps {
  data: SellingAgentRecord[]
  isLoading?: boolean
}

type SortField =
  | 'agentName'
  | 'region'
  | 'groupRegion'
  | 'assignedVerifiedStores'
  | 'activatedStores'
  | 'activationRate'
  | 'cohortGmv'
  | 'avgGmvPerActiveBuyer'
type SortOrder = 'asc' | 'desc'

export const SellingAgentPerformanceTable: React.FC<SellingAgentPerformanceTableProps> = ({
  data,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('cohortGmv')
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
        (a) =>
          a.agentName.toLowerCase().includes(term) ||
          a.region.toLowerCase().includes(term) ||
          a.groupRegion.toLowerCase().includes(term)
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
    <div className="ct-widget-card" aria-label="Selling Agent Performance Table">
      {/* Header: Title and Search Box */}
      <div className="ct-widget-card__header">
        <div className="ct-widget-card__title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icons8 name="orders" size={18} color="var(--primary-600)" />
            <h3 className="ct-widget-card__title">Selling Agent Performance & Adoption Quality</h3>
          </div>
        </div>

        <div className="ct-table-search-box">
          <Icons8 name="search" size={13} color="var(--text-muted)" />
          <input
            type="text"
            className="ct-table-search-input"
            placeholder="Search agent or region..."
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
              <th className="sortable-th" onClick={() => handleSort('agentName')}>
                Selling Agent (PT) {sortField === 'agentName' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="sortable-th" onClick={() => handleSort('region')}>
                Region {sortField === 'region' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="sortable-th" style={{ textAlign: 'center' }} onClick={() => handleSort('groupRegion')}>
                Group Region {sortField === 'groupRegion' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('assignedVerifiedStores')}>
                Verified Stores {sortField === 'assignedVerifiedStores' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('activatedStores')}>
                Activated {sortField === 'activatedStores' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('activationRate')}>
                Activation Rate {sortField === 'activationRate' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('cohortGmv')}>
                Cohort GMV {sortField === 'cohortGmv' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="ct-text-right sortable-th" onClick={() => handleSort('avgGmvPerActiveBuyer')}>
                Avg GMV/Active {sortField === 'avgGmvPerActiveBuyer' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  Loading selling agent data...
                </td>
              </tr>
            ) : filteredAndSortedData.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No selling agent records found matching &quot;{searchTerm}&quot;.
                </td>
              </tr>
            ) : (
              filteredAndSortedData.map((row, idx) => {
                const isTopPerformer = row.activationRate >= 60
                const isLagging = row.activationRate < 45

                return (
                  <tr key={idx} className="ct-growth-table__row">
                    <td>
                      <div>
                        <strong className="ct-driver-name">{row.agentName}</strong>
                        <div className="ct-text-muted" style={{ fontSize: '10.5px' }}>
                          {row.agentId}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="ct-text-secondary">{row.region}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Badge variant={row.groupRegion === 'CPD' ? 'primary' : 'warning'} size="sm">
                        {row.groupRegion}
                      </Badge>
                    </td>
                    <td className="ct-text-right">
                      <span className="ct-driver-value">
                        {row.assignedVerifiedStores.toLocaleString()}
                      </span>
                    </td>
                    <td className="ct-text-right">
                      <strong className="ct-driver-value ct-text-success">
                        {row.activatedStores.toLocaleString()}
                      </strong>
                    </td>
                    <td className="ct-text-right">
                      <div className="ct-rate-cell">
                        <span
                          className={`ct-rate-text ${
                            isTopPerformer
                              ? 'ct-text-success'
                              : isLagging
                              ? 'ct-text-warning'
                              : 'ct-text-primary'
                          }`}
                        >
                          {row.activationRate.toFixed(1)}%
                        </span>
                        <div className="ct-mini-bar-track">
                          <div
                            className={`ct-mini-bar-fill ${
                              isTopPerformer ? 'top' : isLagging ? 'lag' : 'mid'
                            }`}
                            style={{ width: `${Math.min(100, row.activationRate)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="ct-text-right">
                      <strong className="ct-driver-value ct-text-primary">
                        {formatGmv(row.cohortGmv)}
                      </strong>
                    </td>
                    <td className="ct-text-right">
                      <span className="ct-driver-value">{formatGmv(row.avgGmvPerActiveBuyer)}</span>
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
