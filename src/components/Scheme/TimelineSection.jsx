import React from 'react';

const TimelineSection = ({ timeline }) => {
  const milestones = [
    { label: "Proposal", date: timeline.proposal_date },
    { label: "Approval", date: timeline.approval_date },
    { label: "Tender", date: timeline.tender_date },
    { label: "Commencement", date: timeline.commencement_date },
    { label: "Scheduled Completion", date: timeline.scheduled_completion },
    { label: "Actual Completion", date: timeline.actual_completion || "—" }
  ];
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        {milestones.map((m, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="w-3 h-3 rounded-full bg-black mb-1"></div>
            <div className="text-xs text-center">{m.label}</div>
            <div className="text-[10px] text-gray-500">{m.date}</div>
          </div>
        ))}
      </div>
      <div className="h-1 bg-black w-full rounded"></div>
    </div>
  );
};

export default TimelineSection;
