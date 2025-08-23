import React from 'react';

export default function GrievanceCard() {
  return (
    <div className="bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex">
          {/* Image Section */}
          <div className="w-1/3 bg-gradient-to-br from-gray-200 to-gray-300 aspect-square">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span>Placeholder Image</span>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="w-2/3 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Grievance Title
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This is where the grievance description will be displayed. 
              It provides detailed information about the issue, complaint, 
              or concern that has been raised. The description can span 
              multiple lines and provide comprehensive details about the matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}