import React from 'react';

const ContractorSection = ({ contractor }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-4 flex flex-col sm:flex-row gap-4">
    <div className="flex-1">
      <div className="font-semibold">{contractor.company_name}</div>
      <div className="text-xs mb-1">Class: {contractor.contractor_class}</div>
      <div className="text-xs mb-1">Reg#: {contractor.registration_number}</div>
    </div>
    <div className="flex-1 text-xs">
      <div><span className="font-semibold">Contact:</span> {contractor.contact_person}</div>
      <div>{contractor.phone}</div>
      <div><a href={`mailto:${contractor.email}`} className="text-blue-600 underline">{contractor.email}</a></div>
      <div>{contractor.address}</div>
    </div>
  </div>
);

export default ContractorSection;
