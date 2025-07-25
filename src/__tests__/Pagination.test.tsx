import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../components/Pagination';
import '@testing-library/jest-dom';

describe('<Pagination />', () => {
  const setup = (props = {}) => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
        isDetailsVisible={false}
        {...props}
      />
    );
    return { onPageChange };
  };

  it('renders Previous and Next buttons', () => {
    setup();
    expect(screen.getByText(/Previous/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    setup({ currentPage: 1 });
    expect(screen.getByText(/Previous/i)).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    setup({ currentPage: 5 });
    expect(screen.getByText(/Next/i)).toBeDisabled();
  });

  it('calls onPageChange with previous page when clicking Previous', () => {
    const { onPageChange } = setup({ currentPage: 3 });
    fireEvent.click(screen.getByText(/Previous/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when clicking Next', () => {
    const { onPageChange } = setup({ currentPage: 3 });
    fireEvent.click(screen.getByText(/Next/i));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('renders all page buttons and highlights current page', () => {
    setup({ currentPage: 3, totalPages: 5 });
    const pageButtons = screen.getAllByRole('button', { name: /^\d+$/ });

    expect(pageButtons).toHaveLength(5);
    expect(pageButtons[2]).toHaveClass('bg-blue-500');
  });

  it('calls onPageChange when clicking a page number', () => {
    const { onPageChange } = setup({ currentPage: 2 });
    fireEvent.click(screen.getByText('4'));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
