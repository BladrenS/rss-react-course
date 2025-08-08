import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    document.documentElement.className = '';
  });

  it('provides default theme "light"', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('toggles theme to "dark"', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });
    await userEvent.click(button);

    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('throws if useTheme is used outside of ThemeProvider', () => {
    const consoleError = console.error;
    console.error = jest.fn();
    const BrokenComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      'useTheme must be used within ThemeProvider'
    );
    console.error = consoleError;
  });
});
