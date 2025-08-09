import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import ClientsSection from '../components/ClientsSection';

const Contact = () => {
  return (
    <div className="container mx-auto px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-light mb-8">Get in Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="text-gray-400" size={24} />
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-600">nexxusdigitalsolution@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-gray-400" size={24} />
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-gray-600">+91 7358203220</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="text-gray-400" size={24} />
              <div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-gray-600"> 23 pal- lucky plaza GH Road <br />Ramanathapuram,TN 623501, India</p>
              </div>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#A9AC87] text-white py-3 rounded-lg hover:bg-[#959872] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <ClientsSection className="mt-20" />
    
    </div>
  );
};

export default Contact;