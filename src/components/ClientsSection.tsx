import React, { useEffect, useRef, useState } from 'react';
import { Users, Building2, Award, Star } from 'lucide-react';

// Client logos data with real brand logos
const clients = [
  { 
    id: 1, 
    name: 'Google', 
    logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg'
  },
  { 
    id: 2, 
    name: 'Meta', 
    logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg'
  },
  { 
    id: 3, 
    name: 'Microsoft', 
    logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg'
  },
  { 
    id: 4, 
    name: 'Apple', 
    logo: 'https://www.vectorlogo.zone/logos/apple/apple-ar21.svg'
  },
  { 
    id: 5, 
    name: 'Amazon', 
    logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg'
  },
  { 
    id: 6, 
    name: 'IBM', 
    logo: 'https://www.vectorlogo.zone/logos/ibm/ibm-ar21.svg'
  },
  { 
    id: 7, 
    name: 'Intel', 
    logo: 'https://www.vectorlogo.zone/logos/intel/intel-ar21.svg'
  },
  { 
    id: 8, 
    name: 'Tata', 
    logo: 'https://www.vectorlogo.zone/logos/tata/tata-ar21.svg'
  }
];

// Statistics data
const stats = [
  { id: 1, title: 'Happy Clients', value: 200, suffix: '+', icon: Users },
  { id: 2, title: 'Projects Completed', value: 500, suffix: '+', icon: Building2 },
  { id: 3, title: 'Awards Won', value: 25, suffix: '+', icon: Award },
  { id: 4, title: 'Years Experience', value: 10, suffix: '+', icon: Star },
];

interface ClientsSectionProps {
  className?: string;
}

const CountUpAnimation = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // Update every 16ms (60fps)
    let timeoutId: NodeJS.Timeout;

    const updateCount = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        timeoutId = setTimeout(updateCount, 16);
      } else {
        setCount(end);
      }
    };

    updateCount();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [end, isVisible]);

  return <div ref={countRef}>{count}{suffix}</div>;
};

const ClientsSection: React.FC<ClientsSectionProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to work with some of the most innovative companies across various industries,
            helping them achieve their digital transformation goals.
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative mb-20 overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            <div className="flex space-x-8 items-center">
              {clients.map((client) => (
                <div 
                  key={client.id} 
                  className="flex-shrink-0 w-[200px] h-20 bg-gray-50 rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless scrolling */}
            <div className="flex space-x-8 items-center">
              {clients.map((client) => (
                <div 
                  key={`${client.id}-duplicate`} 
                  className="flex-shrink-0 w-[200px] h-20 bg-gray-50 rounded-lg flex items-center justify-center p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 text-[#A9AC87] bg-[#A9AC87]/10 rounded-full">
                  <Icon size={24} />
                </div>
                <h3 className="text-3xl font-light mb-2 text-[#A9AC87]">
                  <CountUpAnimation end={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
