import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import './MasanoryGrid.css';
import ClientsSection from '../components/ClientsSection';
import { supabase } from '../api/supabase';
import { WorkItem } from '../api/supabase';
import MuxPlayer from '@mux/mux-player-react';

const MasonryGrid = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Share handler for mobile
  const handleShare = useCallback(async (item: any) => {
    const shareData = {
      title: item.title,
      text: item.description,
      url: `${window.location.origin}/work/${item.slug}`
    };

    try {
      // Check if Web Share API is supported (mobile browsers)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);

        // Show a temporary notification (you could replace with a toast library)
        const notification = document.createElement('div');
        notification.textContent = 'Link copied to clipboard!';
        notification.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          z-index: 1000;
          font-size: 14px;
          backdrop-filter: blur(10px);
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
          document.body.removeChild(notification);
        }, 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: Open in new tab for sharing
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(shareData.url)}`, '_blank');
    }
  }, []);

  // Optimized mobile detection with debouncing
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();

    // Debounced resize handler for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [checkMobile]);

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

  // Optimized item load handler
  const handleItemLoad = useCallback((id: number) => {
    setLoadedItems(prev => ({ ...prev, [id]: true }));
  }, []);

  // Intersection Observer for mobile viewport optimization
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const options = {
      root: null,
      rootMargin: '50px 0px', // Load items 50px before they enter viewport
      threshold: 0.1
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');

        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set(prev).add(index));
          setCurrentVideoIndex(index);

          // Pause videos that are not in view for better performance
          const video = entry.target.querySelector('mux-player') as any;
          if (video && video.play) {
            video.play().catch(() => {});
          }
        } else {
          // Pause videos that are out of view
          const video = entry.target.querySelector('mux-player') as any;
          if (video && video.pause) {
            video.pause();
          }
        }
      });
    }, options);

    // Observe all mobile scroll items
    const items = containerRef.current.querySelectorAll('.mobile-scroll-item');
    items.forEach(item => observerRef.current?.observe(item));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isMobile, workItems]);

  // Memoized mobile items for better performance
  const mobileItems = useMemo(() => {
    if (!isMobile) return [];

    return workItems.map((item, index) => ({
      ...item,
      index,
      isVisible: visibleItems.has(index),
      shouldLoad: Math.abs(index - currentVideoIndex) <= 1 // Load current and adjacent items
    }));
  }, [workItems, isMobile, visibleItems, currentVideoIndex]);

  // Performance optimization: Reduce re-renders for mobile
  useEffect(() => {
    if (!isMobile) return;

    // Enable hardware acceleration for smooth scrolling
    if (containerRef.current) {
      containerRef.current.style.transform = 'translateZ(0)';
      containerRef.current.style.willChange = 'scroll-position';
    }

    // Optimize for mobile performance
    const optimizeForMobile = () => {
      // Disable hover effects on mobile for better performance
      document.body.classList.add('mobile-optimized');

      // Reduce animation complexity on lower-end devices
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        document.body.classList.add('reduced-motion');
      }
    };

    optimizeForMobile();

    return () => {
      document.body.classList.remove('mobile-optimized', 'reduced-motion');
    };
  }, [isMobile]);



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
            /* Mobile Instagram-style vertical scroll - Performance Optimized */
            <div className="mobile-scroll-view">
              <div className="mobile-scroll-container" ref={containerRef}>
                {mobileItems.map((item) => (
                  <div
                    key={item.id}
                    className={`mobile-scroll-item ${loadedItems[item.id] ? 'loaded' : ''}`}
                    data-index={item.index}
                  >
                    <div className="mobile-video-wrapper">
                      {!loadedItems[item.id] && (
                        <div className="loading-skeleton">
                          <div className="skeleton-animation"></div>
                        </div>
                      )}

                      {item.type === 'mux' && item.shouldLoad ? (
                        <MuxPlayer
                          playbackId={item.muxPlaybackId}
                          autoPlay={item.isVisible}
                          muted={true}
                          loop={true}
                          playsInline={true}
                          preload={item.shouldLoad ? "metadata" : "none"}
                          onCanPlay={(e) => {
                            if (!item.isVisible) return;
                            const target = e.target as any;
                            if (target && target.play) {
                              target.play().catch((error: any) => {
                                console.log('Autoplay prevented:', error);
                              });
                            }
                          }}
                          onLoadedData={() => handleItemLoad(item.id)}
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            willChange: item.isVisible ? 'transform' : 'auto'
                          }}
                        />
                      ) : item.type === 'image' && item.shouldLoad ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="mobile-scroll-image"
                          loading="lazy"
                          onLoad={() => handleItemLoad(item.id)}
                          style={{
                            willChange: item.isVisible ? 'transform' : 'auto'
                          }}
                        />
                      ) : (
                        // Placeholder for items that shouldn't load yet
                        <div
                          className="item-placeholder"
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      
                      {/* Modern Mobile Project Overlay */}
                      <div className="mobile-overlay-container">
                        {/* Top Status Bar */}
                        <div className="mobile-status-bar">
                          <div className="status-left">
                            <span className="project-counter">{item.index + 1} / {workItems.length}</span>
                          </div>
                          {/* <div className="status-right">
                            <button className="info-toggle-btn" title="Toggle Info">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </div> */}
                        </div>

                        {/* Bottom Gradient Overlay */}
                        <div className="mobile-bottom-overlay">
                          <div className="project-info">
                            <h3 className="mobile-project-title">{item.title}</h3>
                            <p className="mobile-project-description">{item.description}</p>
                          </div>

                          <div className="mobile-action-bar">
                            <a
                              href={`/work/${item.slug}`}
                              className="mobile-view-btn"
                              title="View Project"
                            >
                              <span>View Project</span>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </a>

                            <button
                              className="mobile-share-btn"
                              onClick={() => handleShare(item)}
                              title="Share"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 616 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zM21 19a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="mobile-scroll-hint">
                          <div className="scroll-line"></div>
                          <span className="scroll-text">Swipe up</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="masonry-grid">
              {workItems.map((item) => (
                <div
                  key={item.id}
                  className="masonry-item"
                  data-cols={item.cols}
                  data-rows={item.rows}
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
                    {item.type === 'mux' ? (
                      <div className="video-container">
                        <MuxPlayer
                          playbackId={item.muxPlaybackId}
                          metadata={{
                            video_title: 'NXW Scholarship event video',
                            viewer_user_id: 'Placeholder (optional)',
                          }}
                          autoPlay="muted"
                          muted
                          loop
                          playsInline
                          preload="auto"
                          style={{ 
                            borderRadius: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent'
                          }}
                          onLoadStart={() => handleItemLoad(item.id)}
                          onCanPlay={(e) => {
                            const video = e.target as any;
                            if (video && video.play) {
                              video.play().catch(() => {
                                // Autoplay blocked, which is normal for some browsers
                              });
                            }
                          }}
                        />
                      </div>
                    ) : item.type === 'image' ? (
                      <img 
                        src={item.image} 
                        alt={`Card ${item.id}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0' }}
                        onLoad={() => handleItemLoad(item.id)}
                      />
                    ) : null}
                    <div className="card-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <a href={`/work/${item.slug}`} className="card-action icon-only" title="View Project">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
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
