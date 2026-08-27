// ==============================================================================
// Generic Modal Component — Mitra1000s Design System
// Reusable Dialog Wrapper with Backdrop, Escape Key Listener & Flexible Slots
// ==============================================================================

import React, { useEffect, useCallback } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '680px',
  closeOnEsc = true,
  closeOnBackdrop = true,
  className = '',
  ariaLabel,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="ui-modal-backdrop"
      onClick={closeOnBackdrop ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || (typeof title === 'string' ? title : 'Modal Dialog')}
    >
      <div
        className={`ui-modal-container ${className}`.trim()}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || subtitle) && (
          <div className="ui-modal-header">
            <div className="ui-modal-header__title-group">
              {title && <h3 className="ui-modal-title">{title}</h3>}
              {subtitle && <p className="ui-modal-subtitle">{subtitle}</p>}
            </div>
            <button
              type="button"
              className="ui-modal-close-btn"
              onClick={onClose}
              aria-label="Tutup Dialog"
            >
              ✕
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="ui-modal-body">{children}</div>

        {/* Footer */}
        {footer && <div className="ui-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
