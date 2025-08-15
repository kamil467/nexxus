import React, { useRef, useEffect, useState, useCallback } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { WorkItem } from '../api/strapi';
import './Mobile.css';

interface Props {
  videos: WorkItem[];
  // Additional callbacks/handlers as needed
}

const Mobile: React.FC<Props> = ({ videos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLElement | null)[]>([]);
  const [currentPlayingVideo, setCurrentPlayingVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [visibleVideos, setVisibleVideos] = useState<Set<number>>(new Set());
  const [videosLoaded, setVideosLoaded] = useState<Set<number>>(new Set());
  const [showPlayButton, setShowPlayButton] = useState<Set<number>>(new Set());

  // Mute/unmute toggle handler
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Video play/pause handler - only play on user tap
  const handleVideoTap = useCallback((videoIndex: number) => {
    const muxPlayer = videoRefs.current[videoIndex] as any;
    if (!muxPlayer) return;

    // If this video is currently playing, pause it
    if (currentPlayingVideo === videoIndex) {
      muxPlayer.pause();
      setCurrentPlayingVideo(null);
      setShowPlayButton(prev => new Set(prev).add(videoIndex));
    } else {
      // Pause any currently playing video
      if (currentPlayingVideo !== null) {
        const currentPlayer = videoRefs.current[currentPlayingVideo] as any;
        if (currentPlayer && currentPlayer.pause) {
          currentPlayer.pause();
        }
      }

      // Play the tapped video
      muxPlayer.play().catch((error: any) => {
        console.log('Video play failed:', error);
      });
      setCurrentPlayingVideo(videoIndex);
      setShowPlayButton(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoIndex);
        return newSet;
      });
    }
  }, [currentPlayingVideo]);

  // Intersection observer for performance - pause videos when they leave viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          const muxPlayer = videoRefs.current[idx] as any;
          if (!muxPlayer) return;

          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Video is in viewport - mark as visible but don't autoplay
            setVisibleVideos(prev => new Set(prev).add(idx));
            setShowPlayButton(prev => new Set(prev).add(idx));
          } else {
            // Video left viewport - pause it for performance
            setVisibleVideos(prev => {
              const newSet = new Set(prev);
              newSet.delete(idx);
              return newSet;
            });

            // Pause video when it leaves viewport for better performance
            if (muxPlayer.pause) {
              muxPlayer.pause();
            }

            // If this was the playing video, clear the playing state
            if (currentPlayingVideo === idx) {
              setCurrentPlayingVideo(null);
            }

            setShowPlayButton(prev => new Set(prev).add(idx));
          }
        });
      },
      {
        root: null,
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '-20% 0px -20% 0px' // More conservative for performance
      }
    );

    // Observe each video wrapper
    videos.forEach((_, i) => {
      const wrapper = containerRef.current!.querySelector(`[data-index="${i}"]`);
      if (wrapper) observer.observe(wrapper);
    });

    return () => observer.disconnect();
  }, [videos, currentPlayingVideo]);

  return (
    <div
      className="mobile-scroll-container"
      ref={containerRef}
    >
      {videos.map((item, i) => {
        const isPortrait = item.cols === 1; // Portrait videos
        const isLandscape = item.cols === 2; // Landscape videos

        return (
          <div
            className="mobile-scroll-item"
            data-index={i}
            key={item.id}
          >
            {/* Blurred background image for immersive experience */}
            <div
              className="video-background"
              style={{
                backgroundImage: `url(https://image.mux.com/${item.muxPlaybackId}/thumbnail.jpg?width=1200&height=675&fit_mode=smartcrop)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(25px)',
                transform: 'scale(1.2)',
                opacity: 0.5
              }}
            />

            {/* Main video container with tap-to-play functionality */}
            <div className={`mobile-video-wrapper ${isPortrait ? 'portrait-wrapper' : 'landscape-wrapper'}`}>
              {/* Video with thumbnail and tap-to-play */}
              <div
                className={`video-container ${currentPlayingVideo === i ? 'playing' : ''}`}
                onClick={() => handleVideoTap(i)}
              >
                <MuxPlayer
                  playbackId={item.muxPlaybackId}
                  metadata={{
                    video_title: item.title || '',
                    viewer_user_id: 'mobile-feed'
                  }}
                  autoPlay={false} // No autoplay - user controlled
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata" // Better performance - load thumbnail only
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    background: '#000',
                    cursor: 'pointer'
                  }}
                  ref={el => (videoRefs.current[i] = el)}
                  onLoadedMetadata={() => {
                    setVideosLoaded(prev => new Set(prev).add(i));
                  }}
                />

                {/* Play/Pause Button Overlay */}
                {(showPlayButton.has(i) || currentPlayingVideo !== i) && (
                  <div className="play-button-overlay">
                    <button className="play-button" aria-label="Play video">
                      {currentPlayingVideo === i ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                )}



                {/* Mute/Unmute Button - Inside video player */}
                <button
                  className="mute-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12Z" fill="white"/>
                      <path d="M4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z" fill="white"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12S16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12S18.01 4.14 14 3.23Z" fill="white"/>
                    </svg>
                  )}
                </button>
              </div>

            </div>



            {/* Project Details - Moved outside video area */}
            <div className="project-info-panel">
              <a href={`/work/${item.slug}`} className="project-title-link" title="View Project Details">
                <h3 className="project-title">
                  {item.title}
                  <svg className="project-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </h3>
              </a>
              {item.description && (
                <p className="project-description">{item.description}</p>
              )}
              <div className="project-meta">
                <span className="video-index">{i + 1} / {videos.length}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Mobile;
