// ==============================================================================
// Generic Button Component — Mitra1000s Design System
// Reusable UI Primitive for actions, primary CTAs, and secondary controls
// ==============================================================================

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  type = 'button',
  ...rest
}) => {
  const variantClass = `ui-btn--${variant}`;
  const sizeClass = size !== 'md' ? `ui-btn--${size}` : '';

  return (
    <button
      type={type}
      className={`ui-btn ${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {icon && <span className="ui-btn__icon">{icon}</span>}
      <span className="ui-btn__label">{children}</span>
    </button>
  );
};
