import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="py-6 px-8 flex justify-between items-center relative">
      {/* Hamburger Menu */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden relative z-50 p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        {isOpen ? (
          <X size={24} className="text-gray-600" />
        ) : (
          <Menu size={24} className="text-gray-600" />
        )}
      </button>
      
      {/* Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none">
        <Link 
          to="/" 
          onClick={handleLinkClick} 
          className="text-[#A9AC87] relative z-50"
        >
          <Leaf size={28} />
        </Link>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:shadow-none lg:transform-none lg:transition-none lg:static lg:h-auto lg:w-auto lg:bg-transparent z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full lg:p-0 lg:flex-row lg:items-center lg:space-x-6">
          <div className="h-[82px] lg:hidden"></div>
          <div className="flex flex-col p-6 space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-6 lg:p-0">
            <Link 
              to="/" 
              onClick={handleLinkClick} 
              className="text-lg text-gray-800 hover:text-[#A9AC87] transition-colors font-light lg:text-base lg:text-gray-600"
            >
              Home
            </Link>
            <Link 
              to="/work" 
              onClick={scrollToWork} 
              className="text-lg text-gray-800 hover:text-[#A9AC87] transition-colors font-light lg:text-base lg:text-gray-600"
            >
              Work
            </Link>
            <Link 
              to="/about" 
              onClick={handleLinkClick} 
              className="text-lg text-gray-800 hover:text-[#A9AC87] transition-colors font-light lg:text-base lg:text-gray-600"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="inline-block px-8 py-3 mt-4 lg:mt-0 bg-[#A9AC87] text-white rounded-full text-lg font-light hover:bg-[#96997A] transition-colors lg:px-4 lg:py-2 lg:text-base"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;