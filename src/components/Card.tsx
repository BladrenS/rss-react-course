import { Component } from 'react';

interface CardProps {
  name: string;
  description: string;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  abilities: string[];
  height: number;
  weight: number;
  baseXP: number;
}

export default class Card extends Component<CardProps> {
  render() {
    const {
      name,
      description,
      image,
      stats,
      abilities,
      height,
      weight,
      baseXP,
    } = this.props;

    return (
      <div className="border rounded-lg shadow-md p-4 mb-4 flex items-start space-x-4 bg-white">
        <img src={image} alt={name} className="w-24 h-24 object-contain" />
        <div>
          <h2 className="text-xl font-bold capitalize">{name}</h2>
          <p className="text-sm text-gray-600 mb-2">{description}</p>

          <div className="text-sm mb-1">
            <strong>Stats:</strong> HP: {stats.hp}, ATK: {stats.attack}, DEF:{' '}
            {stats.defense}, SPD: {stats.speed}
          </div>

          <div className="text-sm mb-1">
            <strong>Abilities:</strong> {abilities.join(', ')}
          </div>

          <div className="text-sm text-gray-700">
            <strong>Height:</strong> {(height / 10).toFixed(1)} m |{' '}
            <strong>Weight:</strong> {(weight / 10).toFixed(1)} kg |{' '}
            <strong>XP:</strong> {baseXP}
          </div>
        </div>
      </div>
    );
  }
}
