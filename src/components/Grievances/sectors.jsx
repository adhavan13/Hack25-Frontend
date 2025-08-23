import { useState, useEffect } from "react";

export default function CategoryNavigation({
  onCategoryChange,
  selectedCategory = "All",
}) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  // Update internal state when props change
  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const categories = [
    "All",
    "Agriculture and Allied Services",
    "Rural Development",
    "Irrigation and Flood Control",
    "Economic Services",
    "Industry and Minerals",
    "Energy",
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="w-full bg-white">
      <div
        className="flex items-center gap-2 px-1 sm:px-4 py-2 sm:py-6 sticky top-0 z-20 bg-white"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
      >
        {/* Category Navigation */}
        <nav className="flex-1">
          <div
            className="flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              paddingBottom: 2,
              minHeight: 48,
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`
                  whitespace-nowrap px-3 sm:px-6 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                  ${
                    activeCategory === category
                      ? "bg-gray-100 text-black"
                      : "text-gray-500 hover:bg-gray-50 hover:text-black"
                  }
                `}
                style={
                  activeCategory === category
                    ? {
                        border: "2px solid #72e3ad",
                        backgroundColor: "#f3f4f6",
                        color: "#000",
                      }
                    : {
                        minWidth: 44,
                        minHeight: 36,
                      }
                }
                tabIndex={0}
              >
                {category}
              </button>
            ))}
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
            /* Make nav sticky and buttons more touch-friendly on mobile */
            nav {
              width: 100%;
            }
            button {
              font-size: 1rem;
              min-width: 44px;
              min-height: 36px;
            }
          }
        `}
      </style>
    </div>
  );
}
