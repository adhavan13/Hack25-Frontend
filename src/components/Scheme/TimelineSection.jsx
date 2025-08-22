import React from 'react';

const TimelineSection = ({ timeline }) => {
  const milestones = [
    { label: "Proposal", date: timeline.proposal_date, completed: true },
    { label: "Approval", date: timeline.approval_date, completed: true },
    { label: "Tender", date: timeline.tender_date, completed: true },
    { label: "Commencement", date: timeline.commencement_date, completed: true },
    { label: "Scheduled Completion", date: timeline.scheduled_completion, completed: false },
    { label: "Actual Completion", date: timeline.actual_completion || "—", completed: !!timeline.actual_completion }
  ];

  return (
    <div className="p-10 bg-white">
      <div className="relative">
        {/* Timeline line - improved with dashed style */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 border-dashed border-t border-gray-300 -translate-y-1/2"></div>
        
        {/* Milestones */}
        <div className="flex justify-between items-center relative">
          {milestones.map((milestone, index) => (
            <div key={index} className="group relative">
              {/* Milestone dot with enhanced styling */}
              <div className={`
                w-9 h-9 rounded-full border-2 flex items-center justify-center cursor-pointer
                transition-all duration-300 ease-out transform group-hover:scale-110
                shadow-sm group-hover:shadow-md
                ${milestone.completed 
                  ? 'bg-black border-black hover:bg-gray-800' 
                  : 'bg-white border-gray-400 hover:border-black'
                }
              `}>
                {milestone.completed && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Step label - improved typography */}
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-800 text-center tracking-wide">
                  {milestone.label}
                </div>
                <div className="text-xs text-gray-500 text-center mt-1 opacity-80">
                  {milestone.date}
                </div>
              </div>
              
              {/* Enhanced tooltip - visible on hover */}
              <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-0 
                  group-hover:opacity-100 transition-all duration-300 pointer-events-none 
                  group-hover:translate-y-2 scale-90 group-hover:scale-100 z-10">
                <div className="bg-white text-gray-800 text-sm px-6 py-3 rounded-xl shadow-xl 
                    border border-gray-200 whitespace-nowrap font-medium backdrop-blur-sm">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">
                    {milestone.label}
                  </div>
                  <div className="font-bold">{milestone.date}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                      w-4 h-4 rotate-45 -mt-2 bg-white border-b border-r border-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Demo component with sample data
// const TimelineDemo = () => {
//   const sampleTimeline = {
//     proposal_date: "2024-01-15",
//     approval_date: "2024-02-20",
//     tender_date: "2024-03-10",
//     commencement_date: "2024-04-01",
//     scheduled_completion: "2024-12-31",
//     actual_completion: null
//   };

//   return (
//     <div className="min-h-screen bg-white py-16 px-6">
//       <div className="pl-6 pr-6 md:pl-12 md:pr-12 lg:pl-24 lg:pr-24 mx-auto">
      
//         <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-4">
//           <TimelineSection timeline={sampleTimeline} />
//         </div>
//       </div>
//     </div>
//   );
// };

export default TimelineSection;