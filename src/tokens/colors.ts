/**
 * Color tokens for the design system.
 * 
 * Following atomic design principles, these tokens are the foundational
 * values that all components reference. Changing a value here updates
 * it everywhere in the system.
 */

export const colors = {
  // Semantic colors for alerts
  success: {
    background: '#d4edda',
    border: '#c3e6cb',
    text: '#155724',
    icon: '#28a745',
  },
  warning: {
    background: '#fff3cd',
    border: '#ffeeba',
    text: '#856404',
    icon: '#ffc107',
  },
  error: {
    background: '#f8d7da',
    border: '#f5c6cb',
    text: '#721c24',
    icon: '#dc3545',
  },
  info: {
    background: '#d1ecf1',
    border: '#bee5eb',
    text: '#0c5460',
    icon: '#17a2b8',
  },
  
  // Neutral colors
  neutral: {
    white: '#ffffff',
    gray100: '#f8f9fa',
    gray200: '#e9ecef',
    gray300: '#dee2e6',
    gray600: '#6c757d',
    gray800: '#343a40',
    black: '#000000',
  },
} as const;

export type AlertVariant = 'success' | 'warning' | 'error' | 'info';
