import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header';
import { ThemeProvider } from '../context/ThemeContext';

describe('Header', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Pokemon Search')).toBeInTheDocument();
  });

  it('has correct HTML structure and classes', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    const heading = screen.getByText('Pokemon Search');
    expect(heading.tagName).toBe('A');
    expect(heading).toHaveClass('text-2xl', 'font-bold');
  });
});
