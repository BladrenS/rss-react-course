import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = () => (
  <div className="p-4 border-b flex justify-between dark:bg-blue-950 transition-all">
    <Link
      to="/?page=1"
      className="text-2xl font-bold dark:text-white transition-all"
    >
      Pokemon Search
    </Link>
    <ThemeSwitcher></ThemeSwitcher>
    <Link
      to="/about"
      className="text-blue-500 hover:underline dark:text-white transition-all"
    >
      About
    </Link>
  </div>
);
