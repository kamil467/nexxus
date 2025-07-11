import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
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

  // Scroll snapping state for precise video control
  const isScrolling = useRef<boolean>(false);
  const scrollEndTimeout = useRef<NodeJS.Timeout | null>(null);



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



  // Mute/Unmute handler with single audio management
  const handleMuteToggle = useCallback(() => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    if (newMutedState) {
      // If muting, mute all videos
      videoRefs.current.forEach((videoRef) => {
        if (videoRef && videoRef.muted !== undefined) {
          videoRef.muted = true;
        }
      });
      setActiveAudioVideo(null);
    } else {
      // If unmuting, only unmute the currently visible video
      const currentVideo = videoRefs.current.get(currentVideoIndex);
      if (currentVideo && currentVideo.muted !== undefined) {
        // Mute all other videos first
        videoRefs.current.forEach((videoRef, index) => {
          if (videoRef && videoRef.muted !== undefined) {
            videoRef.muted = index !== currentVideoIndex;
          }
        });
        setActiveAudioVideo(currentVideoIndex);
      }
    }
  }, [isMuted, currentVideoIndex]);

  // Store video ref for mute control with single audio management
  const setVideoRef = useCallback((index: number, ref: any) => {
    if (ref) {
      videoRefs.current.set(index, ref);
      // Apply audio state: only the active video or current video gets audio
      if (isMuted) {
        ref.muted = true;
      } else {
        ref.muted = activeAudioVideo !== null ? activeAudioVideo !== index : index !== currentVideoIndex;
      }
    } else {
      videoRefs.current.delete(index);
      // If this was the active audio video, clear it
      if (activeAudioVideo === index) {
        setActiveAudioVideo(null);
      }
    }
  }, [isMuted, activeAudioVideo, currentVideoIndex]);

  // Enhanced scroll snapping for precise video positioning
  const handleScrollSnap = useCallback(() => {
    if (!isMobile || !containerRef.current) return;

    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;

    // Calculate which video should be in view
    const targetVideoIndex = Math.round(scrollTop / containerHeight);
    const targetScrollPosition = targetVideoIndex * containerHeight;

    // Only snap if we're not already at the correct position
    if (Math.abs(scrollTop - targetScrollPosition) > 10) {
      container.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
    }
  }, [isMobile]);

  // Handle scroll end for snapping
  const handleScrollEnd = useCallback(() => {
    if (!isMobile || !containerRef.current) return;

    isScrolling.current = false;

    // Clear existing timeout
    if (scrollEndTimeout.current) {
      clearTimeout(scrollEndTimeout.current);
    }

    // Snap to nearest video after scroll ends
    scrollEndTimeout.current = setTimeout(() => {
      handleScrollSnap();
    }, 150); // Small delay to ensure scroll has stopped
  }, [isMobile, handleScrollSnap]);

  // Handle scroll start
  const handleScrollStart = useCallback(() => {
    if (!isMobile) return;

    isScrolling.current = true;

    // Clear snap timeout when starting new scroll
    if (scrollEndTimeout.current) {
      clearTimeout(scrollEndTimeout.current);
    }
  }, [isMobile]);

  // Manage single audio playback when video becomes visible
  const handleVideoVisibilityChange = useCallback((index: number, isVisible: boolean) => {
    if (!isMuted && isVisible && index === currentVideoIndex) {
      // Mute all other videos
      videoRefs.current.forEach((videoRef, videoIndex) => {
        if (videoRef && videoRef.muted !== undefined) {
          videoRef.muted = videoIndex !== index;
        }
      });
      setActiveAudioVideo(index);
    }
  }, [isMuted, currentVideoIndex]);

  // Touch gesture handler for play/pause
  const handleVideoTouch = useCallback((index: number, event: React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const videoRef = videoRefs.current.get(index);
    if (!videoRef) return;

    const isPaused = videoRef.paused;

    if (isPaused) {
      // Play video and manage audio
      videoRef.play().catch((error: any) => {
        console.log('Play failed:', error);
      });

      // If not muted, ensure only this video has audio
      if (!isMuted) {
        videoRefs.current.forEach((otherVideoRef, otherIndex) => {
          if (otherVideoRef && otherVideoRef.muted !== undefined) {
            otherVideoRef.muted = otherIndex !== index;
          }
        });
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

          // Handle video playback and audio management
          const video = entry.target.querySelector('mux-player') as any;
          if (video && video.play) {
            video.play().catch(() => {});

            // Manage single audio playback
            if (!isMuted) {
              // Mute all other videos when this one becomes visible
              videoRefs.current.forEach((videoRef, videoIndex) => {
                if (videoRef && videoRef.muted !== undefined) {
                  videoRef.muted = videoIndex !== index;
                }
              });
              setActiveAudioVideo(index);
            }
          }

          // Call visibility change handler
          handleVideoVisibilityChange(index, true);
        } else {
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
      // Determine video aspect ratio based on cols/rows
      const isPortrait = item.cols === 1 && item.rows === 3; // 9:16 videos
      const isLandscape = (item.cols === 2 && item.rows === 2) || (item.cols === 2 && item.rows === 3); // 16:9 videos
      const isSquare = item.cols === item.rows; // Square videos

      return {
        ...item,
        index,
        isVisible: visibleItems.has(index),
        shouldLoad: Math.abs(index - currentVideoIndex) <= 1,
        aspectRatio: isPortrait ? 'portrait' : isLandscape ? 'landscape' : isSquare ? 'square' : 'auto',
        displayMode: isPortrait ? 'fullscreen' : 'theater' // Portrait = reels, Landscape = theater mode
      };
    });
  }, [workItems, isMobile, visibleItems, currentVideoIndex]);

  // Intelligent scroll management for mobile
  useEffect(() => {
    if (!isMobile) return;

    let scrollTimeout: NodeJS.Timeout | null = null;
    let isScrolling = false;

    const handleScroll = () => {
      isScrolling = true;

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set timeout to detect scroll end
      scrollTimeout = setTimeout(() => {
        isScrolling = false;

        // Get current scroll position
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Find video section bounds
        const videoSection = document.querySelector('.mobile-scroll-view') as HTMLElement;
        if (!videoSection) return;

        const videoSectionRect = videoSection.getBoundingClientRect();
        const videoSectionTop = scrollY + videoSectionRect.top;
        const videoSectionBottom = videoSectionTop + videoSection.offsetHeight;

        // Check if we're within the video section
        const isInVideoSection = scrollY >= videoSectionTop - windowHeight * 0.3 &&
                                scrollY <= videoSectionBottom - windowHeight * 0.7;

        if (isInVideoSection) {
          // Snap to nearest video within the video section
          const relativeScroll = scrollY - videoSectionTop;
          const videoIndex = Math.round(relativeScroll / windowHeight);
          const targetScroll = videoSectionTop + (videoIndex * windowHeight);

          // Only snap if we're not already close to the target
          if (Math.abs(scrollY - targetScroll) > 50) {
            window.scrollTo({
              top: targetScroll,
              behavior: 'smooth'
            });
          }
        }
        // If outside video section, allow normal scrolling (no snapping)

      }, 150); // Wait for scroll to end
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [isMobile, mobileItems.length]);

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
          <p>No work items found. Please check your Supabase connection.</p>
        </div>
      ) : (
        <>
          {isMobile ? (
            /* Mobile Instagram-style vertical scroll - Performance Optimized */
            <div className="mobile-scroll-view">
              <div className="mobile-scroll-container" ref={containerRef}>
                {mobileItems.map((item) => (
                  <div
                    key={item.id}
                    className={`mobile-scroll-item ${loadedItems[item.id] ? 'loaded' : ''} ${item.displayMode}-mode`}
                    data-index={item.index}
                    data-aspect-ratio={item.aspectRatio}
                  >
                    <div className={`mobile-video-wrapper ${item.aspectRatio}-wrapper`}>
                      {!loadedItems[item.id] && (
                        <div className="loading-skeleton">
                          <div className="skeleton-animation"></div>
                        </div>
                      )}

                      {item.type === 'mux' && item.shouldLoad ? (
                        <div className="video-container-with-overlay">
                          <MuxPlayer
                            ref={(ref) => setVideoRef(item.index, ref)}
                            playbackId={item.muxPlaybackId}
                            autoPlay={item.isVisible}
                            muted={isMuted || activeAudioVideo !== item.index}
                            loop={true}
                            playsInline={true}
                            preload={item.shouldLoad ? "metadata" : "none"}
                            onCanPlay={(e) => {
                              if (!item.isVisible) return;
                              const target = e.target as any;
                              if (target && target.play) {
                                target.play().catch((error: any) => {
                                  console.log('Autoplay prevented:', error);
                                });
                              }
                            }}
                            onLoadedData={() => handleItemLoad(item.id)}
                            style={{
                              objectFit: item.displayMode === 'theater' ? 'contain' : 'cover',
                              width: '100%',
                              height: item.displayMode === 'theater' ? 'auto' : '100%',
                              willChange: item.isVisible ? 'transform' : 'auto',
                              display: 'block',
                              visibility: 'visible'
                            }}
                          />

                          {/* Touch overlay for play/pause gestures */}
                          <div
                            className="video-touch-overlay"
                            onTouchEnd={(e) => handleSingleTap(item.index, e)}
                          >
                            {/* Play/Pause icon overlay */}
                            {showPlayIcon.get(item.index) && (
                              <div className="play-pause-icon">
                                {videoPaused.get(item.index) ? (
                                  // Play icon
                                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5v14l11-7z" fill="white" stroke="white" strokeWidth="2"/>
                                  </svg>
                                ) : (
                                  // Pause icon
                                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="white" stroke="white" strokeWidth="2"/>
                                  </svg>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : item.type === 'vimeo' && item.shouldLoad ? (
                        <div className="video-container-with-overlay">
                          <iframe
                            src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}&autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0`}
                            style={{
                              width: '100%',
                              height: item.displayMode === 'theater' ? 'auto' : '100%',
                              border: 'none',
                              borderRadius: '0',
                              objectFit: item.displayMode === 'theater' ? 'contain' : 'cover',
                              display: 'block',
                              visibility: 'visible'
                            }}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            onLoad={() => handleItemLoad(item.id)}
                          />

                          {/* Touch overlay for Vimeo videos */}
                          <div
                            className="video-touch-overlay"
                            onTouchEnd={(e) => handleSingleTap(item.index, e)}
                          >
                            {/* Play/Pause icon overlay */}
                            {showPlayIcon.get(item.index) && (
                              <div className="play-pause-icon">
                                {videoPaused.get(item.index) ? (
                                  // Play icon
                                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M8 5v14l11-7z" fill="white" stroke="white" strokeWidth="2"/>
                                  </svg>
                                ) : (
                                  // Pause icon
                                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="white" stroke="white" strokeWidth="2"/>
                                  </svg>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : item.type === 'image' && item.shouldLoad ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="mobile-scroll-image"
                          loading="lazy"
                          onLoad={() => handleItemLoad(item.id)}
                          style={{
                            willChange: item.isVisible ? 'transform' : 'auto'
                          }}
                        />
                      ) : (
                        // Placeholder for items that shouldn't load yet
                        <div
                          className="item-placeholder"
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: item.displayMode === 'fullscreen' ? '#333' : '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: item.displayMode === 'fullscreen' ? 'white' : 'black'
                          }}
                        >
                          <div className="loading-spinner"></div>
                        </div>
                      )}
                      
                      {/* Conditional Mobile Project Overlay */}
                      {item.displayMode === 'fullscreen' ? (
                        /* Full overlay for portrait videos */
                        <div className="mobile-overlay-container">
                          {/* Top Status Bar */}
                          <div className="mobile-status-bar">
                            <div className="status-left">
                            </div>
                            <div className="status-right">
                              <button
                                className="mute-toggle-btn"
                                onClick={handleMuteToggle}
                                title={isMuted ? "Unmute" : "Mute"}
                              >
                                {isMuted ? (
                                  // Muted icon
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                                ) : (
                                  // Unmuted icon
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Bottom Gradient Overlay */}
                          <div className="mobile-bottom-overlay">
                            <div className="project-info">
                              <h3 className="mobile-project-title">{item.title}</h3>
                              <p className="mobile-project-description">{item.description}</p>
                            </div>

                            <div className="mobile-action-bar">
                              <a
                                href={`/work/${item.slug}`}
                                className="mobile-view-btn"
                                title="View Project"
                              >
                                <span>View Project</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                              </a>

                              <button
                                className="mobile-share-btn"
                                onClick={() => handleShare(item)}
                                title="Share"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 616 0zM9 12a3 3 0 11-6 0 3 3 0 016 0zM21 19a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="mobile-scroll-hint">
                          <div className="scroll-line"></div>
                          <span className="scroll-text">Swipe up</span>
                        </div>
                      </div>
                      ) : (
                        /* Theater mode - only essential controls, no info panel */
                        <div className="theater-minimal-controls">
                          <button
                            className="mute-toggle-btn"
                            onClick={handleMuteToggle}
                            title={isMuted ? "Unmute" : "Mute"}
                          >
                            {isMuted ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Project info for contained mode - positioned outside video */}
                      {item.displayMode === 'contained' && (
                        <div className="mobile-project-info">
                          <div className="mobile-project-title">{item.title}</div>
                          <div className="mobile-project-description">{item.description}</div>
                          <div className="mobile-action-buttons-external">
                            <a
                              href={`/work/${item.slug}`}
                              className="mobile-view-btn-external"
                              title="View Project"
                            >
                              View Project
                            </a>
                            <button
                              className="mobile-share-btn-external"
                              onClick={() => handleShare(item)}
                              title="Share"
                            >
                              Share
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Project info for theater mode - positioned below entire video section */}
                    {item.displayMode === 'theater' && (
                      <div className="theater-project-info-below">
                        <div className="theater-project-title-below">{item.title}</div>
                        <div className="theater-project-description-below">{item.description}</div>
                        <div className="theater-action-buttons-below">
                          <a
                            href={`/work/${item.slug}`}
                            className="theater-view-btn-below"
                            title="View Project"
                          >
                            <span>View Project</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </a>
                          <button
                            className="theater-share-btn-below"
                            onClick={() => handleShare(item)}
                            title="Share"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 616 0zM9 12a3 3 0 11-6 0 3 3 0 616 0zM21 19a3 3 0 11-6 0 3 3 0 616 0z" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Footer spacer to allow scrolling past last video */}
                <div className="mobile-footer-spacer">
                  <div className="end-of-content">
                    <div className="end-indicator">
                      <div className="end-line"></div>
                      <span className="end-text">End of portfolio</span>
                      <div className="end-line"></div>
                    </div>
                    <p className="end-description">
                      Thanks for viewing our work!
                      <br />
                      <a href="/contact" className="contact-link">Get in touch</a> to discuss your project.
                    </p>
                  </div>
                </div>
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
