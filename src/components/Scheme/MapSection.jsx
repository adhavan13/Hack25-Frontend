import React from 'react';

const MapSection = () => (
  <div className="bg-gray-50 rounded-lg p-4 mb-4 flex flex-col items-center">
    <div className="font-semibold mb-2">Project Location</div>
    <svg width="120" height="120" viewBox="0 0 120 120">
      <rect width="120" height="120" fill="#f3f3f3" />
      <ellipse cx="60" cy="60" rx="45" ry="55" fill="#bbb" />
      <circle cx="80" cy="90" r="8" fill="#222" />
      <text x="90" y="95" fontSize="10" fill="#222">TVM</text>
    </svg>
    <div className="text-xs mt-1 text-gray-600">Thiruvananthapuram highlighted</div>
  </div>
);

export default MapSection;
