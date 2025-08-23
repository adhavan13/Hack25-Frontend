import { useState } from 'react';
import { Search, Info, DollarSign, MapPin } from 'lucide-react';

export default function DesignerSearchBar() {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [availableForWork, setAvailableForWork] = useState(true);

  return (
    <div className="w-full pl-4 pr-4 sm:pl-4 sm:pr-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white rounded-lg shadow-sm">
        {/* Budget Input */}
        <div className="flex items-center gap-2 px-4 py-3 min-w-0 flex-1 border-b border-gray-200 sm:border-b-0 sm:border-r sm:border-l-0 sm:border-gray-200">
          <DollarSign className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>

        {/* Location Input */}
        <div className="flex items-center gap-2 px-4 py-3 min-w-0 flex-1 border-b border-gray-200 sm:border-b-0 sm:border-l border-gray-200">
          <MapPin className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>

        {/* PRO Designers Section */}
        <div className="flex items-center gap-1 px-4 py-3 border-b border-gray-200 sm:border-b-0 sm:border-l border-gray-200">
          <span className="font-semibold text-base bg-gray-100 text-black px-2 rounded" style={{ color: '#72e3ad' }}>PRO</span>
          <span className="text-gray-700 text-base">Designers</span>
          <Info className="text-gray-400 w-4 h-4 ml-1" />
        </div>

        {/* Available for Work Toggle */}
        <div className="flex items-center gap-3 px-4 py-3 sm:border-l border-gray-200">
          <span className="text-gray-700 text-sm">Available for work</span>
          <button
            onClick={() => setAvailableForWork(!availableForWork)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              availableForWork 
                ? 'bg-gray-100' 
                : 'bg-gray-200'
            }`}
            style={availableForWork ? { border: '1.5px solid #72e3ad' } : {}}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                availableForWork ? 'translate-x-6' : 'translate-x-1'
              }`}
              style={{
                background: availableForWork ? '#72e3ad' : '#fff',
                border: availableForWork ? '1.5px solid #72e3ad' : '1px solid #e5e7eb'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}