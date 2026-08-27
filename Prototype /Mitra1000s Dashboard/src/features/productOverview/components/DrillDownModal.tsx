// ==============================================================================
// Drill-Down Modal Component — Mitra1000s Control Tower
// Domain wrapper utilizing generic <Modal> & <Button> from @/shared/components
// ==============================================================================

import React from 'react';
import type { DrillDownInspectionDto } from '../models/productOverviewDto';
import { Modal } from '@/shared/components/Modal';
import { Button } from '@/shared/components/Button';

interface DrillDownModalProps {
  data: DrillDownInspectionDto | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({
  data,
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!data) return null;

  const footerActions = (
    <>
      <Button variant="ghost" onClick={onClose}>
        Close
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          onClose();
          onNavigate(data.actionCta.targetRoute);
        }}
      >
        {data.actionCta.label}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data.title}
      subtitle={data.subtitle}
      footer={footerActions}
      maxWidth="680px"
    >
      {/* Summary Metrics Row */}
      <div className="ct-modal-stats-grid">
        {data.summaryMetrics.map((metric, idx) => (
          <div key={idx} className="ct-modal-stat-card">
            <span className="ct-modal-stat-label">{metric.label}</span>
            <strong className="ct-modal-stat-value">{metric.value}</strong>
          </div>
        ))}
      </div>

      {/* Breakdown Table if available */}
      {data.breakdownTable && (
        <div className="ct-modal-table-section">
          <h4 className="ct-modal-section-title">Contribution by Selling Agent Segment</h4>
          <table className="ct-modal-table">
            <thead>
              <tr>
                {data.breakdownTable.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.breakdownTable.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Root cause analysis description */}
      {data.rootCauseAnalysis && (
        <div className="ct-modal-analysis-box">
          <strong className="ct-modal-analysis-title">Diagnostic Insight & PM Recommendation:</strong>
          <p className="ct-modal-analysis-text">{data.rootCauseAnalysis}</p>
        </div>
      )}
    </Modal>
  );
};
