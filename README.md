[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/oRCZ8LbN)
# Lab 4: Building a Mini Design System

**CSE 325: Software Design & Development**  

**Week 4 | UI Design I**

## Overview

In this lab, you'll build a mini design system using **atomic design principles** from Brad Frost's methodology. You'll create a component library organized into atoms, molecules, and organisms—experiencing firsthand how small, reusable pieces combine to form complex, consistent interfaces.

You'll build components for a simple notification/alert system: starting with basic atoms (icons, text, buttons), combining them into molecules (alert messages), and assembling those into organisms (a notification center). Along the way, you'll implement **design tokens** to ensure visual consistency across your entire system.

**⏱️ Estimated Time:** 90-120 minutes

**Prerequisites:**
- Completed Labs 1-3 (Vitest, TDD, React Testing Library)
- Week 4 readings completed (Atomic Design Chapters 1-2)
- Node.js 20+ installed
- Familiarity with React and TypeScript

> [!IMPORTANT]
> **Windows Users:** We recommend using PowerShell rather than Command Prompt. Where commands differ between operating systems, both versions are provided. PowerShell commands are compatible with the Linux/macOS versions in most cases.

## Learning Objectives

By the end of this lab, you will be able to:

1. **Organize** React components following atomic design hierarchy (atoms, molecules, organisms)
2. **Implement** design tokens for consistent colors, spacing, and typography
3. **Compose** complex components from simpler building blocks
4. **Apply** the "content structure vs. final content" distinction between templates and pages
5. **Test** component composition using React Testing Library
6. **Explain** how atomic design enables scalable, maintainable design systems

## Connection to Readings

This lab directly applies concepts from your Week 4 readings:

### From Atomic Design Chapter 1: "Designing Systems"
- **The problem with pages:** Frost argues that "pages" assume a "uniform, isolated unit when the web is actually fluid and interdependent." In this lab, you'll experience how building from atoms up creates flexibility—the same Alert molecule can appear in a notification center, a form, or a modal without modification.
- **"We're not designing pages, we're designing systems of components":** This Stephen Hay quote captures what you'll practice today. Your notification center isn't a "page"—it's a composition of reusable pieces.

### From Atomic Design Chapter 2: "Atomic Design Methodology"
- **Atoms:** You'll create foundational elements like `Icon`, `Text`, and `Button`—pieces that "can't be broken down any further without ceasing to be functional."
- **Molecules:** You'll combine atoms into an `Alert` component—"relatively simple groups of UI elements functioning together as a unit."
- **Organisms:** You'll build a `NotificationCenter` that composes multiple alerts—"relatively complex UI components composed of groups of molecules and/or atoms."
- **Design tokens:** Frost emphasizes that design systems need "design tokens"—the abstract values (colors, spacing, typography) that ensure consistency. You'll implement these as a shared configuration.

### The "Tiny Bootstraps" Philosophy
Frost quotes Dave Rupert: _"Responsive deliverables should look a lot like tiny Bootstraps."_ Your mini design system is exactly this—a custom, purpose-built component library rather than a one-size-fits-all framework.

---

## Part 1: Project Setup (10 minutes)

### Step 1.1: Clone Your Repository

After accepting the GitHub Classroom assignment, you'll have a personal repository. Clone it to your local machine:

```bash
git clone git@github.com:ClarkCollege-CSE-SoftwareEngineering/lab-4-build-mini-design-system-YOURUSERNAME.git
cd lab-4-build-mini-design-system-YOURUSERNAME
```

> [!NOTE]
> Replace `YOURUSERNAME` with your actual GitHub username. You can copy the exact clone URL from your repository page on GitHub.

Your cloned repository already contains:

- `README.md` — These lab instructions
- `.gitignore` — Pre-configured to ignore `node_modules/`, `dist/`, `coverage/`, etc.
- `.github/workflows/test.yml` — GitHub Actions workflow for automated testing and grading
- `package.json` — Pre-configured with React, TypeScript, Vitest, and Testing Library dependencies
- `tsconfig.json` — TypeScript configuration for React with strict mode enabled
- `vitest.config.ts` — Vitest configuration with jsdom environment and 90% coverage thresholds
- `src/components/atoms/` — Directory for your atomic components (Icon, Text, Button, Badge)
- `src/components/molecules/` — Directory for molecular components (Alert, AlertWithAction)
- `src/components/organisms/` — Directory for organism components (NotificationCenter)
- `src/tokens/` — Directory for design tokens (colors, spacing, typography)
- `src/__tests__/` — Directory for your test files

### Step 1.2: Install Dependencies

```bash
npm install
```

This installs all the pre-configured dependencies including React, TypeScript, Vitest, and React Testing Library.

### Step 1.3: Create Test Setup File

Create `src/setupTests.ts`:

```typescript
import '@testing-library/jest-dom';
```

This file configures the custom Jest DOM matchers (like `toBeInTheDocument()`) for your tests.

### Step 1.4: Verify Your Setup

```bash
npm run typecheck
```

✅ **Checkpoint:** The command should complete with no errors. You may see a warning about no input files yet—that's expected since we haven't created any TypeScript files.

---

## Part 2: Design Tokens — The Foundation (15 minutes)

Before building components, we need to establish our design tokens. These are the "subatomic" particles that ensure visual consistency.

### Step 2.1: Create Color Tokens

Create `src/tokens/colors.ts`:

```typescript
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
```

### Step 2.2: Create Spacing Tokens

Create `src/tokens/spacing.ts`:

```typescript
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
```

### Step 2.3: Create Typography Tokens

Create `src/tokens/typography.ts`:

```typescript
/**
 * Typography tokens for consistent text styling.
 */

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, "Cascadia Code", "Source Code Pro", monospace',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    base: 1.5,
    relaxed: 1.75,
  },
} as const;
```

### Step 2.4: Create Token Index

Create `src/tokens/index.ts`:

```typescript
export { colors, type AlertVariant } from './colors';
export { spacing, type SpacingKey } from './spacing';
export { typography } from './typography';
```

🤔 **Reflection Question:** Brad Frost describes design tokens as ensuring _"design systems must account for the dynamic nature of content."_ How do these token files achieve that? What would happen if you wanted to change the success color across your entire application?

✅ **Checkpoint:** Your `src/tokens/` directory should have 4 files: `colors.ts`, `spacing.ts`, `typography.ts`, and `index.ts`.

---

## Part 3: Building Atoms (25 minutes)

Atoms are the foundational building blocks. They're functional on their own but designed to combine with others.

### Step 3.1: Create the Icon Atom

Create `src/components/atoms/Icon.tsx`:

```tsx
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
```

### Step 3.2: Create the Text Atom

Create `src/components/atoms/Text.tsx`:

```tsx
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
```

### Step 3.3: Create the Button Atom

Create `src/components/atoms/Button.tsx`:

```tsx
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
```

### Step 3.4: Create Atoms Index

Create `src/components/atoms/index.ts`:

```typescript
export { Icon, type IconProps } from './Icon';
export { Text, type TextProps } from './Text';
export { Button, type ButtonProps } from './Button';
```

### Step 3.5: Write Tests for Atoms

Create `src/__tests__/atoms.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Icon, Text, Button } from '../components/atoms';

describe('Atoms', () => {
  describe('Icon', () => {
    it('renders an icon with the correct aria-label', () => {
      render(<Icon name="check" aria-label="Success icon" />);
      
      expect(screen.getByRole('img', { name: 'Success icon' })).toBeInTheDocument();
    });

    it('renders as aria-hidden when no label is provided', () => {
      render(<Icon name="warning" />);
      
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('uses variant color when provided', () => {
      render(<Icon name="check" variant="success" aria-label="Success" />);
      
      const svg = screen.getByRole('img');
      expect(svg).toHaveAttribute('stroke', '#28a745');
    });

    it('uses custom color over variant when both provided', () => {
      render(<Icon name="check" variant="success" color="#ff0000" aria-label="Custom" />);
      
      const svg = screen.getByRole('img');
      expect(svg).toHaveAttribute('stroke', '#ff0000');
    });
  });

  describe('Text', () => {
    it('renders text content', () => {
      render(<Text>Hello World</Text>);
      
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders as specified element', () => {
      render(<Text as="h1">Heading</Text>);
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Heading');
    });

    it('applies correct font size for size prop', () => {
      render(<Text size="lg">Large text</Text>);
      
      const element = screen.getByText('Large text');
      expect(element).toHaveStyle({ fontSize: '18px' });
    });
  });

  describe('Button', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>);
      
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick} disabled>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('uses aria-label when provided', () => {
      render(<Button aria-label="Close dialog">X</Button>);
      
      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    });
  });
});
```

✅ **Checkpoint:** Run `npm test` — all atom tests should pass.

🤔 **Reflection Question:** Looking at the Button component, why do we define `sizeStyles` and `variantStyles` as separate objects rather than using if/else statements? How does this connect to Frost's idea that _"atoms include basic HTML elements like form labels, inputs, buttons"_?

---

## Part 4: Building Molecules (25 minutes)

Molecules combine atoms into functional units. Our Alert molecule combines Icon, Text, and Button atoms.

### Step 4.1: Create the Alert Molecule

Create `src/components/molecules/Alert.tsx`:

```tsx
import React from 'react';
import { Icon, Text, Button } from '../atoms';
import { colors, spacing, AlertVariant } from '../../tokens';

export interface AlertProps {
  /** The alert variant determines colors and default icon */
  variant: AlertVariant;
  /** The main message to display */
  message: string;
  /** Optional title for the alert */
  title?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
  /** Optional custom icon name */
  icon?: 'check' | 'warning' | 'error' | 'info';
}

/**
 * Alert molecule - combines Icon, Text, and Button atoms.
 * 
 * As Brad Frost describes, molecules are "relatively simple groups
 * of UI elements functioning together as a unit." This Alert
 * combines our atoms to create something more useful than
 * any individual part.
 */
export function Alert({
  variant,
  message,
  title,
  dismissible = false,
  onDismiss,
  icon,
}: AlertProps) {
  // Default icon based on variant
  const defaultIcons: Record<AlertVariant, 'check' | 'warning' | 'error' | 'info'> = {
    success: 'check',
    warning: 'warning',
    error: 'error',
    info: 'info',
  };

  const iconName = icon || defaultIcons[variant];
  const variantColors = colors[variant];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: variantColors.background,
    border: `1px solid ${variantColors.border}`,
    borderRadius: '6px',
    position: 'relative',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  };

  return (
    <div role="alert" style={containerStyle}>
      <Icon
        name={iconName}
        variant={variant}
        size={24}
        aria-label={`${variant} alert`}
      />
      
      <div style={contentStyle}>
        {title && (
          <Text weight="bold" color={variantColors.text}>
            {title}
          </Text>
        )}
        <Text color={variantColors.text}>{message}</Text>
      </div>

      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <Icon name="close" size={16} color={variantColors.text} />
        </Button>
      )}
    </div>
  );
}
```

### Step 4.2: Create Molecules Index

Create `src/components/molecules/index.ts`:

```typescript
export { Alert, type AlertProps } from './Alert';
```

### Step 4.3: Write Tests for the Alert Molecule

Create `src/__tests__/molecules.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../components/molecules';

describe('Molecules', () => {
  describe('Alert', () => {
    it('renders with message', () => {
      render(<Alert variant="info" message="This is an info message" />);
      
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('This is an info message')).toBeInTheDocument();
    });

    it('renders with title when provided', () => {
      render(
        <Alert
          variant="success"
          title="Success!"
          message="Your action was completed."
        />
      );
      
      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Your action was completed.')).toBeInTheDocument();
    });

    it('shows dismiss button when dismissible', () => {
      render(
        <Alert
          variant="warning"
          message="Warning message"
          dismissible
        />
      );
      
      expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
    });

    it('does not show dismiss button when not dismissible', () => {
      render(<Alert variant="error" message="Error message" />);
      
      expect(screen.queryByRole('button', { name: 'Dismiss alert' })).not.toBeInTheDocument();
    });

    it('calls onDismiss when dismiss button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      
      render(
        <Alert
          variant="info"
          message="Dismissible message"
          dismissible
          onDismiss={handleDismiss}
        />
      );
      
      await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it('uses default icon based on variant', () => {
      render(<Alert variant="success" message="Success" />);
      
      // The icon should have the success variant's aria-label
      expect(screen.getByRole('img', { name: 'success alert' })).toBeInTheDocument();
    });

    it('uses custom icon when provided', () => {
      render(<Alert variant="info" message="Info with warning icon" icon="warning" />);
      
      // Check that the warning icon path is rendered
      const svg = screen.getByRole('img', { name: 'info alert' });
      expect(svg.querySelector('path')).toBeInTheDocument();
    });

    it('applies correct colors for each variant', () => {
      const { rerender } = render(<Alert variant="success" message="Success" />);
      
      let alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ backgroundColor: '#d4edda' });
      
      rerender(<Alert variant="error" message="Error" />);
      alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ backgroundColor: '#f8d7da' });
    });
  });
});
```

✅ **Checkpoint:** Run `npm test` — all molecule tests should pass.

🤔 **Reflection Question:** The Alert molecule composes Icon, Text, and Button atoms. How does this composition demonstrate Frost's point that molecules _"take on their own properties and serve as the backbone of our design systems"_? What would be harder if we built Alert without these reusable atoms?

---

## Part 5: Building Organisms (20 minutes)

Organisms are complex components composed of molecules, atoms, or other organisms. Our NotificationCenter organism manages multiple Alert molecules.

### Step 5.1: Create the NotificationCenter Organism

Create `src/components/organisms/NotificationCenter.tsx`:

```tsx
import React from 'react';
import { Alert } from '../molecules';
import { Text } from '../atoms';
import { spacing, colors, AlertVariant } from '../../tokens';

export interface Notification {
  /** Unique identifier for the notification */
  id: string;
  /** Alert variant */
  variant: AlertVariant;
  /** Notification message */
  message: string;
  /** Optional title */
  title?: string;
}

export interface NotificationCenterProps {
  /** Array of notifications to display */
  notifications: Notification[];
  /** Callback when a notification is dismissed */
  onDismiss: (id: string) => void;
  /** Optional title for the notification center */
  title?: string;
  /** Maximum number of notifications to show */
  maxVisible?: number;
}

/**
 * NotificationCenter organism - displays and manages multiple alerts.
 * 
 * As Frost describes, organisms are "relatively complex UI components
 * composed of groups of molecules and/or atoms." This component
 * composes multiple Alert molecules into a functional notification
 * system.
 */
export function NotificationCenter({
  notifications,
  onDismiss,
  title = 'Notifications',
  maxVisible = 5,
}: NotificationCenterProps) {
  const visibleNotifications = notifications.slice(0, maxVisible);
  const hiddenCount = notifications.length - maxVisible;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.neutral.white,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${colors.neutral.gray200}`,
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  if (notifications.length === 0) {
    return (
      <div style={containerStyle} role="region" aria-label={title}>
        <div style={headerStyle}>
          <Text as="h2" size="lg" weight="bold">
            {title}
          </Text>
        </div>
        <Text color={colors.neutral.gray600}>No notifications</Text>
      </div>
    );
  }

  return (
    <div style={containerStyle} role="region" aria-label={title}>
      <div style={headerStyle}>
        <Text as="h2" size="lg" weight="bold">
          {title}
        </Text>
        <Text size="sm" color={colors.neutral.gray600}>
          {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
        </Text>
      </div>

      <div style={listStyle} role="list" aria-label="Notification list">
        {visibleNotifications.map((notification) => (
          <div key={notification.id} role="listitem">
            <Alert
              variant={notification.variant}
              message={notification.message}
              title={notification.title}
              dismissible
              onDismiss={() => onDismiss(notification.id)}
            />
          </div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <Text size="sm" color={colors.neutral.gray600}>
          +{hiddenCount} more {hiddenCount === 1 ? 'notification' : 'notifications'}
        </Text>
      )}
    </div>
  );
}
```

### Step 5.2: Create Organisms Index

Create `src/components/organisms/index.ts`:

```typescript
export { NotificationCenter, type NotificationCenterProps, type Notification } from './NotificationCenter';
```

### Step 5.3: Create Main Component Index

Create `src/components/index.ts`:

```typescript
// Atoms
export * from './atoms';

// Molecules
export * from './molecules';

// Organisms
export * from './organisms';
```

### Step 5.4: Write Tests for the NotificationCenter Organism

Create `src/__tests__/organisms.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationCenter, Notification } from '../components/organisms';

describe('Organisms', () => {
  describe('NotificationCenter', () => {
    const sampleNotifications: Notification[] = [
      { id: '1', variant: 'success', message: 'File uploaded successfully', title: 'Upload Complete' },
      { id: '2', variant: 'warning', message: 'Your session will expire in 5 minutes' },
      { id: '3', variant: 'error', message: 'Failed to save changes', title: 'Error' },
    ];

    it('renders with a title', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
          title="My Notifications"
        />
      );
      
      expect(screen.getByRole('heading', { name: 'My Notifications' })).toBeInTheDocument();
    });

    it('displays notification count', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('3 notifications')).toBeInTheDocument();
    });

    it('displays singular form for one notification', () => {
      render(
        <NotificationCenter
          notifications={[sampleNotifications[0]]}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('1 notification')).toBeInTheDocument();
    });

    it('renders all notifications', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('File uploaded successfully')).toBeInTheDocument();
      expect(screen.getByText('Your session will expire in 5 minutes')).toBeInTheDocument();
      expect(screen.getByText('Failed to save changes')).toBeInTheDocument();
    });

    it('limits visible notifications to maxVisible', () => {
      const manyNotifications: Notification[] = [
        { id: '1', variant: 'info', message: 'Message 1' },
        { id: '2', variant: 'info', message: 'Message 2' },
        { id: '3', variant: 'info', message: 'Message 3' },
        { id: '4', variant: 'info', message: 'Message 4' },
        { id: '5', variant: 'info', message: 'Message 5' },
        { id: '6', variant: 'info', message: 'Message 6' },
      ];

      render(
        <NotificationCenter
          notifications={manyNotifications}
          onDismiss={vi.fn()}
          maxVisible={3}
        />
      );
      
      expect(screen.getByText('Message 1')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
      expect(screen.getByText('Message 3')).toBeInTheDocument();
      expect(screen.queryByText('Message 4')).not.toBeInTheDocument();
      expect(screen.getByText('+3 more notifications')).toBeInTheDocument();
    });

    it('calls onDismiss with correct id when notification is dismissed', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={handleDismiss}
        />
      );
      
      // Find all dismiss buttons
      const dismissButtons = screen.getAllByRole('button', { name: 'Dismiss alert' });
      
      // Click the first one
      await user.click(dismissButtons[0]);
      
      expect(handleDismiss).toHaveBeenCalledWith('1');
    });

    it('shows empty state when no notifications', () => {
      render(
        <NotificationCenter
          notifications={[]}
          onDismiss={vi.fn()}
        />
      );
      
      expect(screen.getByText('No notifications')).toBeInTheDocument();
    });

    it('has correct accessibility attributes', () => {
      render(
        <NotificationCenter
          notifications={sampleNotifications}
          onDismiss={vi.fn()}
          title="Notifications"
        />
      );
      
      expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
      expect(screen.getByRole('list', { name: 'Notification list' })).toBeInTheDocument();
    });
  });
});
```

✅ **Checkpoint:** Run `npm test` — all tests should pass (20+ tests).

---

## Part 6: Your Turn — Extend the Design System (20 minutes)

Now it's time to apply what you've learned. Add your own components to the design system.

### Task 6.1: Create a Badge Atom

Create a `Badge` atom in `src/components/atoms/Badge.tsx` that:
- Displays a small label (like "New", "3", "Beta")
- Has variants: `default`, `primary`, `success`, `warning`, `error`
- Has sizes: `sm`, `md`
- Uses design tokens for colors and spacing

**TODO:** Write at least 4 tests for your Badge component in `src/__tests__/atoms.test.tsx`.

### Task 6.2: Create an AlertWithAction Molecule

Create an `AlertWithAction` molecule in `src/components/molecules/AlertWithAction.tsx` that:
- Extends the Alert molecule to include an action button
- Has props for `actionLabel` and `onAction`
- Composes existing atoms (Button, Icon, Text)

**TODO:** Write at least 4 tests for your AlertWithAction component in `src/__tests__/molecules.test.tsx`.

### Task 6.3: Update Exports

Update the index files to export your new components:
- `src/components/atoms/index.ts`
- `src/components/molecules/index.ts`

---

## Deliverables

Your submission should include:

```
design-system-lab/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Icon.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx          # Your addition
│   │   │   └── index.ts
│   │   ├── molecules/
│   │   │   ├── Alert.tsx
│   │   │   ├── AlertWithAction.tsx  # Your addition
│   │   │   └── index.ts
│   │   ├── organisms/
│   │   │   ├── NotificationCenter.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── __tests__/
│   │   ├── atoms.test.tsx
│   │   ├── molecules.test.tsx
│   │   └── organisms.test.tsx
│   └── setupTests.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md (your reflection)
```

### README.md Requirements

Your `README.md` must include:

1. **Your Name and Date**

2. 🤔 **Reflection Section** (minimum 200 words) answering:
   - How does organizing components into atoms, molecules, and organisms help with code reuse?
   - Describe how the design tokens you implemented support Frost's idea of "tiny Bootstraps" for each client.
   - What would change if you needed to support a dark mode theme in this design system?

3. **Key Concepts** section listing 3-5 concepts you learned about atomic design

### Requirements Summary

- [ ] Minimum **28 passing tests** (20 provided + 8 student-added)
- [ ] Minimum **90% code coverage**
- [ ] All atoms, molecules, and organisms implemented
- [ ] Badge atom and AlertWithAction molecule added
- [ ] Design tokens used consistently throughout
- [ ] README.md with reflection and key concepts
- [ ] TypeScript compiles without errors

---

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Project setup correct (dependencies, Vitest config, TypeScript) | 15 |
| Core components implemented (atoms, molecules, organisms) | 20 |
| Design tokens implemented and used consistently | 15 |
| Student-added components (Badge, AlertWithAction with tests) | 20 |
| README complete with reflection (200+ words) and key concepts | 20 |
| Code quality (90%+ coverage, clean code, proper TypeScript) | 10 |
| **Total** | **100** |

---

## Stretch Goals

If you finish early, try these challenges:

1. **Add a Toast molecule**: Create a toast notification that auto-dismisses after a timeout.

2. **Add a Card organism**: Create a Card with header, body, and footer sections that composes multiple atoms and molecules.

3. **Create a ThemeProvider**: Implement a React context that allows switching between light and dark color tokens.

4. **Add animation tokens**: Create timing and easing tokens for consistent animations across components.

---

## Troubleshooting

### "Cannot find module '../tokens'"

Make sure your import paths are correct relative to the file location. From atoms, the path is `../../tokens`.

### Style objects not being applied

Ensure you're using `React.CSSProperties` type for style objects and that property names are camelCase (e.g., `backgroundColor` not `background-color`).

### Coverage not meeting threshold

- Run `npm run test:coverage` to see the detailed report
- Check `coverage/index.html` in a browser to see uncovered lines
- Make sure to test all branches (variants, optional props, edge cases)

### TypeScript errors about token types

Use `as const` assertions on your token objects to get proper type inference:
```typescript
export const colors = { ... } as const;
```

---

## Submission

1. Push your code to your GitHub repository
2. Verify GitHub Actions passes all checks
3. Submit your repository URL via Canvas

**Due:** Monday of Week 5

---

## Resources

- 🔗 [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- 🔗 [Design Tokens W3C Community Group](https://www.w3.org/community/design-tokens/)
- 🔗 [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- 🔗 [Vitest Documentation](https://vitest.dev/)
