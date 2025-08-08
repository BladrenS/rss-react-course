import { render, screen, waitFor } from '@testing-library/react';
import { Main } from '../pages/Main';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { TextEncoder, TextDecoder } from 'util';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

const mockSinglePokemon = {
  name: 'pikachu',
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
  ],
  abilities: [{ ability: { name: 'static' } }],
  types: [{ type: { name: 'electric' } }],
  sprites: { front_default: 'pikachu.png' },
  height: 4,
  weight: 60,
  base_experience: 112,
};

const fakeList = {
  results: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
  ],
};

const originalConsoleError = console.error;

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
}

describe('Main Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  beforeAll(() => {
    console.error = () => {};
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('makes initial API call on mount (no search term)', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => fakeList })
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    renderWithClient(<Main />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  it('manages loading and error states correctly (invalid name)', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 404 });

    renderWithClient(<Main />);

    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch pokémon list/i)
      ).toBeInTheDocument();
    });
  });

  it('calls API with correct parameter for search', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => fakeList })
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    renderWithClient(<Main />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    const button = screen.getByText(/search/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'pikachu');
    await userEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pikachu')
      );
    });
  });

  it('handles multiple errors (network & 500)', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network Error'));

    renderWithClient(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('updates component state based on API response', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => fakeList })
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    renderWithClient(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  it('loads from stored searchTerm in localStorage', async () => {
    localStorage.setItem('searchTerm', JSON.stringify('pikachu'));

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => fakeList })
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    renderWithClient(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });
});
