import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'react-feather';
import workItems from '../components/workitems';

const WorkDetails = () => {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [showInfo, setShowInfo] = useState(false);

  const { slug } = useParams<{ slug: string }>();
  const currentProject = workItems.find(p => p.slug === slug);

  const handleMediaLoad = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  if (currentProject) {
    return (
      <div className="min-h-screen">
        {/* Header Section - Mobile Optimized */}
        <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex justify-between items-center">
            <Link to="/work">
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
            <h1 className="text-lg md:text-xl font-light">{currentProject.title}</h1>
            <span className="hidden md:inline text-gray-400">—</span>
            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-0">{currentProject.description}</p>
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
                  {currentProject.overview || 'No overview available.'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-gray-800">Capability</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-light">
                  {currentProject.capability || 'No capability information available.'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-light mb-2 md:mb-3 text-gray-800">Team</h3>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line font-light">
                  {currentProject.team || 'No team information available.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Media Content Section - Mobile Optimized */}
        <div className="relative">
          {currentProject.relatedItems.filter(item => item.type === 'video').map((item, index) => (
            <div key={`video-${index}`}>
              <div className="w-full bg-[#F5F5F0] py-4 md:py-8">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
                  {loadingStates[`video-${index}`] !== false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F0]">
                      <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#A9AC87]"></div>
                    </div>
                  )}
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&loop=1&rel=0&mute=1&modestbranding=1&controls=1`}
                    className="w-full aspect-video rounded-lg md:rounded-none"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Related video ${index + 1}`}
                    style={{ pointerEvents: 'auto' }}
                    onLoad={() => handleMediaLoad(`video-${index}`)}
                  ></iframe>
                </div>
              </div>
              <hr className="my-2 md:my-4 border-t border-gray-200" />
            </div>
          ))}
  
          {currentProject.relatedItems.filter(item => item.type === 'image').map((item, index) => (
            <div className="relative" key={`image-${index}`}>
              {loadingStates[`image-${index}`] !== false && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F0]">
                  <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#A9AC87]"></div>
                </div>
              )}
              <div className="px-4 md:px-0">
                <img
                  src={item.src}
                  alt={`Related work ${index + 1}`}
                  className="w-full h-[50vh] md:h-[70vh] object-cover rounded-lg md:rounded-none"
                  onLoad={() => handleMediaLoad(`image-${index}`)}
                />
              </div>
              <hr className="my-2 md:my-4 border-t border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default WorkDetails;