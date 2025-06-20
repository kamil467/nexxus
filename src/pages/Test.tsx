import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MasanoryGrid.css';
import ClientsSection from '../components/ClientsSection';
import { supabase } from '../api/supabase';
import { WorkItem } from '../api/supabase';
import WorkItemAdmin from '../components/WorkItemAdmin';

const MasonryGrid = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Fetch work items from Supabase
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
  
  useEffect(() => {
    fetchWorkItems();
  }, []);
  
  // Toggle admin mode
  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };
  
  // Function to open edit modal for a work item
  const openEditModal = (item: WorkItem) => {
    console.log('Opening edit modal for item:', item);
    
    // Pass the item to the WorkItemAdmin component
    const workItemAdminComponent = document.querySelector('div.admin-panel-container');
    if (workItemAdminComponent) {
      // Create a custom event to communicate with the WorkItemAdmin component
      const event = new CustomEvent('editWorkItem', { 
        detail: { item },
        bubbles: true
      });
      workItemAdminComponent.dispatchEvent(event);
    } else {
      console.error('WorkItemAdmin component container not found');
    }
  };
  
  // Function to delete a work item
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this work item?')) {
      try {
        const { error } = await supabase
          .from('work_items')
          .delete()
          .eq('id', id);
          
        if (error) {
          console.error('Error deleting work item:', error);
          alert(`Error deleting work item: ${error.message}`);
        } else {
          console.log('Work item deleted successfully');
          // Refresh the work items list
          fetchWorkItems();
        }
      } catch (error) {
        console.error('Error deleting work item:', error);
        alert(`Error deleting work item: ${error}`);
      }
    }
  };

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
      {/* Admin Toggle Button */}
      <div className="admin-toggle-container flex justify-end mb-4 pr-4">
        <button 
          onClick={toggleAdminMode} 
          className={`px-4 py-2 rounded-md ${isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
        >
          {isAdmin ? 'Exit Admin Mode' : 'Enter Admin Mode'}
        </button>
      </div>
      
      {/* Admin Panel - Hidden but accessible for event handling */}
      <div className="admin-panel-container">
        {isAdmin && (
          <WorkItemAdmin 
            onWorkItemsChange={fetchWorkItems} 
            isAdmin={isAdmin}
          />
        )}
      </div>
      
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
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="admin-controls absolute top-2 right-2 z-10 flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link navigation
                        e.stopPropagation(); // Prevent event bubbling
                        openEditModal(item);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent link navigation
                        e.stopPropagation(); // Prevent event bubbling
                        handleDelete(item.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                )}
                {!loadedItems[item.id] && (
                  <>
                    <div className="loading-skeleton"></div>
                    <div className="loading-progress"></div>
                  </>
                )}
                {item.type === 'vimeo' ? (
                  <Link to={`/work/${item.slug}`} className="video-container">
                    <iframe 
                      src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}&autoplay=0&loop=1&title=0&byline=0&portrait=0`}
                      style={{ border: 0 }}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      onLoad={() => handleItemLoad(item.id)}
                      className={loadedItems[item.id] ? 'loaded' : ''}
                    ></iframe>
                    <div className="overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                ) : item.type === 'image' ? (
                  <Link to={`/work/${item.slug}`} className="image-container">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      onLoad={() => handleItemLoad(item.id)}
                      className={loadedItems[item.id] ? 'loaded' : ''}
                    />
                    <div className="overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                ) : item.type === 'youtube' ? (
                  <Link to={`/work/${item.slug}`} className="video-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&loop=1&mute=1&showinfo=0&controls=0&rel=0`}
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={() => handleItemLoad(item.id)}
                      className={loadedItems[item.id] ? 'loaded' : ''}
                    ></iframe>
                    <div className="overlay">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </Link>
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
