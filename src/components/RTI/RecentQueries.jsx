import React from "react";
import { CheckCircle, Timer, Eye } from "lucide-react";

const RecentQueries = ({ queries, setActiveTab, handleSuggestion }) => (
  <div className="flex-1 overflow-y-auto p-6">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Recent Query Resolutions
        </h2>
        <p className="text-gray-500">
          See how quickly we're resolving information requests
        </p>
      </div>
      <div className="space-y-4">
        {queries.map((query, i) => (
          <div
            key={i}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">
                  {query.query}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span
                    className="flex items-center gap-1"
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "black",
                      borderRadius: "0.25rem",
                      padding: "0 0.5rem",
                    }}
                  >
                    <CheckCircle className="w-4 h-4" style={{ color: "black" }} />
                    Resolved
                  </span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <Timer className="w-4 h-4" />
                    {query.time}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {query.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab("chat");
                  setTimeout(() => {
                    handleSuggestion(query.query);
                  }, 100);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded-lg text-sm transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RecentQueries;
