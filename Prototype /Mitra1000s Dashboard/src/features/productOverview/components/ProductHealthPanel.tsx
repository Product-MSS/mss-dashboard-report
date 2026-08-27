// ==============================================================================
// Product Health Telemetry Panel Component — Mitra1000s Control Tower
// Early Warning System for Technical & Funnel Telemetry (Clean 3-Column Table)
// ==============================================================================

import React from 'react';
import type { ProductHealthTelemetryDto } from '../models/productOverviewDto';

interface ProductHealthPanelProps {
  metrics: ProductHealthTelemetryDto[];
  healthyCount?: number;
  warningCount?: number;
  criticalCount?: number;
  onOpenDiagnostics?: () => void;
}

export const ProductHealthPanel: React.FC<ProductHealthPanelProps> = ({ metrics }) => {
  return (
    <div className="ct-widget-card" aria-label="Product Health Telemetry">
      {/* Header: Clean Title and Subtitle */}
      <div className="ct-widget-card__header">
        <div className="ct-widget-card__title-group">
          <h3 className="ct-widget-card__title">Product Health Telemetry</h3>
          <span className="ct-widget-card__subtitle">
            Indikator Early Warning Stabilitas Sistem & Pengalaman Pengguna
          </span>
        </div>
      </div>

      {/* Clean 3-Column Structured Table */}
      <div className="ct-widget-table-wrapper">
        <table className="ct-widget-table">
          <colgroup>
            <col style={{ width: '56%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '22%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Indikator Metrik</th>
              <th className="ct-text-right">Nilai Aktual</th>
              <th className="ct-text-right">SLA Target</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              return (
                <tr key={metric.id} className="ct-widget-table__row">
                  <td>
                    <div className="ct-health-name-group">
                      <span className={`ct-health-status-tag ct-health-status-tag--${metric.status}`}>
                        ● {metric.statusLabel.toUpperCase()}
                      </span>
                      <strong className="ct-health-name">{metric.name}</strong>
                      <span className="ct-health-note">{metric.signalNote}</span>
                    </div>
                  </td>
                  <td className="ct-text-right">
                    <span className="ct-health-value">{metric.valueFormatted}</span>
                  </td>
                  <td className="ct-text-right">
                    <span className="ct-health-sla">{metric.targetSlaFormatted}</span>
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
