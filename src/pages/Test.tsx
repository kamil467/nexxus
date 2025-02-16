import React from 'react';
import './MasanoryGrid.css';

const MasonryGrid = () => {
  // Sample data with different card sizes
  const items = [
    { id: 1, cols: 1, rows: 1, background: '#fff', type: 'image', image: 'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODJ8fHxlbnwwfHx8fHw%3D' },
    { id: 2, cols: 2, rows: 2, background: '#fff', type: 'image', image: 'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjV8fHxlbnwwfHx8fHw%3D' },
    { id: 3, cols: 1, rows: 2, background: '#fff', type: 'image', image: 'https://images.unsplash.com/photo-1739403386250-080677ac4c53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzR8fHxlbnwwfHx8fHw%3D' },
    { id: 4, cols: 1, rows: 2, background: '#fff', type: 'image', image: 'https://images.unsplash.com/photo-1734907865880-6eb669831b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODB8fHxlbnwwfHx8fHw%3D' },
    { id: 5, cols: 1, rows: 1, background: '#fff', type: 'image', image: 'https://images.unsplash.com/photo-1739531722390-04a6942231e2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dw' },
    { id: 6, cols: 2, rows: 2, background: '#fff', type: 'image', image: 'https://images.unsplash.com/photo-1739582767192-3aa4d4811633?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, cols: 1, rows: 2, background: '#fff', type:'image',image:'https://plus.unsplash.com/premium_photo-1734549547939-41f90fdf91cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzB8fHxlbnwwfHx8fHw%3D' },
    { id: 8, cols: 2, rows: 3, background: '#fff' , type: 'image', image: 'https://images.unsplash.com/photo-1737646099147-f2636ed6c1b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNTd8fHxlbnwwfHx8fHw%3D' },
    { id: 9, cols: 1, rows: 3, background: '#fff', type: 'vimeo', videoId: '1057103201',  hId:'1ff8d3f9a0' },
    { id: 10, cols: 1, rows: 3, background: '#fff', type:'image', image:'https://images.unsplash.com/photo-1586768798120-95597acaa6e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTJ8fHxlbnwwfHx8fHw%3D' },
    { id: 11, cols: 2, rows: 2, background: '#fff' , type:'image' , image:'https://images.unsplash.com/photo-1738008896551-9ab767d9e6ac?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id:12, cols: 1, rows: 2, background: '#fff' , type:'image', image:'https://images.unsplash.com/photo-1737380047092-e0cb34e12f84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'},
    { id: 13, cols: 2, rows: 1, background: '#fff' , type:'image', image:'https://plus.unsplash.com/premium_photo-1738637796692-d29db83fb7c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzODV8fHxlbnwwfHx8fHw%3D'},
    { id: 14, cols: 1, rows: 1, background: '#fff' , type:'image', image:'https://images.unsplash.com/photo-1738748986807-bf1e6d00d58d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjh8fHxlbnwwfHx8fHw%3D' },
    { id: 15, cols: 1, rows: 2, background: '#fff' , type:'image', image:'https://images.unsplash.com/photo-1736794781970-ae55b6e3a13e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzODZ8fHxlbnwwfHx8fHw%3D' },
    { id: 16, cols: 1, rows: 2, background: '#fff' , type:'image', image:'https://plus.unsplash.com/premium_photo-1676165852076-2e23ece9ff78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MzN8fHxlbnwwfHx8fHw%3D' },
    { id: 17, cols: 2, rows: 2, background: '#fff' ,type:'image', image:'https://images.unsplash.com/photo-1738924349706-14d70715e236?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzF8fHxlbnwwfHx8fHw%3D'},
    { id: 18, cols: 2, rows: 4, background: '#fff', type: 'image', image: 'https://images.unsplash.com/photo-1739641375724-dfea74e0df69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8' },
    { id: 19, cols: 1, rows: 3, background: '#fff' , type:'vimeo', videoId: '1057277973'  , hId:'4e87d1ba66'  },
    { id: 20, cols: 2, rows: 2, background: '#fff' , type:'vimeo', videoId:'1057280811' , hId:'17964124a8' },
    { id: 21, cols: 1, rows: 2, background: '#fff' , type:'image', image:'https://images.unsplash.com/photo-1738273473785-99c1fc498c14?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MzJ8fHxlbnwwfHx8fHw%3D'},
    { id: 22, cols: 1, rows: 3, background: '#fff', type:'image', image:'https://images.unsplash.com/photo-1736173155834-6cd98d8dc9fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDV8fHxlbnwwfHx8fHw%3D' },
    { id: 23, cols: 1, rows: 3, background: '#fff' },
    { id: 24, cols: 1, rows: 3, background: '#fff' },
    { id: 25, cols: 2, rows: 2, background: '#fff' , type:'vimeo', videoId: '1057278002' , hId:'64b3293a30' }
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
                src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}&autoplay=1&loop=1&muted=1`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '10px' }}
                title={`Vimeo Video ${item.videoId}`}
              ></iframe>
              </div>
            ) : item.type === 'image' ? (
              <>
                <img src={item.image} alt={`Card ${item.id}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </>
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

