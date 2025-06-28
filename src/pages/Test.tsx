import React, { useEffect, useState } from 'react';
import './MasanoryGrid.css';
import ClientsSection from '../components/ClientsSection';
import { supabase } from '../api/supabase';
import { WorkItem } from '../api/supabase';

const MasonryGrid = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});
  
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
      {/* Clients Section */}
      <ClientsSection className="mt-20" />
    </div>
  );
};

export default MasonryGrid;
