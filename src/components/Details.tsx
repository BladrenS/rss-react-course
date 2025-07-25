import { FC, useEffect } from 'react';
import { Card } from './Card';
import { PokemonData } from '../types/types';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailsProps {
  data: PokemonData | null;
  isVisible: boolean;
  loading: boolean;
  onClose: () => void;
}

export const Details: FC<DetailsProps> = ({
  data,
  isVisible,
  onClose,
  loading,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-10"
          />

          <motion.div
            key="details-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 w-sm h-full bg-white shadow-lg overflow-y-auto p-4 z-20"
          >
            <button
              onClick={onClose}
              className="mb-4 text-red-600 underline cursor-pointer"
            >
              Close
            </button>
            {loading ? (
              <div className="text-center text-gray-600">
                Loading details...
              </div>
            ) : (
              data && <Card {...data} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
