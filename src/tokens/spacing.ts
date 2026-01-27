/**
 * Spacing tokens using a consistent scale.
 * Based on a 4px base unit for visual rhythm.
 */

export const spacing = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
} as const;

export type SpacingKey = keyof typeof spacing;
