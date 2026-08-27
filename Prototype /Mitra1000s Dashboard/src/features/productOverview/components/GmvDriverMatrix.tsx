// ==============================================================================
// GMV Driver Impact Matrix Component — Mitra1000s Control Tower
// Clean Structured Table Decomposition of GMV Growth (ΔGMV)
// ==============================================================================

import React from 'react';
import type { GmvDriverImpactDto } from '../models/productOverviewDto';
import { Badge } from '@/shared/components/Badge';

interface GmvDriverMatrixProps {
  drivers: GmvDriverImpactDto[];
  totalGmvDeltaFormatted: string;
  totalGmvDeltaPercent: number;
  onInspectDriver?: (driverId: string) => void;
}

export const GmvDriverMatrix: React.FC<GmvDriverMatrixProps> = ({
  drivers,
  totalGmvDeltaFormatted,
  totalGmvDeltaPercent,
  onInspectDriver,
}) => {
  return (
    <div className="ct-widget-card" aria-label="GMV Driver Impact Matrix">
      {/* Header: Title, Subtitle, and Total Growth Badge */}
      <div className="ct-widget-card__header">
        <div className="ct-widget-card__title-group">
          <h3 className="ct-widget-card__title">GMV Driver Impact Matrix</h3>
          <span className="ct-widget-card__subtitle">
            Dekomposisi Faktor Pendorong Pertumbuhan GMV
          </span>
        </div>
        <Badge variant="success">
          ▲ +{totalGmvDeltaPercent}% ({totalGmvDeltaFormatted})
        </Badge>
      </div>

      {/* Clean Structured Table */}
      <div className="ct-widget-table-wrapper">
        <table className="ct-widget-table">
          <colgroup>
            <col style={{ width: '34%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Faktor Penggerak</th>
              <th className="ct-text-right">Nilai Aktual</th>
              <th className="ct-text-right">Perubahan MoM</th>
              <th className="ct-text-right">Kontribusi ΔGMV</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => {
              return (
                <tr
                  key={driver.id}
                  className="ct-widget-table__row ct-widget-table__row--clickable"
                  onClick={() => onInspectDriver?.(driver.id)}
                  title="Klik untuk melihat diagnosa detail"
                >
                  <td>
                    <div className="ct-driver-name-group">
                      <strong className="ct-driver-name">{driver.driverName}</strong>
                      <span className="ct-driver-note">{driver.insightDescription}</span>
                    </div>
                  </td>
                  <td className="ct-text-right">
                    <span className="ct-driver-value">{driver.currentValueFormatted}</span>
                  </td>
                  <td className="ct-text-right">
                    <span className="ct-driver-change ct-text-success">
                      {driver.changeFormatted}
                    </span>
                  </td>
                  <td className="ct-text-right">
                    <strong className="ct-driver-impact ct-text-primary">
                      {driver.nominalImpactFormatted}
                    </strong>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
