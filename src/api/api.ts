import { PokemonData } from '../types/types';
import { transformPokemon } from '../utils/mapPokemon';

export const fetchPokemonData = async (
  searchTerm = ''
): Promise<PokemonData[]> => {
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
        return transformPokemon(details);
      })
    );

    return detailed;
  } else {
    const res = await fetch(`${baseUrl}/${searchTerm.toLowerCase()}`);
    if (!res.ok) throw new Error(`Pokémon "${searchTerm}" not found.`);
    const details = await res.json();
    return [transformPokemon(details)];
  }
};
