import React from 'react';
import { typography, colors } from '../../tokens';

export interface TextProps {
  /** The text content */
  children: React.ReactNode;
  /** Text size variant */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'bold';
  /** Custom color */
  color?: string;
  /** HTML element to render */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'label';
  /** Additional class name */
  className?: string;
}

/**
 * Text atom - renders styled text content.
 * 
 * This atom wraps text with consistent typography tokens,
 * ensuring visual consistency across the design system.
 */
export function Text({
  children,
  size = 'base',
  weight = 'normal',
  color = colors.neutral.gray800,
  as: Component = 'span',
  className,
}: TextProps) {
  const style: React.CSSProperties = {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize[size],
    fontWeight: typography.fontWeight[weight],
    lineHeight: typography.lineHeight.base,
    color,
    margin: 0,
  };

  return (
    <Component style={style} className={className}>
      {children}
    </Component>
  );
}
