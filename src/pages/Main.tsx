import { useEffect, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Search } from '../components/Search';
import { CardList } from '../components/CardList';
import { PokemonData } from '../types/types';
import { fetchPokemonData } from '../api/api';

export const Main = () => {
  const [items, setItems] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      setItems([]);
      const data = await fetchPokemonData(term);
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('searchTerm') || '';
    handleSearch(stored);
  }, []);

  return (
    <ErrorBoundary>
      <Search onSearch={handleSearch} />
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
};
