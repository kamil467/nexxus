import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Play, Pause, Volume2, VolumeX, Maximize } from 'react-feather';
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
  const [showControls, setShowControls] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: any }>({});

  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

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

  const toggleFullscreen = (videoId: string) => {
    const muxPlayer = videoRefs.current[videoId];
    if (!muxPlayer) return;

    try {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        muxPlayer.requestFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
          .from('work_items')
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
          data.relatedItems?.forEach((item: any, index: number) => {
            if (item.type === 'video') {
              initialLoadingStates[`video-${index}`] = true;
            } else if (item.type === 'image') {
              initialLoadingStates[`image-${index}`] = true;
            }
          });
          setLoadingStates(initialLoadingStates);
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
      });

      videoElement.addEventListener('volumechange', () => {
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
                  {currentProject?.overview || 'No overview available.'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-gray-800">Client Impact</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-light">
                  {currentProject?.capability || 'No capability information available.'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-gray-800">Team</h3>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line font-light">
                  {currentProject?.team || 'No team information available.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Media Content Section - Mobile Optimized */}
        <div className="relative">
          {currentProject?.relatedItems?.filter(item => item.type === 'video')?.map((item, index) => {
            const videoId = `video-${index}`;
            const muxPlaybackId = getMuxPlaybackId(item);

            const isPlaying = playingVideos.has(videoId);

            console.log('Video item:', item);
            console.log('Mux Playback ID:', muxPlaybackId);
            console.log('isPlaying', isPlaying);
            console.log('videoId', videoId);
            console.log('loadingStates', loadingStates[videoId]);

            return (
              <div key={videoId} className="mb-8">
                <div className="w-full bg-[#F5F5F0] py-4 md:py-8">
                  <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
                    {/* Loading Spinner */}
                

                    {/* Video Player */}
                    {muxPlaybackId ? (
                      <div
                        className="relative w-full bg-black rounded-lg overflow-hidden group"
                        style={{ aspectRatio: '16/9' }}
                        onMouseEnter={() => setShowControls(prev => ({ ...prev, [videoId]: true }))}
                        onMouseLeave={() => setShowControls(prev => ({ ...prev, [videoId]: false }))}
                      >
                        <MuxPlayer
                          playbackId={muxPlaybackId}
                          autoPlay={false}
                          muted={true}
                          style={{
                            width: '100%',
                            height: '100%',
                            background: '#000'
                          }}
                          ref={(el) => handleVideoRef(videoId, el)}
                          onLoadedData={() => handleMediaLoad(videoId)}
                          onError={(e) => console.error('MuxPlayer error:', e)}
                        />

                        {/* Video Controls Overlay */}
                        <div className={`absolute inset-0 transition-opacity duration-300 ${
                          showControls[videoId] || !playingVideos.has(videoId) ? 'opacity-100' : 'opacity-0'
                        }`}>

                          {/* Center Play/Pause Button */}
                          <div
                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                            onClick={() => toggleVideoPlayback(videoId)}
                          >
                            {!playingVideos.has(videoId) && (
                              <div className="bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition-all backdrop-blur-sm">
                                <Play size={48} className="text-white ml-1" />
                              </div>
                            )}
                          </div>

                          {/* Top Controls */}
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                              onClick={() => toggleFullscreen(videoId)}
                              className="bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all backdrop-blur-sm"
                            >
                              <Maximize size={20} className="text-white" />
                            </button>
                          </div>

                          {/* Bottom Controls */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4">

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div
                                className="w-full h-1 bg-white bg-opacity-30 rounded-full cursor-pointer"
                                onClick={(e) => {
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  const percentage = ((e.clientX - rect.left) / rect.width) * 100;
                                  seekTo(videoId, percentage);
                                }}
                              >
                                <div
                                  className="h-full bg-white rounded-full transition-all"
                                  style={{ width: `${videoProgress[videoId] || 0}%` }}
                                />
                              </div>
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => toggleVideoPlayback(videoId)}
                                  className="hover:scale-110 transition-transform"
                                >
                                  {playingVideos.has(videoId) ? (
                                    <Pause size={24} className="text-white" />
                                  ) : (
                                    <Play size={24} className="text-white ml-1" />
                                  )}
                                </button>

                                <button
                                  onClick={() => toggleMute(videoId)}
                                  className="hover:scale-110 transition-transform"
                                >
                                  {mutedVideos.has(videoId) ? (
                                    <VolumeX size={24} className="text-white" />
                                  ) : (
                                    <Volume2 size={24} className="text-white" />
                                  )}
                                </button>
                              </div>

                              <div className="text-white text-sm">
                                {formatTime(videoProgress[videoId] * (videoDuration[videoId] || 0) / 100 || 0)} / {formatTime(videoDuration[videoId] || 0)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-video media-error">
                        <div className="media-error-icon">
                          <Play size={48} />
                        </div>
                        <p className="media-error-text">Video not available</p>
                        <p className="media-error-details">
                          {item.videoId ? `Video ID: ${item.videoId}` : 'No video ID found'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <hr className="my-2 md:my-4 border-t border-gray-200" />
              </div>
            );
          })}
  
          {currentProject?.relatedItems?.filter(item => item.type === 'image')?.map((item, index) => {
            const imageId = `image-${index}`;

            return (
              <div className="relative mb-8" key={imageId}>
                <div className="w-full bg-[#F5F5F0] py-4 md:py-8">
                  <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
                    {/* Loading Spinner */}
                    {loadingStates[imageId] !== false && (
                      <div className="media-loading">
                        <div className="loading-spinner"></div>
                      </div>
                    )}

                    {/* Image */}
                    {item.src ? (
                      <div className="relative group">
                        <img
                          src={item.src}
                          alt={`${currentProject?.title} - Related Image ${index + 1}`}
                          className="work-details-image w-full h-[50vh] md:h-[70vh] object-cover rounded-lg md:rounded-none"
                          onLoad={() => handleMediaLoad(imageId)}
                          onError={() => handleMediaLoad(imageId)}
                          loading="lazy"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg md:rounded-none"></div>
                      </div>
                    ) : (
                      <div className="w-full h-[50vh] md:h-[70vh] media-error">
                        <div className="media-error-icon">
                          <X size={48} />
                        </div>
                        <p className="media-error-text">Image not available</p>
                      </div>
                    )}
                  </div>
                </div>
                <hr className="my-2 md:my-4 border-t border-gray-200" />
              </div>
            );
          })}
        </div>

        {/* Clients Section */}
        <ClientsSection className="mt-20" />
      </div>
    );
};

export default WorkDetails;