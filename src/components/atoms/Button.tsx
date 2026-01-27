import React from 'react';
import { colors, spacing, typography } from '../../tokens';

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Accessible label */
  'aria-label'?: string;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Button atom - interactive button element.
 * 
 * Atoms like buttons are functional on their own,
 * but designed to be composed into larger patterns.
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  'aria-label': ariaLabel,
  type = 'button',
}: ButtonProps) {
  const sizeStyles: Record<ButtonProps['size'] & string, React.CSSProperties> = {
    sm: { padding: `${spacing.xs} ${spacing.sm}`, fontSize: typography.fontSize.sm },
    md: { padding: `${spacing.sm} ${spacing.md}`, fontSize: typography.fontSize.base },
    lg: { padding: `${spacing.md} ${spacing.lg}`, fontSize: typography.fontSize.lg },
  };

  const variantStyles: Record<ButtonProps['variant'] & string, React.CSSProperties> = {
    primary: {
      backgroundColor: colors.info.icon,
      color: colors.neutral.white,
      border: 'none',
    },
    secondary: {
      backgroundColor: colors.neutral.white,
      color: colors.neutral.gray800,
      border: `1px solid ${colors.neutral.gray300}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.neutral.gray600,
      border: 'none',
    },
  };

  const baseStyle: React.CSSProperties = {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.medium,
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    transition: 'background-color 0.2s, opacity 0.2s',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      type={type}
      style={baseStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
