import { FC } from 'react';
import { CardProps } from '../types/types';

export const Card: FC<CardProps> = ({ name, image, stats }) => (
  <div className="border rounded-lg shadow-md p-4 mb-4 flex items-start space-x-4 bg-white w-3xs text-center">
    <img src={image} alt={name} className="w-24 h-24 object-contain" />
    <div>
      <h2 className="text-xl font-bold capitalize">{name}</h2>
      <div className="text-sm mb-1">
        <strong className="block">Stats:</strong>{' '}
        <div>
          <span className="text-green-500">HP: {stats.hp},</span>{' '}
          <span className="text-red-500">ATK: {stats.attack},</span>
        </div>
        <div>
          <span className="text-brown-500">DEF: {stats.defense},</span>{' '}
          <span className="text-yellow-500">SPD: {stats.speed}</span>
        </div>
      </div>
    </div>
  </div>
);
