import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';


const Navbar = () => {
  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="py-6 px-8 flex justify-between items-center">
      <div className="flex space-x-6">
      <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
        <Link to="/work" onClick={scrollToWork} className="text-gray-600 hover:text-gray-900">Work</Link>
        <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
      </div>
      <Link to="/" className="text-green-600">
        <Leaf size={24} />
      </Link>
      <Link to="/contact" className="bg-[#A9AC87] text-white px-4 py-2 rounded-full hover:bg-[#959872] transition-all duration-300">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;