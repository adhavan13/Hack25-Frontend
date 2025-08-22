import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

const DribbbleNav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full">
      <nav className="px-6 sm:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Logo and Search Bar */}
          <div className="flex items-center space-x-8 md:space-x-12 flex-1">
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
                  className="w-full px-4 py-4.5 pl-6 pr-12 text-sm text-gray-700 placeholder-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors cursor-pointer">
                  <Search size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Right side: Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {/* Designers Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-black hover:text-gray-500 transition-colors">
                <span className="font-medium">Designers</span>
              </button>
            </div>

            {/* Explore Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-black hover:text-gray-500 transition-colors">
                <span className="font-medium">Explore</span>
              </button>
            </div>

            {/* Find Talent Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-black hover:text-gray-500 transition-colors">
                <span className="font-medium">Find Talent</span>
              </button>
            </div>

            {/* Get Hired Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-black hover:text-gray-500 transition-colors">
                <span className="font-medium">Get Hired</span>
              </button>
            </div>

            {/* Blog */}
            <a
              href="#"
              className="text-black hover:text-gray-500 font-medium transition-colors"
            >
              Blog
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
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
              className="w-full px-4 py-3 pl-4 pr-12 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors cursor-pointer">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 space-y-4">
            <div className="flex flex-col space-y-4">
              <button className="flex items-center justify-between text-black hover:text-gray-500 transition-colors py-2">
                <span className="font-medium">Designers</span>
              </button>
              <button className="flex items-center justify-between text-black hover:text-gray-500 transition-colors py-2">
                <span className="font-medium">Explore</span>
              </button>
              <button className="flex items-center justify-between text-black hover:text-gray-500 transition-colors py-2">
                <span className="font-medium">Find Talent</span>
              </button>
              <button className="flex items-center justify-between text-black hover:text-gray-500 transition-colors py-2">
                <span className="font-medium">Get Hired</span>
              </button>
              <a
                href="#"
                className="text-black hover:text-gray-500 font-medium transition-colors py-2"
              >
                Blog
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default DribbbleNav;