import { useEffect, useState, useRef } from 'react';
import './MasanoryGrid.css';
import ClientsSection from '../components/ClientsSection';
import { supabase } from '../api/supabase';
import { WorkItem } from '../api/supabase';

const MasonryGrid = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});
  const [currentMobileIndex, setCurrentMobileIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const slideTimerRef = useRef<NodeJS.Timeout>();

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile || workItems.length === 0) return;
    
    const startSlideTimer = () => {
      // Only start timer after first item is loaded
      if (loadedItems[workItems[0]?.id]) {
        slideTimerRef.current = setInterval(() => {
          setCurrentMobileIndex(prev => prev === workItems.length - 1 ? 0 : prev + 1);
        }, 4000);
      }
    };
    
    startSlideTimer();
    
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isMobile, workItems.length, loadedItems]);

  // Update video autoplay when slide changes (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    // Force re-render of iframes when slide changes to update autoplay parameter
    // This ensures the current video starts playing when it becomes active
  }, [currentMobileIndex, isMobile]);

  // Fetch work items from Supabase
  useEffect(() => {
    const fetchWorkItems = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };
    
    fetchWorkItems();
  }, []);

  const handleItemLoad = (id: number) => {
    setLoadedItems(prev => ({ ...prev, [id]: true }));
  };

  // Touch handlers for manual control
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(0);
    // Pause auto-advance when user touches
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
    
    if (isLeftSwipe && currentMobileIndex < workItems.length - 1) {
      changeSlide(currentMobileIndex + 1);
    }
    if (isRightSwipe && currentMobileIndex > 0) {
      changeSlide(currentMobileIndex - 1);
    }
    
    // Resume auto-advance after user interaction
    setTimeout(() => {
      if (isMobile && workItems.length > 0 && loadedItems[workItems[0]?.id]) {
        slideTimerRef.current = setInterval(() => {
          setCurrentMobileIndex(prev => 
            prev === workItems.length - 1 ? 0 : prev + 1
          );
        }, 4000);
      }
    }, 1000);
  };

  const changeSlide = (newSlide: number) => {
    if (isAnimating || newSlide < 0 || newSlide >= workItems.length) return;
    setIsAnimating(true);
    setCurrentMobileIndex(newSlide);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const ArrowIcon = () => (
    <svg 
      className="arrow-icon" 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading work items...</p>
        </div>
      ) : workItems.length === 0 ? (
        <div className="no-items-container">
          <p>No work items found. Please check your Supabase connection.</p>
        </div>
      ) : (
        <>
          {isMobile ? (
            <div className="mobile-single-view">
              <div 
                className="mobile-carousel-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="mobile-carousel-track"
                  style={{ transform: `translateX(-${currentMobileIndex * 100}%)` }}
                >
                  {workItems.map((item) => (
                    <div
                      key={item.id}
                      className="mobile-carousel-slide"
                    >
                      <div
                        className="masonry-item mobile-item"
                        style={{
                          background: loadedItems[item.id] ? 'transparent' : '#f0f0f0',
                        }}
                      >
                        {!loadedItems[item.id] && (
                          <div className="loading-skeleton">
                            <div className="skeleton-animation"></div>
                          </div>
                        )}
                        
                        {item.type === 'vimeo' ? (
                          <div className="video-container" style={{ position: 'relative' }}>
                            {!loadedItems[item.id] && (
                              <div className="video-thumbnail-overlay">
                                <img
                                  src={`https://vumbnail.com/${item.videoId}.jpg`}
                                  alt={item.title}
                                  className="video-thumbnail"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                  }}
                                />
                                <div className="loading-spinner" style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  color: 'white',
                                  fontSize: '20px'
                                }}>Loading...</div>
                              </div>
                            )}
                            <iframe
                              src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}&autoplay=${workItems.findIndex(w => w.id === item.id) === 0 || workItems.findIndex(w => w.id === item.id) === currentMobileIndex ? 1 : 0}&loop=1&muted=1&background=1`}
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                              className="video-iframe"
                              loading={workItems.findIndex(w => w.id === item.id) === 0 ? "eager" : "lazy"}
                              style={{ opacity: loadedItems[item.id] ? 1 : 0 }}
                              onLoad={() => handleItemLoad(item.id)}
                            />
                          </div>
                        ) : item.type === 'image' ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="masonry-image"
                            onLoad={() => handleItemLoad(item.id)}
                          />
                        ) : item.type === 'youtube' ? (
                          <div className="video-container" style={{ position: 'relative' }}>
                            {!loadedItems[item.id] && (
                              <div className="video-thumbnail-overlay">
                                <img
                                  src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                                  alt={item.title}
                                  className="video-thumbnail"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                  }}
                                />
                                <div className="loading-spinner" style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  color: 'white',
                                  fontSize: '20px',
                                  textShadow: '0 2px 4px rgba(0,0,0,0.7)'
                                }}>Loading...</div>
                              </div>
                            )}
                            <iframe
                              src={`https://www.youtube.com/embed/${item.videoId}?autoplay=${workItems.findIndex(w => w.id === item.id) === 0 || workItems.findIndex(w => w.id === item.id) === currentMobileIndex ? 1 : 0}&loop=1&mute=1&controls=0&playlist=${item.videoId}`}
                              frameBorder="0"
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                              className="video-iframe"
                              loading={workItems.findIndex(w => w.id === item.id) === 0 ? "eager" : "lazy"}
                              style={{ opacity: loadedItems[item.id] ? 1 : 0 }}
                              onLoad={() => handleItemLoad(item.id)}
                            />
                          </div>
                        ) : null}
                        
                        {loadedItems[item.id] && (
                          <div className="card-overlay mobile-overlay">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <a 
                              href={`/work/${item.slug}`}
                              className="view-project-btn"
                            >
                              View Project <ArrowIcon />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Carousel Indicators - Only show when videos exist */}
                {workItems.some(item => item.type === 'vimeo' || item.type === 'youtube') && (
                  <div className="mobile-carousel-indicators">
                    {workItems.map((item, index) => (
                      <button
                        key={index}
                        className={`carousel-dot ${index === currentMobileIndex ? 'active' : ''} ${(item.type === 'vimeo' || item.type === 'youtube') ? 'video-dot' : 'image-dot'}`}
                        onClick={() => changeSlide(index)}
                        disabled={isAnimating}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="masonry-grid">
              {workItems.map((item) => (
                <div
                  key={item.id}
                  className="masonry-item"
                  style={{
                    gridColumnEnd: `span ${item.cols}`,
                    gridRowEnd: `span ${item.rows}`,
                  }}
                >
                  <div className={`card-content ${loadedItems[item.id] ? 'loaded' : ''}`}>
                    {!loadedItems[item.id] && (
                      <>
                        <div className="loading-skeleton"></div>
                        <div className="loading-progress"></div>
                      </>
                    )}
                    {item.type === 'vimeo' ? (
                      <div className="video-container">
                        <iframe
                          src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}&autoplay=1&loop=1&muted=1&background=1`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: '10px' }}
                          title={`Vimeo Video ${item.videoId}`}
                          onLoad={() => handleItemLoad(item.id)}
                          
                        ></iframe>
                      </div>
                    ) : item.type === 'image' ? (
                      <img 
                        src={item.image} 
                        alt={`Card ${item.id}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onLoad={() => handleItemLoad(item.id)}
                      />
                    ) : item.type === 'youtube' ? (
                      <div className="video-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&loop=1&mute=1&playlist=${item.videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: '10px' }}
                          title={`YouTube Video ${item.videoId}`}
                          loading="lazy"
                          onLoad={() => handleItemLoad(item.id)}
                        ></iframe>
                      </div>
                    ) : null}
                    <div className="card-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <a href={`/work/${item.slug}`} className="card-action">
                        View Project <ArrowIcon />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {/* Clients Section */}
      <ClientsSection className="mt-20" />
    </div>
  );
};

export default MasonryGrid;
