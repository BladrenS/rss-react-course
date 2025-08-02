import { FC, useState, useEffect } from 'react';
import { useLocalStorage } from '../api/useLocalStorage';
import { motion } from 'framer-motion';

interface Props {
  onSearch: (term: string) => void;
  isDetailsVisible: boolean;
}

export const Search: FC<Props> = ({ onSearch, isDetailsVisible }) => {
  const [inputValue, setInputValue] = useState('');
  const [storedTerm, setStoredTerm] = useLocalStorage('searchTerm', '');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setInputValue(storedTerm);
  }, [storedTerm]);

  const handleSearch = () => {
    if (inputValue === '') {
      localStorage.removeItem('searchTerm');
    }
    const trimmed = inputValue.trim();
    onSearch(trimmed);
    if (trimmed) setStoredTerm(trimmed);
    setShowDropdown(false);
  };

  return (
    <motion.div
      animate={{ marginRight: isDetailsVisible ? '25%' : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full max-w-xl mx-auto mb-8 mt-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            placeholder="Search Pokémon"
            className="w-full px-4 py-2 border rounded shadow dark:border-white dark:placeholder-white transition-all"
          />
          <button
            onClick={handleSearch}
            className="bg-neutral-900 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-neutral-700 cursor-pointer transition-all"
          >
            Search
          </button>
        </div>
        {showDropdown && storedTerm && (
          <div
            className="absolute top-full left-0 w-[489px] bg-white border border-t-0 rounded-b shadow z-10 cursor-pointer dark:bg-gray-700 dark:-text-white transition-all"
            onMouseDown={() => setInputValue(storedTerm)}
          >
            <div className="px-4 py-2 hover:bg-gray-100 dark:text-white transition-all">
              {storedTerm}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
