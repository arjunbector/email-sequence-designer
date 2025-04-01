
import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-gray-800">Email Sequence Designer</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/documentation"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Documentation
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
