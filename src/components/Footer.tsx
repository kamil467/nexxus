import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-800 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <Leaf size={24} className="text-green-600" />
          <div className="flex space-x-6">
            <Link to="/" className="text-white-600 hover:text-green-900">Home</Link>
            <Link to="/work" className="text-white-600 hover:text-green-900">Work</Link>
            <Link to="/contact" className="text-white-600 hover:text-green-900">Contact</Link>
            <Link to="/about" className="text-white-600 hover:text-green-900">About Us</Link>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nexxus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;