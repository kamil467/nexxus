import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Minimize } from 'react-feather';
import { supabase } from '../api/supabase';
import { WorkItem } from '../api/supabase';
import MuxPlayer from '@mux/mux-player-react';
import ClientsSection from '../components/ClientsSection';
import './WorkDetails.css';

const WorkDetails = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [showInfo, setShowInfo] = useState(false);
  const [currentProject, setCurrentProject] = useState<WorkItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [videoProgress, setVideoProgress] = useState<{ [key: string]: number }>({});
  const [videoDuration, setVideoDuration] = useState<{ [key: string]: number }>({});
  const [videoVolume, setVideoVolume] = useState<{ [key: string]: number }>({});
  const [showControls, setShowControls] = useState<{ [key: string]: boolean }>({});
  const [showVolumeSlider, setShowVolumeSlider] = useState<{ [key: string]: boolean }>({});
  const [isFullscreen, setIsFullscreen] = useState<{ [key: string]: boolean }>({});
  const [videoAspectRatio, setVideoAspectRatio] = useState<{ [key: string]: number }>({});
  const [videoOrientation, setVideoOrientation] = useState<{ [key: string]: 'landscape' | 'portrait' | 'square' }>({});
  const videoRefs = useRef<{ [key: string]: any }>({});
  const controlTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  // Fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;

      if (isCurrentlyFullscreen) {
        // Find which video is in fullscreen
        const fullscreenElement = document.fullscreenElement as any;
        if (fullscreenElement && fullscreenElement.tagName === 'MUX-PLAYER') {
          // Find the video ID that matches this playback ID
          Object.keys(videoRefs.current).forEach(videoId => {
            if (videoRefs.current[videoId] === fullscreenElement) {
              setIsFullscreen(prev => ({ ...prev, [videoId]: true }));
              setShowControls(prev => ({ ...prev, [videoId]: true }));
            }
          });
        }
      } else {
        // Exited fullscreen
        unlockOrientation(); // Unlock orientation when exiting fullscreen
        setIsFullscreen(prev => {
          const newState = { ...prev };
          Object.keys(newState).forEach(key => {
            newState[key] = false;
          });
          return newState;
        });
        // Show controls when exiting fullscreen
        setShowControls(prev => {
          const newState = { ...prev };
          Object.keys(newState).forEach(key => {
            newState[key] = true;
          });
          return newState;
        });
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(controlTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Convert video IDs to Mux playback IDs
  const getMuxPlaybackId = (item: any): string | null => {
    console.log('Getting Mux ID for item:', item);

    // Check all possible video ID fields
    if (item.muxPlaybackId) {
      console.log('Found muxPlaybackId:', item.muxPlaybackId);
      return item.muxPlaybackId;
    }
    if (item.hId) {
      console.log('Found hId:', item.hId);
      return item.hId;
    }
    if (item.videoId) {
      console.log('Found videoId (might need conversion):', item.videoId);
      // For now, return null as videoId needs conversion
      return null;
    }

    console.log('No valid Mux playback ID found');
    return null;
  };

  // Video control functions
  const toggleVideoPlayback = (videoId: string) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      if (playingVideos.has(videoId)) {
        muxPlayer.pause();
      } else {
        muxPlayer.play().catch((error: any) => {
          console.log('Play was prevented:', error);
        });
      }
    } catch (error) {
      console.error('Error controlling video playback:', error);
    }
  };

  const toggleMute = (videoId: string) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      muxPlayer.muted = !muxPlayer.muted;
      if (muxPlayer.muted) {
        setMutedVideos(prev => new Set(prev).add(videoId));
      } else {
        setMutedVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(videoId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  };

  const setVolume = (videoId: string, volume: number) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      muxPlayer.volume = Math.max(0, Math.min(1, volume));
      setVideoVolume(prev => ({ ...prev, [videoId]: volume }));

      if (volume === 0) {
        muxPlayer.muted = true;
        setMutedVideos(prev => new Set(prev).add(videoId));
      } else {
        muxPlayer.muted = false;
        setMutedVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(videoId);
          return newSet;
        });
      }
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  };

  const skipBackward = (videoId: string, seconds: number = 10) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      muxPlayer.currentTime = Math.max(0, muxPlayer.currentTime - seconds);
    } catch (error) {
      console.error('Error skipping backward:', error);
    }
  };

  const skipForward = (videoId: string, seconds: number = 10) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      muxPlayer.currentTime = Math.min(muxPlayer.duration || 0, muxPlayer.currentTime + seconds);
    } catch (error) {
      console.error('Error skipping forward:', error);
    }
  };

  const seekTo = (videoId: string, percentage: number) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer || !videoDuration[videoId]) return;

    try {
      const newTime = (percentage / 100) * videoDuration[videoId];
      muxPlayer.currentTime = newTime;
    } catch (error) {
      console.error('Error seeking video:', error);
    }
  };

  const toggleFullscreen = async (videoId: string) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        await unlockOrientation();
        setIsFullscreen(prev => ({ ...prev, [videoId]: false }));
      } else {
        await muxPlayer.requestFullscreen();
        await lockOrientation(videoId);
        setIsFullscreen(prev => ({ ...prev, [videoId]: true }));
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Auto-hide controls when video is playing
  const handleMouseMove = (videoId: string) => {
    setShowControls(prev => ({ ...prev, [videoId]: true }));

    // Clear existing timeout
    if (controlTimeouts.current[videoId]) {
      clearTimeout(controlTimeouts.current[videoId]);
    }

    // Auto-hide if video is playing (both normal and fullscreen)
    if (playingVideos.has(videoId)) {
      const hideDelay = isFullscreen[videoId] ? 3000 : 2000; // Shorter delay for normal view
      controlTimeouts.current[videoId] = setTimeout(() => {
        setShowControls(prev => ({ ...prev, [videoId]: false }));
      }, hideDelay);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine video orientation from project cols and rows
  const getVideoOrientationFromProject = (cols: number, rows: number): 'landscape' | 'portrait' | 'square' => {
    if (cols === 1 && rows === 3) {
      return 'portrait'; // 9:16 aspect ratio
    } else if (cols === 3 && rows === 3) {
      return 'square'; // 1:1 aspect ratio (or could be landscape)
    } else if (cols === 2 && rows === 2) {
      return 'square'; // 1:1 aspect ratio
    } else if (cols === 2 &&  rows === 3) {
      return 'landscape'; // wider than tall
    } else if (rows > cols) {
      return 'portrait'; // taller than wide
    } else {
      return 'square'; // equal dimensions
    }
  };

  // Detect video aspect ratio and orientation
  const detectVideoOrientation = (videoId: string, width: number, height: number) => {
    const aspectRatio = width / height;
    setVideoAspectRatio(prev => ({ ...prev, [videoId]: aspectRatio }));

    let detectedOrientation: 'landscape' | 'portrait' | 'square';
    if (aspectRatio > 1.2) {
      detectedOrientation = 'landscape'; // 16:9, 21:9, etc.
    } else if (aspectRatio < 0.8) {
      detectedOrientation = 'portrait'; // 9:16, 4:5, etc.
    } else {
      detectedOrientation = 'square'; // 1:1 or close to square
    }

    // Only update orientation if we don't have a pre-determined one, or if the detected one is significantly different
    setVideoOrientation(prev => {
      const currentOrientation = prev[videoId];
      if (!currentOrientation) {
        // No pre-determined orientation, use detected
        console.log(`Video ${videoId}: ${width}x${height}, aspect: ${aspectRatio.toFixed(2)}, detected orientation: ${detectedOrientation}`);
        return { ...prev, [videoId]: detectedOrientation };
      } else {
        // We have a pre-determined orientation, keep it unless detection is very different
        console.log(`Video ${videoId}: ${width}x${height}, aspect: ${aspectRatio.toFixed(2)}, detected: ${detectedOrientation}, keeping pre-determined: ${currentOrientation}`);
        return prev;
      }
    });
  };

  // Check if device supports orientation lock
  const supportsOrientationLock = () => {
    return 'orientation' in screen && 'lock' in screen.orientation;
  };

  // Lock screen orientation based on video aspect ratio
  const lockOrientation = async (videoId: string) => {
    if (!supportsOrientationLock()) {
      console.log('Orientation lock not supported on this device');
      return;
    }

    const orientation = videoOrientation[videoId];

    try {
      if (orientation === 'landscape') {
        // For 16:9 videos, lock to landscape
        await (screen.orientation as any).lock('landscape');
        console.log('Locked to landscape for 16:9 video');
      } else if (orientation === 'portrait') {
        // For 9:16 videos, lock to portrait
        await (screen.orientation as any).lock('portrait');
        console.log('Locked to portrait for 9:16 video');
      } else {
        // For square videos, allow natural orientation
        await (screen.orientation as any).lock('natural');
        console.log('Locked to natural for square video');
      }
    } catch (error) {
      console.log('Could not lock orientation:', error);
    }
  };

  // Unlock orientation when exiting fullscreen
  const unlockOrientation = async () => {
    if (!supportsOrientationLock()) return;

    try {
      (screen.orientation as any).unlock();
      console.log('Orientation unlocked');
    } catch (error) {
      console.log('Could not unlock orientation:', error);
    }
  };
  
  // Fetch work item data from Supabase
  useEffect(() => {
    const fetchWorkItem = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('Works')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching work item:', error);
          setError('Failed to load project details');
        } else if (!data) {
          setError('Project not found');
        } else {
          console.log('Fetched work item:', data);
          setCurrentProject(data);

          // Initialize loading states for all media items
          const initialLoadingStates: { [key: string]: boolean } = {};
          const initialOrientations: { [key: string]: 'landscape' | 'portrait' | 'square' } = {};

          data.relatedItems?.forEach((item: any, index: number) => {
            if (item.type === 'video') {
              const videoId = `video-${index}`;
              initialLoadingStates[videoId] = true;

              // Pre-determine orientation from project cols and rows
              if (data.cols && data.rows) {
                const orientation = getVideoOrientationFromProject(data.cols, data.rows);
                initialOrientations[videoId] = orientation;
                console.log(`Pre-determined orientation for ${videoId}: ${orientation} (cols: ${data.cols}, rows: ${data.rows})`);
              }
            } else if (item.type === 'image') {
              initialLoadingStates[`image-${index}`] = true;
            }
          });

          setLoadingStates(initialLoadingStates);
          setVideoOrientation(initialOrientations);
        }
      } catch (err) {
        console.error('Error in fetch operation:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkItem();
  }, [slug]);

  const handleMediaLoad = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const handleVideoRef = (id: string, videoElement: any) => {
    if (videoElement && !videoRefs.current[id]) {
      videoRefs.current[id] = videoElement;

      // Try to detect orientation immediately if dimensions are available
      setTimeout(() => {
        const videoWidth = videoElement.videoWidth || videoElement.clientWidth;
        const videoHeight = videoElement.videoHeight || videoElement.clientHeight;

        console.log(`Video ${id} immediate check: ${videoWidth}x${videoHeight}`);

        if (videoWidth && videoHeight && !videoOrientation[id]) {
          detectVideoOrientation(id, videoWidth, videoHeight);
        }
      }, 100); // Small delay to allow MuxPlayer to initialize

      // Add event listeners for video controls
      videoElement.addEventListener('play', () => {
        setPlayingVideos(prev => new Set(prev).add(id));
      });

      videoElement.addEventListener('pause', () => {
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      });

      videoElement.addEventListener('timeupdate', () => {
        setVideoProgress(prev => ({
          ...prev,
          [id]: (videoElement.currentTime / videoElement.duration) * 100 || 0
        }));
      });

      videoElement.addEventListener('loadedmetadata', () => {
        setVideoDuration(prev => ({
          ...prev,
          [id]: videoElement.duration || 0
        }));

        // Detect video dimensions and orientation
        const videoWidth = videoElement.videoWidth || videoElement.clientWidth;
        const videoHeight = videoElement.videoHeight || videoElement.clientHeight;

        console.log(`Video ${id} loadedmetadata: ${videoWidth}x${videoHeight}`);

        if (videoWidth && videoHeight) {
          detectVideoOrientation(id, videoWidth, videoHeight);
        }
      });

      // Also try to detect orientation on loadeddata event as backup
      videoElement.addEventListener('loadeddata', () => {
        const videoWidth = videoElement.videoWidth || videoElement.clientWidth;
        const videoHeight = videoElement.videoHeight || videoElement.clientHeight;

        console.log(`Video ${id} loadeddata: ${videoWidth}x${videoHeight}`);

        if (videoWidth && videoHeight && !videoOrientation[id]) {
          detectVideoOrientation(id, videoWidth, videoHeight);
        }
      });

      // Also try to detect on canplay event as another backup
      videoElement.addEventListener('canplay', () => {
        const videoWidth = videoElement.videoWidth || videoElement.clientWidth;
        const videoHeight = videoElement.videoHeight || videoElement.clientHeight;

        console.log(`Video ${id} canplay: ${videoWidth}x${videoHeight}`);

        if (videoWidth && videoHeight && !videoOrientation[id]) {
          detectVideoOrientation(id, videoWidth, videoHeight);
        }
      });

      videoElement.addEventListener('volumechange', () => {
        setVideoVolume(prev => ({ ...prev, [id]: videoElement.volume }));
        if (videoElement.muted) {
          setMutedVideos(prev => new Set(prev).add(id));
        } else {
          setMutedVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }
      });

      // Initialize volume and mute state
      setVideoVolume(prev => ({ ...prev, [id]: videoElement.volume || 1 }));

      // Initialize mute state based on actual video element
      if (videoElement.muted) {
        setMutedVideos(prev => new Set(prev).add(id));
      } else {
        setMutedVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    }
  };

  // Back to home page
  const handleBackToWork = () => {
    navigate('/'); // Navigate to the Home page
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error || !currentProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Oops!</h2>
          <p className="text-gray-700 mb-4">{error || 'Project not found'}</p>
          <button 
            onClick={handleBackToWork}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            <ArrowLeft className="inline mr-2" size={16} />
            Back to Work
          </button>
        </div>
      </div>
    );
  }
  
  // Render project details
  return (
    <div className="min-h-screen">
      {/* Header Section - Mobile Optimized */}
      <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex justify-between items-center">
          <Link to="/"> {/* Link to Home page */}
            <button className="flex items-center text-gray-600 hover:text-[#A9AC87] transition-colors text-sm md:text-base">
              <ArrowLeft className="mr-2" size={20} />
              Our Work
            </button>
          </Link>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center text-gray-600 hover:text-[#A9AC87] transition-colors md:hidden"
          >
            Info
              {showInfo ? <X className="ml-2" size={20} /> : <Plus className="ml-2" size={20} />}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <h1 className="text-lg md:text-xl font-light">{currentProject?.title}</h1>
            <span className="hidden md:inline text-gray-400">—</span>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-0">{currentProject?.description}</p>
          </div>
          
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hidden md:flex items-center text-gray-600 hover:text-[#A9AC87] transition-colors"
          >
            Info
            {showInfo ? <X className="ml-2" size={20} /> : <Plus className="ml-2" size={20} />}
          </button>
        </div>

        <hr className="border-t border-gray-200" />

        {/* Info Section - Mobile Optimized */}
        {showInfo && (
          <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-gray-800">Overview</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-light">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentProject?.overview || 'No overview available.'
                    }}
                  />
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-gray-800">Client Impact</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-light">
                   <div
                    dangerouslySetInnerHTML={{
                      __html: currentProject?.client_impact || 'No client impact information available.'
                    }}
                  />
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Media Content Section - Mobile Optimized */}
        <div className="relative">
          {/* Related items will be implemented later */}
          {/* TODO: Implement related_items display */}
        </div>

        {/* Clients Section */}
        <ClientsSection className="mt-20" />
      </div>
    );
};

export default WorkDetails;
