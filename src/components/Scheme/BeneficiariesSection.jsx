import React from 'react';

const BeneficiariesSection = ({ beneficiaries }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-4">
    <div className="flex gap-8 mb-2">
      <div className="text-lg font-bold">Direct: {beneficiaries.direct.toLocaleString()}</div>
      <div className="text-lg font-bold">Indirect: {beneficiaries.indirect.toLocaleString()}</div>
    </div>
    <div className="mt-2">
      <div className="font-semibold text-xs mb-1">Categories:</div>
      {beneficiaries.categories.map((cat, i) => (
        <div key={i} className="flex items-center mb-1">
          <div className="w-24 text-xs">{cat}</div>
          <div className="flex-1 h-2 bg-black rounded ml-2"></div>
        </div>
      ))}
    </div>
  </div>
);

export default BeneficiariesSection;
