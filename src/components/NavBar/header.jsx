import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useDashboardStore from '../../store/dashboard';
import LanguageSwitcher from './LanguageSwitcher';

// Valid Kerala districts
const KERALA_DISTRICTS = [
  'THIRUVANANTHAPURAM', 'KOLLAM', 'PATHANAMTHITTA', 'ALAPPUZHA', 'KOTTAYAM',
  'IDUKKI', 'ERNAKULAM', 'THRISSUR', 'PALAKKAD', 'MALAPPURAM',
  'KOZHIKODE', 'WAYANAD', 'KANNUR', 'KASARAGOD'
];

const DribbbleNav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(''); // Add state for active page
  const [searchError, setSearchError] = useState('');
  
  // Get dashboard store actions and state
  const { location, setLocation, fetchDashboardData } = useDashboardStore();

  // Initialize search value with current location
  useEffect(() => {
    setSearchValue(location || '');
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to handle search/location change
  const handleSearch = () => {
    if (searchValue.trim()) {
      const searchTerm = searchValue.trim();
      
      // Check if the search term is a valid Kerala district (case-insensitive)
      const isValidDistrict = KERALA_DISTRICTS.some(
        district => district.toLowerCase() === searchTerm.toLowerCase()
      );
      
      if (isValidDistrict) {
        // Find the correct case district name
        const correctDistrictName = KERALA_DISTRICTS.find(
          district => district.toLowerCase() === searchTerm.toLowerCase()
        );
        
        setLocation(correctDistrictName);
        setSearchError('');
        fetchDashboardData();
      } else {
        setSearchError('Please enter a valid Kerala district');
        setTimeout(() => setSearchError(''), 3000); // Clear error after 3 seconds
      }
    }
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to handle page navigation and set active page
  const handlePageClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false); // Close mobile menu on nav click
    // You can add navigation logic here if needed
  };

  // Helper function to determine active page style
  const getPageStyle = (page) => {
    return activePage === page
      ? 'text-[#72e3ad] font-semibold border-b-2 border-[#72e3ad] pb-1'
      : 'text-black hover:text-gray-500 transition-colors';
  };


  
  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Projects', path: '/projects' }, // Projects is now home
    { name: 'Grievances', path: '/grievances' },
    { name: 'RTI', path: '/rti' },
    { name: 'Schemes', path: '/schemes' },
  ];

  return (
    <div className="w-full bg-white">
      <nav className="px-6 sm:px-12 py-4">
        {/* Flex container for logo, search, and nav */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 italic tracking-tight">
              CivicLens
            </h1>
          </div>

          {/* Search Bar - Centered on desktop */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for a Kerala district "
                className={`w-full px-4 py-4.5 pl-6 pr-12 text-sm text-gray-700 placeholder-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:border-transparent ${
                  searchError ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-[#72e3ad]'
                }`}
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#72e3ad] text-black rounded-full hover:bg-opacity-90 transition-colors"
              >
                <Search size={24} />
              </button>
            </div>
            {searchError && (
              <p className="text-red-500 text-sm mt-1 ml-2">{searchError}</p>
            )}
          </div>

          {/* Navigation Links - Right aligned */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-shrink-0">
            {navItems.map((item, idx) => (
              <div className="relative group flex items-center" key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-1 ${getPageStyle(item.path)} cursor-pointer`}
                  onClick={() => handlePageClick(item.path)}
                >
                  <span className="font-medium">{item.name}</span>
                </Link>
                {/* Replace dropdown near Schemes */}
                {item.name === 'Schemes' && (
                  <div className="ml-2">
                    <LanguageSwitcher />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-2">
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
              onKeyPress={handleKeyPress}
              placeholder="Search for a Kerala district"
              className={`w-full px-4 py-3 pl-4 pr-12 text-sm text-gray-700 placeholder-gray-500 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:border-transparent ${
                searchError ? 'focus:ring-red-500 ring-1 ring-red-500' : 'focus:ring-[#72e3ad]'
              }`}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#72e3ad] text-black rounded-full hover:bg-opacity-90 transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
          {searchError && (
            <p className="text-red-500 text-sm mt-1 ml-2">{searchError}</p>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 space-y-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    className={`flex items-center ${getPageStyle(item.path)} py-2 cursor-pointer`}
                    onClick={() => handlePageClick(item.path)}
                  >
                    <span className="font-medium">{item.name}</span>
                  </Link>
                  {/* Replace dropdown near Schemes */}
                  {item.name === 'Schemes' && (
                    <div className="ml-2">
                      <LanguageSwitcher />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default DribbbleNav;