import { useEffect, useState } from 'react';
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

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
            /* Mobile Instagram-style vertical scroll */
            <div className="mobile-scroll-view">
              <div className="mobile-scroll-container">
                {workItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`mobile-scroll-item ${loadedItems[item.id] ? 'loaded' : ''}`}
                    data-index={index}
                  >
                    <div className="mobile-video-wrapper">
                      {!loadedItems[item.id] && (
                        <div className="loading-skeleton">
                          <div className="skeleton-animation"></div>
                        </div>
                      )}
                      
                      {item.type === 'mux' ? (
                        <MuxPlayer
                          playbackId={item.muxPlaybackId}
                          autoPlay={true}
                          muted={true}
                          loop={true}
                          playsInline={true}
                          preload="auto"
                          onCanPlay={(e) => {
                            const target = e.target as any;
                            // Force play for mobile autoplay
                            if (target && target.play) {
                              target.play().catch((error: any) => {
                                console.log('Autoplay prevented:', error);
                              });
                            }
                          }}
                          onLoadedData={() => handleItemLoad(item.id)}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : item.type === 'image' ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="mobile-scroll-image"
                          onLoad={() => handleItemLoad(item.id)}
                        />
                      ) : null}
                      
                      {/* Innovative Mobile Project Info */}
                      <div className="mobile-project-display">
                        {/* Progress indicator at top */}
                        <div className="mobile-progress-bar">
                          <div className="progress-fill"></div>
                        </div>
                        
                        {/* Floating glassmorphism card */}
                        <div className="mobile-floating-card">
                          <div className="card-header">
                            <div className="project-category">Portfolio</div>
                            <div className="project-index">{index + 1}/{workItems.length}</div>
                          </div>
                          
                          <div className="card-content">
                            <h2 className="project-title">{item.title}</h2>
                            <p className="project-description">{item.description}</p>
                            
                            <div className="project-tags">
                              <span className="tag">Creative</span>
                              <span className="tag">Design</span>
                              <span className="tag">Portfolio</span>
                            </div>
                          </div>
                          
                          <div className="card-actions">
                            <a 
                              href={`/work/${item.slug}`}
                              className="primary-action-btn icon-only"
                              title="View Project"
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </a>
                            
                            <button className="action-btn share-btn">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zM21 19a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {/* Subtle scroll indicator */}
                        <div className="scroll-indicator">
                          <div className="scroll-text">Swipe up for next</div>
                          <div className="scroll-arrow">↑</div>
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
