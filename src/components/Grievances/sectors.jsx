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
      <nav className="flex items-center px-4 py-6">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                whitespace-nowrap px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                ${activeCategory === category
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}