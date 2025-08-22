import React from 'react';
import { Building2, User, Mail, Phone, FileText, Grid, Briefcase, Tag } from 'lucide-react';

const OverviewSection = ({ overview }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
    {/* Description with improved typography */}
    <div className="mb-10 border-l-4 border-black pl-6 py-2">
      {/* <h3 className="text-black font-semibold text-lg mb-3 tracking-wide">Project Overview</h3> */}
      <p className="text-black text-lg leading-relaxed font-light">{overview.description}</p>
    </div>

    {/* Project Details Grid - enhanced styling */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 p-6 bg-white
     rounded-lg border border-gray-200">
      <div className="flex items-start space-x-3">
        <Grid className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Type</span>
          <span className="text-base font-semibold text-black">{overview.project_type}</span>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Briefcase className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Work Category</span>
          <span className="text-base font-semibold text-black">{overview.work_category}</span>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <Tag className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Category</span>
          <span className="text-base font-semibold text-black">{overview.project_category || "—"}</span>
        </div>
      </div>
    </div>

    {/* Implementation Details - improved layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <h4 className="text-base font-semibold text-black mb-6 pb-2 border-b border-gray-100">Implementation Details</h4>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <Building2 className="h-6 w-6 text-gray-700 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Department</h4>
              <p className="text-base font-medium text-black">{overview.implementing_department}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <FileText className="h-6 w-6 text-gray-700 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Agency</h4>
              <p className="text-base font-medium text-black">{overview.implementing_agency}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nodal Officer Card - enhanced design */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center space-x-3 mb-6 pb-2 border-b border-gray-100">
          <User className="h-6 w-6 text-black" />
          <h4 className="text-base font-semibold text-black">Nodal Officer</h4>
        </div>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-black text-lg">{overview.nodal_officer.name}</p>
            <p className="text-sm font-medium text-gray-600">{overview.nodal_officer.designation}</p>
          </div>
          <div className="flex items-center space-x-3 text-sm pt-3">
            <Phone className="h-5 w-5 text-gray-600" />
            <span className="text-gray-800 font-medium">{overview.nodal_officer.contact}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Mail className="h-5 w-5 text-gray-600" />
            <a 
              href={`mailto:${overview.nodal_officer.email}`} 
              className="text-black hover:text-gray-700 font-medium hover:underline transition-colors"
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
    <div className="pl-6 pr-6 md:pl-12 md:pr-12 lg:pl-8 lg:pr-8 mx-auto p-8 bg-white min-h-screen">
      {/* <h2 className="text-3xl font-bold text-black mb-8 tracking-tight">Project Details</h2> */}
      <OverviewSection overview={demoData} />
    </div>
  );
}