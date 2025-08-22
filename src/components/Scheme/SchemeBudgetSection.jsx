import React from 'react';

const DonutChart = ({ allocated, spent }) => {
  const total = allocated;
  const spentPct = Math.round((spent / total) * 100);
  const remainingPct = 100 - spentPct;
  return (
    <svg width="80" height="80" viewBox="0 0 42 42" className="mx-auto">
      <circle cx="21" cy="21" r="15.9155" fill="#eee" />
      <circle
        cx="21" cy="21" r="15.9155"
        fill="transparent"
        stroke="#222"
        strokeWidth="4"
        strokeDasharray={`${spentPct} ${remainingPct}`}
        strokeDashoffset="25"
      />
      <text x="21" y="23" textAnchor="middle" fontSize="10" fill="#222">{spentPct}%</text>
    </svg>
  );
};

const BarChart = ({ total, allocated }) => {
  const pct = Math.round((allocated / total) * 100);
  return (
    <div className="w-full h-4 bg-gray-200 rounded">
      <div className="h-4 bg-black rounded" style={{ width: `${pct}%` }}></div>
    </div>
  );
};

const SchemeBudgetSection = ({ scheme }) => (
  <div className="flex flex-col md:flex-row gap-4 mb-4">
    <div className="flex-1 bg-gray-50 rounded-lg p-4">
      <div className="font-semibold mb-1">{scheme.name}</div>
      <div className="text-sm mb-2">{scheme.description}</div>
      <div className="text-xs mb-1"><span className="font-semibold">Type:</span> {scheme.type}</div>
      <div className="text-xs mb-1"><span className="font-semibold">Parent:</span> {scheme.parent_program}</div>
      <div className="text-xs"><span className="font-semibold">Category:</span> {scheme.category}</div>
    </div>
    <div className="flex-1 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center">
      <div className="mb-2">
        <DonutChart allocated={scheme.allocated_budget} spent={scheme.spent} />
        <div className="text-xs text-center mt-1">
          <span className="font-semibold">Spent:</span> ₹{(scheme.spent/1e7).toFixed(2)} Cr<br />
          <span className="font-semibold">Allocated:</span> ₹{(scheme.allocated_budget/1e7).toFixed(2)} Cr
        </div>
      </div>
      <div className="w-full mt-2">
        <BarChart total={scheme.total_budget} allocated={scheme.allocated_budget} />
        <div className="flex justify-between text-xs mt-1">
          <span>Scheme: ₹{(scheme.total_budget/1e7).toFixed(0)} Cr</span>
          <span>Project: ₹{(scheme.allocated_budget/1e7).toFixed(2)} Cr</span>
        </div>
      </div>
    </div>
  </div>
);

export default SchemeBudgetSection;
