import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown, Menu, X } from 'lucide-react';
import ProjectGrid from './ProjectGrid';

const DesignGallery = () => {
  const [activeFilter, setActiveFilter] = useState('Latest');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const timeFilters = ['Latest', 'Old', 'Upcoming'];
  
  const filters = [
    'Discover', 'Animation', 'Branding', 'Illustration', 
    'Mobile', 'Print', 'Product Design', 'Typography', 'Web Design'
  ];

  const projects = [
    {
      id: 1,
      title: 'Study Planning',
      author: 'Emote',
      badge: 'TEAM',
      likes: 111,
      views: 14.1,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'mobile', color: 'bg-blue-500' },
        { type: 'mobile', color: 'bg-gray-900' },
        { type: 'mobile', color: 'bg-yellow-400' },
        { type: 'mobile', color: 'bg-gray-900' }
      ]
    },
    {
      id: 2,
      title: 'Lantern',
      author: 'Jeroen van Eerden',
      badge: 'PRO',
      likes: 54,
      views: 4.2,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'card', color: 'bg-gradient-to-br from-pink-200 to-orange-400' },
        { type: 'card', color: 'bg-gradient-to-br from-gray-800 to-orange-600' }
      ]
    },
    {
      id: 3,
      title: 'Afterglow',
      author: 'Afterglow',
      badge: 'TEAM',
      likes: 88,
      views: 13.4,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'mobile', color: 'bg-gray-900' },
        { type: 'mobile', color: 'bg-orange-600' },
        { type: 'mobile', color: 'bg-gray-900' }
      ]
    },
    {
      id: 4,
      title: 'DUAAL',
      author: 'Mihai Dolganiuc',
      badge: 'PRO',
      likes: 37,
      views: 2.9,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'logo', color: 'bg-gradient-to-r from-red-500 to-yellow-400', text: 'DUAAL' },
        { type: 'logo', color: 'bg-gradient-to-r from-red-500 to-yellow-400', text: 'DUAAL' }
      ]
    },
    {
      id: 5,
      title: 'LUMINA',
      author: 'Slavisa Dujkovic',
      badge: 'PRO',
      likes: 31,
      views: 1.8,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'logo', color: 'bg-white', text: 'LUMINA', textColor: 'text-gray-800' },
        { type: 'brand', color: 'bg-gradient-to-br from-pink-300 to-orange-400' }
      ]
    },
    {
      id: 6,
      title: 'Nixtio',
      author: 'Nixtio',
      badge: 'TEAM',
      likes: 97,
      views: 3.9,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'mobile', color: 'bg-gradient-to-br from-green-400 to-blue-600' },
        { type: 'mobile', color: 'bg-gray-900' },
        { type: 'mobile', color: 'bg-purple-600' }
      ]
    },
    {
      id: 7,
      title: 'Outcrowd',
      author: 'Outcrowd',
      badge: 'PRO',
      likes: 111,
      views: 14.7,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'dashboard', color: 'bg-gray-900' },
        { type: 'dashboard', color: 'bg-white' }
      ]
    },
    {
      id: 8,
      title: 'Wegrow',
      author: 'Wegrow',
      badge: 'TEAM',
      likes: 36,
      views: 5.7,
      image: '/api/placeholder/400/300',
      preview: [
        { type: 'web', color: 'bg-gray-900' }
      ]
    }
  ];

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-white sticky top-0 z-10">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex items-center"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Left - Time Filter Dropdown */}
            <div className="hidden md:flex items-center relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`flex items-center justify-center space-x-1 px-3 lg:px-5 py-2 text-sm font-medium transition-colors whitespace-nowrap border border-gray-120 rounded-lg text-gray-800 bg-white`}
              >
                <span>{activeFilter}</span>
                <ChevronDown 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    dropdownOpen ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-3 bg-white border border-gray-100 rounded-lg shadow-md z-20">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        activeFilter === filter ? 'font-semibold' : ''
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Center - Other Filters */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 overflow-x-auto scrollbar-hide mx-auto">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex items-center space-x-1 px-2 lg:px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeFilter === filter
                      ? 'text-black font-semibold bg-[#72e3ad] rounded-full'
                      : 'text-gray-800 font-medium hover:text-gray-600 hover:bg-gray-50 rounded-lg'
                  }`}
                >
                  <span>{filter}</span>
                </button>
              ))}
            </div>

            {/* Right - Filter Button */}
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-800 hover:text-gray-600 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors bg-white">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2 overflow-x-auto">
          <div className="flex flex-wrap gap-2 mb-2">
            {/* Time filters for mobile */}
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#72e3ad] text-black font-semibold rounded-full'
                    : 'bg-gray-50 text-gray-700 hover:text-gray-600 hover:bg-gray-50 rounded-full'
                }`}
              >
                <span>{filter}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Other filters for mobile */}
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#72e3ad] text-black font-semibold rounded-full'
                    : 'bg-gray-50 text-gray-700 hover:text-gray-600 hover:bg-gray-50 rounded-full'
                }`}
              >
                <span>{filter}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Project Grid */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-4 md:py-8">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
};

export default DesignGallery;