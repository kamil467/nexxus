import React from 'react';
import { Users2, Lightbulb, Target, Sparkles, Linkedin, Twitter, Globe } from 'lucide-react';
import ClientsSection from '../components/ClientsSection';

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
    title: 'Collaborative Approach',
    description: 'We believe in working closely with our clients, fostering open communication and shared success.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Pushing boundaries with cutting-edge technology and creative solutions that set new standards.'
  },
  {
    icon: Target,
    title: 'Result Driven',
    description: 'Focus on delivering measurable impact and achieving meaningful outcomes for our clients.'
  },
  {
    icon: Sparkles,
    title: 'Quality Obsessed',
    description: 'Committed to excellence in every detail, from concept to final delivery.'
  }
];

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9AC87]/10 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-light mb-6 leading-tight">
              Crafting Digital Excellence
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a creative studio dedicated to crafting meaningful digital experiences that inspire and engage.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#A9AC87]/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl"></div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-4">Our Story</h2>
                <div className="space-y-6 text-gray-600">
                  <p className="leading-relaxed">
                    Founded in 2020, we’ve collaborated with brands across various industries, helping them tell their stories and connect with their audiences in innovative ways.
                  </p>
                  <p className="leading-relaxed">
                    Our approach is rooted in understanding the unique challenges and opportunities each project presents, allowing us to create tailored solutions that drive real impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and help us deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-[#A9AC87] bg-[#A9AC87]/10 rounded-full">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A diverse group of passionate individuals working together to create amazing digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
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