import { render, screen } from '@testing-library/react';
import { CardList } from '../components/CardList';

const fakeItems = [
  {
    name: 'pikachu',
    description: 'Type: electric',
    image: 'https://example.com/pika.png',
    stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
    abilities: ['static', 'lightning-rod'],
    height: 4,
    weight: 60,
    baseXP: 112,
  },
  {
    name: 'bulbasaur',
    description: 'Type: grass, poison',
    image: 'https://example.com/bulba.png',
    stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
    abilities: ['overgrow', 'chlorophyll'],
    height: 7,
    weight: 69,
    baseXP: 64,
  },
];

describe('CardList component', () => {
  it('renders correct amount of Card components', () => {
    render(<CardList items={fakeItems} />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(fakeItems.length);
  });

  it('displays Pokémon names and descriptions', () => {
    render(<CardList items={fakeItems} />);
    fakeItems.forEach(({ name, description }) => {
      expect(
        screen.getByRole('heading', { name: new RegExp(name, 'i') })
      ).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(description, 'i'))
      ).toBeInTheDocument();
    });
  });

  it('handles undefined or null items prop gracefully', () => {
    render(<CardList items={undefined} />);
    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
  });
});
