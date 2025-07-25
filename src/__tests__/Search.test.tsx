/*import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../components/Search';

describe('Search Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // --- Rendering Tests ---

  it('renders search input and search button', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/Search Pokémon/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('displays previously saved search term from localStorage on mount', () => {
    localStorage.setItem('searchTerm', 'bulbasaur');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByDisplayValue('bulbasaur')).toBeInTheDocument();
  });

  it('shows empty input when no saved term exists', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/Search Pokémon/i)).toHaveValue('');
  });

  // --- User Interaction Tests ---

  it('updates input value when user types', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/Search Pokémon/i);
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input).toHaveValue('charizard');
  });

  it('saves trimmed search term to localStorage when search button is clicked', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/Search Pokémon/i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: '  squirtle  ' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('squirtle');
  });

  it('trims whitespace from search input before saving and calling onSearch', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/Search Pokémon/i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: '  mewtwo ' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('mewtwo');
    expect(localStorage.getItem('searchTerm')).toBe('mewtwo');
  });

  it('triggers search callback with correct parameters', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/Search Pokémon/i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'eevee' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('eevee');
  });

  // --- LocalStorage Integration ---

  it('retrieves saved search term on component mount', () => {
    localStorage.setItem('searchTerm', 'snorlax');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByDisplayValue('snorlax')).toBeInTheDocument();
  });

  it('overwrites existing localStorage value when new search is performed', () => {
    localStorage.setItem('searchTerm', 'oldterm');
    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/Search Pokémon/i);
    const button = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(input, { target: { value: 'newterm' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchTerm')).toBe('newterm');
  });
});
*/
