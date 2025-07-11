import { Component } from 'react';
import Card from './Card';

interface PokemonData {
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

interface CardListProps {
  items: PokemonData[];
}

export default class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    return (
      <div className="p-4 max-w-3xl mx-auto">
        {items.map((item) => (
          <Card
            key={item.name}
            name={item.name}
            description={item.description}
            image={item.image}
            stats={item.stats}
            abilities={item.abilities}
            height={item.height}
            weight={item.weight}
            baseXP={item.baseXP}
          />
        ))}
      </div>
    );
  }
}
