import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';

//Вспомогательный компонент, выбрасывающий ошибку при рендере
const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Something went wrong. Please refresh.')
    ).toBeInTheDocument();
  });
});
