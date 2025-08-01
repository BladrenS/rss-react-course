import { FC } from 'react';
import { Card } from './Card';
import { PokemonData } from '../types/types';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 10,
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -50,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: itemTransition,
    },
  };

  return (
    <motion.div
      animate={{ marginRight: isDetailsVisible ? '25%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="p-4 max-w-2xl mx-auto flex flex-wrap justify-around h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {items.map((pokemon) => (
            <motion.div
              key={pokemon.name}
              onClick={() => onItemClick(pokemon.name)}
              className="cursor-pointer m-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, x: -50 }}
              layout
            >
              <Card {...pokemon} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
