import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const DribbbleNav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(''); // Add state for active page

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to handle page navigation and set active page
  const handlePageClick = (page) => {
    setActivePage(page);
    // You can add navigation logic here if needed
  };

  // Helper function to determine active page style
  const getPageStyle = (page) => {
    return activePage === page
      ? 'text-[#72e3ad] font-semibold border-b-2 border-[#72e3ad] pb-1'
      : 'text-black hover:text-gray-500 transition-colors';
  };

  return (
    <div className="w-full bg-white">
      <nav className="px-6 sm:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo and Search Bar */}
          <div className="flex items-center space-x-4 md:space-x-6 flex-1">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 italic tracking-tight">
                Dribbble
              </h1>
            </div>

            {/* Search Bar - Hidden on mobile, visible on medium screens and up */}
            <div className="hidden md:block w-full max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for a location?"
                  className="w-full px-4 py-4.5 pl-6 pr-12 text-sm text-gray-700 placeholder-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#72e3ad] focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#72e3ad] text-black rounded-full hover:bg-opacity-90 transition-colors">
                  <Search size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Right side: Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {/* Grievances Link */}
            <div className="relative group">
              <Link 
                to="/grievances" 
                className={`flex items-center space-x-1 ${getPageStyle('grievances')} nav-links cursor-pointer`}
                onClick={() => handlePageClick('grievances')}
              >
                <span className="font-medium">Grievances</span>
              </Link>
            </div>

            {/* Explore Link */}
            <div className="relative group">
              <Link 
                to="/explore" 
                className={`flex items-center space-x-1 ${getPageStyle('explore')} cursor-pointer`}
                onClick={() => handlePageClick('explore')}
              >
                <span className="font-medium">Explore</span>
              </Link>
            </div>

            {/* Find Talent Link */}
            <div className="relative group">
              <Link 
                to="/talent" 
                className={`flex items-center space-x-1 ${getPageStyle('talent')} cursor-pointer`}
                onClick={() => handlePageClick('talent')}
              >
                <span className="font-medium">Find Talent</span>
              </Link>
            </div>

            {/* Get Hired Link */}
            <div className="relative group">
              <Link 
                to="/hired" 
                className={`flex items-center space-x-1 ${getPageStyle('hired')} cursor-pointer`}
                onClick={() => handlePageClick('hired')}
              >
                <span className="font-medium">Get Hired</span>
              </Link>
            </div>

            {/* Blog */}
            <Link
              to="/blog"
              className={`${getPageStyle('blog')} font-medium cursor-pointer`}
              onClick={() => handlePageClick('blog')}
            >
              Blog
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Only visible on mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for a location"
              className="w-full px-4 py-3 pl-4 pr-12 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-[#72e3ad] focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#72e3ad] text-black rounded-full hover:bg-opacity-90 transition-colors">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 space-y-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/grievances"
                className={`flex items-center justify-between ${getPageStyle('grievances')} py-2 nav-links cursor-pointer`}
                onClick={() => handlePageClick('grievances')}
              >
                <span className="font-medium">Grievances</span>
              </Link>
              <Link
                to="/explore"
                className={`flex items-center justify-between ${getPageStyle('explore')} py-2 cursor-pointer`}
                onClick={() => handlePageClick('explore')}
              >
                <span className="font-medium">Explore</span>
              </Link>
              <Link
                to="/talent"
                className={`flex items-center justify-between ${getPageStyle('talent')} py-2 cursor-pointer`}
                onClick={() => handlePageClick('talent')}
              >
                <span className="font-medium">Find Talent</span>
              </Link>
              <Link
                to="/hired"
                className={`flex items-center justify-between ${getPageStyle('hired')} py-2 cursor-pointer`}
                onClick={() => handlePageClick('hired')}
              >
                <span className="font-medium">Get Hired</span>
              </Link>
              <Link
                to="/blog"
                className={`${getPageStyle('blog')} font-medium py-2 cursor-pointer`}
                onClick={() => handlePageClick('blog')}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default DribbbleNav;