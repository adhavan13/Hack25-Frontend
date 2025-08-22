import React from 'react';
import { Building2, User, Mail, Phone } from 'lucide-react';

const OverviewSection = ({ overview }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
    {/* Description */}
    <div className="mb-8">
      <p className="text-black text-lg leading-relaxed">{overview.description}</p>
    </div>

    {/* Project Details Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-white rounded-lg border border-gray-100">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-1">Type</span>
        <span className="text-base font-semibold text-black">{overview.project_type}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-1">Work Category</span>
        <span className="text-base font-semibold text-black">{overview.work_category}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-1">Category</span>
        <span className="text-base font-semibold text-black">{overview.project_category || "—"}</span>
      </div>
    </div>

    {/* Implementation Details */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <Building2 className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-base font-medium text-black mb-1">Department</h4>
            <p className="text-base text-gray-800">{overview.implementing_department}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Building2 className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-base font-medium text-black mb-1">Agency</h4>
            <p className="text-base text-gray-800">{overview.implementing_agency}</p>
          </div>
        </div>
      </div>

      {/* Nodal Officer Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <User className="h-6 w-6 text-black" />
          <h4 className="text-base font-semibold text-black">Nodal Officer</h4>
        </div>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-black text-base">{overview.nodal_officer.name}</p>
            <p className="text-sm text-gray-700">{overview.nodal_officer.designation}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-gray-700" />
            <span className="text-gray-800">{overview.nodal_officer.contact}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-gray-700" />
            <a 
              href={`mailto:${overview.nodal_officer.email}`} 
              className="text-black hover:underline transition-colors"
            >
              {overview.nodal_officer.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Demo data for preview
const demoData = {
  description: "This comprehensive infrastructure development project aims to enhance urban connectivity and improve quality of life for residents through sustainable and innovative solutions.",
  project_type: "Infrastructure",
  work_category: "Development",
  project_category: "Urban Planning",
  implementing_department: "Public Works Department",
  implementing_agency: "Municipal Corporation",
  nodal_officer: {
    name: "Dr. Rajesh Kumar",
    designation: "Chief Project Officer",
    contact: "+91 98765 43210",
    email: "rajesh.kumar@gov.in"
  }
};

export default function Demo() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-8">Project Overview</h1>
      <OverviewSection overview={demoData} />
    </div>
  );
}