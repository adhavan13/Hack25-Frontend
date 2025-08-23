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
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
      px-2 sm:px-0">
      {/* Header Section */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
            {/* Profile Avatar */}
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold"
              style={{ backgroundColor: '#72e3ad', color: 'black' }}
            >
              <div className="text-xl sm:text-2xl">WM</div>
            </div>
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">One Week Wonders</h2>
                <span
                  className="px-2 py-0.5 text-xs rounded-sm font-medium"
                  style={{ backgroundColor: '#72e3ad', color: 'black' }}
                >
                  PRO
                </span>
              </div>
              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" style={{ color: '#72e3ad' }} />
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
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>From $5,000/project</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" style={{ color: '#72e3ad' }} />
                  <span>Indonesia</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" style={{ color: '#72e3ad' }} />
                  <span>Responds within a few hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <Grid3x3 className="w-4 h-4" style={{ color: '#72e3ad' }} />
                  <span>9 Services available</span>
                </div>
              </div>
            </div>
          </div>
          {/* Action Button */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bookmark className="w-5 h-5" style={{ color: '#72e3ad' }} />
            </button>
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-full transition-colors font-medium"
              style={{
                backgroundColor: '#72e3ad',
                color: 'black'
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
      {/* Portfolio Grid */}
      <div className="px-2 sm:px-6 pb-4 sm:pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mb-4 sm:mb-6">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-lg 
                ${index === 0 ? 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2' : 'col-span-1'}
                aspect-[4/3]`}
              style={{ minWidth: 0 }}
            >
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
              className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
              style={
                index === services.length - 1
                  ? { backgroundColor: '#f3f4f6', color: '#111' }
                  : { backgroundColor: '#72e3ad', color: 'black' }
              }
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