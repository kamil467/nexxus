import React, { useEffect, useState } from 'react';
import { Mail, ArrowRight, Users, Lightbulb, Target, Heart, Coffee, Laptop, Globe, Zap, Star, Send, Users2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Careers.css';
import ClientsSection from '../components/ClientsSection';

const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Culture",
      description: "Work with passionate professionals who value creativity and innovation"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Growth Opportunities",
      description: "Continuous learning and career development in a fast-growing company"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and remote-friendly environment"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Meaningful Work",
      description: "Help brands create impactful digital experiences that matter"
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

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-12 shadow-lg">
              <Users className="w-6 h-6 text-[#A9AC87]" />
              <span className="text-base font-semibold text-gray-700 tracking-wide">Join Our Team</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-extralight leading-tight mb-12 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Build Your Career
              <br />
              <span className="text-[#A9AC87]">With Us</span>
            </h1>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl lg:text-2xl mb-16 leading-relaxed font-light">
              Join a team of passionate creators, innovators, and problem-solvers who are shaping the future of digital experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:nexxusdigitalsolutions@gmail.com?subject=Career Inquiry"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#A9AC87] to-[#959872] text-white px-12 py-6 rounded-full font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#A9AC87]/25 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Apply Now</span>
                <Send className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#959872] to-[#A9AC87] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <Link 
                to="/about" 
                className="group inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-12 py-6 rounded-full font-semibold text-xl transition-all duration-300 hover:border-[#A9AC87] hover:text-[#A9AC87] hover:bg-[#A9AC87]/5 hover:-translate-y-1"
              >
                <span>Learn About Us</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* Why Join Us */}
      <section className="why-join-us relative">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 bg-[#A9AC87]/10 rounded-full px-8 py-4 mb-8">
                <Heart className="w-6 h-6 text-[#A9AC87]" />
                <span className="text-base font-semibold text-[#A9AC87] tracking-wide">Why Nexxus</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-extralight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
                Why Join Our Team
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed font-light">
                Discover what makes Nexxus Digital Solution an exceptional place to build your career and grow professionally.
              </p>
            </div>
            
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card group">
                  <div className="benefit-icon-wrapper">
                    <div className="benefit-icon">
                      {benefit.icon}
                    </div>
                  </div>
                  <div className="benefit-content">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </div>
              ))}
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

      {/* CTA Section */}
      <section className="careers-cta relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9AC87]/10 via-white to-blue-50/30"></div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-[#A9AC87]/20 to-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-extralight leading-tight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Ready to Join Our Journey?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl lg:text-2xl mb-12 leading-relaxed font-light">
              While we don't have any open positions at the moment, we're always looking for talented individuals to join our team. Send us your resume and let's start a conversation about future opportunities with Nexxus Digital Solution.
            </p>
            
            <div className="cta-email-section">
              <div className="email-display">
                <Mail className="w-8 h-8 text-[#A9AC87]" />
                <span className="email-text">nexxusdigitalsolutions@gmail.com</span>
              </div>
              
              <a 
                href="mailto:nexxusdigitalsolutions@gmail.com?subject=Career Opportunity Inquiry"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#A9AC87] to-[#959872] text-white px-12 py-6 rounded-full font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#A9AC87]/25 hover:-translate-y-2 overflow-hidden mt-8"
              >
                <span className="relative z-10">Send Your Application</span>
                <Send className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#959872] to-[#A9AC87] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <ClientsSection className="mt-20" />
    </div>
  );
};

export default Careers;
