import { FC } from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDetailsVisible: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isDetailsVisible,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? 'default' : 'outline'}
          onClick={() => onPageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <motion.div
      animate={{ marginRight: isDetailsVisible ? '25%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <div className="flex flex-wrap justify-center">{renderPages()}</div>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};
