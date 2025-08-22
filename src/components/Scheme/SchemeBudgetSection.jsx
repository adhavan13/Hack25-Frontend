import React from 'react';

const DonutChart = ({ allocated, spent }) => {
  const total = allocated;
  const spentPct = Math.round((spent / total) * 100);
  const circumference = 2 * Math.PI * 15.9155;
  const spentOffset = circumference - (spentPct / 100) * circumference;

  return (
    <div className="relative">
      <svg width="120" height="120" viewBox="0 0 42 42" className="transform -rotate-90">
        <circle
          cx="21" cy="21" r="15.9155"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <circle
          cx="21" cy="21" r="15.9155"
          fill="none"
          stroke="#111"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={spentOffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-black">{spentPct}%</div>
          <div className="text-xs text-gray-700 font-medium">Utilized</div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ total, allocated }) => {
  const pct = Math.round((allocated / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-black">Budget Allocation</span>
        <span className="text-sm font-semibold text-black">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-black rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

const BudgetCard = ({ label, amount, subtitle, color = "gray" }) => {
  // All cards use black/white/gray for a professional look
  return (
    <div className="bg-white border border-black rounded-lg p-4 text-center shadow-sm">
      <div className="text-xs font-medium text-gray-700 mb-1">{label}</div>
      <div className="text-lg font-semibold text-black">₹{(amount/1e7).toFixed(2)}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
};

const SchemeBudgetSection = ({ scheme }) => (
  <div className="bg-white border border-black rounded-xl shadow-md transition-shadow duration-300 overflow-hidden">
    {/* Header */}
    <div className="bg-white px-6 py-4 border-b border-black">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black mb-1">{scheme.name}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{scheme.description}</p>
        </div>
        <div className="ml-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-black text-white border border-black">
            {scheme.type}
          </span>
        </div>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="text-xs">
          <span className="text-gray-500">Parent Program:</span>
          <span className="ml-1 font-medium text-black">{scheme.parent_program}</span>
        </div>
        <div className="text-xs">
          <span className="text-gray-500">Category:</span>
          <span className="ml-1 font-medium text-black">{scheme.category}</span>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Budget Overview */}
        <div className="space-y-4">
          {/* <h4 className="text-sm font-semibold text-black mb-3">Budget Overview</h4> */}
          <div className="grid grid-cols-2 gap-3">
            <BudgetCard
              label="Total Budget"
              amount={scheme.total_budget}
              subtitle="Crores"
            />
            <BudgetCard
              label="Allocated"
              amount={scheme.allocated_budget}
              subtitle="Crores"
            />
          </div>
          <div className="grid grid-cols-1">
            <BudgetCard
              label="Amount Spent"
              amount={scheme.spent}
              subtitle="Crores"
            />
          </div>
          <div className="pt-2">
            <ProgressBar total={scheme.total_budget} allocated={scheme.allocated_budget} />
          </div>
        </div>

        {/* Utilization Chart */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h4 className="text-sm font-semibold text-black">Fund Utilization</h4>
          <DonutChart allocated={scheme.allocated_budget} spent={scheme.spent} />
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs text-center">
            <div>
              <div className="text-sm font-semibold text-black">₹{(scheme.spent/1e7).toFixed(2)} Cr</div>
              <div className="text-xs text-gray-500">Spent</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-black">₹{((scheme.allocated_budget - scheme.spent)/1e7).toFixed(2)} Cr</div>
              <div className="text-xs text-gray-500">Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Demo component with sample data
const BudgetDashboard = () => {
  const sampleScheme = {
    name: "Digital India Initiative",
    description: "Comprehensive program to transform India into a digitally empowered society and knowledge economy through technology-driven governance and services.",
    type: "Central Scheme",
    parent_program: "Ministry of Electronics & IT",
    category: "Digital Infrastructure",
    total_budget: 125000000000, // 1,250 crores
    allocated_budget: 87500000000, // 875 crores  
    spent: 52500000000 // 525 crores
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="pl-8 pr-8">
        <SchemeBudgetSection scheme={sampleScheme} />
      </div>
    </div>
  );
};

export default BudgetDashboard;