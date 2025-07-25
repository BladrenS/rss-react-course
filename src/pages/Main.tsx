import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../components/Search';
import { CardList } from '../components/CardList';
import { Pagination } from '../components/Pagination';
import { fetchPokemonData } from '../api/api';
import { PokemonData } from '../types/types';
import { Details } from '../components/Details';
import { transformPokemon } from '../utils/mapPokemon';

export const Main = () => {
  const [items, setItems] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<PokemonData | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedName = searchParams.get('details');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const itemsPerPage = 10;
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(term);
      setSearchParams({ page: '1' }); // сброс на первую страницу

      const result = await fetchPokemonData(term);
      setItems(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (name: string) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setDetails(transformPokemon(data));
    } catch {
      setError('Error fetching details');
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', String(page));
      return newParams;
    });
  };

  const handleCardClick = (name: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('details', name);
      return newParams;
    });
  };

  const handleCloseDetails = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('details');
      return newParams;
    });
  };

  useEffect(() => {
    if (selectedName) {
      fetchDetails(selectedName);
    }
  }, [selectedName]);

  useEffect(() => {
    handleSearch('');
  }, []);

  return (
    <div className="p-4">
      <Search onSearch={handleSearch} />

      {loading && <div className="text-center mt-4">Loading...</div>}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {!loading && !error && (
        <CardList items={paginatedItems} onItemClick={handleCardClick} />
      )}

      {selectedName && details && (
        <Details data={details} onClose={handleCloseDetails} />
      )}

      {!loading && !error && items.length > 0 && !searchTerm && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
