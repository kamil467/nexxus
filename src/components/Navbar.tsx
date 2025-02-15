import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="py-6 px-8 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link to="/work" className="text-gray-600 hover:text-gray-900">Work</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
      </div>
      <Link to="/" className="text-green-600">
        <Leaf size={24} />
      </Link>
      <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
    </nav>
  );
}

export default Navbar;