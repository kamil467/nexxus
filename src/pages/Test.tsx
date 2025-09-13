import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import './MasanoryGrid.css';
import ClientsSection from '../components/ClientsSection';
import { supabase } from '../api/supabase';
import { WorkItem } from '../api/supabase';
import MuxPlayer from '@mux/mux-player-react';
import Mobile from './Mobile';
const MasonryGrid = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedItems, setLoadedItems] = useState<{ [key: number]: boolean }>({});
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio state management
  const [isMuted, setIsMuted] = useState<boolean>(true); // Start muted for better UX
  const [activeAudioVideo, setActiveAudioVideo] = useState<number | null>(null); // Track which video has audio
  const videoRefs = useRef<Map<number, any>>(new Map());

  // Video playback state management
  const [videoPaused, setVideoPaused] = useState<Map<number, boolean>>(new Map());
  const [showPlayIcon, setShowPlayIcon] = useState<Map<number, boolean>>(new Map());

  // Video loading states - optimized for faster loading
  const [videoLoadingStates, setVideoLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [videoLoadProgress, setVideoLoadProgress] = useState<{ [key: string]: number }>({});
  const [videoCanPlay, setVideoCanPlay] = useState<{ [key: string]: boolean }>({});

  // Initialize videos as ready faster
  const handleVideoReady = useCallback((videoKey: string) => {
    setVideoCanPlay(prev => ({ ...prev, [videoKey]: true }));
    setVideoLoadingStates(prev => ({ ...prev, [videoKey]: false }));
  }, []);





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



  // Simplified mute/unmute handler to avoid sync issues
  const handleMuteToggle = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (!newMutedState) {
      // When unmuting, set the current video as active
      setActiveAudioVideo(currentVideoIndex);
    } else {
      // When muting, clear active audio
      setActiveAudioVideo(null);
    }

    // Let the MuxPlayer muted prop handle the actual muting
    // This avoids direct manipulation that can cause sync issues
  }, [isMuted, currentVideoIndex]);

  // Store video refs for both main and background videos
  const backgroundVideoRefs = useRef<Map<number, any>>(new Map());

  const setVideoRef = useCallback((index: number, ref: any) => {
    if (ref) {
      videoRefs.current.set(index, ref);

      // Simple audio state: let the MuxPlayer muted prop handle the state
      // Don't manually set muted here to avoid sync issues
    } else {
      videoRefs.current.delete(index);
      // If this was the active audio video, clear it
      if (activeAudioVideo === index) {
        setActiveAudioVideo(null);
      }
    }
  }, [activeAudioVideo]);

  const setBackgroundVideoRef = useCallback((index: number, ref: any) => {
    if (ref) {
      backgroundVideoRefs.current.set(index, ref);
    } else {
      backgroundVideoRefs.current.delete(index);
    }
  }, []);





  // Manage single audio playback when video becomes visible
  const handleVideoVisibilityChange = useCallback((index: number, isVisible: boolean) => {
    if (!isMuted && isVisible && index === currentVideoIndex) {
      setActiveAudioVideo(index);
    }
  }, [isMuted, currentVideoIndex]);

  // Desktop-only: split items into landscape and portrait video groups
  const landscapeItems = useMemo(() =>
    workItems.filter((item) =>
      item.videoID && item.type === 'landscape'
    ),
  [workItems]);

  const portraitItems = useMemo(() =>
    workItems.filter((item) =>
      item.videoID && item.type === 'portrait'
    ),
  [workItems]);

  // Touch gesture handler for play/pause
  const handleVideoTouch = useCallback((index: number, event: React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const videoRef = videoRefs.current.get(index);
    if (!videoRef) return;

    const isPaused = videoRef.paused;

    if (isPaused) {
      // Play video and manage audio with retry logic
      const playVideo = () => {
        videoRef.play().catch((error: any) => {
          console.log('Play failed, retrying:', error);
          // Retry after a short delay
          setTimeout(() => {
            if (videoRef.paused) {
              videoRef.play().catch((retryError: any) => {
                console.log('Retry play failed:', retryError);
              });
            }
          }, 100);
        });
      };

      playVideo();

      // Update active audio video if not muted
      if (!isMuted) {
        setActiveAudioVideo(index);
      }

      setVideoPaused(prev => new Map(prev.set(index, false)));
      setShowPlayIcon(prev => new Map(prev.set(index, false)));
    } else {
      // Pause video
      videoRef.pause();
      setVideoPaused(prev => new Map(prev.set(index, true)));
      setShowPlayIcon(prev => new Map(prev.set(index, true)));

      // If this was the active audio video, clear it
      if (activeAudioVideo === index) {
        setActiveAudioVideo(null);
      }

      // Hide play icon after 2 seconds
      setTimeout(() => {
        setShowPlayIcon(prev => new Map(prev.set(index, false)));
      }, 2000);
    }
  }, [isMuted, activeAudioVideo]);

  // Double tap prevention
  const lastTapRef = useRef<number>(0);
  const handleSingleTap = useCallback((index: number, event: React.TouchEvent) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 300) {
      // Double tap detected, ignore
      return;
    }

    lastTapRef.current = now;

    // Delay to check if it's really a single tap
    setTimeout(() => {
      const timeSinceThisTap = Date.now() - lastTapRef.current;
      if (timeSinceThisTap >= 250) {
        handleVideoTouch(index, event);
      }
    }, 250);
  }, [handleVideoTouch]);

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
        console.log('Attempting to fetch from Works table...');
        const { data, error } = await supabase
          .from('Works')
          .select('*');

        console.log('Supabase response:', { data, error });

        if (error) {
          console.error('Error fetching work items:', error);
          console.error('Error details:', error.message, error.details, error.hint);
        } else {
          console.log('Fetched work items:', data);
          console.log('Number of items:', data?.length || 0);
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

          // Handle video playback with better timing and multiple attempts
          const video = entry.target.querySelector('mux-player') as any;
          if (video) {
            // Try immediate play first
            if (video.play && video.paused) {
              video.play().catch(() => {
                // If immediate play fails, try with a delay
                setTimeout(() => {
                  if (video.play && video.paused) {
                    video.play().catch((error: any) => {
                      console.log('Video play failed after delay:', error);
                    });
                  }
                }, 200);
              });
            }
          }

          // Call visibility change handler
          handleVideoVisibilityChange(index, true);
        } else {
          setVisibleItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });

          // Pause videos that are out of view
          const video = entry.target.querySelector('mux-player') as any;
          if (video && video.pause) {
            video.pause();
          }

          // If this was the active audio video, clear it
          if (activeAudioVideo === index) {
            setActiveAudioVideo(null);
          }

          // Call visibility change handler
          handleVideoVisibilityChange(index, false);
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

  // Memoized mobile items with aspect ratio detection
  const mobileItems = useMemo(() => {
    if (!isMobile) return [];

    return workItems.map((item, index) => {
      // Use the pre-computed type from Works table
      const isPortrait = item.type === 'portrait'; // 9:16 videos
      const isLandscape = item.type === 'landscape'; // 16:9 videos

      return {
        ...item,
        index,
        isVisible: visibleItems.has(index),
        shouldLoad: Math.abs(index - currentVideoIndex) <= 1,
        aspectRatio: item.type,
        displayMode: isPortrait ? 'fullscreen' : 'theater' // Portrait = reels, Landscape = theater mode
      };
    });
  }, [workItems, isMobile, visibleItems, currentVideoIndex]);

  // Effect to handle audio state when currentVideoIndex changes
  useEffect(() => {
    if (!isMobile || isMuted) return;

    // Update active audio video when current video changes
    setActiveAudioVideo(currentVideoIndex);

    // Let the MuxPlayer muted prop handle the actual audio state
    // This avoids manual manipulation that can cause sync issues
  }, [currentVideoIndex, isMuted, isMobile]);

  // Effect to ensure videos play when they become visible
  useEffect(() => {
    if (!isMobile) return;

    // When visible items change, ensure the current video is playing
    const currentVideo = videoRefs.current.get(currentVideoIndex);
    if (currentVideo && visibleItems.has(currentVideoIndex)) {
      // Small delay to ensure the video is ready
      setTimeout(() => {
        if (currentVideo.paused && currentVideo.play) {
          currentVideo.play().catch((error: any) => {
            console.log('Failed to play current video:', error);
          });
        }
      }, 150);
    }
  }, [visibleItems, currentVideoIndex, isMobile]);

  // Synchronize background video with main video for theater mode
  useEffect(() => {
    if (!isMobile) return;

    const syncVideos = () => {
      const mainVideo = videoRefs.current.get(currentVideoIndex);
      const backgroundVideo = backgroundVideoRefs.current.get(currentVideoIndex);

      if (mainVideo && backgroundVideo) {
        // Sync playback state
        if (mainVideo.paused && !backgroundVideo.paused) {
          backgroundVideo.pause();
        } else if (!mainVideo.paused && backgroundVideo.paused) {
          backgroundVideo.play().catch(() => {});
        }

        // Sync current time (with small tolerance to avoid constant updates)
        const timeDifference = Math.abs(mainVideo.currentTime - backgroundVideo.currentTime);
        if (timeDifference > 0.5) { // Only sync if difference is significant
          backgroundVideo.currentTime = mainVideo.currentTime;
        }
      }
    };

    // Set up interval to sync videos periodically
    const syncInterval = setInterval(syncVideos, 1000); // Sync every second

    return () => {
      clearInterval(syncInterval);
    };
  }, [currentVideoIndex, isMobile]);

  // YouTube Shorts-style scroll behavior - only within video section
  useEffect(() => {
    if (!isMobile) return;

    let ticking = false;
    let isSnapping = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          // Find video section bounds
          const videoSection = document.querySelector('.mobile-scroll-view') as HTMLElement;
          if (!videoSection) return;

          const videoSectionRect = videoSection.getBoundingClientRect();
          const videoSectionTop = scrollY + videoSectionRect.top;
          const videoSectionBottom = videoSectionTop + videoSection.offsetHeight;

          // Check if we're within the video section
          const isInVideoSection = scrollY >= videoSectionTop - windowHeight * 0.1 &&
                                  scrollY <= videoSectionBottom - windowHeight * 0.9;

          if (isInVideoSection) {
            // Calculate current video index
            const relativeScroll = scrollY - videoSectionTop;
            const newVideoIndex = Math.round(relativeScroll / windowHeight);

            // Update current video index if it changed
            if (newVideoIndex >= 0 && newVideoIndex < mobileItems.length && newVideoIndex !== currentVideoIndex) {
              setCurrentVideoIndex(newVideoIndex);
            }

            // Apply YouTube Shorts-style snapping only within video section
            if (!isSnapping) {
              const targetVideoIndex = Math.round(relativeScroll / windowHeight);
              const targetScroll = videoSectionTop + (targetVideoIndex * windowHeight);
              const scrollDifference = Math.abs(scrollY - targetScroll);

              // Snap if we're close but not exactly aligned
              if (scrollDifference > 20 && scrollDifference < windowHeight * 0.3) {
                isSnapping = true;

                window.scrollTo({
                  top: targetScroll,
                  behavior: 'smooth'
                });

                setTimeout(() => {
                  isSnapping = false;
                }, 300);
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, mobileItems.length, currentVideoIndex]);

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
          <p>No work items found. Please check your database connection.</p>
        </div>
      ) : (
        <>
          {/* Desktop layout: split into Landscape and Portrait sections. Mobile remains untouched elsewhere. */}
          {!isMobile && (
            <div className="desktop-video-sections">
              {/* Landscape Section */}
              <section className="video-section landscape">
                <header className="section-header">
                  <h2 aria-label="Landscape" title="Landscape">
                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" aria-hidden="true">
                      <rect x="1" y="1" width="26" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </h2>
                </header>
                <div className="video-grid landscape-grid">
                  {landscapeItems.map((item) => {
                    const videoKey = `land-${item.id}`;
                    const isLoading = videoLoadingStates[videoKey] !== false;
                    const canPlay = videoCanPlay[videoKey] || false;

                    return (
                      <div className="video-grid-item" key={videoKey}>
                        <div className="video-aspect-frame aspect-16-9">
                          {/* Loading overlay with site design */}
                          {isLoading && (
                            <div className="video-loading-overlay-site">
                              <div className="site-loading-spinner">
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                              </div>
                              <div className="site-loading-text">Loading...</div>
                              {/* Progress bar */}
                              <div className="site-progress-bar">
                                <div
                                  className="site-progress-fill"
                                  style={{ width: `${videoLoadProgress[videoKey] || 0}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <MuxPlayer
                            playbackId={item.videoID}
                            autoPlay="muted"
                            muted
                            loop
                            playsInline
                            preload="metadata" // Faster loading - only metadata instead of full video
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              background: '#fff',
                              opacity: canPlay ? 1 : 0,
                              transition: 'opacity 0.3s ease' // Faster transition
                            }}
                            onLoadStart={() => {
                              setVideoLoadingStates(prev => ({ ...prev, [videoKey]: true }));
                            }}
                            onLoadedMetadata={() => {
                              // Faster - trigger on metadata instead of full data
                              handleVideoReady(videoKey);
                            }}
                            onCanPlay={(e) => {
                              const el = e.target as any;
                              if (el && el.play) {
                                el.play().catch(() => {});
                              }
                            }}
                            onProgress={(e) => {
                              const el = e.target as any;
                              if (el && el.buffered && el.buffered.length > 0) {
                                const progress = (el.buffered.end(0) / el.duration) * 100;
                                setVideoLoadProgress(prev => ({ ...prev, [videoKey]: progress }));
                              }
                            }}
                          />

                          <div className="grid-overlay">
                            <div className="grid-overlay-content compact">
                              <a href={`/work/${item.slug}`} className="card-action icon-only" title="View Project">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </a>
                              <h3 className="overlay-title">{item.title}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Portrait Section */}
              <section className="video-section portrait">
                <header className="section-header">
                  <h2 aria-label="Portrait" title="Portrait">
                    <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
                      <rect x="1" y="1" width="16" height="26" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </h2>
                </header>
                <div className="video-grid portrait-grid">
                  {portraitItems.map((item) => {
                    const videoKey = `port-${item.id}`;
                    const isLoading = videoLoadingStates[videoKey] !== false;
                    const canPlay = videoCanPlay[videoKey] || false;

                    return (
                      <div className="video-grid-item" key={videoKey}>
                        <div className="video-aspect-frame aspect-9-16">
                          {/* Loading overlay with site design */}
                          {isLoading && (
                            <div className="video-loading-overlay-site">
                              <div className="site-loading-spinner">
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                                <div className="spinner-circle"></div>
                              </div>
                              <div className="site-loading-text">Loading...</div>
                              {/* Progress bar */}
                              <div className="site-progress-bar">
                                <div
                                  className="site-progress-fill"
                                  style={{ width: `${videoLoadProgress[videoKey] || 0}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <MuxPlayer
                            playbackId={item.videoID}
                            autoPlay="muted"
                            muted
                            loop
                            playsInline
                            preload="metadata" // Faster loading - only metadata instead of full video
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              background: '#fff',
                              opacity: canPlay ? 1 : 0,
                              transition: 'opacity 0.3s ease' // Faster transition
                            }}
                            onLoadStart={() => {
                              setVideoLoadingStates(prev => ({ ...prev, [videoKey]: true }));
                            }}
                            onLoadedMetadata={() => {
                              // Faster - trigger on metadata instead of full data
                              handleVideoReady(videoKey);
                            }}
                            onCanPlay={(e) => {
                              const el = e.target as any;
                              if (el && el.play) {
                                el.play().catch(() => {});
                              }
                            }}
                            onProgress={(e) => {
                              const el = e.target as any;
                              if (el && el.buffered && el.buffered.length > 0) {
                                const progress = (el.buffered.end(0) / el.duration) * 100;
                                setVideoLoadProgress(prev => ({ ...prev, [videoKey]: progress }));
                              }
                            }}
                          />

                          <div className="grid-overlay">
                            <div className="grid-overlay-content compact">
                              <a href={`/work/${item.slug}`} className="card-action icon-only" title="View Project">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </a>
                              <h3 className="overlay-title">{item.title}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* Existing desktop masonry (kept if needed) and mobile rendering handled elsewhere */}
        </>
      )}
      {/* Clients Section */}
<ClientsSection className="mt-20" />
    </div>
  );
};

export default MasonryGrid;
