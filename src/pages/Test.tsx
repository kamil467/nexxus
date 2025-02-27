import React, { useState, useEffect } from 'react';
import './MasanoryGrid.css';
import ClientsSection from '../components/ClientsSection';
import { API_CONFIG, getApiHeaders } from '../config/api';

interface WorkItemFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface WorkItemMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: WorkItemFormat;
    medium: WorkItemFormat;
    small: WorkItemFormat;
    large?: WorkItemFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkItem {
  id: number;
  documentId: string;
  RowNumber: number;
  ColNumber: number;
  Title: string;
  Descriptions: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  CardType: 'Image' | 'Video';
  slug: string;
  Overview: string;
  Capabilities: string;
  ProjectTeam: string;
  MainCardMedia: WorkItemMedia;
  RelatedItems: WorkItemMedia[];
}

interface ApiResponse {
  data: WorkItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const MasonryGrid = () => {
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkItems = async () => {
      try {
        if (!API_CONFIG.API_TOKEN) {
          throw new Error('API token is not configured');
        }

        const response = await fetch(
          `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WORK_CARDS}?populate=*`, 
          {
            headers: getApiHeaders(),
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed. Please check your API token.');
          }
          throw new Error(`Failed to fetch work items: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        setWorkItems(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching work items');
        console.error('Error fetching work items:', err);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading work items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div className="masonry-grid">
        {workItems.map((item) => (
          <div
            key={item.id}
            className="masonry-item"
            style={{
              gridColumnEnd: `span ${item.ColNumber}`,
              gridRowEnd: `span ${item.RowNumber}`,
            }}
          >
            <div className={`card-content ${loadedItems[item.id] ? 'loaded' : ''}`}>
              {!loadedItems[item.id] && (
                <>
                  <div className="loading-skeleton"></div>
                  <div className="loading-progress"></div>
                </>
              )}
              {item.CardType === 'Video' ? (
                <div className="video-container">
                  <iframe
                    src={`https://player.vimeo.com/video/${item.MainCardMedia.url}?background=1&autoplay=1&loop=1&byline=0&title=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    onLoad={() => handleItemLoad(item.id)}
                  ></iframe>
                </div>
              ) : (
                <img
                  src={`http://localhost:1337${item.MainCardMedia.formats.large?.url || item.MainCardMedia.formats.medium.url}`}
                  alt={item.MainCardMedia.alternativeText || item.Title}
                  onLoad={() => handleItemLoad(item.id)}
                />
              )}
              <div className="card-overlay">
                <h3>{item.Title}</h3>
                <p>{item.Descriptions}</p>
                <a href={`/work/${item.slug}`} className="learn-more">
                  Learn More <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ClientsSection />
    </div>
  );
};

export default MasonryGrid;
