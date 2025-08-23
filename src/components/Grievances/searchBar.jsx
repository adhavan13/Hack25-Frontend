import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function DesignerSearchBar() {
  const [location, setLocation] = useState('');

  return (
    <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-lg shadow-sm">
        {/* Location Input */}
        <div className="flex items-center gap-2 px-4 py-3 min-w-0 flex-1">
          <MapPin className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>
      </div>
    </div>
  );
}