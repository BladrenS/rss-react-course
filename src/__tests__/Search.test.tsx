import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders input and button', () => {
    render(<Search onSearch={jest.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  it('loads saved value from localStorage', () => {
    localStorage.setItem('searchTerm', 'pikachu');
    render(<Search onSearch={jest.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('calls onSearch with trimmed value', () => {
    const mockSearch = jest.fn();
    render(<Search onSearch={mockSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '  bulbasaur  ' } });
    fireEvent.click(screen.getByRole('button'));
    expect(mockSearch).toHaveBeenCalledWith('bulbasaur');
    expect(localStorage.getItem('searchTerm')).toBe('bulbasaur');
  });
});
