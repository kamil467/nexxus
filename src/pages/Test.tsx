import React from 'react';
import './MasanoryGrid.css';

const MasonryGrid = () => {
  // Sample data with different card sizes
  const items = [
    { id: 1, cols: 1, rows: 1, background: '#FF6B6B', type: 'text', content: 'This is a text card' },
    { id: 2, cols: 2, rows: 2, background: '#4ECDC4', type: 'image', image: 'https://picsum.photos/id/237/200/300' },
    { id: 3, cols: 1, rows: 2, background: '#45B7D1', type: 'image', image: 'https://picsum.photos/id/238/200/300' },
    { id: 4, cols: 1, rows: 2, background: '#96CEB4', type: 'text', content: 'This is another text card' },
    { id: 5, cols: 1, rows: 1, background: '#FFEEAD', },
    { id: 6, cols: 2, rows: 2, background: '#D4A5A5', type: 'image', image: 'https://picsum.photos/id/239/200/300' },
    { id: 7, cols: 1, rows: 2, background: '#77C9D4',  },
    { id: 8, cols: 2, rows: 3, background: '#FF9999' , type: 'image', image: 'https://picsum.photos/id/241/200/300' },
    { id: 9, cols: 1, rows: 3, background: '#e5e7eb', type: 'vimeo', videoId: '1057103201'  },
    { id: 10, cols: 1, rows: 3, background: '#FF6B6B' },
    { id: 11, cols: 2, rows: 2, background: '#4ECDC4' },
    { id:12, cols: 1, rows: 2, background: '#45B7D1' },
    { id: 13, cols: 2, rows: 1, background: '#96CEB4' },
    { id: 14, cols: 1, rows: 1, background: '#FFEEAD' },
    { id: 15, cols: 1, rows: 2, background: '#D4A5A5' },
    { id: 16, cols: 1, rows: 2, background: '#77C9D4' },
    { id: 17, cols: 2, rows: 2, background: '#FF9999' },
    { id: 18, cols: 2, rows: 4, background: '#4ECDC4' },
    { id: 19, cols: 1, rows: 2, background: '#FF9999' },
    { id: 20, cols: 2, rows: 3, background: '#77C9D4' },
    { id: 21, cols: 1, rows: 2, background: '#FF9999' },
    { id: 22, cols: 1, rows: 2, background: '#B0E0E6' },
    { id: 23, cols: 2, rows: 2, background: '#4ECDC4' },
    { id: 24, cols: 1, rows: 2, background: '#B0E0E6' },
    { id: 25, cols: 2, rows: 2, background: '#D4A5A5' }
  ];

  return (
    <div className="masonry-grid">
      {items.map((item) => (
        <div
          key={item.id}
          className="masonry-item"
          style={{
            gridColumnEnd: `span ${item.cols}`,
            gridRowEnd: `span ${item.rows}`,
            backgroundColor: item.background,
          }}
        >
          <div className="card-content">
          {item.type === 'vimeo' ? (
            <div className="video-container">
              <iframe
                src={`https://player.vimeo.com/video/${item.videoId}?h=1ff8d3f9a0&autoplay=0&loop=1&muted=1`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '10px' }}
                title={`Vimeo Video ${item.videoId}`}
              ></iframe>
              </div>
            ) : (
              <>
                <h3>Card {item.id}</h3>
                <p>Columns: {item.cols}, Rows: {item.rows}</p>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;

