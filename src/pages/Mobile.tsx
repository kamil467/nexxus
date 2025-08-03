import React, { useRef, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { WorkItem } from '../api/supabase';
import './Mobile.css';

interface Props {
  videos: WorkItem[];
  // Additional callbacks/handlers as needed
}

const Mobile: React.FC<Props> = ({ videos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLElement | null)[]>([]);

  // Auto play/pause using intersection observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          const muxPlayer = videoRefs.current[idx] as any;
          if (!muxPlayer) return;

          if (entry.isIntersecting) {
            // Play video when visible
            muxPlayer.play?.().catch(() => {});
          } else {
            muxPlayer.pause?.();
            muxPlayer.currentTime = 0;
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    // Observe each video wrapper (not the video itself!)
    videos.forEach((_, i) => {
      const wrapper = containerRef.current!.querySelector(`[data-index="${i}"]`);
      if (wrapper) observer.observe(wrapper);
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <div
      className="mobile-scroll-container"
      ref={containerRef}
      style={{ height: '100vh', overflowY: 'scroll', WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}
    >
      {videos.map((item, i) => (
        <div
          className="mobile-scroll-item"
          data-index={i}
          key={item.id}
          style={{
            height: '90vh',
            minHeight: 320,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: '#000'
          }}
        >
          <div  tabIndex={-1}
            className={
              item.cols === 1
                ? 'mobile-video-wrapper portrait-wrapper'
                : 'mobile-video-wrapper landscape-wrapper'
            }
            style={{
              width: item.cols === 1 ? 'calc(90vh * 9 / 16)' : '100%',
              height: item.cols === 1 ? '90vh' : 'auto',
              maxHeight: '90vh',
              borderRadius: 12,
              overflow: 'hidden',
              // For landscape: blurred backdrop
              position: 'relative'
            }}
          >
            {/* Optional: blurred background for 16:9 videos 
            {item.cols === 2 && (
              <MuxPlayer 
                playbackId={item.muxPlaybackId}
                muted
                loop
                playsInline
                preload="none"
                autoPlay="muted"
                style={{
                  pointerEvents: 'none',
                  width: '120%',
                  height: '120%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%) scale(1.18)',
                  filter: 'blur(22px) brightness(0.6)',
                  opacity: 0.7,
                  zIndex: 1,
                  border: 'none',
                  background: 'transparent'
                }}
               
              />
            )}
              */}
            {/* Main video */}
            <MuxPlayer
              playbackId={item.muxPlaybackId}
              metadata={{
                video_title: item.title || '',
                viewer_user_id: 'mobile-feed'
              }}
              autoPlay="muted"
              muted
              loop
              playsInline
              preload="auto"
              style={{
                borderRadius: 12,
                width: '100%',
                height: item.cols === 1 ? '100%' : '100%',
                maxHeight: '90vh',
                objectFit: item.cols === 1 ? 'cover' : 'contain',
                position: 'relative',
                zIndex: 2,
                background: 'transparent'
              }}
              ref={el => (videoRefs.current[i] = el)}
              onLoadStart={() => {/* optional: your load handler */}}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mobile;
