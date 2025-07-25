import { FC } from 'react';
import { Card } from './Card';
import { PokemonData } from '../types/types';

interface DetailsProps {
  data: PokemonData | null;
  onClose: () => void;
}

export const Details: FC<DetailsProps> = ({ data, onClose }) => {
  if (!data) return null;
  return (
    <div className="fixed right-0 top-0 w-1/2 h-full bg-white shadow-lg overflow-y-auto p-4 z-20">
      <button onClick={onClose} className="mb-4 text-red-600 underline">
        Close
      </button>
      <Card {...data} />
    </div>
  );
};
