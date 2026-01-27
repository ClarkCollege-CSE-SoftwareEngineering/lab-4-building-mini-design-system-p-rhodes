import React from 'react';
import { colors, AlertVariant } from '../../tokens';

export interface IconProps {
  /** The type of icon to display */
  name: 'check' | 'warning' | 'error' | 'info' | 'close';
  /** Size in pixels */
  size?: number;
  /** Color variant (uses token colors) or custom color */
  variant?: AlertVariant;
  /** Custom color override */
  color?: string;
  /** Accessible label for the icon */
  'aria-label'?: string;
}

/**
 * Icon atom - displays simple SVG icons.
 * 
 * This is an atom because it cannot be broken down further
 * while remaining functional as a UI element.
 */
export function Icon({
  name,
  size = 20,
  variant,
  color,
  'aria-label': ariaLabel,
}: IconProps) {
  const iconColor = color || (variant ? colors[variant].icon : colors.neutral.gray600);
  
  const icons: Record<IconProps['name'], React.ReactNode> = {
    check: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    ),
    warning: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    ),
    error: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    info: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    close: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColor}
      role="img"
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      {icons[name]}
    </svg>
  );
}
