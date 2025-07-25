import { Link } from 'react-router-dom';

export const Header = () => (
  <div className="p-4 border-b flex justify-between">
    <Link to="/" className="text-2xl font-bold">
      Pokemon Search
    </Link>
    <Link to="/about" className="text-blue-500 hover:underline ">
      About
    </Link>
  </div>
);
