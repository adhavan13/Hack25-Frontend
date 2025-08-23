import { useState } from 'react';

export default function CategoryNavigation({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = [
    'All',
    'Product Design',
    'Web Design',
    'Illustration',
    'Branding',
    'Animation',
    'Mobile',
    'Typography',
    'Print'
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // If onCategoryChange is provided, call it with the selected category
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="w-full bg-white">
      <nav className="flex items-center px-2 sm:px-4 py-4 sm:py-6">
        <div
          className="flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide"
          style={{
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                whitespace-nowrap px-4 sm:px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                ${
                  activeCategory === category
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                }
              `}
              style={
                activeCategory === category
                  ? { border: '2px solid #72e3ad', backgroundColor: '#f3f4f6', color: '#000' }
                  : { }
              }
            >
              {category}
            </button>
          ))}
        </div>
      </nav>
      <style>
        {`
          /* Hide scrollbar for all browsers */
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}