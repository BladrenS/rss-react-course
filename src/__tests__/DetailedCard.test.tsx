import { render, screen } from '@testing-library/react';
import { DetailedCard } from '../components/DetailedCard';
import '@testing-library/jest-dom';
import { PokemonData } from '../types/types';

const mockPokemon: PokemonData = {
  name: 'pikachu',
  description: 'Electric mouse Pokémon.',
  image: 'https://example.com/pikachu.png',
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
  },
  abilities: ['static', 'lightning-rod'],
  height: 40,
  weight: 60,
  baseXP: 112,
};

describe('<DetailedCard />', () => {
  it('renders the Pokémon name and image', () => {
    render(<DetailedCard {...mockPokemon} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText(/pikachu/i)).toHaveAttribute(
      'src',
      mockPokemon.image
    );
  });

  it('displays description and stats', () => {
    render(<DetailedCard {...mockPokemon} />);
    expect(screen.getByText(/electric mouse/i)).toBeInTheDocument();
    expect(
      screen.getByText(/HP: 35, ATK: 55, DEF: 40, SPD: 90/i)
    ).toBeInTheDocument();
  });
});
