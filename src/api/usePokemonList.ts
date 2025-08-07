import { useQuery } from '@tanstack/react-query';
import { fetchPokemonData } from './api';

export const usePokemonListQuery = (searchTerm: string) => {
  return useQuery({
    queryKey: ['pokemonList', searchTerm],
    queryFn: () => fetchPokemonData(searchTerm),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
