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
        <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                whitespace-nowrap px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                ${activeCategory === category
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300'
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