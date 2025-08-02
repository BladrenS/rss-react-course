import { FC } from 'react';
import { PokemonData } from '../types/types';

export const DetailedCard: FC<PokemonData> = ({
  name,
  description,
  image,
  stats,
  abilities,
  height,
  weight,
  baseXP,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-xl w-full max-w-3xl mx-auto space-y-4 dark:text-white dark:bg-gray-900 transition-all">
      <img src={image} alt={name} className="w-30 h-30 object-contain" />
      <div>
        <h2 className="text-xl font-bold capitalize">{name}</h2>
        <p className="text-sm text-gray-600 mb-2 dark:text-gray-300">
          {description}
        </p>
        <div className="text-sm mb-1">
          <strong>Stats:</strong> HP: {stats.hp}, ATK: {stats.attack}, DEF:{' '}
          {stats.defense}, SPD: {stats.speed}
        </div>
        <div className="text-sm mb-1">
          <strong>Abilities:</strong> {abilities.join(', ')}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Height:</strong> {(height / 10).toFixed(1)} m |{' '}
          <strong>Weight:</strong> {(weight / 10).toFixed(1)} kg |{' '}
          <strong>XP:</strong> {baseXP}
        </div>
      </div>
    </div>
  );
};
