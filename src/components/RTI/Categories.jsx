import React from "react";
import { Search, Timer } from "lucide-react";

const Categories = ({ categories, setActiveTab, handleSuggestion }) => (
  <div className="flex-1 overflow-y-auto p-6">
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Information Categories
        </h2>
        <p className="text-gray-500">
          Browse by category for instant government information
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <category.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.queries} queries resolved
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {category.description}
            </p>
            <div className="mb-4">
              <div
                className="flex items-center gap-2 text-xs mb-2"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "black",
                  borderRadius: "0.25rem",
                  padding: "0 0.5rem",
                  display: "inline-flex",
                  width: "fit-content",
                }}
              >
                <Timer className="w-3 h-3" style={{ color: "black" }} />
                Avg Response: {category.avgTime}
              </div>
              <div className="text-xs text-gray-500">
                Example queries:
              </div>
              <ul className="text-xs text-gray-500 mt-1 space-y-1">
                {category.examples.map((example, i) => (
                  <li key={i}>• {example}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => {
                setActiveTab("chat");
                setTimeout(() => {
                  handleSuggestion(
                    `Show me information about ${category.name.toLowerCase()}`
                  );
                }, 100);
              }}
              className="w-full py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-gray-200"
              style={{
                backgroundColor: "#72e3ad",
                color: "black",
              }}
            >
              <Search className="w-4 h-4" />
              Explore {category.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Categories;
