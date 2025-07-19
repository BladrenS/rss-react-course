import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card';

const mockProps = {
  name: 'pikachu',
  description: 'Type: electric',
  image: 'https://someurl.com/img.png',
  stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
  abilities: ['static', 'lightning-rod'],
  height: 4,
  weight: 60,
  baseXP: 112,
};

test('renders Card with all props', () => {
  render(<Card {...mockProps} />);
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/Type: electric/i)).toBeInTheDocument();
  expect(
    screen.getByText(/HP: 35, ATK: 55, DEF: 40, SPD: 90/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/static, lightning-rod/i)).toBeInTheDocument();
});
