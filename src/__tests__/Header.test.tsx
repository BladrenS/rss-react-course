import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByText('Pokemon Search')).toBeInTheDocument();
  });

  it('has correct HTML structure and classes', () => {
    render(<Header />);
    const heading = screen.getByText('Pokemon Search');
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveClass('text-2xl', 'font-bold');
  });
});
