// ==============================================================================
// Icons8 Design System Vector Library — Mitra1000s Control Tower
// Clean, minimalist, pixel-perfect Icons8 Line & Fluent vector icons
// Source Inspiration: https://icons8.com/
// ==============================================================================

import React from 'react';

export type Icons8Name =
  | 'overview'
  | 'revenue'
  | 'growth'
  | 'activation'
  | 'retention'
  | 'health'
  | 'search'
  | 'search-alert'
  | 'cart'
  | 'cart-plus'
  | 'cart-alert'
  | 'checkout'
  | 'payment'
  | 'truck'
  | 'store'
  | 'orders'
  | 'users'
  | 'frequency'
  | 'calendar'
  | 'location'
  | 'role'
  | 'distributor'
  | 'sales-force'
  | 'refresh'
  | 'alert-triangle'
  | 'alert-circle'
  | 'check-circle'
  | 'arrow-up-right'
  | 'close'
  | 'sparkle'
  | 'chevron-down'
  | 'brand-logo';

interface Icons8Props extends React.SVGProps<SVGSVGElement> {
  name: Icons8Name;
  size?: number;
  color?: string;
  className?: string;
}

export const Icons8: React.FC<Icons8Props> = ({
  name,
  size = 18,
  color = 'currentColor',
  className = '',
  ...rest
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: '1.75',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: `icons8-svg icons8-${name} ${className}`.trim(),
    ...rest,
  };

  switch (name) {
    // ── Navigation & Brand Icons ─────────────────────────────────────────────
    case 'brand-logo':
      return (
        <svg {...commonProps} viewBox="0 0 24 24" stroke="none" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth="1.75" fill="none" />
        </svg>
      );

    case 'overview':
      return (
        <svg {...commonProps}>
          {/* Icons8 Control Tower / Dashboard */}
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );

    case 'revenue':
      return (
        <svg {...commonProps}>
          {/* Icons8 Banknote & Coins */}
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );

    case 'growth':
      return (
        <svg {...commonProps}>
          {/* Icons8 Trending Up / Growth Chart */}
          <path d="M22 7L13.5 15.5L8.5 10.5L2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      );

    case 'activation':
      return (
        <svg {...commonProps}>
          {/* Icons8 Flash / Lightning Fast */}
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );

    case 'retention':
      return (
        <svg {...commonProps}>
          {/* Icons8 Repeat / User Lifecycle Loop */}
          <path d="M17 2l4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="M7 22l-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </svg>
      );

    case 'health':
      return (
        <svg {...commonProps}>
          {/* Icons8 Activity Heartbeat Pulse */}
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );

    // ── 4-Stage Funnel & eCommerce Telemetry Icons ────────────────────────────
    case 'search':
      return (
        <svg {...commonProps}>
          {/* Icons8 Search / Magnifying Glass */}
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );

    case 'search-alert':
      return (
        <svg {...commonProps}>
          {/* Icons8 Search with Alert */}
          <circle cx="10" cy="10" r="6.5" />
          <line x1="21" y1="21" x2="15" y2="15" />
          <line x1="10" y1="7" x2="10" y2="10" />
          <circle cx="10" cy="12" r="0.5" fill={color} />
        </svg>
      );

    case 'cart':
      return (
        <svg {...commonProps}>
          {/* Icons8 Shopping Cart */}
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );

    case 'cart-plus':
      return (
        <svg {...commonProps}>
          {/* Icons8 Add to Cart */}
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          <line x1="12" y1="9" x2="16" y2="9" />
          <line x1="14" y1="7" x2="14" y2="11" />
        </svg>
      );

    case 'cart-alert':
      return (
        <svg {...commonProps}>
          {/* Icons8 Cart Alert */}
          <circle cx="9" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72" />
          <path d="M21 5v4M21 12h.01" strokeWidth="2" />
        </svg>
      );

    case 'checkout':
      return (
        <svg {...commonProps}>
          {/* Icons8 Checkout Clipboard / Receipt */}
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );

    case 'payment':
      return (
        <svg {...commonProps}>
          {/* Icons8 Credit Card / Payment Terminal */}
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
          <line x1="6" y1="16" x2="10" y2="16" />
        </svg>
      );

    case 'truck':
      return (
        <svg {...commonProps}>
          {/* Icons8 Truck Freight & Delivery */}
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );

    case 'store':
      return (
        <svg {...commonProps}>
          {/* Icons8 Storefront / Retailer Shop */}
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );

    case 'orders':
      return (
        <svg {...commonProps}>
          {/* Icons8 Package / Box Orders */}
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );

    case 'users':
      return (
        <svg {...commonProps}>
          {/* Icons8 Users / Active Buyers */}
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case 'frequency':
      return (
        <svg {...commonProps}>
          {/* Icons8 Clock Cycle / Frequency */}
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );

    // ── Filters & Context ────────────────────────────────────────────────────
    case 'calendar':
      return (
        <svg {...commonProps}>
          {/* Icons8 Calendar */}
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );

    case 'location':
      return (
        <svg {...commonProps}>
          {/* Icons8 Map Pin */}
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );

    case 'role':
      return (
        <svg {...commonProps}>
          {/* Icons8 Badge / User Category */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );

    case 'distributor':
      return (
        <svg {...commonProps}>
          {/* Icons8 Factory / Warehouse Entity */}
          <path d="M2 20h20" />
          <path d="M5 20V8l5 4V8l5 4V4h5v16H5z" />
        </svg>
      );

    case 'sales-force':
      return (
        <svg {...commonProps}>
          {/* Icons8 Briefcase / Field Sales Force */}
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      );

    case 'refresh':
      return (
        <svg {...commonProps}>
          {/* Icons8 Sync Refresh */}
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      );

    // ── Status Alerts & Micro UI ─────────────────────────────────────────────
    case 'alert-triangle':
      return (
        <svg {...commonProps}>
          {/* Icons8 Warning Triangle */}
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );

    case 'alert-circle':
      return (
        <svg {...commonProps}>
          {/* Icons8 Critical Alert Circle */}
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );

    case 'check-circle':
      return (
        <svg {...commonProps}>
          {/* Icons8 Check Success */}
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );

    case 'arrow-up-right':
      return (
        <svg {...commonProps}>
          {/* Icons8 Arrow External Drilldown */}
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      );

    case 'close':
      return (
        <svg {...commonProps}>
          {/* Icons8 Close / Dismiss */}
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      );

    case 'sparkle':
      return (
        <svg {...commonProps}>
          {/* Icons8 Sparkle / Magic Star */}
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
        </svg>
      );

    case 'chevron-down':
      return (
        <svg {...commonProps}>
          {/* Icons8 Chevron Down */}
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};
