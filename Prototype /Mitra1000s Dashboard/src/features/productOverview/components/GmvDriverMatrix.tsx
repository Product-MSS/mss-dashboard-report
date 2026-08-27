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
          <h3 className="ct-widget-card__title">
            GMV Driver Impact Matrix
          </h3>
          <span className="ct-widget-card__subtitle">
            GMV Growth Drivers & Waterfall Factor Decomposition
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
              <th>Growth Driver</th>
              <th className="ct-text-right">Actual Value</th>
              <th className="ct-text-right">MoM Change</th>
              <th className="ct-text-right">ΔGMV Contribution</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => {
              return (
                <tr
                  key={driver.id}
                  className="ct-widget-table__row ct-widget-table__row--clickable"
                  onClick={() => onInspectDriver?.(driver.id)}
                  title="Click to view detailed diagnostic analysis"
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
