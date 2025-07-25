import { FC } from 'react';
import { Card } from './Card';
import { PokemonData } from '../types/types';

interface CardListProps {
  items: PokemonData[];
  //onItemClick: (name: string) => void;
}

export const CardList: FC<CardListProps> = ({ items /*, onItemClick */ }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No Pokémon found.</div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {items.map((pokemon) => (
        <div
          key={pokemon.name}
          //onClick={() => onItemClick(pokemon.name)}
          className="cursor-pointer"
        >
          <Card {...pokemon} />
        </div>
      ))}
    </div>
  );
};
