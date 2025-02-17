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
    <nav className="py-6 px-8 flex justify-between items-center relative z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden z-50">
        <Menu size={24} className="text-gray-600" />
      </button>
      
      <Link to="/" onClick={handleLinkClick} className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none text-green-600">
        <Leaf size={24} />
      </Link>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Side Menu */}
      <div 
        className={`fixed top-0 left-0 h-screen w-[250px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:shadow-none lg:transform-none lg:transition-none lg:static lg:h-auto lg:w-auto lg:bg-transparent ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6 lg:p-0 lg:flex-row lg:items-center lg:space-x-6">
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <Link to="/" onClick={handleLinkClick} className="text-green-600">
              <Leaf size={24} />
            </Link>
            <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-6">
            <Link to="/" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/work" onClick={scrollToWork} className="text-gray-600 hover:text-gray-900">
              Work
            </Link>
            <Link to="/about" onClick={handleLinkClick} className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="bg-[#A9AC87] text-white px-4 py-2 rounded-full hover:bg-[#959872] transition-all duration-300"
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