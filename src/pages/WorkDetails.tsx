import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import workItems from '../components/workitems';

{/*
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
*/}

const WorkDetails = () => {

  // const [expandedProject, setExpandedProject] = useState<number | null>(null);
 //  const [showInfo, setShowInfo] = useState(false);

  //const currentProject = projects.find(p => p.id === expandedProject);
  const { slug } = useParams<{ slug: string }>();

  console.log("The slug is ", slug);
   const currentProject = workItems.find(p => p.slug === slug);
    console.log(currentProject);
  if (currentProject) {
    return (
      <div className="min-h-screen">
        <div className="px-8 py-6 flex items-center justify-between">
        <Link to="/work">
          <button
           
            className="flex items-center text-gray-600 hover:text-[#A9AC87]"
          >
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
            // onClick={() => setShowInfo(!showInfo)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            Info
            {/* {showInfo ? <Minus className="ml-2" size={20} /> : <Plus className="ml-2" size={20} />} */}
          </button>
        </div>

        <div className="relative">
  {/* Separate videos and images */}
  {currentProject.relatedItems.filter(item => item.type === 'video').map((item, index) => (
    <iframe
      key={index}
      src={`https://player.vimeo.com/video/${item.videoId}?h=${item.hId}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
      title={`Related video ${index + 1}`}
    ></iframe>
  ))}
  {/* Separator */}
  <hr className="my-4 border-t border-gray-300" />
  {currentProject.relatedItems.filter(item => item.type === 'image').map((item, index) => (
    <img
      key={index}
      src={item.src}
      alt={`Related work ${index + 1}`}
      className="w-full h-[70vh] object-cover"
    />
  ))}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-white bg-opacity-90 rounded-full p-4">
      <ArrowRight className="text-gray-800" size={32} />
    </div>
  </div>
</div>

        {/* {showInfo && (
          <div className="container mx-auto px-8 py-12 grid grid-cols-3 gap-16">
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Overview</h3>
              <p className="text-gray-800">{currentProject.title}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Capability</h3>
              <p className="text-gray-800">{currentProject.description}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-400 mb-2">Team</h3>
              <p className="text-gray-800">{currentProject.description}</p>
            </div>
          </div>
        )} */}

        <div className="container mx-auto px-8 py-12">
          <h3 className="text-xl font-light mb-8">Related Work</h3>
          <div className="grid grid-cols-3 gap-8">
            {currentProject.relatedItems.map((item, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded-lg">
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`Related work ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : item.type === 'video' ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${item.videoId}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={`Related video ${index + 1}`}
                  ></iframe>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default WorkDetails;