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
{/*
  const items = [
    { id: 1, cols: 1, rows: 1, type: 'image', image: 'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODJ8fHxlbnwwfHx8fHw%3D', title: 'Urban Architecture', description: 'Modern architectural design showcasing the beauty of urban landscapes.' },
    { id: 2, cols: 2, rows: 2, type: 'image', image: 'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjV8fHxlbnwwfHx8fHw%3D', title: "Nature's Canvas", description: 'Capturing the raw beauty of natural landscapes in their purest form.' },
    { id: 3, cols: 1, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1739403386250-080677ac4c53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzR8fHxlbnwwfHx8fHw%3D', title: 'Urban Oasis', description: 'A serene escape from the hustle and bustle of city life.' },
    { id: 4, cols: 1, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1734907865880-6eb669831b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODB8fHxlbnwwfHx8fHw%3D', title: 'Rustic Charm', description: 'A cozy retreat that embodies the warmth of rural living.' },
    { id: 5, cols: 1, rows: 1, type: 'image', image: 'https://images.unsplash.com/photo-1739531722390-04a6942231e2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw', title: 'Modern Minimalism', description: 'A sleek and sophisticated design that celebrates simplicity.' },
    { id: 6, cols: 2, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1739582767192-3aa4d4811633?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Vibrant Culture', description: 'A kaleidoscope of colors and textures that reflect the diversity of urban culture.' },
    { id: 7, cols: 1, rows: 2, type: 'image', image: 'https://plus.unsplash.com/premium_photo-1734549547939-41f90fdf91cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzB8fHxlbnwwfHx8fHw%3D', title: 'Coastal Breeze', description: 'A refreshing escape to the seaside, where the air is sweet and the views are breathtaking.' },
    { id: 8, cols: 2, rows: 3, type: 'image', image: 'https://images.unsplash.com/photo-1737646099147-f2636ed6c1b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNTd8fHxlbnwwfHx8fHw%3D', title: 'Mountain Retreat', description: "A secluded haven nestled in the mountains, where nature's beauty is on full display." },
    { id: 9, cols: 1, rows: 3, type: 'vimeo', videoId: '1057103201', hId: '1ff8d3f9a0', title: 'Creative Motion', description: 'An artistic exploration of movement and visual storytelling.' },
    { id: 10, cols: 1, rows: 3, type: 'image', image: 'https://images.unsplash.com/photo-1586768798120-95597acaa6e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTJ8fHxlbnwwfHx8fHw%3D', title: 'Urban Jungle', description: 'A fusion of nature and architecture, where the city meets the wild.' },
    { id: 11, cols: 2, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1738008896551-9ab767d9e6ac?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Rustic Elegance', description: 'A charming blend of traditional and modern elements, creating a warm and inviting atmosphere.' },
    { id: 12, cols: 1, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1737380047092-e0cb34e12f84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Cozy Corner', description: 'A snug and intimate space that invites relaxation and contemplation.' },
    { id: 13, cols: 2, rows: 1, type: 'image', image: 'https://plus.unsplash.com/premium_photo-1738637796692-d29db83fb7c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzODV8fHxlbnwwfHx8fHw%3D', title: 'Sunset Serenade', description: 'A warm and romantic atmosphere, perfect for a peaceful evening.' },
    { id: 14, cols: 1, rows: 1, type: 'image', image: 'https://images.unsplash.com/photo-1738748986807-bf1e6d00d58d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjh8fHxlbnwwfHx8fHw%3D', title: 'Morning Dew', description: 'A refreshing and revitalizing atmosphere, perfect for a new beginning.' },
    { id: 15, cols: 1, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1736794781970-ae55b6e3a13e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzODZ8fHxlbnwwfHx8fHw%3D', title: 'Seaside Escape', description: 'A tranquil and serene atmosphere, perfect for a relaxing getaway.' },
    { id: 16, cols: 1, rows: 2, type: 'image', image: 'https://plus.unsplash.com/premium_photo-1676165852076-2e23ece9ff78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MzN8fHxlbnwwfHx8fHw%3D', title: 'Mountain Peak', description: 'A breathtaking and awe-inspiring atmosphere, perfect for adventure seekers.' },
    { id: 17, cols: 2, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1738924349706-14d70715e236?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzF8fHxlbnwwfHx8fHw%3D', title: 'Urban Oasis', description: 'A peaceful and serene atmosphere, perfect for a city retreat.' },
    { id: 18, cols: 2, rows: 4, type: 'image', image: 'https://images.unsplash.com/photo-1739641375724-dfea74e0df69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8', title: "Nature's Wonders", description: 'A breathtaking and awe-inspiring atmosphere, perfect for nature lovers.' },
    { id: 19, cols: 1, rows: 3, type: 'vimeo', videoId: '1057277973', hId: '4e87d1ba66', title: 'Creative Journey', description: 'An artistic exploration of movement and visual storytelling.' },
    { id: 20, cols: 2, rows: 2, type: 'vimeo', videoId: '1057280811', hId: '17964124a8', title: 'Urban Rhythms', description: 'A dynamic and energetic atmosphere, perfect for city dwellers.' },
    { id: 21, cols: 1, rows: 2, type: 'image', image: 'https://images.unsplash.com/photo-1738273473785-99c1fc498c14?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MzJ8fHxlbnwwfHx8fHw%3D', title: 'Coastal Walk', description: 'A peaceful and serene atmosphere, perfect for a seaside stroll.' },
    { id: 22, cols: 1, rows: 3, type: 'image', image: 'https://images.unsplash.com/photo-1736173155834-6cd98d8dc9fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDV8fHxlbnwwfHx8fHw%3D', title: 'Mountain Lake', description: 'A breathtaking and awe-inspiring atmosphere, perfect for nature lovers.' },
    { id: 23, cols: 1, rows: 3, type: 'image', image: 'https://plus.unsplash.com/premium_photo-1738091397333-48f0e514b467?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Urban Nights', description: 'A dynamic and energetic atmosphere, perfect for city dwellers.' },
    { id: 24, cols: 1, rows: 3, type: 'image', image: 'https://images.unsplash.com/photo-1738162571972-d8337de941e7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Coastal Cliffs', description: 'A breathtaking and awe-inspiring atmosphere, perfect for nature lovers.' },
    { id: 25, cols: 2, rows: 2, type: 'vimeo', videoId: '1057278002', hId: '64b3293a30', title: 'Creative Expression', description: 'An artistic exploration of movement and visual storytelling.' }
  ];
*/}
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
