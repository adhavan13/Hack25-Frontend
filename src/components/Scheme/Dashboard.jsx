import React from "react";
// import your font in index.css or main.jsx as per your setup
// import 'path/to/font.css';

// Dummy Donut and Bar chart using SVG (monochrome)
const DonutChart = ({ allocated, spent, total }) => {
  const spentAngle = (spent / total) * 360;
  const allocatedAngle = (allocated / total) * 360;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {/* Background circle */}
      <circle cx="60" cy="60" r="50" fill="none" stroke="#000" strokeWidth="8" opacity="0.08" />
      {/* Allocated arc */}
      <circle
        cx="60" cy="60" r="50"
        fill="none"
        stroke="#000"
        strokeWidth="8"
        strokeDasharray={`${allocatedAngle} ${360 - allocatedAngle}`}
        strokeDashoffset={90}
        style={{ transition: 'stroke-dasharray 0.5s' }}
      />
      {/* Spent arc */}
      <circle
        cx="60" cy="60" r="50"
        fill="none"
        stroke="#000"
        strokeWidth="8"
        strokeDasharray={`${spentAngle} ${360 - spentAngle}`}
        strokeDashoffset={90}
        style={{ transition: 'stroke-dasharray 0.5s' }}
        opacity={0.5}
      />
      <text x="60" y="65" textAnchor="middle" fontWeight="bold" fontSize="18" fill="#000">
        ₹{Math.round(spent/10000000)}Cr
      </text>
    </svg>
  );
};

const BarChart = ({ labels, values, max }) => (
  <div className="flex flex-col gap-2 w-full">
    {labels.map((label, i) => (
      <div key={label} className="flex items-center gap-2">
        <span className="w-32 text-xs font-medium">{label}</span>
        <div className="flex-1 h-4 border border-black bg-white relative">
          <div
            className="h-full bg-black"
            style={{ width: `${(values[i] / max) * 100}%` }}
          ></div>
        </div>
        <span className="ml-2 text-xs font-bold">{values[i].toLocaleString()}</span>
      </div>
    ))}
  </div>
);

const Timeline = ({ timeline }) => {
  const milestones = [
    { label: "Proposal", date: timeline.proposal_date },
    { label: "Approval", date: timeline.approval_date },
    { label: "Tender", date: timeline.tender_publication_date },
    { label: "Commencement", date: timeline.work_commencement_date },
    { label: "Scheduled Completion", date: timeline.scheduled_completion_date },
    { label: "Actual Completion", date: timeline.actual_completion_date },
  ];
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center w-full justify-between">
        {milestones.map((m, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="w-5 h-5 rounded-full bg-black mb-1"></div>
            <span className="text-xs text-center font-medium whitespace-nowrap">
              {m.label}
            </span>
            <span className="text-[10px] text-center">
              {m.date ? new Date(m.date).toLocaleDateString() : "-"}
            </span>
            {i < milestones.length - 1 && (
              <div className="h-0.5 bg-black w-full -mt-3 mb-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const KeralaMap = () => (
  <svg viewBox="0 0 120 200" width="120" height="200" className="mx-auto">
    {/* Simple Kerala outline, highlight TVM as a black dot */}
    <path d="M60,10 Q80,40 70,80 Q90,120 60,190 Q30,120 50,80 Q40,40 60,10" fill="none" stroke="#000" strokeWidth="2" />
    <circle cx="65" cy="170" r="7" fill="#000" />
    <text x="80" y="175" fontSize="10" fill="#000">Thiruvananthapuram</text>
  </svg>
);

const Dashboard = ({ project }) => (
  <div className="min-h-screen bg-white text-black font-sans p-8 flex flex-col gap-8" style={{ fontFamily: 'YourProvidedFont, sans-serif' }}>
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-black pb-4">
      <div>
        <div className="text-2xl font-extrabold tracking-tight">{project.project_id}</div>
        <div className="text-4xl font-black mt-1 mb-2">{project.project_name}</div>
      </div>
      <div>
        <span className={`inline-block px-4 py-1 border border-black rounded-full text-sm font-bold uppercase tracking-widest ${project.status === 'Ongoing' ? 'bg-white text-black' : 'bg-black text-white'}`}>{project.status}</span>
      </div>
    </div>

    {/* Project Overview */}
    <div className="border border-black rounded-lg p-6 bg-white flex flex-col gap-2 max-w-3xl">
      <div className="text-lg font-bold mb-1">Project Overview</div>
      <div className="mb-2 text-base font-medium">{project.project_description}</div>
      <div className="flex flex-wrap gap-4 text-sm">
        <div><span className="font-semibold">Type:</span> {project.project_type}</div>
        <div><span className="font-semibold">Work Category:</span> {project.work_category}</div>
        <div><span className="font-semibold">Project Category:</span> {project.project_category || '-'}</div>
        <div><span className="font-semibold">Department:</span> {project.implementing_department}</div>
        <div><span className="font-semibold">Agency:</span> {project.implementing_agency}</div>
        <div><span className="font-semibold">Nodal Officer:</span> {project.nodal_officer.name} ({project.nodal_officer.designation}, {project.nodal_officer.contact}, {project.nodal_officer.email})</div>
      </div>
    </div>

    {/* Scheme & Budget */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Scheme Card */}
      <div className="border border-black rounded-lg p-6 bg-white flex-1 min-w-[300px]">
        <div className="text-lg font-bold mb-1">Scheme</div>
        <div className="font-semibold">{project.scheme_name}</div>
        <div className="text-sm mb-1">{project.scheme_description}</div>
        <div className="flex flex-wrap gap-2 text-xs">
          <div><span className="font-semibold">Type:</span> {project.scheme_type}</div>
          <div><span className="font-semibold">Category:</span> {project.scheme_category}</div>
          <div><span className="font-semibold">Parent Program:</span> {project.parent_program}</div>
        </div>
      </div>
      {/* Budget Card */}
      <div className="border border-black rounded-lg p-6 bg-white flex-1 min-w-[300px] flex flex-col items-center">
        <div className="text-lg font-bold mb-1">Budget</div>
        <DonutChart allocated={project.allocated_budget} spent={project.current_amount_spent} total={project.estimated_cost} />
        <div className="w-full mt-4">
          <BarChart
            labels={["Scheme Total", "Project Allocation"]}
            values={[project.total_scheme_budget, project.allocated_budget]}
            max={project.total_scheme_budget}
          />
        </div>
      </div>
    </div>

    {/* Timeline */}
    <div className="border border-black rounded-lg p-6 bg-white">
      <div className="text-lg font-bold mb-4">Timeline</div>
      <Timeline timeline={project.timeline} />
    </div>

    {/* Contractor Details */}
    <div className="border border-black rounded-lg p-6 bg-white max-w-2xl">
      <div className="text-lg font-bold mb-1">Contractor</div>
      <div className="font-semibold">{project.contractor.company_name}</div>
      <div className="text-sm mb-1">Reg: {project.contractor.registration_number} | Class: {project.contractor.contractor_class}</div>
      <div className="text-xs mb-1">Contact: {project.contractor.contact_person} ({project.contractor.contact_details.phone}, {project.contractor.contact_details.email})</div>
      <div className="text-xs">{project.contractor.contact_details.address}</div>
    </div>

    {/* Beneficiaries */}
    <div className="border border-black rounded-lg p-6 bg-white flex flex-col gap-4">
      <div className="text-lg font-bold mb-1">Beneficiaries</div>
      <div className="flex gap-8 items-center">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-black">{project.beneficiaries.direct_beneficiaries.toLocaleString()}</span>
          <span className="text-xs font-semibold uppercase">Direct</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-black">{project.beneficiaries.indirect_beneficiaries.toLocaleString()}</span>
          <span className="text-xs font-semibold uppercase">Indirect</span>
        </div>
      </div>
      <div className="w-full">
        <BarChart
          labels={project.beneficiaries.beneficiary_categories}
          values={[4000, 3000, 2500, 2000, 3500]} // Example values, replace with real data if available
          max={45000}
        />
      </div>
    </div>

    {/* Location Map */}
    <div className="border border-black rounded-lg p-6 bg-white flex flex-col items-center">
      <div className="text-lg font-bold mb-2">Location</div>
      <KeralaMap />
      <div className="text-xs mt-2">District: <span className="font-semibold">{project.location.district}</span></div>
    </div>

    {/* Footer Metadata */}
    <div className="border-t border-black pt-4 text-xs flex flex-wrap gap-4 justify-between mt-8">
      <div>Created at: {new Date(project.created_at).toLocaleString()}</div>
      <div>Updated at: {new Date(project.updated_at).toLocaleString()}</div>
      <div>Created by: {project.created_by}</div>
      <div>Last modified by: {project.last_modified_by}</div>
      <div>Version: {project.version}</div>
    </div>
  </div>
);

export default Dashboard;
