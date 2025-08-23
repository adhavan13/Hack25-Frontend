import React from 'react';
import { Star, MapPin, Clock, Grid3x3, Bookmark } from 'lucide-react';

const GrievancesCard = () => {
  const portfolioItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/480/360',
      title: 'Landing Page Design',
      category: 'landing page'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/240/180',
      title: 'Dashboard Interface',
      category: 'dashboard'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/240/180',
      title: 'Mobile App UI',
      category: 'icon'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/240/180',
      title: 'Brand Identity',
      category: 'branding and logo design'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/240/180',
      title: 'Marketing Materials',
      category: 'brand identity development'
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/240/180',
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
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {/* Profile Avatar */}
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              <div className="text-2xl">WM</div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-gray-900">One Week Wonders</h2>
                <span className="bg-gray-900 text-white px-2 py-0.5 text-xs rounded-sm font-medium">PRO</span>
              </div>
              
              {/* Rating and Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-gray-900" />
                  <span className="font-medium">5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>23 projects completed</span>
                </div>
              </div>
              
              {/* Details */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>From $5,000/project</span>
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
              <Bookmark className="w-5 h-5 text-gray-400" />
            </button>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium">
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-6 gap-2 mb-6">
          {portfolioItems.map((item, index) => (
            <div key={item.id} className={`relative overflow-hidden rounded-lg ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1'}`}>
              <img 
                src={index === 0 ? "/images/portfolio-1.jpg" : `/images/portfolio-${index+1}.jpg`} 
                alt={item.title}
                className="w-full h-full object-cover aspect-[4/3]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/${index === 0 ? '480x360' : '240x180'}/eef2f7/a0aec0/?text=${item.category}`;
                }}
              />
            </div>
          ))}
        </div>

        {/* Service Tags */}
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${
                index === services.length - 1
                  ? 'bg-gray-100 text-gray-600'
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