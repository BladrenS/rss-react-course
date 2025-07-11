import { Component } from 'react';
import CardList from './CardList';
import ErrorBoundary from './ErrorBoundary';
import Search from './Search';

interface PokemonData {
  name: string;
  description: string;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  abilities: string[];
  height: number;
  weight: number;
  baseXP: number;
}

interface PokemonAPIResponse {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: 'hp' | 'attack' | 'defense' | 'speed' | string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  base_experience: number;
}

interface State {
  items: PokemonData[];
  loading: boolean;
  error: string | null;
}

export default class Main extends Component<object, State> {
  state: State = {
    items: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const stored = localStorage.getItem('searchTerm') || '';
    this.fetchData(stored);
  }

  fetchData = async (searchTerm: string) => {
    try {
      this.setState({ loading: true, error: null, items: [] });

      const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

      if (!searchTerm) {
        const res = await fetch(`${baseUrl}?limit=10`);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();

        const detailed = await Promise.all(
          data.results.map(async (item: { name: string; url: string }) => {
            const resDetails = await fetch(item.url);
            if (!resDetails.ok)
              throw new Error(`Detail API Error: ${resDetails.status}`);
            const details = await resDetails.json();
            return this.transformPokemon(details);
          })
        );

        this.setState({ items: detailed });
      } else {
        const res = await fetch(`${baseUrl}/${searchTerm.toLowerCase()}`);
        if (!res.ok) throw new Error(`Pokémon "${searchTerm}" not found.`);
        const details = await res.json();
        const single = this.transformPokemon(details);
        this.setState({ items: [single] });
      }
    } catch (e) {
      console.error('Error during fetch:', e);
      this.setState({ error: (e as Error).message });
    } finally {
      this.setState({ loading: false });
    }
  };

  transformPokemon = (data: PokemonAPIResponse): PokemonData => {
    const hp = data.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0;
    const attack =
      data.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0;
    const defense =
      data.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0;
    const speed =
      data.stats.find((s) => s.stat.name === 'speed')?.base_stat || 0;

    const abilities = data.abilities.map((a) => a.ability.name);
    const types = data.types.map((t) => t.type.name).join(', ');

    return {
      name: data.name,
      description: `Type: ${types}`,
      image: data.sprites.front_default || '',
      stats: { hp, attack, defense, speed },
      abilities,
      height: data.height,
      weight: data.weight,
      baseXP: data.base_experience,
    };
  };

  render() {
    const { items, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <Search onSearch={this.fetchData} />
        {loading && (
          <div className="flex justify-center items-center mt-4 text-gray-600">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
            <span className="text-lg">Loading...</span>
          </div>
        )}
        {error && <div className="text-center text-red-600 mt-4">{error}</div>}
        {!loading && !error && <CardList items={items} />}
      </ErrorBoundary>
    );
  }
}
