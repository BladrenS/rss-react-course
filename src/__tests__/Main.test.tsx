import { render, screen, waitFor } from '@testing-library/react';
import { Main } from '../pages/Main';
import userEvent from '@testing-library/user-event';

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

const originalConsoleError = console.error;

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
    const fakeList = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
      ],
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => fakeList })
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    render(<Main />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  it('loads searchTerm from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'pikachu');

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });

  it('manages loading and error states correctly (invalid name)', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false, status: 404 });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/api error: 404/i)).toBeInTheDocument();
    });
  });

  it('calls API with correct parameter for search', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    render(<Main />);

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

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('updates component state based on API response', async () => {
    const fakeList = {
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
      ],
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => fakeList })
      .mockResolvedValueOnce({ ok: true, json: async () => mockSinglePokemon });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });
});
