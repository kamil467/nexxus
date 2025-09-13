import React, { useEffect, useState } from 'react';
import { ArrowRight, Edit3, Video, TrendingUp, Share2, Camera, CheckCircle, ArrowDown, Sparkles, Target, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClientsSection from '../components/ClientsSection';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <Edit3 size={32} />,
      title: "Content Creation",
      description: "We create compelling, valuable, and audience-focused content that truly resonates with your brand's voice. From blog posts and articles to branded storytelling, we make sure your message is clear, creative, and effective.",
      gradient: "from-green-400 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Video size={32} />,
      title: "Video Production",
      description: "Bring your ideas to life with cinematic visuals. We produce promotional videos, product shoots, and social media reels that inspire, engage, and captivate.",
      gradient: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Digital Marketing",
      description: "Grow your business with data-driven marketing. Our strategies include SEO, PPC campaigns, email marketing, and online advertising to increase visibility and drive conversions.",
      gradient: "from-blue-400 to-indigo-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Share2 size={32} />,
      title: "Social Media Marketing (SMM)",
      description: "Stay active and relevant on every platform. We manage your social media presence with creative campaigns and engaging content on Facebook, Instagram, LinkedIn, and more.",
      gradient: "from-pink-400 to-purple-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: <Camera size={32} />,
      title: "Food Photography",
      description: "Delicious visuals that sell. Our professional food photography captures taste, texture, and essence — making your dishes irresistible online and offline.",
      gradient: "from-red-400 to-rose-600",
      bgColor: "bg-red-50"
    }
  ];

  const highlights = [
    {
      icon: <Sparkles size={24} />,
      title: "Creative and innovative approach",
      description: "Fresh ideas that set your brand apart"
    },
    {
      icon: <Target size={24} />,
      title: "Skilled professionals with real industry experience",
      description: "Expert team with proven track record"
    },
    {
      icon: <Users size={24} />,
      title: "Customized solutions for every brand",
      description: "Tailored strategies for your unique needs"
    },
    {
      icon: <Award size={24} />,
      title: "Focus on measurable results and growth",
      description: "Data-driven approach to success"
    }
  ];



  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-12 shadow-lg">
              <Sparkles className="w-6 h-6 text-[#A9AC87]" />
              <span className="text-base font-semibold text-gray-700 tracking-wide">Premium Digital Solutions</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-extralight leading-tight mb-12 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Our Services
            </h1>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl lg:text-2xl mb-16 leading-relaxed font-light">
              We create powerful and engaging digital experiences that help brands connect, grow, and succeed in today's competitive landscape.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#A9AC87] to-[#959872] text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#A9AC87]/25 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#959872] to-[#A9AC87] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/work"
                className="group inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:border-[#A9AC87] hover:text-[#A9AC87] hover:bg-[#A9AC87]/5 hover:-translate-y-1"
              >
                <span>Explore Our Work</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-8 py-4 mb-8 shadow-lg">
              <Target className="w-6 h-6 text-[#A9AC87]" />
              <span className="text-base font-semibold text-gray-700 tracking-wide">Our Expertise</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-extralight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              What We Do
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto text-xl lg:text-2xl leading-relaxed font-light">
              From creative content to digital marketing, we offer comprehensive solutions to elevate your brand and drive meaningful results in the digital landscape.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className={`service-card group ${service.bgColor}`}>
                <div className="service-card-inner">
                  <div className="service-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className={`service-icon-wrapper bg-gradient-to-r ${service.gradient}`}>
                    <div className="service-icon text-white">
                      {service.icon}
                    </div>
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                  <div className="service-card-overlay"></div>
                  <div className="service-card-glow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-6">
                <Award className="w-5 h-5 text-[#A9AC87]" />
                <span className="text-sm font-medium text-gray-700">Why Choose Nexxus</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                At Nexxus Digital Solution, we believe in combining creativity, strategy, and technology to deliver exceptional results that drive your business forward.
              </p>
            </div>

            <div className="highlights-grid">
              {highlights.map((highlight, index) => (
                <div key={index} className="highlight-card group">
                  <div className="highlight-icon-wrapper">
                    <div className="highlight-icon">
                      {highlight.icon}
                    </div>
                  </div>
                  <div className="highlight-content">
                    <h3 className="highlight-title">{highlight.title}</h3>
                    <p className="highlight-description">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection className="py-20" />

      {/* Call to Action Section */}
      <section className="services-cta relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#A9AC87]/5 via-white to-blue-50/30"></div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-[#A9AC87]/20 to-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-extralight leading-tight mb-8 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
              Let's elevate your brand and create digital experiences that truly stand out.
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xl lg:text-2xl mb-12 leading-relaxed font-light">
              Contact Nexxus Digital Solution today and let's build your digital success story together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#A9AC87] to-[#959872] text-white px-12 py-6 rounded-full font-semibold text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#A9AC87]/25 hover:-translate-y-2 overflow-hidden"
              >
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#959872] to-[#A9AC87] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                to="/work"
                className="group inline-flex items-center gap-3 border-2 border-gray-300 text-gray-700 px-12 py-6 rounded-full font-semibold text-xl transition-all duration-300 hover:border-[#A9AC87] hover:text-[#A9AC87] hover:bg-[#A9AC87]/5 hover:-translate-y-2"
              >
                <span>View Our Work</span>
                <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
