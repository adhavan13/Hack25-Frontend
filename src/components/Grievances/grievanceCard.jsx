import React from 'react';
import { Star, MapPin, Clock, Grid3x3 } from 'lucide-react';

const GrievancesCard = () => {
  const portfolioItems = [
    {
      id: 1,
      image: '/api/placeholder/240/180',
      title: 'Landing Page Design',
      category: 'landing page'
    },
    {
      id: 2,
      image: '/api/placeholder/240/180',
      title: 'Dashboard Interface',
      category: 'dashboard'
    },
    {
      id: 3,
      image: '/api/placeholder/240/180',
      title: 'Mobile App UI',
      category: 'icon'
    },
    {
      id: 4,
      image: '/api/placeholder/240/180',
      title: 'Brand Identity',
      category: 'branding and logo design'
    },
    {
      id: 5,
      image: '/api/placeholder/240/180',
      title: 'Marketing Materials',
      category: 'brand identity development'
    },
    {
      id: 6,
      image: '/api/placeholder/240/180',
      title: 'Presentation Design',
      category: 'presentation'
    }
  ];

  const services = [
    'landing page',
    'icon',
    'dashboard',
    'branding and logo design',
    'brand identity development',
    'presentation',
    '+10 skills'
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Profile Avatar */}
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              <div className="flex flex-col">
                <div className="w-6 h-1 bg-white mb-1 transform -skew-x-12"></div>
                <div className="w-6 h-1 bg-white mb-1 transform -skew-x-12"></div>
                <div className="w-6 h-1 bg-white transform -skew-x-12"></div>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">One Week Wonders</h2>
                <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs font-medium">PRO</span>
              </div>
              
              {/* Rating and Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>23 projects completed</span>
                </div>
              </div>
              
              {/* Details */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="font-medium">From $5,000/project</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>Indonesia</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Responds within a few hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Grid3x3 className="w-4 h-4" />
                  <span>9 Services available</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="p-6">
        <div className="grid grid-cols-6 gap-4 mb-6">
          {portfolioItems.map((item, index) => (
            <div key={item.id} className={`relative group cursor-pointer ${index === 0 ? 'col-span-2' : 'col-span-1'}`}>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden aspect-[4/3] hover:shadow-lg transition-shadow">
                {/* Placeholder content based on category */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {item.category === 'landing page' && (
                    <div className="text-center p-4">
                      <div className="w-full h-2 bg-blue-300 rounded mb-2"></div>
                      <div className="w-3/4 h-2 bg-gray-300 rounded mb-2"></div>
                      <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
                    </div>
                  )}
                  {item.category === 'dashboard' && (
                    <div className="grid grid-cols-2 gap-1 p-2 w-full">
                      <div className="bg-blue-300 rounded h-4"></div>
                      <div className="bg-green-300 rounded h-4"></div>
                      <div className="bg-purple-300 rounded h-4"></div>
                      <div className="bg-pink-300 rounded h-4"></div>
                    </div>
                  )}
                  {item.category === 'icon' && (
                    <div className="w-8 h-8 bg-purple-400 rounded-lg"></div>
                  )}
                  {item.category === 'branding and logo design' && (
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-full mb-2 mx-auto"></div>
                      <div className="text-xs font-bold text-white">BRAND</div>
                    </div>
                  )}
                  {item.category === 'brand identity development' && (
                    <div className="grid grid-cols-2 gap-2 p-2">
                      <div className="bg-yellow-300 rounded h-6"></div>
                      <div className="bg-green-300 rounded h-6"></div>
                      <div className="bg-blue-300 rounded h-6"></div>
                      <div className="bg-purple-300 rounded h-6"></div>
                    </div>
                  )}
                  {item.category === 'presentation' && (
                    <div className="text-center p-2">
                      <div className="w-full h-3 bg-blue-400 rounded mb-1"></div>
                      <div className="w-2/3 h-2 bg-gray-300 rounded mb-1"></div>
                      <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Tags */}
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${
                service === '+10 skills'
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrievancesCard;