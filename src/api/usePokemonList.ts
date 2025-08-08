import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from './api';
import { PokemonData } from '../types/types';

export function usePokemonListQuery(searchTerm: string, page: number) {
  return useQuery<PokemonData[], Error>({
    queryKey: ['pokemonList', searchTerm, page],
    queryFn: () => fetchPokemonList(page, searchTerm),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
