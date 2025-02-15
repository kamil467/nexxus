import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-8">
      <div className="flex flex-col items-center space-y-8">
        <Leaf size={24} className="text-green-600" />
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/work" className="text-gray-600 hover:text-gray-900">Work</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
        </div>
        <p className="text-gray-500 text-sm">© 2024 Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;