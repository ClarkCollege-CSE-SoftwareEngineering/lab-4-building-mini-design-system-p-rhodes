[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/oRCZ8LbN)
# Lab 4: Building a Mini Design System

## Week 4 | UI Design I

## Overview

In this lab, you'll build components for a mini design system using **atomic design principles** from Brad Frost's methodology. You'll experience how small, reusable pieces (atoms) combine to form more complex components (molecules)—the core insight of component-driven development.

Your repository already includes **design tokens** (colors, spacing, typography) and two starter atoms (Icon, Text). You'll create:
- A **Button** atom — an interactive element that uses design tokens
- An **Alert** molecule — a component that composes Icon, Text, and Button atoms together

**⏱️ Estimated Time:** 60-90 minutes

**Prerequisites:**
- Completed Labs 1-3 (Vitest, TDD, React Testing Library)
- Week 4 readings completed (Atomic Design Chapters 1-2)
- Node.js 20+ installed

> [!IMPORTANT]
> **Windows Users:** We recommend using PowerShell rather than Command Prompt. Where commands differ between operating systems, both versions are provided.

## Learning Objectives

By the end of this lab, you will be able to:

1. **Explain** the atomic design hierarchy (atoms, molecules, organisms, templates, pages)
2. **Use** design tokens to ensure consistent styling across components
3. **Create** an atom component that serves as a reusable building block
4. **Compose** multiple atoms into a molecule that functions as a cohesive unit
5. **Test** component composition using React Testing Library

## Connection to Readings

This lab directly applies concepts from your Week 4 readings:

### From Atomic Design Chapter 1: "Designing Systems"
- **The problem with pages:** Frost argues that "pages" assume a "uniform, isolated unit when the web is actually fluid and interdependent." By building an Alert molecule from reusable atoms, you'll see how the same components can be used in different contexts without modification.
- **"We're not designing pages, we're designing systems of components":** This Stephen Hay quote captures what you'll practice today.

### From Atomic Design Chapter 2: "Atomic Design Methodology"
- **Atoms:** Frost defines atoms as "basic HTML elements like form labels, inputs, buttons, and others that can't be broken down any further without ceasing to be functional." You'll create a Button atom that fits this definition.
- **Molecules:** Frost describes molecules as "relatively simple groups of UI elements functioning together as a unit." Your Alert molecule will combine Icon, Text, and Button atoms into something more useful than any individual part.
- **Design tokens:** The starter code includes tokens for colors, spacing, and typography—the abstract values that ensure consistency across your design system.

### The "Tiny Bootstraps" Philosophy
Frost quotes Dave Rupert: "Responsive deliverables should look a lot like tiny Bootstraps." Your design tokens and components form exactly this—a custom, purpose-built system rather than a one-size-fits-all framework.

---

## Part 1: Explore the Starter Code (10 minutes)

### Step 1.1: Clone Your Repository

After accepting the GitHub Classroom assignment, clone your repository:

```bash
git clone <your-repository-url>
cd lab-4-<your-username>
```

### Step 1.2: Install Dependencies

```bash
npm install
```

### Step 1.3: Explore What's Provided

Your repository includes a complete foundation:

**Design Tokens** (`src/tokens/`):
- `colors.ts` — Semantic colors for alerts (success, warning, error, info) and neutral colors
- `spacing.ts` — Consistent spacing scale based on 4px units
- `typography.ts` — Font families, sizes, weights, and line heights
- `index.ts` — Exports all tokens for easy importing

**Starter Atoms** (`src/components/atoms/`):
- `Icon.tsx` — SVG icons for check, warning, error, info, and close
- `Text.tsx` — Styled text component with size and weight options
- `index.ts` — Exports the provided atoms (you'll add Button here)

**Configuration**:
- `package.json` — All dependencies pre-installed
- `tsconfig.json` — TypeScript configuration
- `vitest.config.ts` — Testing configuration with 90% coverage threshold
- `src/setupTests.ts` — Jest DOM matchers configured

Take a few minutes to read through the token files and the Icon/Text components to understand how they work.

✅ **Checkpoint:** Run `npm run typecheck` — it should complete with no errors.

🤔 **Reflection Question:** Look at `src/tokens/colors.ts`. How does organizing colors by semantic meaning (success, warning, error, info) differ from organizing them by visual property (green, yellow, red, blue)? What advantages does the semantic approach offer?

---

## Part 2: Create the Button Atom (25 minutes)

Now you'll create your first atom—a Button component that uses design tokens for consistent styling.

### Step 2.1: Create the Button Component

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
  // Size styles using spacing and typography tokens
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `${spacing.xs} ${spacing.sm}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize.lg,
    },
  };

  // Variant styles using color tokens
  const variantStyles: Record<string, React.CSSProperties> = {
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

### Step 2.2: Export the Button

Update `src/components/atoms/index.ts` to export your Button:

```typescript
export { Icon, type IconProps } from './Icon';
export { Text, type TextProps } from './Text';
export { Button, type ButtonProps } from './Button';
```

### Step 2.3: Write Tests for Button

Create `src/__tests__/Button.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/atoms';

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

  it('applies aria-label when provided', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('applies correct background color for primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#17a2b8' });
  });

  it('applies correct background color for secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#ffffff' });
  });

  it('applies transparent background for ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: 'transparent' });
  });

  it('applies reduced opacity when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ opacity: '0.6' });
  });
});
```

✅ **Checkpoint:** Run `npm test` — your Button tests should pass.

🤔 **Reflection Question:** Notice how the Button component uses `spacing.xs`, `spacing.sm`, etc. instead of hardcoded values like `'4px'`, `'8px'`. What would you need to change if your design team decided to increase all spacing by 2px?

---

## Part 3: Create the Alert Molecule (25 minutes)

Now you'll create a molecule—a component that combines multiple atoms into a cohesive unit.

### Step 3.1: Create the Alert Component

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
}: AlertProps) {
  // Map variant to icon name
  const iconNames: Record<AlertVariant, 'check' | 'warning' | 'error' | 'info'> = {
    success: 'check',
    warning: 'warning',
    error: 'error',
    info: 'info',
  };

  const variantColors = colors[variant];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: variantColors.background,
    border: `1px solid ${variantColors.border}`,
    borderRadius: '6px',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  };

  return (
    <div role="alert" style={containerStyle}>
      {/* Icon atom */}
      <Icon
        name={iconNames[variant]}
        variant={variant}
        size={24}
        aria-label={`${variant} alert`}
      />

      {/* Content using Text atoms */}
      <div style={contentStyle}>
        {title && (
          <Text weight="bold" color={variantColors.text}>
            {title}
          </Text>
        )}
        <Text color={variantColors.text}>{message}</Text>
      </div>

      {/* Dismiss Button atom */}
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

### Step 3.2: Export the Alert

Update `src/components/molecules/index.ts`:

```typescript
export { Alert, type AlertProps } from './Alert';
```

### Step 3.3: Write Tests for Alert

Create `src/__tests__/Alert.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from '../components/molecules';

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
      <Alert variant="warning" message="Warning message" dismissible />
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

  it('displays correct icon for variant', () => {
    render(<Alert variant="success" message="Success" />);

    expect(screen.getByRole('img', { name: 'success alert' })).toBeInTheDocument();
  });

  it('applies correct background color for success variant', () => {
    render(<Alert variant="success" message="Success" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({ backgroundColor: '#d4edda' });
  });

  it('applies correct background color for error variant', () => {
    render(<Alert variant="error" message="Error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveStyle({ backgroundColor: '#f8d7da' });
  });
});
```

✅ **Checkpoint:** Run `npm test` — all tests should pass.

✅ **Checkpoint:** Run `npm run test:coverage` — you should have at least 90% coverage.

🤔 **Reflection Question:** The Alert molecule imports and uses Icon, Text, and Button atoms. If you needed to update how all buttons look across your entire application, how many files would you need to change? How does this demonstrate Frost's point about the value of atomic design?

---

## Part 4: Complete Your README (10 minutes)

### Step 4.1: Run Final Checks

```bash
npm run typecheck
npm run test:coverage
```

Both commands should pass with no errors and at least 90% coverage.

### Step 4.2: Update the README

Update the `README.md` in your project root to include:

1. **Your Name and Date**

2. **Reflection Section** (minimum 150 words) answering:
   - How does composing the Alert molecule from Icon, Text, and Button atoms demonstrate the value of atomic design?
   - What role do design tokens play in maintaining consistency across your components?
   - If you needed to add a "dark mode" to this design system, what would you need to change?

3. **Key Concepts** section listing 3-5 things you learned about atomic design

---

## Deliverables

Your submission should include:

```
lab-4-<your-username>/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Icon.tsx         # Provided
│   │   │   ├── Text.tsx         # Provided
│   │   │   ├── Button.tsx       # Your creation
│   │   │   └── index.ts         # Updated to export Button
│   │   ├── molecules/
│   │   │   ├── Alert.tsx        # Your creation
│   │   │   └── index.ts         # Updated to export Alert
│   │   └── index.ts
│   ├── tokens/                  # Provided
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── __tests__/
│   │   ├── Button.test.tsx      # Your tests
│   │   └── Alert.test.tsx       # Your tests
│   └── setupTests.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md                    # Your reflection
```

### Requirements Summary

- [ ] Button atom implemented with variants (primary, secondary, ghost) and sizes (sm, md, lg)
- [ ] Alert molecule implemented, composing Icon, Text, and Button atoms
- [ ] Minimum **16 passing tests** (8 Button + 8 Alert)
- [ ] Minimum **90% code coverage**
- [ ] README.md with reflection (150+ words) and key concepts
- [ ] TypeScript compiles without errors

---

## Grading Rubric

| Criteria | Points |
|----------|--------|
| Button atom implemented correctly (variants, sizes, tokens) | 25 |
| Alert molecule implemented correctly (composition, variants) | 30 |
| Tests complete and passing (16+ tests, 90% coverage) | 25 |
| README with reflection (150+ words) and key concepts | 20 |
| **Total** | **100** |

---

## Stretch Goals

Finished early? Try these optional extensions:

1. **Add a Badge atom**: Create a small label component (like "New", "3", "Beta") with color variants matching your alert system.

2. **Add an AlertWithAction molecule**: Extend Alert to include a primary action button (e.g., "Undo", "Retry", "View Details") in addition to the dismiss button.

3. **Add a NotificationCenter organism**: Create a component that displays and manages a stack of multiple Alert molecules, with the ability to dismiss individual alerts.

4. **Add hover states**: Enhance the Button component with hover and focus styles using CSS-in-JS patterns.

---

## Troubleshooting

### "Cannot find module '../../tokens'"

Make sure your import paths are correct relative to the file location:
- From `src/components/atoms/Button.tsx`: use `../../tokens`
- From `src/components/molecules/Alert.tsx`: use `../../tokens`

### Style assertions failing in tests

Use the exact color values from the tokens. For example:
```tsx
// colors.info.icon is '#17a2b8'
expect(button).toHaveStyle({ backgroundColor: '#17a2b8' });
```

### Coverage not meeting threshold

Run `npm run test:coverage` and open `coverage/index.html` in a browser to see which lines aren't covered. Common misses:
- Different button variants not tested
- Alert without title not tested
- Disabled button state not tested

---

## Submission

1. Push your code to your GitHub repository
2. Verify GitHub Actions passes all checks
3. Submit your repository URL via Canvas

**Due:** Monday, February 2, 2026 at 11:59 PM

---

## Resources

- 🔗 [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)
- 🔗 [Atomic Design Chapter 2](https://atomicdesign.bradfrost.com/chapter-2/)
- 🔗 [React Testing Library Documentation](https://testing-library.com/docs/)
- 🔗 [Vitest Documentation](https://vitest.dev/)
