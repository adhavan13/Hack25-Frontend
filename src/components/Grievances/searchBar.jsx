import { useState } from 'react';
import { Search, Info } from 'lucide-react';

export default function DesignerSearchBar({ onSearch }) {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [availableForWork, setAvailableForWork] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="w-full max-w-6xl p-4">
      <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg shadow-sm p-2">
        {/* Budget Input */}
        <div className="flex items-center gap-2 px-3 py-2 min-w-0 flex-1">
          <span className="text-gray-400 text-lg">$</span>
          <input
            type="text"
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* Location Input */}
        <div className="flex items-center gap-2 px-3 py-2 min-w-0 flex-1">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none text-base"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* PRO Designers Section */}
        <div className="flex items-center gap-2 px-3 py-2 whitespace-nowrap">
          <span className="text-gray-800 font-semibold text-base">PRO</span>
          <span className="text-gray-600 text-base">Designers</span>
          <Info className="text-gray-400 w-4 h-4" />
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* Available for Work Toggle */}
        <div className="flex items-center gap-3 px-3 py-2 whitespace-nowrap">
          <span className="text-gray-800 text-base">Available for work</span>
          <button
            onClick={() => setAvailableForWork(!availableForWork)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
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

      {/* Search Bar for Grievances */}
      {/* <div className="max-w-xl mt-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search grievances..."
            className="w-full p-4 pl-12 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </form>
      </div> */}
    </div>
  );
}