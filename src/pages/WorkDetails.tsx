import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import workItems from '../components/workitems';

const WorkDetails = () => {

  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const handleMediaLoad = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const { slug } = useParams<{ slug: string }>();
  const currentProject = workItems.find(p => p.slug === slug);
  console.log("The slug is ", slug);
  console.log(currentProject);
  if (currentProject) {
    return (
      <div className="min-h-screen">
        <div className="px-8 py-4 flex items-center justify-between">
          <Link to="/work">
            <button className="flex items-center text-gray-600 hover:text-[#A9AC87] transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              Our Work
            </button>
          </Link>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-light">{currentProject.title}</h1>
            <span className="text-gray-400">—</span>
            <span className="text-gray-600">{currentProject.description}</span>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center text-gray-600 hover:text-[#A9AC87] transition-colors"
          >
            Info
            {showInfo ? <X className="ml-2" size={20} /> : <Plus className="ml-2" size={20} />}
          </button>
        
        </div>
        <hr className="border-t border-gray-200" />
        {showInfo && (
          <div className="container mx-auto px-8 py-8 grid grid-cols-3 gap-16 bg-gray-50">
            <div className="space-y-2">
              <h3 className="text-xl font-light mb-3 text-gray-800">Overview</h3>
              <p className="text-sm leading-relaxed text-gray-600 font-light">
                {currentProject.overview || 'No overview available.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-light mb-3 text-gray-800">Capability</h3>
              <p className="text-sm leading-relaxed text-gray-600 font-light">
                {currentProject.capability || 'No capability information available.'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-light mb-3 text-gray-800">Team</h3>
              <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line font-light">
                {currentProject.team || 'No team information available.'}
              </p>
            </div>
          </div>
        )}

        <div className="relative">
          {currentProject.relatedItems.filter(item => item.type === 'video').map((item, index) => (
            <><div className="w-full bg-[#F5F5F0] py-8" key={`video-${index}`}>
              <div className="container mx-auto max-w-7xl relative">
                {loadingStates[`video-${index}`] !== false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F0]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A9AC87]"></div>
                  </div>
                )}
                <iframe
                  src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}&autoplay=0&controls=1`}
                  className="w-full aspect-video"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`Related video ${index + 1}`}
                  style={{ pointerEvents: 'auto' }}
                  onLoad={() => handleMediaLoad(`video-${index}`)}
                ></iframe>
              </div>
            </div><hr className="my-4 border-t border-gray-300" /></>
          ))}
  
          {currentProject.relatedItems.filter(item => item.type === 'image').map((item, index) => (
            <div className="relative" key={`image-${index}`}>
              {loadingStates[`image-${index}`] !== false && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F0]">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A9AC87]"></div>
                </div>
              )}
              <img
                src={item.src}
                alt={`Related work ${index + 1}`}
                className="w-full h-[70vh] object-cover"
                onLoad={() => handleMediaLoad(`image-${index}`)}
              />
              <hr className="my-4 border-t border-gray-300" />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default WorkDetails;