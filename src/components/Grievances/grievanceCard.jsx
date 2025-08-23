import React from 'react';
import { ArrowBigUp, ArrowBigDown, MapPin, Calendar, User } from 'lucide-react';

export default function GrievanceCard({ 
  grievance = {
    id: "GRV-2024-001",
    title: "Poor Road Conditions and Safety Hazards on Main Street",
    category: "Infrastructure",
    projectService: "Road Maintenance",
    location: "Main Street, Downtown Area, Block 15-20",
    description: "Hundreds of farmers in Meppadi area have lost their entire spice plantations, coffee estates, and vegetable crops due to the recent devastating landslides. Despite submitting damage assessment forms to the Agriculture Department three weeks ago, no compensation has been received. Many farmers have lost not just their current season's crops but also perennial plants like cardamom, pepper, and coffee that took years to establish. Without immediate financial assistance, these farmers cannot replant or even meet their basic family needs. The delay in compensation is forcing many farming families to consider migrating to other areas for daily wage work, abandoning agriculture permanently. Agricultural officers have conducted preliminary surveys but the formal assessment and approval process is moving very slowly due to bureaucratic delays.",
    dateSubmitted: "2024-01-15",
    status: "Pending",
    assignedOfficer: "John Doe - Municipal Engineer",
    upvotes: 47,
    downvotes: 3
  }
}) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'bg-[#72e3ad] text-black';
      case 'pending': return 'bg-gray-200 text-black';
      case 'in progress': return 'bg-gray-300 text-black';
      default: return 'bg-gray-100 text-black';
    }
  };

  return (
    <div className="bg-transparent p-2 md:p-3">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-300 hover:border-[#72e3ad] group">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 aspect-video lg:aspect-square relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-[#72e3ad] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-black">Photo Evidence</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content Section */}
          <div className="w-full lg:w-2/3 p-4 lg:p-6">
            {/* Header with ID and Status */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <div className="flex items-center gap-2 mb-2 sm:mb-0">
                <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded-md">
                  {grievance.id}
                </span>
              </div>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(grievance.status)} ring-1 ring-inset ring-gray-300`}>
                <div className="w-1.5 h-1.5 rounded-full bg-black mr-1.5"></div>
                {grievance.status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl lg:text-2xl font-bold text-black mb-3 leading-tight group-hover:text-gray-800 transition-colors duration-200">
              {grievance.title}
            </h2>

            {/* Category and Project/Service */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center bg-[#72e3ad] text-black px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                {grievance.category}
              </span>
              <span className="inline-flex items-center bg-gray-200 text-black px-3 py-1.5 rounded-full text-xs font-medium">
                {grievance.projectService}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-start text-gray-700 mb-4">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-black flex-shrink-0" />
              <span className="text-sm leading-relaxed">{grievance.location}</span>
            </div>

            {/* Description */}
            <div className="bg-gray-100 rounded-lg p-3 mb-4 border border-gray-200">
              <p className="text-gray-800 leading-relaxed text-sm">
                {grievance.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
              {/* Date and Officer */}
              <div className="flex flex-col gap-2 mb-3 sm:mb-0">
                <div className="flex items-center text-gray-600 text-xs">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-black" />
                  <span className="font-medium">Submitted: {new Date(grievance.dateSubmitted).toLocaleDateString()}</span>
                </div>
                {grievance.assignedOfficer && (
                  <div className="flex items-center text-gray-600 text-xs">
                    <User className="w-3.5 h-3.5 mr-2 text-black" />
                    <span className="font-medium">Assigned to: {grievance.assignedOfficer}</span>
                  </div>
                )}
              </div>

              {/* Voting Section */}
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-300 hover:border-[#72e3ad] hover:bg-[#72e3ad] transition-all duration-200 group/upvote">
                  <ArrowBigUp className="w-4 h-4 text-black group-hover/upvote:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-black">{grievance.upvotes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-200 transition-all duration-200 group/downvote">
                  <ArrowBigDown className="w-4 h-4 text-black group-hover/downvote:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-black">{grievance.downvotes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}