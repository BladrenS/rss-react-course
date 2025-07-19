import { render, screen } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

class Bomb extends React.Component {
  componentDidMount() {
    throw new Error('Boom!');
  }
  render() {
    return null;
  }
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

test('renders fallback UI on error', () => {
  render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  );
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
