import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card';

const mockProps = {
  name: 'pikachu',
  image: 'https://someurl.com/img.png',
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
  },
  description: 'Electric mouse Pokémon',
  abilities: ['static', 'lightning-rod'],
  height: 40,
  weight: 60,
  baseXP: 112,
};

describe('Card', () => {
  it('renders Card with all props except type', () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    expect(screen.getByText(/HP: 35,/i)).toBeInTheDocument();
    expect(screen.getByText(/ATK: 55,/i)).toBeInTheDocument();
    expect(screen.getByText(/DEF: 40,/i)).toBeInTheDocument();
    expect(screen.getByText(/SPD: 90/i)).toBeInTheDocument();

    const img = screen.getByAltText(/pikachu/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockProps.image);
  });
});
