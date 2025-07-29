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

  return (
    <motion.div
      animate={{ marginRight: isDetailsVisible ? '25%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <div className="flex flex-wrap justify-center">Page {currentPage}</div>
        <Button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </motion.div>
  );
};
