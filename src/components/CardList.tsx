import { FC } from 'react';
import { Card } from './Card';
import { PokemonData } from '../types/types';
import { motion } from 'framer-motion';

interface CardListProps {
  items: PokemonData[];
  onItemClick: (name: string) => void;
  isDetailsVisible: boolean;
}

export const CardList: FC<CardListProps> = ({
  items,
  onItemClick,
  isDetailsVisible,
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No Pokémon found.</div>
    );
  }

  return (
    <motion.div
      animate={{ marginRight: isDetailsVisible ? '25%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 max-w-3xl mx-auto">
        {items.map((pokemon) => (
          <div
            key={pokemon.name}
            onClick={() => onItemClick(pokemon.name)}
            className="cursor-pointer"
          >
            <Card {...pokemon} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
