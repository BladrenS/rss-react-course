import { Component } from 'react';
import axios, { AxiosError } from 'axios';
import Search from './Search';

interface Pokemon {
  name: string;
  description: string;
  image: string;
}

interface State {
  results: Pokemon[];
  loading: boolean;
  error: string | null;
}

export default class Main extends Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const term = localStorage.getItem('searchTerm') || '';
    this.fetchData(term);
  }

  fetchData = async (term: string) => {
    this.setState({ loading: true, error: null });

    try {
      if (term) {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
        );

        const types = res.data.types
          .map((t: { type: { name: string } }) => t.type.name)
          .join(', ');
        const description = `Type(s): ${types}, Weight: ${res.data.weight}, Height: ${res.data.height}`;
        const image = res.data.sprites.front_default;

        this.setState({
          results: [
            {
              name: res.data.name,
              description,
              image,
            },
          ],
          loading: false,
        });
      } else {
        const res = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
        );

        const detailed = await Promise.all(
          res.data.results.map(async (p: { name: string; url: string }) => {
            const poke = await axios.get(p.url);
            const types = poke.data.types
              .map((t: { type: { name: string } }) => t.type.name)
              .join(', ');
            const description = `Type(s): ${types}, Weight: ${poke.data.weight}, Height: ${poke.data.height}`;
            const image = poke.data.sprites.front_default;
            return {
              name: poke.data.name,
              description,
              image,
            };
          })
        );

        this.setState({ results: detailed, loading: false });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.isAxiosError) {
        this.setState({
          error: `Error: ${axiosError.response?.status || 'Unknown'} - ${axiosError.message}`,
          loading: false,
        });
      } else {
        this.setState({
          error: 'An unexpected error occurred.',
          loading: false,
        });
        console.error('Unexpected error:', error);
      }
    }
  };

  handleSearch = (term: string) => {
    const trimmed = term.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.fetchData(trimmed);
  };

  render() {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <Search onSearch={this.handleSearch} />
      </div>
    );
  }
}
