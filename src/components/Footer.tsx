import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  // Helper function to check if link is active
  const isActiveLink = (path: string) => {
    // Home link is only active on exact home page
    if (path === '/') {
      return location.pathname === '/';
    }
    // Work link is only active when explicitly on /work route
    if (path === '/work') {
      return location.pathname === '/work';
    }
    // Other pages use exact match
    return location.pathname === path;
  };

  // Helper function to get link classes
  const getLinkClasses = (path: string) => {
    const baseClasses = "transition-colors";
    const activeClasses = "text-[#A9AC87] font-semibold";
    const inactiveClasses = "text-gray-300 hover:text-[#A9AC87]";

    return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <footer className="py-6 bg-gray-800 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <Leaf size={24} className="text-[#A9AC87]" />
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className={getLinkClasses('/')}>Home</Link>
            <Link to="/work" className={getLinkClasses('/work')}>Work</Link>
            <Link to="/services" className={getLinkClasses('/services')}>Services</Link>
            <Link to="/about" className={getLinkClasses('/about')}>About Us</Link>
            <Link to="/careers" className={getLinkClasses('/careers')}>Careers</Link>
            <Link to="/contact" className={getLinkClasses('/contact')}>Contact</Link>
          </div>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Nexxus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;