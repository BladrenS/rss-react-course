import { FC, useState, useEffect } from 'react';
import { useLocalStorage } from '../api/useLocalStorage';

interface Props {
  onSearch: (term: string) => void;
}

export const Search: FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [storedTerm, setStoredTerm] = useLocalStorage('searchTerm', '');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setInputValue(storedTerm);
  }, [storedTerm]);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    onSearch(trimmed);
    if (trimmed) setStoredTerm(trimmed);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 mt-6">
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          placeholder="Search Pokémon"
          className="w-full px-4 py-2 border rounded shadow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {showDropdown && storedTerm && (
        <div
          className="absolute top-full left-0 w-[489px] bg-white border border-t-0 rounded-b shadow z-10 cursor-pointer"
          onMouseDown={() => setInputValue(storedTerm)}
        >
          <div className="px-4 py-2 hover:bg-gray-100">{storedTerm}</div>
        </div>
      )}
    </div>
  );
};
