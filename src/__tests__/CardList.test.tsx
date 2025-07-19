import { render, screen } from '@testing-library/react';
import { CardList } from '../components/CardList';
import { PokemonData } from '../types/types';

jest.mock('../components/Card', () => ({
  Card: ({ name, description }: { name: string; description: string }) => (
    <div data-testid="mock-card">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  ),
}));

const mockItems: PokemonData[] = [
  {
    name: 'pikachu',
    description: 'Type: electric',
    image: 'pikachu.png',
    stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
    abilities: ['static'],
    height: 4,
    weight: 60,
    baseXP: 112,
  },
  {
    name: 'bulbasaur',
    description: 'Type: grass, poison',
    image: 'bulbasaur.png',
    stats: { hp: 45, attack: 49, defense: 49, speed: 45 },
    abilities: ['overgrow'],
    height: 7,
    weight: 69,
    baseXP: 64,
  },
];

describe('CardList component', () => {
  // --- Rendering Tests ---

  it('renders correct number of items when data is provided', () => {
    render(<CardList items={mockItems} />);
    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(2);
  });

  it('displays "no results" message when data array is empty', () => {
    render(<CardList items={[]} />);
    expect(screen.getByText(/No Pokémon found/i)).toBeInTheDocument();
  });

  it('displays "no results" message when items is undefined', () => {
    render(<CardList />);
    expect(screen.getByText(/No Pokémon found/i)).toBeInTheDocument();
  });

  // --- Data Display Tests ---

  it('correctly displays item names and descriptions', () => {
    render(<CardList items={mockItems} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: electric/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/Type: grass, poison/i)).toBeInTheDocument();
  });

  it('handles missing or undefined item data gracefully', () => {
    const incompleteData = [
      {
        name: 'missingno',
        description: '',
        image: '',
        stats: { hp: 0, attack: 0, defense: 0, speed: 0 },
        abilities: [],
        height: 0,
        weight: 0,
        baseXP: 0,
      },
    ];
    render(<CardList items={incompleteData} />);
    expect(screen.getByText(/missingno/i)).toBeInTheDocument();
  });

  // --- Error Handling Tests (Handled at Main/ErrorBoundary level) ---

  it('does not throw when items are undefined (error-safe)', () => {
    expect(() => render(<CardList />)).not.toThrow();
  });
});
