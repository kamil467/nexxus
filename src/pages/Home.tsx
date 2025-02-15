import React from 'react';
import { ArrowDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-8 pt-20 pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-light leading-tight">
            Crafting the future,<br />One pixel at a time
          </h1>
          <p className="text-gray-600 max-w-md">
            Passionate about creating meaningful digital experiences that inspire and engage. Bringing ideas to life through innovative design and development.
          </p>
          <ArrowDown size={32} className="text-gray-400 animate-bounce" />
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
            alt="Building"
            className="rounded-full w-72 h-72 object-cover absolute top-0 right-0"
          />
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" 
            alt="Nature"
            className="rounded-full w-64 h-64 object-cover absolute bottom-0 left-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;