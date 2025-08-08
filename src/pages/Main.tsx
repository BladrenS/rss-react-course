import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../components/Search';
import { CardList } from '../components/CardList';
import { Pagination } from '../components/Pagination';
import { PokemonData } from '../types/types';
import { Details } from '../components/Details';
import { useLocalStorage } from '../api/useLocalStorage';
import { Flyout } from '../components/Flyout';
import { usePokemonListQuery } from '../api/usePokemonList';
import { usePokemonDetailsQuery } from '../api/usePokemonDetails';
import { useQueryClient } from '@tanstack/react-query';

export const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const selectedName = searchParams.get('details');
  const [storedTerm] = useLocalStorage('searchTerm', '');
  const [searchTerm, setSearchTerm] = useState<string>(storedTerm || '');

  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    isError,
    error,
    isFetching,
    refetch: refetchList,
  } = usePokemonListQuery(searchTerm, currentPage);

  const { data: details, isLoading: loadingDetails } = usePokemonDetailsQuery(
    selectedName || ''
  );

  const itemsPerPage = 10;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ page: '1' });
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

  const handleRefreshList = () => {
    queryClient.invalidateQueries({ queryKey: ['pokemonList'] });
    refetchList();
  };

  return (
    <div className="p-4 bg-orange-50 min-h-screen dark:bg-gray-700 transition-all">
      <Flyout />

      <Search onSearch={handleSearch} isDetailsVisible={!!selectedName} />

      <button
        onClick={handleRefreshList}
        className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Refresh list
      </button>

      {isLoading && <div className="text-center mt-4">Loading...</div>}
      {isError && (
        <div className="text-center text-red-500 mt-4">
          {(error as Error).message}
        </div>
      )}
      {isFetching && !isLoading && (
        <div className="text-center mt-4">Updating list...</div>
      )}

      {!isLoading && !isError && (
        <CardList
          items={items as PokemonData[]}
          onItemClick={handleCardClick}
          isDetailsVisible={!!selectedName}
        />
      )}

      <Details
        data={details || null}
        isVisible={!!selectedName}
        onClose={handleCloseDetails}
        loading={loadingDetails}
      />

      {!isLoading && !isError && !searchTerm && (
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
