import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../components/Search';
import { CardList } from '../components/CardList';
import { Pagination } from '../components/Pagination';
import { fetchPokemonData } from '../api/api';
import { PokemonData } from '../types/types';
import { Details } from '../components/Details';
import { transformPokemon } from '../utils/mapPokemon';
import { useLocalStorage } from '../api/useLocalStorage';
import { Flyout } from '../components/Flyout';

export const Main = () => {
  const [items, setItems] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [details, setDetails] = useState<PokemonData | null>(null);
  const [storedTerm] = useLocalStorage('searchTerm', '');

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedName = searchParams.get('details');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const itemsPerPage = 10;

  const handleSearch = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(term);
      setSearchParams({ page: '1' });

      const result = await fetchPokemonData(term, 1);
      setItems(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchPokemonData(searchTerm, page);
      setItems(result);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (name: string) => {
    try {
      setDetails(null);
      setLoadingDetails(true);
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setDetails(transformPokemon(data));
    } catch {
      setError('Error fetching details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', String(page));
      return newParams;
    });
    fetchData(page);
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
    if (storedTerm) {
      setSearchTerm(storedTerm);
      fetchData(currentPage);
    } else {
      fetchData(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="p-4 bg-orange-50 min-h-screen">
      <Flyout></Flyout>
      <Search onSearch={handleSearch} isDetailsVisible={!!selectedName} />

      {loading && <div className="text-center mt-4">Loading...</div>}
      {error && <div className="text-center text-red-500 mt-4">{error}</div>}

      {!loading && !error && (
        <CardList
          items={items}
          onItemClick={handleCardClick}
          isDetailsVisible={!!selectedName}
        />
      )}

      <Details
        data={details}
        isVisible={!!selectedName}
        onClose={handleCloseDetails}
        loading={loadingDetails}
      />

      {!loading && !error && items.length > 0 && !searchTerm && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(1000 / itemsPerPage)}
          onPageChange={handlePageChange}
          isDetailsVisible={!!selectedName}
        />
      )}
    </div>
  );
};
