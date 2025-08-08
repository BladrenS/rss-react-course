import { PokemonAPIResponse, PokemonData } from '../types/types';

export const transformPokemon = (data: PokemonAPIResponse): PokemonData => {
  const hp = data.stats.find((s) => s.stat.name === 'hp')?.base_stat || 0;
  const attack =
    data.stats.find((s) => s.stat.name === 'attack')?.base_stat || 0;
  const defense =
    data.stats.find((s) => s.stat.name === 'defense')?.base_stat || 0;
  const speed = data.stats.find((s) => s.stat.name === 'speed')?.base_stat || 0;

  const abilities = data.abilities.map((a) => a.ability.name);
  const types = data.types.map((t) => t.type.name).join(', ');

  return {
    name: data.name,
    description: `Type: ${types}`,
    image: data.sprites.front_default || '',
    stats: { hp, attack, defense, speed },
    abilities,
    height: data.height,
    weight: data.weight,
    baseXP: data.base_experience,
  };
};
