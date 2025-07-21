import { FC } from 'react';
import { Card } from './Card';
import { PokemonData } from '../types/types';

interface CardListProps {
  items?: PokemonData[];
}

export const CardList: FC<CardListProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No Pokémon found.</div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {items.map((pokemon) => (
        <Card key={pokemon.name} {...pokemon} />
      ))}
    </div>
  );
};
