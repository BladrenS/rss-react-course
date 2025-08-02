import { useTheme } from '../context/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="dark:text-white cursor-pointer">
      {theme === 'light' ? 'Dark' : 'Light'} theme
    </button>
  );
};
