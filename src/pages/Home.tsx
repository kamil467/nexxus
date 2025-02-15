import React from 'react';
import { ArrowDown, Play } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">
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
              className="rounded-lg w-72 h-72 object-cover absolute top-0 right-0"
            />
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" 
              alt="Nature"
              className="rounded-lg w-64 h-64 object-cover absolute bottom-0 left-0"
            />
          </div>
        </div>
      </div>

      {/* Grid Layout Section */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-12 auto-rows-[100px] gap-0">
          {/* Large Feature Card - 6x4 */}
          <div className="col-span-6 row-span-4 relative group cursor-pointer">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80" 
                  alt="Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-2xl font-medium mb-2">Innovation Hub</h3>
                    <p className="text-gray-200">Exploring the future of technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Video Reel 1 - 3x6 */}
          <div className="col-span-3 row-span-6 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-coding-on-a-laptop-4796-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Development</h3>
                    <p className="text-sm text-gray-200">Behind the scenes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Square Card 1 - 3x3 */}
          <div className="col-span-3 row-span-3 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&q=80" 
                  alt="Mobile First"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Mobile First</h3>
                    <p className="text-sm text-gray-200">Responsive design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Video Reel 2 - 3x6 */}
          <div className="col-span-3 row-span-6 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-keyboard-in-an-office-environment-42657-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Workflow</h3>
                    <p className="text-sm text-gray-200">Daily progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wide Card - 6x3 */}
          <div className="col-span-6 row-span-3 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" 
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">AI Solutions</h3>
                    <p className="text-sm text-gray-200">Smart automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Square Card 2 - 3x3 */}
          <div className="col-span-3 row-span-3 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                  alt="Collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Collaboration</h3>
                    <p className="text-sm text-gray-200">Team work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Video Reel 3 - 3x6 */}
          <div className="col-span-3 row-span-6 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-of-data-12210-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Digital World</h3>
                    <p className="text-sm text-gray-200">Connected future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rectangle Card - 6x3 */}
          <div className="col-span-6 row-span-3 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80" 
                  alt="Clean Code"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Clean Code</h3>
                    <p className="text-sm text-gray-200">Best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Large Feature Card 2 - 6x4 */}
          <div className="col-span-6 row-span-4 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" 
                  alt="Digital Transformation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-5 text-white">
                    <h3 className="text-xl font-medium mb-2">Digital Transformation</h3>
                    <p className="text-gray-200">Revolutionizing business</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical Video Reel 4 - 3x6 */}
          <div className="col-span-3 row-span-6 relative group">
            <div className="absolute inset-0 p-0.5">
              <div className="relative h-full rounded-lg overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-1090-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all">
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-medium mb-1">Innovation</h3>
                    <p className="text-sm text-gray-200">Breaking boundaries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;