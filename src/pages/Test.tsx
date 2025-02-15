import React from 'react';
import './MasanoryGrid.css';

const MasonryGrid = () => {
  // Sample data with different card sizes
  const items = [
    { id: 1, cols: 1, rows: 1, background: '#FF6B6B' },
    { id: 2, cols: 2, rows: 2, background: '#4ECDC4' },
    { id: 3, cols: 1, rows: 2, background: '#45B7D1' },
    { id: 4, cols: 1, rows: 2, background: '#96CEB4' },
    { id: 5, cols: 1, rows: 1, background: '#FFEEAD' },
    { id: 6, cols: 2, rows: 2, background: '#D4A5A5' },
    { id: 7, cols: 1, rows: 2, background: '#77C9D4' },
    { id: 8, cols: 2, rows: 3, background: '#FF9999' },
    { id: 9, cols: 1, rows: 3, background: '#B0E0E6' },
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
            <h3>Card {item.id}</h3>
            <p>Columns: {item.cols}, Rows: {item.rows}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;