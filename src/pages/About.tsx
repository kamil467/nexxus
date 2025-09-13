import React, { useEffect, useState } from 'react';
import { Users2, Lightbulb, Target, Sparkles, Linkedin, Twitter, Globe } from 'lucide-react';
import ClientsSection from '../components/ClientsSection';
import './About.css';

// Team data
const team = [
  {
    name: 'Sarah Johnson',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    bio: 'Over 10 years of experience in digital design and brand strategy.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://example.com'
    }
  },
  {
    name: 'Michael Chen',
    role: 'Technical Lead',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    bio: 'Expert in modern web technologies and scalable architecture.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://example.com'
    }
  },
  {
    name: 'Emma Davis',
    role: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    bio: 'Passionate about creating intuitive and delightful user experiences.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://example.com'
    }
  }
];

const values = [
  {
    icon: Users2,
    title: 'Leadership',
    description: 'We empower individuals to lead with purpose and influence.By nurturing leaders, we create a ripple effect of growth and inspiration.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead by embracing fresh ideas in a fast-changing world.For us, innovation means working smarter—not just faster.'
  },
  {
    icon: Target,
    title: 'Integrity',
    description: 'We uphold honesty and responsibility in every action.Our commitment ensures trust, transparency, and long-term relationships.'
  },
  {
    icon: Sparkles,
    title: 'Cultural Roots',
    description: 'Honoring where we come from empowers us to move ahead with integrity and sustainable vision.'
  }
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-12 shadow-lg">
              <Users2 className="w-6 h-6 text-[#A9AC87]" />
              <span className="text-base font-semibold text-gray-700 tracking-wide">Inside Our Vision</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-extralight leading-tight mb-12 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
             
            </h1>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl lg:text-2xl leading-relaxed font-light">
        To be the trusted business growth partner by empowering the creation of world-class brands.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="story-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="story-image-wrapper">
                <div className="story-image-container">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                    alt="Team collaboration"
                    className="story-image"
                  />
                </div>
                <div className="story-image-glow"></div>
                <div className="story-image-blur-1"></div>
                <div className="story-image-blur-2"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="story-content">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-8 shadow-lg">
                <Sparkles className="w-6 h-6 text-[#A9AC87]" />
                <span className="text-base font-semibold text-gray-700 tracking-wide">From Vision to Reality</span>
              </div>
              <div>
                <h2 className="text-5xl lg:text-6xl font-extralight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight"></h2>
              <div className="story-text">
                <p className="story-paragraph">
Nexxus Digital Solutions began its journey in July 2024 with just three passionate minds and a bold vision to transform the digital landscape. What started as a focused digital marketing agency quickly gained momentum, fueled by our dedication to results and creative problem-solving. Within months, we expanded our capabilities and began working with market leaders in our region, earning trust through consistent performance.  
                  </p>
                <p className="story-paragraph">
                    Nexxus is more than just a digital agency — we’re a trusted growth partner. Our services now include business consulting, market research, business surveys, and shared services. Our team has grown to 23 skilled professionals, all driven by the same mission: to empower brands with innovative, data-driven solutions that scale. From local businesses to regional leaders, we help shape strategies that unlock meaningful, long-term growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9AC87]/5 via-white to-blue-50/30"></div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-[#A9AC87]/20 to-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-8 shadow-lg">
              <Target className="w-6 h-6 text-[#A9AC87]" />
              <span className="text-base font-semibold text-gray-700 tracking-wide">Core Values</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-extralight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight"></h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
              We create purpose-driven strategies rooted in innovation to fuel your brand’s growth and success.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="value-card group"
                >
                  <div className="value-icon-wrapper">
                    <div className="value-icon">
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="value-content">
                    <h3 className="value-title">{value.title}</h3>
                    <p className="value-description">{value.description}</p>
                  </div>
                  <div className="value-card-overlay"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-8 shadow-lg">
              <Users2 className="w-6 h-6 text-[#A9AC87]" />
              <span className="text-base font-semibold text-gray-700 tracking-wide">Our Team</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-extralight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
              A diverse group of passionate individuals working together to create amazing digital experiences.
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card group"
              >
                <div className="relative mb-6">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                    <div className="flex justify-end space-x-3">
                      <a 
                        href={member.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#A9AC87] transition-colors"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a 
                        href={member.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#A9AC87] transition-colors"
                      >
                        <Twitter size={20} />
                      </a>
                      <a 
                        href={member.social.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#A9AC87] transition-colors"
                      >
                        <Globe size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                  <p className="text-[#A9AC87] mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection className="bg-gray-50" />
    </div>
  );
};

export default About;