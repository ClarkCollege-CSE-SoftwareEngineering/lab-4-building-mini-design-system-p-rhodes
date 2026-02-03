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
