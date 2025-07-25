import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../components/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('Pokemon Search')).toBeInTheDocument();
  });

  it('has correct HTML structure and classes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const heading = screen.getByText('Pokemon Search');
    expect(heading.tagName).toBe('A');
    expect(heading).toHaveClass('text-2xl', 'font-bold');
  });
});
