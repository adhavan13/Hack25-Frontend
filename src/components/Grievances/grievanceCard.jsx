import React, { useState } from "react";
import { ArrowBigUp, ArrowBigDown, MapPin, Calendar, User } from "lucide-react";

export default function GrievanceCard({
  id,
  title,
  category,
  projectService,
  location,
  description,
  date,
  status,
  assignedOfficer,
  upvotes,
  downvotes = 0,
  evidence,
  onUpvote,
  onDownvote,
  userVote,
  showReadMore = false,
}) {
  const getStatusColor = (status) => {
    switch ((status || "").toLowerCase()) {
      case "resolved":
        return "bg-[#72e3ad] text-black";
      case "pending":
        return "bg-gray-200 text-black";
      case "in progress":
        return "bg-gray-300 text-black";
      case "under review":
        return "bg-yellow-100 text-black";
      default:
        return "bg-gray-100 text-black";
    }
  };

  // Read more/less state for description
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200;
  let displayText = description;
  let shouldTruncate = showReadMore && description && description.length > maxLength;

  if (shouldTruncate && !expanded) {
    displayText = description.slice(0, maxLength) + '...';
  }

  return (
    <div className="bg-transparent p-2 sm:p-3 md:p-4"> {/* Increased base padding */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-300 hover:border-[#72e3ad] group">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 aspect-video lg:aspect-square relative overflow-hidden min-h-[140px] sm:min-h-[160px] p-2 sm:p-0"> {/* Added p-2 for mobile */}

            {evidence && evidence.startsWith('http') ? (
              <>
                <img 
                  src={evidence} 
                  alt="Evidence" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="text-sm font-medium text-white">
                    Photo Evidence
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">


                  <div className="w-12 h-12 mx-auto mb-2 bg-[#72e3ad] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>

                  </div> 
                  <span className="text-sm font-medium text-black">
                    {evidence || 'No Evidence'}
                  </span>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-2/3 p-3 sm:p-5 lg:p-6 flex flex-col justify-between"> {/* Increased padding for mobile */}
            {/* Header with ID and Status */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2"> {/* Increased mb/gap */}
              <div className="flex items-center gap-2 mb-1 sm:mb-0">
                <span className="text-[10px] sm:text-xs text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded-md break-all">
                  {id}
                </span>
              </div>
              <span className={`inline-flex items-center px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold ${getStatusColor(status)} ring-1 ring-inset ring-gray-300`}>
                <div className="w-1.5 h-1.5 rounded-full bg-black mr-1.5"></div>
                {status}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-black mb-3 sm:mb-4 leading-tight group-hover:text-gray-800 transition-colors duration-200 break-words">
              {title}
            </h2>

            {/* Category and Project/Service */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              <span className="inline-flex items-center bg-[#72e3ad] text-black px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm">
                {category}
              </span>
              {projectService && (
                <span className="inline-flex items-center bg-gray-200 text-black px-2 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium">
                  {projectService}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex items-start text-gray-700 mb-3 sm:mb-4">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-black flex-shrink-0" />
              <span className="text-xs sm:text-sm leading-relaxed break-words">{location}</span>
            </div>

            {/* Description */}
            <div className="bg-gray-100 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-200">
              <p className="text-gray-800 leading-relaxed text-xs sm:text-sm break-words">
                {displayText}
                {shouldTruncate && !expanded && (
                  <button
                    className="ml-2 text-blue-600 hover:underline text-xs sm:text-sm font-medium"
                    onClick={() => setExpanded(true)}
                  >
                    Read more
                  </button>
                )}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 sm:pt-4 border-t border-gray-200">
              {/* Date and Officer */}
              <div className="flex flex-col gap-1 sm:gap-2 mb-1 sm:mb-0">
                <div className="flex items-center text-gray-600 text-[10px] sm:text-xs">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-black" />
                  <span className="font-medium">
                    Submitted: {date ? new Date(date).toLocaleDateString() : ""}
                  </span>
                </div>
                {assignedOfficer && (
                  <div className="flex items-center text-gray-600 text-[10px] sm:text-xs">
                    <User className="w-3.5 h-3.5 mr-2 text-black" />
                    <span className="font-medium">
                      Assigned to: {assignedOfficer}
                    </span>
                  </div>
                )}
              </div>

              {/* Voting Section */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  className={`flex items-center gap-2 hover:scale-105 transition-all duration-200 px-2 py-1 rounded-lg ${
                    userVote === "upvote"
                      ? "bg-green-100 border border-green-300 shadow-sm"
                      : "hover:bg-green-50"
                  }`}
                  onClick={onUpvote}
                >
                  <ArrowBigUp
                    className={`w-5 h-5 transition-colors ${
                      userVote === "upvote"
                        ? "text-green-700 fill-green-600"
                        : "text-green-600 hover:text-green-700"
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      userVote === "upvote" ? "text-green-700" : "text-black"
                    }`}
                  >
                    {upvotes}
                  </span>
                </button>
                <button
                  className={`flex items-center gap-2 hover:scale-105 transition-all duration-200 px-2 py-1 rounded-lg ${
                    userVote === "downvote"
                      ? "bg-red-100 border border-red-300 shadow-sm"
                      : "hover:bg-red-50"
                  }`}
                  onClick={onDownvote}
                >
                  <ArrowBigDown
                    className={`w-5 h-5 transition-colors ${
                      userVote === "downvote"
                        ? "text-red-700 fill-red-600"
                        : "text-red-600 hover:text-red-700"
                    }`}
                  />
                  <span
                    className={`text-sm font-bold ${
                      userVote === "downvote" ? "text-red-700" : "text-black"
                    }`}
                  >
                    {downvotes}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}