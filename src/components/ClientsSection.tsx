import React, { useEffect, useRef, useState } from 'react';
import { Users, Building2, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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

const LogoCard = ({ client, className = '' }: { client: typeof clients[0], className?: string }) => (
  <div className={`bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-all duration-300 ${className}`}>
    <img 
      src={client.logo} 
      alt={client.name}
      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
    />
  </div>
);

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slides on mobile
  useEffect(() => {
    if (!isMobile) return;

    const startSlideTimer = () => {
      slideTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => 
          prev < Math.ceil(clients.length / 2) - 1 ? prev + 1 : 0
        );
      }, 5000); // Change slide every 5 seconds
    };

    startSlideTimer();

    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
    };
  }, [isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    // Pause auto-advance while user is interacting
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (!isAnimating) {
      if (isLeftSwipe && currentSlide < Math.ceil(clients.length / 2) - 1) {
        changeSlide(currentSlide + 1);
      }
      if (isRightSwipe && currentSlide > 0) {
        changeSlide(currentSlide - 1);
      }
    }

    setTouchStart(0);
    setTouchEnd(0);

    // Resume auto-advance after interaction
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide(prev => 
        prev < Math.ceil(clients.length / 2) - 1 ? prev + 1 : 0
      );
    }, 5000);
  };

  const changeSlide = (newSlide: number) => {
    setIsAnimating(true);
    setCurrentSlide(newSlide);
    setTimeout(() => setIsAnimating(false), 300); // Match transition duration
  };

  const nextSlide = () => {
    if (!isAnimating && currentSlide < Math.ceil(clients.length / 2) - 1) {
      changeSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (!isAnimating && currentSlide > 0) {
      changeSlide(currentSlide - 1);
    }
  };

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're proud to work with some of the most innovative companies across various industries,
            helping them achieve their digital transformation goals.
          </p>
        </div>

        {/* Desktop Scrolling Logos */}
        <div className="hidden md:block relative mb-20 overflow-hidden">
          <div className="flex animate-scroll">
            <div className="flex space-x-8 items-center">
              {clients.map((client) => (
                <div key={client.id} className="flex-shrink-0 w-[200px] h-20">
                  <LogoCard client={client} />
                </div>
              ))}
            </div>
            <div className="flex space-x-8 items-center">
              {clients.map((client) => (
                <div key={`${client.id}-duplicate`} className="flex-shrink-0 w-[200px] h-20">
                  <LogoCard client={client} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-20">
          <div 
            className="relative overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(clients.length / 2) }).map((_, groupIndex) => (
                <div key={groupIndex} className="flex w-full flex-shrink-0 px-4">
                  {clients.slice(groupIndex * 2, (groupIndex * 2) + 2).map((client) => (
                    <div key={client.id} className="w-1/2 px-2">
                      <LogoCard client={client} className="h-24" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg transform transition-transform active:scale-95 ${
                currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
              }`}
              disabled={currentSlide === 0 || isAnimating}
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button 
              onClick={nextSlide}
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg transform transition-transform active:scale-95 ${
                currentSlide === Math.ceil(clients.length / 2) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
              }`}
              disabled={currentSlide === Math.ceil(clients.length / 2) - 1 || isAnimating}
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: Math.ceil(clients.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isAnimating && changeSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-[#A9AC87] w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  disabled={isAnimating}
                />
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
