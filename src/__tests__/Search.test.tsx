import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '../components/Search';
import '@testing-library/jest-dom';

jest.mock('../api/useLocalStorage', () => ({
  useLocalStorage: () => ['pikachu', jest.fn()],
}));

describe('<Search />', () => {
  it('renders input and button', () => {
    render(<Search onSearch={jest.fn()} isDetailsVisible={false} />);
    expect(screen.getByPlaceholderText(/search pokémon/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed value on button click', () => {
    const mockSearch = jest.fn();
    render(<Search onSearch={mockSearch} isDetailsVisible={false} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '  pikachu  ' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('pikachu');
  });

  it('shows dropdown on input focus and hides on blur', async () => {
    render(<Search onSearch={jest.fn()} isDetailsVisible={false} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);

    fireEvent.focus(input);

    await waitFor(() =>
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    );

    fireEvent.blur(input);

    await waitFor(() =>
      expect(screen.queryByText('pikachu')).not.toBeInTheDocument()
    );
  });

  it('applies marginRight when isDetailsVisible is true', async () => {
    render(<Search onSearch={jest.fn()} isDetailsVisible={true} />);
    const input = screen.getByPlaceholderText(/search pokémon/i);
    const motionWrapper = input.closest('div')?.parentElement?.parentElement;

    expect(motionWrapper).toBeDefined();

    if (motionWrapper) {
      await waitFor(() => {
        const computed = getComputedStyle(motionWrapper);
        expect(computed.marginRight).toBe('25%');
      });
    }
  });
});
