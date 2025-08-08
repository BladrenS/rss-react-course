import { PokemonData, PokemonAPIResponse } from '../types/types';

const API_BASE = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(
  page: number,
  searchTerm: string
): Promise<PokemonData[]> {
  const limit = 10;
  const offset = (page - 1) * limit;
  const res = await fetch(
    `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) throw new Error('Failed to fetch Pokémon list');

  const data = (await res.json()) as {
    results: { name: string; url: string }[];
  };

  const detailedData = await Promise.all(
    data.results
      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((p) => fetchPokemonByName(p.name))
  );

  return detailedData;
}

export async function fetchPokemonByName(name: string): Promise<PokemonData> {
  const res = await fetch(`${API_BASE}/pokemon/${name}`);

  if (!res.ok) throw new Error(`Failed to fetch Pokémon ${name}`);

  const data = (await res.json()) as PokemonAPIResponse;

  return {
    name: data.name,
    description: '',
    image: data.sprites.front_default,
    stats: {
      hp: getStat(data, 'hp'),
      attack: getStat(data, 'attack'),
      defense: getStat(data, 'defense'),
      speed: getStat(data, 'speed'),
    },
    abilities: data.abilities.map((a) => a.ability.name),
    height: data.height,
    weight: data.weight,
    baseXP: data.base_experience,
  };
}

function getStat(data: PokemonAPIResponse, statName: string): number {
  const stat = data.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}
