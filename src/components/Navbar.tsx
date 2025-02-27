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
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className="py-6 px-8 flex justify-between items-center relative border-b border-gray-100">
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

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              onClick={handleLinkClick} 
              className="text-gray-600 hover:text-[#A9AC87] transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/work" 
              onClick={scrollToWork} 
              className="text-gray-600 hover:text-[#A9AC87] transition-colors"
            >
              Work
            </Link>
            <Link 
              to="/about" 
              onClick={handleLinkClick} 
              className="text-gray-600 hover:text-[#A9AC87] transition-colors"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              onClick={handleLinkClick}
              className="px-4 py-2 bg-[#A9AC87] text-white rounded-full hover:bg-[#96997A] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[82px]"></div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="fixed top-[82px] left-0 h-[calc(100vh-82px)] w-[280px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 lg:hidden">
            <div className="flex flex-col p-6 space-y-6">
              <Link 
                to="/" 
                onClick={handleLinkClick} 
                className="text-lg text-gray-800 hover:text-[#A9AC87] transition-colors font-light"
              >
                Home
              </Link>
              <Link 
                to="/work" 
                onClick={scrollToWork} 
                className="text-lg text-gray-800 hover:text-[#A9AC87] transition-colors font-light"
              >
                Work
              </Link>
              <Link 
                to="/about" 
                onClick={handleLinkClick} 
                className="text-lg text-gray-800 hover:text-[#A9AC87] transition-colors font-light"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                onClick={handleLinkClick}
                className="inline-block px-8 py-3 mt-4 bg-[#A9AC87] text-white rounded-full text-lg font-light hover:bg-[#96997A] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;