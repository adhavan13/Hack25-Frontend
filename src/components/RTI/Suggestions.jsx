import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const Suggestions = ({ suggestions, onSuggestion }) => (
  <div className="border-t border-gray-100 bg-white">
    <div className="max-w-4xl mx-auto px-6 py-6">
      <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Try these instant queries:
      </h3>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(suggestion)}
            className="bg-gray-100 hover:bg-gray-200 text-black rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm border border-gray-200 flex items-center gap-2"
          >
            {suggestion}
            <ArrowRight className="w-3 h-3" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Suggestions;
