import { render, screen, fireEvent } from '@testing-library/react';
import { Details } from '../components/Details';
import { PokemonData } from '../types/types';

const mockPokemon: PokemonData = {
  name: 'charizard',
  description: 'Flame Pokémon',
  image: 'charizard.png',
  stats: {
    hp: 78,
    attack: 84,
    defense: 78,
    speed: 100,
  },
  abilities: ['blaze', 'solar-power'],
  height: 17,
  weight: 905,
  baseXP: 240,
};

describe('<Details />', () => {
  it('does not render when isVisible is false', () => {
    render(
      <Details
        data={mockPokemon}
        isVisible={false}
        loading={false}
        onClose={() => {}}
      />
    );
    expect(screen.queryByText(/charizard/i)).not.toBeInTheDocument();
  });

  it('shows loading text when loading is true', () => {
    render(
      <Details
        data={mockPokemon}
        isVisible={true}
        loading={true}
        onClose={() => {}}
      />
    );
    expect(screen.getByText(/loading details/i)).toBeInTheDocument();
  });

  it('renders the detailed card when data is present and not loading', () => {
    render(
      <Details
        data={mockPokemon}
        isVisible={true}
        loading={false}
        onClose={() => {}}
      />
    );
    expect(screen.getByText(/charizard/i)).toBeInTheDocument();
    expect(screen.getByText(/flame pokémon/i)).toBeInTheDocument();
  });

  it('calls onClose when clicking the backdrop', () => {
    const onClose = jest.fn();
    render(
      <Details
        data={mockPokemon}
        isVisible={true}
        loading={false}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking the close button', () => {
    const onClose = jest.fn();
    render(
      <Details
        data={mockPokemon}
        isVisible={true}
        loading={false}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByText(/close/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = jest.fn();
    render(
      <Details
        data={mockPokemon}
        isVisible={true}
        loading={false}
        onClose={onClose}
      />
    );
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
