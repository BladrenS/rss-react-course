import { useQuery } from '@tanstack/react-query';
import { fetchPokemonByName } from './api';
import { PokemonData } from '../types/types';

export function usePokemonDetailsQuery(name: string) {
  return useQuery<PokemonData, Error>({
    queryKey: ['pokemonDetails', name],
    queryFn: () => fetchPokemonByName(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 5,
  });
}
