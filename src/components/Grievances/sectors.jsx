import { useState, useEffect } from 'react';

export default function CategoryNavigation({ onCategoryChange, selectedCategory = 'All', categories: propsCategories }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  
  // Update internal state when props change
  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);
  
  const categoriesList = propsCategories || [
    'All',
    'Agriculture and Allied Services',
    'Rural Development',
    'Irrigation and Flood Control',
    'Economic Services',
    'Industry and Minerals',
    'Energy'
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-3 sm:py-6">
        {/* Category Navigation */}
        <nav className="flex-1">
          <div
            className="flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide"
            style={{
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`
                  whitespace-nowrap
                  px-4 sm:px-6
                  py-2 sm:py-2
                  text-xs sm:text-sm
                  font-medium
                  rounded-full
                  transition-all duration-200 ease-in-out
                  ${
                    activeCategory === category
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                  }
                  flex-shrink-0
                  focus:outline-none focus:ring-2 focus:ring-[#72e3ad]
                  mobile-category-btn
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
          {/* Mobile scroll hint */}
          <div className="block sm:hidden text-xs text-gray-400 mt-1 ml-1">
            <span>&larr; scroll &rarr;</span>
          </div>
        </nav>
      </div>

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
          @media (max-width: 640px) {
            .scrollbar-hide {
              padding-left: 8px;
              padding-right: 8px;
            }
            .mobile-category-btn {
              min-width: 110px;
              font-size: 13px;
              padding-left: 16px !important;
              padding-right: 16px !important;
              padding-top: 10px !important;
              padding-bottom: 10px !important;
              margin-left: 4px;
              margin-right: 4px;
            }
            .scrollbar-hide > .mobile-category-btn:first-child {
              margin-left: 0;
            }
            .scrollbar-hide > .mobile-category-btn:last-child {
              margin-right: 0;
            }
          }
        `}
      </style>
    </div>
  );
}