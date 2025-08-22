import React from 'react';

const StatusBadge = ({ status }) => (
  <span className={`
    inline-flex items-center px-2 py-0.5 rounded text-xs font-normal tracking-wide uppercase
    bg-white text-black border border-black
  `}>
    <span className={`w-1.5 h-1.5 rounded-full mr-1 ${status === "Ongoing" ? "bg-black" : "bg-gray-400"}`} />
    {status}
  </span>
);

const HeaderSection = ({ header }) => (
  <div className="mb-4 p-4 bg-white border-b border-black">
    <div className="flex items-center justify-between pl-4 pr-4">
      <div>
        <h1 className="text-2xl font-semibold text-black leading-tight">
          {header.project_name}
        </h1>
      </div>
      <div className="ml-8">
        <StatusBadge status={header.status} />
      </div>
    </div>
  </div>
);

export default HeaderSection;