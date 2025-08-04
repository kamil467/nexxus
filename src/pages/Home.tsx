import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDown, Users, Building2, Award, Star } from 'lucide-react';
import Test from './Test';
import Mobile from './Mobile';
import { supabase, WorkItem } from '../api/supabase';
import ClientsSection from '../components/ClientsSection';

const Home = () => {
  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    workSection?.scrollIntoView({ behavior: 'smooth' });
  };
  const [isMobile, setIsMobile] = useState<boolean>(false);
    
  // Optimized mobile detection with debouncing
    const checkMobile = useCallback(() => {
      setIsMobile(window.innerWidth < 768);
    }, []);



    
    useEffect(() => {
  checkMobile(); // Initial check on mount

  // Optional: add resize listener with debounce/throttle for live update
  let timeoutId: any;

  const handleResize = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      checkMobile();
    }, 150);
  };

  window.addEventListener('resize', handleResize, { passive: true });

  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(timeoutId);
  };
}, [checkMobile]);

  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
    // Fetch work items from Supabase
    useEffect(() => {
      const fetchWorkItems = async () => {
        //setLoading(true);
        try {
          const { data, error } = await supabase
            .from('work_items')
            .select('*');
            
          if (error) {
            console.error('Error fetching work items:', error);
          } else {
            console.log('Fetched work items:', data);
            setWorkItems(data || []);
          }
        } catch (error) {
          console.error('Error fetching work items:', error);
        } finally {
         // setLoading(false);
        }
      };
      
      fetchWorkItems();
    }, []);
  

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-screen pt-24 lg:pt-0 lg:flex lg:items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images Section - Shown first on mobile */}
            <div className="relative h-[300px] lg:h-[450px] order-first lg:order-last mt-4 lg:mt-0">
              <div className="absolute top-0 right-0 w-64 lg:w-80 h-64 lg:h-80 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:shadow-blue-100/50">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" 
                  alt="Building"
                  className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-56 lg:w-72 h-56 lg:h-72 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 hover:shadow-blue-100/50">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" 
                  alt="Nature"
                  className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 lg:w-48 h-32 lg:h-48 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-24 lg:w-32 h-24 lg:h-32 rounded-full bg-blue-50 opacity-30 blur-2xl"></div>
            </div>

            {/* Content Section */}
            <div className="space-y-8 relative order-last lg:order-first">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
              <h1 className="text-4xl lg:text-6xl font-light leading-tight relative z-10">
                Crafting the future,<br />One pixel at a time
              </h1>
              <p className="text-gray-600 max-w-md text-base lg:text-lg">
                Passionate about creating meaningful digital experiences that inspire and engage. Bringing ideas to life through innovative design and development.
              </p>
              <button 
                onClick={scrollToWork}
                className="flex items-center space-x-3 bg-[#A9AC87] text-white px-6 py-3 rounded-full hover:bg-[#959872] transition-all duration-300 hover:translate-y-1 group hover:shadow-lg hover:shadow-[#A9AC87]/20"
              >
                <span className="text-base lg:text-lg font-medium">View Our Work</span>
                <ArrowDown 
                  size={28} 
                  className="animate-bounce group-hover:animate-none group-hover:translate-y-1 transition-all duration-300 group-hover:scale-110" 
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen py-20">

          {isMobile ? (
          
            <Mobile videos={workItems}/>
          ) : (
        <Test />)}
        
      </section>
       <ClientsSection className="mt-20" />
    </div>
  );
}

export default Home;