import { useState } from 'react';
import { Search, Info } from 'lucide-react';

export default function DesignerSearchBar() {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [availableForWork, setAvailableForWork] = useState(true);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
        {/* Budget Input */}
        <div className="flex items-center gap-2 px-4 py-3 min-w-0 flex-1">
          <span className="text-gray-500 text-lg">$</span>
          <input
            type="text"
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>

        {/* Location Input */}
        <div className="flex items-center gap-2 px-4 py-3 min-w-0 flex-1 border-l border-gray-200">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>

        {/* PRO Designers Section */}
        <div className="flex items-center gap-1 px-4 py-3 border-l border-gray-200">
          <span className="text-gray-900 font-semibold text-base">PRO</span>
          <span className="text-gray-700 text-base">Designers</span>
          <Info className="text-gray-400 w-4 h-4 ml-1" />
        </div>

        {/* Available for Work Toggle */}
        <div className="flex items-center gap-3 px-4 py-3 border-l border-gray-200">
          <span className="text-gray-700 text-sm">Available for work</span>
          <button
            onClick={() => setAvailableForWork(!availableForWork)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              availableForWork 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                availableForWork ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}