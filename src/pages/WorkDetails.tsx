import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  client: string;
  image: string;
  overview: string;
  capability: string;
  team: string;
  relatedImages: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'These Legs',
    client: 'Audi',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80',
    overview: 'A little girl gets her and gets frustrated at the lines if its too long. We created a heartwarming campaign that captures the essence of childhood wonder and determination.',
    capability: 'Advertising',
    team: 'BFD',
    relatedImages: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
    ]
  },
  {
    id: 2,
    title: 'Urban Dreams',
    client: 'Nike',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    overview: 'Exploring the intersection of urban culture and athletic performance through a series of compelling visual narratives.',
    capability: 'Photography',
    team: 'Creative Studio',
    relatedImages: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80'
    ]
  },
  {
    id: 3,
    title: 'Nature\'s Call',
    client: 'REI',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    overview: 'A campaign that reconnects urban dwellers with the raw beauty of nature through immersive storytelling.',
    capability: 'Content Creation',
    team: 'Outdoor Division',
    relatedImages: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80'
    ]
  }
];

const WorkDetails = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const currentProject = projects.find(p => p.id === expandedProject);

  if (expandedProject !== null && currentProject) {
    return (
      <div className="min-h-screen">
        <div className="px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => setExpandedProject(null)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2" size={20} />
            Our Work
          </button>
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-light">{currentProject.title}</h1>
            <span className="text-gray-400">—</span>
            <span className="text-gray-600">{currentProject.client}</span>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            Info
            {showInfo ? <Minus className="ml-2" size={20} /> : <Plus className="ml-2" size={20} />}
          </button>
        </div>

        <div className="relative">
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className="w-full h-[70vh] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 rounded-full p-4">
              <ArrowRight className="text-gray-800" size={32} />
            </div>
          </div>
        </div>

        {showInfo && (
          <div className="container mx-auto px-8 py-12 grid grid-cols-3 gap-16">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Overview</h3>
              <p className="text-gray-800">{currentProject.overview}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Capability</h3>
              <p className="text-gray-800">{currentProject.capability}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Team</h3>
              <p className="text-gray-800">{currentProject.team}</p>
            </div>
          </div>
        )}

        <div className="container mx-auto px-8 py-12">
          <h3 className="text-xl font-light mb-8">Related Work</h3>
          <div className="grid grid-cols-3 gap-8">
            {currentProject.relatedImages.map((image, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Related work ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div 
            key={project.id}
            className="cursor-pointer group"
            onClick={() => setExpandedProject(project.id)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Plus className="text-white" size={32} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-light">{project.title}</h3>
              <p className="text-gray-600">{project.client}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkDetails;