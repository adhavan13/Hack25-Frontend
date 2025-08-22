import React from 'react';
import HeaderSection from './HeaderSection';
import OverviewSection from './OverviewSection';
import SchemeBudgetSection from './SchemeBudgetSection';
import TimelineSection from './TimelineSection';
import ContractorSection from './ContractorSection';
import BeneficiariesSection from './BeneficiariesSection';
import MapSection from './MapSection';
import FooterSection from './FooterSection';

// --- Data (move to a separate file if needed) ---
const projectUIData = {
  header: {
    project_id: "KL-PWD-TVM-2024-001",
    project_name: "Construction of Kovalam-Vizhinjam Coastal Road (Phase-1)",
    status: "Ongoing"
  },
  overview: {
    description: "This project involves the construction of a coastal road to enhance connectivity and promote tourism.",
    project_type: "Infrastructure",
    work_category: "Roads and Bridges",
    project_category: "Coastal Development",
    implementing_department: "Public Works Department",
    implementing_agency: "Kerala Public Works Department",
    nodal_officer: {
      name: "Er. Rajesh Kumar",
      designation: "Executive Engineer",
      contact: "+91-9876543210",
      email: "ee.pwd.tvm@kerala.gov.in"
    }
  },
  scheme: {
    name: "PMGSY",
    description: "Pradhan Mantri Gram Sadak Yojana - Connecting rural areas with all weather roads.",
    type: "Central Sector Scheme",
    parent_program: "Bharatmala Pariyojana",
    category: "Infrastructure",
    total_budget: 50000000000,
    allocated_budget: 125000000,
    estimated_cost: 125000000,
    spent: 35000000
  },
  timeline: {
    proposal_date: "2024-01-15",
    approval_date: "2024-02-20",
    tender_date: "2024-03-01",
    commencement_date: "2024-05-01",
    scheduled_completion: "2025-04-30",
    actual_completion: null
  },
  contractor: {
    company_name: "Kerala Infrastructure Builders Pvt Ltd",
    registration_number: "KL05E0123456",
    contractor_class: "A Class",
    contact_person: "Mr. Suresh Nair",
    phone: "+91-9876543210",
    email: "kib.construction@email.com",
    address: "123 Industrial Estate, Kazhakuttom, Thiruvananthapuram - 695582"
  },
  beneficiaries: {
    direct: 15000,
    indirect: 45000,
    categories: [
      "Daily commuters",
      "Tourism industry workers",
      "Local businesses",
      "Fishing community",
      "Students and school children"
    ]
  },
  footer: {
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-08-22T14:45:00Z",
    created_by: "project_admin_001",
    last_modified_by: "project_manager_tvm_001",
    version: 1
  }
};

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 transition-colors duration-300"
      onClick={onClose}
    >
      <div
        className="w-screen max-w-full bg-white rounded-t-2xl shadow-lg flex flex-col max-h-[90vh] animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-end p-4 pt-6">
          <button
            className="text-2xl text-gray-700 hover:text-red-500 transition-colors"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        <div className="px-6 pb-8 pt-2 overflow-y-auto flex-1">
          <HeaderSection header={projectUIData.header} />
          <OverviewSection overview={projectUIData.overview} />
          <SchemeBudgetSection scheme={projectUIData.scheme} />
          <TimelineSection timeline={projectUIData.timeline} />
          <ContractorSection contractor={projectUIData.contractor} />
          <BeneficiariesSection beneficiaries={projectUIData.beneficiaries} />
          <FooterSection footer={projectUIData.footer} />
        </div>
      </div>
      <style jsx>{`
        .animate-slideUp {
          animation: slideUp 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Modal;