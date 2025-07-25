import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  it('renders default button', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass('bg-blue-500 text-white');
  });

  it('renders outline button', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button', { name: /outline/i });
    expect(btn).toHaveClass('border border-gray-300 text-black');
  });

  it('adds additional className', () => {
    render(<Button className="my-custom-class">With Class</Button>);
    const btn = screen.getByRole('button', { name: /with class/i });
    expect(btn).toHaveClass('my-custom-class');
  });

  it('fires onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Fire</Button>);
    fireEvent.click(screen.getByText('Fire'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when prop set', () => {
    render(<Button disabled>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
  });
});
