import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = () => (
  <div className="p-4 border-b flex justify-between">
    <Link to="/?page=1" className="text-2xl font-bold">
      Pokemon Search
    </Link>
    <ThemeSwitcher></ThemeSwitcher>
    <Link to="/about" className="text-blue-500 hover:underline ">
      About
    </Link>
  </div>
);
