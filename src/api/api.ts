import { PokemonData } from '../types/types';
import { transformPokemon } from '../utils/mapPokemon';

export const fetchPokemonData = async (
  searchTerm = '',
  page = 1
): Promise<PokemonData[]> => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  if (!searchTerm) {
    const res = await fetch(
      `${baseUrl}?limit=${itemsPerPage}&offset=${offset}`
    );
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();
    return fetchPage(data.results);
  } else {
    const res = await fetch(`${baseUrl}/${searchTerm.toLowerCase()}`);
    if (!res.ok) throw new Error(`Pokémon ${searchTerm} not found.`);
    const details = await res.json();
    return [transformPokemon(details)];
  }
};

const fetchPage = async (data: { name: string; url: string }[]) => {
  const detailed = await Promise.all(
    data.map(async (item: { name: string; url: string }) => {
      const resDetails = await fetch(item.url);
      if (!resDetails.ok)
        throw new Error(`Detail API Error: ${resDetails.status}`);
      const details = await resDetails.json();
      return transformPokemon(details);
    })
  );
  return detailed;
};
