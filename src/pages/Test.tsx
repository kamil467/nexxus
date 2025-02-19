import React, { useState } from 'react';
import './MasanoryGrid.css';
import workItems from '../components/workitems';

const MasonryGrid = () => {
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});

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
            ) : (
              <img 
                src={item.image} 
                alt={`Card ${item.id}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onLoad={() => handleItemLoad(item.id)}
              />
            )}
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
  );
};

export default MasonryGrid;
