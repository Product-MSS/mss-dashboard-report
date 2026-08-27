// ==============================================================================
// Generic Badge Component — Mitra1000s Design System
// Universal status pill & tag component with semantic color variants
// ==============================================================================

import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'primary' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  icon,
  children,
  className = '',
  ...rest
}) => {
  const variantClass = `ui-badge--${variant}`;
  const sizeClass = size !== 'md' ? `ui-badge--${size}` : '';

  return (
    <span
      className={`ui-badge ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {icon && <span className="ui-badge__icon">{icon}</span>}
      <span className="ui-badge__label">{children}</span>
    </span>
  );
};
