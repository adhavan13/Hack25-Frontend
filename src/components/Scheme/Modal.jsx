import React, { useState, useEffect } from "react";
import {
  Calendar,
  User,
  Building2,
  Users,
  DollarSign,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Circle,
  AlertTriangle,
  X,
  Settings,
  FileText,
  Wallet,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import LanguageSwitcher from "../NavBar/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import "../../i18n/config";

const Modal = ({ isOpen, onClose, project, loading: parentLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectDetails, setProjectDetails] = useState(null);
  const { t } = useTranslation();

  // Fetch project details when modal opens and project changes
  useEffect(() => {
    // Use both projectId and project_id for compatibility
    const pid = project?.projectId || project?.project_id;
    if (isOpen && pid) {
      setLoading(true);
      fetch("https://hack25-backend-x7el.vercel.app/api/projects/getDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: pid,
          filters: {},
          language: "eng",
          location: "",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // API returns an array of project objects
          if (Array.isArray(data) && data.length > 0) {
            setProjectDetails(data[0]);
          } else {
            setProjectDetails(null);
          }
        })
        .catch(() => setProjectDetails(null))
        .finally(() => setLoading(false));
    } else {
      setProjectDetails(null);
    }
  }, [isOpen, project]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Use the fetched project details if available, otherwise fallback to sampleProject
  const sampleProject = {
    project_name: "Construction of Kovalam-Vizhinjam Coastal Road (Phase-1)",
    project_description:
      "Construction of 2-lane concrete road with proper drainage system and street lighting along the coastal stretch connecting Kovalam to Vizhinjam port. The project includes beautification works and pedestrian walkways.",
    project_type: "New Construction",
    work_category: "Road Construction",

    scheme_name: "Kerala Coastal Infrastructure Development Program",
    scheme_description:
      "Comprehensive infrastructure development program for Kerala's coastal areas including roads, ports, tourism facilities and coastal protection measures",
    scheme_type: "State",
    scheme_category: "Infrastructure Development",

    total_scheme_budget: 50000000000,
    allocated_budget: 125000000,
    estimated_cost: 125000000,
    current_amount_spent: 35000000,

    status: "Ongoing",
    physical_progress_percentage: 35,

    implementing_department: "Public Works Department",
    implementing_agency: "PWD, Thiruvananthapuram Division",
    nodal_officer: {
      name: "Er. Rajesh Kumar",
      designation: "Executive Engineer",
      contact: "+91-9876543210",
      email: "ee.pwd.tvm@kerala.gov.in",
    },

    timeline: {
      proposal_date: new Date("2024-01-15"),
      approval_date: new Date("2024-02-20"),
      tender_publication_date: new Date("2024-03-01"),
      work_commencement_date: new Date("2024-05-01"),
      scheduled_completion_date: new Date("2025-04-30"),
      actual_completion_date: null,
    },

    contractor: {
      company_name: "Kerala Infrastructure Builders Pvt Ltd",
      registration_number: "KL05E0123456",
      contractor_class: "A Class",
      contact_person: "Mr. Suresh Nair",
      contact_details: {
        phone: "+91-9876543210",
        email: "kib.construction@email.com",
        address:
          "123 Industrial Estate, Kazhakuttom, Thiruvananthapuram - 695582",
      },
    },

    beneficiaries: {
      direct_beneficiaries: 15000,
      indirect_beneficiaries: 45000,
      beneficiary_categories: [
        "Daily commuters",
        "Tourism industry workers",
        "Local businesses",
        "Fishing community",
        "Students and school children",
      ],
    },
  };

  // Only use projectDetails or sampleProject for rendering
  const data = projectDetails || sampleProject;

  const formatMoney = (amount) => {
    return t("modal.moneyFormat", { amount: (amount / 10000000).toFixed(1) });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const SimpleProgressBar = ({ percentage }) => {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Work Completed</span>
          <span className="text-lg font-bold text-gray-900">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(90deg, #72e3ad 0%, #5fd49a 100%)",
            }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          About {Math.round(percentage / 10)} out of 10 parts done
        </div>
      </div>
    );
  };

  const timelineSteps = [
    {
      key: "proposal_date",
      label: t("modal.timeline.projectPlanned"),
      simple: t("modal.timeline.ideaProposed"),
      completed: true,
    },
    {
      key: "approval_date",
      label: t("modal.timeline.gotPermission"),
      simple: t("modal.timeline.govtSaidYes"),
      completed: true,
    },
    {
      key: "tender_publication_date",
      label: t("modal.timeline.foundBuilder"),
      simple: t("modal.timeline.selectedBuilder"),
      completed: true,
    },
    {
      key: "work_commencement_date",
      label: t("modal.timeline.workStarted"),
      simple: t("modal.timeline.constructionBegan"),
      completed: true,
    },
    {
      key: "scheduled_completion_date",
      label: t("modal.timeline.expectedFinish"),
      simple: t("modal.timeline.whenReady"),
      completed: false,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`absolute top-0 left-0 right-0 bg-white shadow-lg transform transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {/* Close Button - Fixed at top */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {t("modal.projectDetails")}
            </h1>
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher />
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t("modal.closeModal")}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          </button>
        </div>

        {/* Loading State */}
        {loading || parentLoading ? (
          <ModalSkeleton />
        ) : (
          <div className="px-3 sm:px-6 pb-6 space-y-4 sm:space-y-8">
            {/* Debug: Show fetched data */}
            {/* <pre style={{fontSize:10, color:'#888'}}>{JSON.stringify(data, null, 2)}</pre> */}
            {/* Header with Clear Purpose */}
            <div className="text-center pt-3 sm:pt-4 pb-2 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {data.project_name || t("modal.projectName")}
              </h2>
              <div className="bg-gray-100 mx-auto max-w-3xl p-3 rounded-lg mb-4">
                <p className="text-gray-900 text-xs sm:text-sm leading-relaxed">
                  {data.project_description || t("modal.noDescription")}
                </p>
              </div>
              <div className="inline-flex items-center justify-center gap-2 bg-gray-100 px-3 py-1 rounded-full mb-2">
                <AlertTriangle className="w-4 h-4 text-gray-700" />
                <span className="font-medium text-xs sm:text-sm text-gray-900">
                  {t("modal.currentStatus")}{" "}
                  <span className="text-sm sm:text-base font-semibold">
                    {data.status || t("modal.statusUnknown")}
                  </span>
                </span>
              </div>
            </div>

            {/* Key Information Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-center mb-2">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">
                  {t("modal.budgetAllocated")}
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {data.allocated_budget
                    ? formatMoney(data.allocated_budget)
                    : t("modal.na")}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {t("modal.totalFunds")}
                </div>
              </div>

              <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-center mb-2">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">
                  {t("modal.moneyUsedSoFar")}
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {data.current_amount_spent
                    ? formatMoney(data.current_amount_spent)
                    : t("modal.na")}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {data.allocated_budget && data.current_amount_spent
                    ? Math.round(
                        (data.current_amount_spent / data.allocated_budget) *
                          100
                      )
                    : 0}
                  {t("modal.percentBudgetUsed")}
                </div>
              </div>

              <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">
                  {t("modal.peopleBenefiting")}
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {data.beneficiaries
                    ? data.beneficiaries.direct_beneficiaries +
                      data.beneficiaries.indirect_beneficiaries
                    : t("modal.na")}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {data.beneficiaries
                    ? t("modal.directIndirect", {
                        direct: data.beneficiaries.direct_beneficiaries,
                        indirect: data.beneficiaries.indirect_beneficiaries,
                      })
                    : ""}
                </div>
              </div>

              <div className="text-center p-2 sm:p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-1 font-semibold">
                  {t("modal.timelineLabel")}
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {data.timeline && data.timeline.scheduled_completion_date
                    ? new Date(
                        data.timeline.scheduled_completion_date
                      ).toLocaleString("en-IN", {
                        month: "short",
                        year: "numeric",
                      })
                    : t("modal.na")}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {t("modal.expectedCompletion")}
                </div>
              </div>
            </div>

            {/* Progress - More Informative */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-6 bg-white">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                {t("modal.currentProgress")}
              </h3>
              <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center">
                <div className="w-full sm:w-2/3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      {t("modal.workCompleted")}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      {data.physical_progress_percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                    <div
                      className="h-3 sm:h-4 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${data.physical_progress_percentage}%`,
                        backgroundColor: "#72e3ad",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>
                      {t("modal.started")}{" "}
                      <span className="font-medium">
                        {data.timeline?.work_commencement_date
                          ? new Date(data.timeline.work_commencement_date).toLocaleString("en-IN", {
                              month: "long",
                              year: "numeric",
                            })
                          : t("modal.na")}
                      </span>
                    </span>
                    <span>
                      {t("modal.expectedEnd")}{" "}
                      <span className="font-medium">
                        {data.timeline?.scheduled_completion_date
                          ? new Date(data.timeline.scheduled_completion_date).toLocaleString("en-IN", {
                              month: "long",
                              year: "numeric",
                            })
                          : t("modal.na")}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/3 bg-gray-100 p-3 rounded-lg">
                  <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                    {t("modal.whatsHappeningNow")}
                  </h4>
                  <ul className="text-xs sm:text-sm text-gray-900 space-y-3 list-disc pl-4">
                    <li>
                      <span className="font-medium">{t("modal.roadFoundation")}</span>{" "}
                      {t("modal.isBeingLaid")}
                    </li>
                    <li>
                      <span className="font-medium">{t("modal.drainageSystems")}</span>{" "}
                      {t("modal.installation")}
                    </li>
                    <li>
                      {t("modal.preparingFor")}{" "}
                      <span className="font-medium">{t("modal.streetLighting")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Timeline - Horizontal for desktop, Vertical for mobile */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-8 bg-white">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                {t("modal.projectTimeline")}
              </h3>
              <p className="text-xs text-gray-600 mb-4 sm:mb-6">
                {t("modal.timelineDesc")}
              </p>

              {/* Desktop Timeline (Horizontal) - Hidden on mobile */}
              <div className="hidden sm:flex flex-nowrap w-full justify-between pb-4">
                {timelineSteps.map((step, index) => {
                  const date = data.timeline?.[step.key]
                    ? new Date(data.timeline[step.key])
                    : null;
                  const isLast = index === timelineSteps.length - 1;

                  return (
                    <div
                      key={step.key}
                      className="flex flex-col items-center relative min-w-[150px] flex-1"
                    >
                      {/* Connector Line */}
                      {!isLast && (
                        <div
                          className={`absolute top-3 left-[50%] w-[calc(100%-20px)] h-[2px] ${
                            step.completed ? "bg-[#72e3ad]" : "bg-gray-200"
                          }`}
                        ></div>
                      )}

                      {/* Circle Indicator */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                          step.completed ? "bg-gray-100" : "bg-gray-100"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle
                            className="w-4 h-4 text-gray-700"
                            fill="#72e3ad"
                          />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-500" />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="mt-3 text-center px-2">
                        <div className="font-semibold text-gray-900 text-base">
                          {step.label}
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          {step.simple}
                        </div>
                        <div
                          className={`text-xs py-1 px-2 rounded-md font-medium ${
                            step.completed
                              ? "bg-gray-100 text-gray-900"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {date ? formatDate(date) : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Timeline (Vertical) - Shown only on mobile */}
              <div className="sm:hidden flex flex-col items-center space-y-4">
                {timelineSteps.map((step, index) => {
                  const date = data.timeline?.[step.key]
                    ? new Date(data.timeline[step.key])
                    : null;
                  const isLast = index === timelineSteps.length - 1;
                  return (
                    <div
                      key={step.key}
                      className="flex items-start gap-3 relative w-full max-w-xs mx-auto"
                    >
                      {/* Vertical connector line */}
                      {!isLast && (
                        <div
                          className={`absolute left-3 top-6 w-[2px] h-[calc(100%+16px)] ${
                            step.completed ? "bg-[#72e3ad]" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                      {/* Left side - Circle indicator */}
                      <div className="flex-shrink-0 z-10">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-gray-100" : "bg-gray-100"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle
                              className="w-4 h-4 text-gray-700"
                              fill="#72e3ad"
                            />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                      </div>
                      {/* Right side - Content */}
                      <div className="flex-grow pl-1 pb-1">
                        <div className="font-semibold text-gray-900 text-sm">
                          {step.label}
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {step.simple}
                        </div>
                        <div className="text-xs py-1 px-2 rounded-md font-medium bg-gray-100 text-gray-900 inline-block">
                          {date ? formatDate(date) : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Who's Involved - More Informative */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <div className="border border-gray-200 rounded-lg p-3 sm:p-6 bg-white h-full flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  <span>{t("modal.govtOfficerInCharge")}</span>
                </h3>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                  {t("modal.officialResponsible")}
                </p>
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-grow flex flex-col justify-between">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="font-semibold text-sm sm:text-base text-gray-900">
                      {data.nodal_officer?.name || "N/A"}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-900 font-medium">
                      {data.nodal_officer?.designation || "N/A"}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-900">
                      {data.implementing_department || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
                      <Phone className="w-4 h-4 flex-shrink-0 text-gray-700" />
                      <span className="break-all">
                        {data.nodal_officer?.contact || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
                      <Mail className="w-4 h-4 flex-shrink-0 text-gray-700" />
                      <span className="break-all">
                        {data.nodal_officer?.email || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 sm:p-6 bg-white h-full flex flex-col">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  <span>{t("modal.constructionCompany")}</span>
                </h3>
                <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                  {t("modal.companySelected")}
                </p>
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg flex-grow flex flex-col justify-between">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="font-semibold text-sm sm:text-base text-gray-900">
                      {data.contractor?.company_name || "N/A"}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-900 font-medium">
                      {data.contractor?.contractor_class || "N/A"}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-900">
                      {t("modal.contact")}: {data.contractor?.contact_person || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
                      <Phone className="w-4 h-4 flex-shrink-0 text-gray-700" />
                      <span className="break-all">
                        {data.contractor?.contact_details?.phone || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-gray-700" />
                      <span className="break-all text-xs">
                        {data.contractor?.contact_details?.address
                          ? data.contractor.contact_details.address
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Who Benefits - Clearer Layout */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-6 bg-white">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                <span>{t("modal.whoWillBenefit")}</span>
              </h3>
              <p className="text-xs text-gray-600 mb-3 sm:mb-4">
                {t("modal.projectWillImprove")}
              </p>

              <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                <div className="w-full md:w-1/3 bg-gray-100 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                    {data.beneficiaries
                      ? data.beneficiaries.direct_beneficiaries +
                        data.beneficiaries.indirect_beneficiaries
                      : t("modal.na")}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-900 font-medium">
                    {t("modal.peopleBenefiting")}
                  </div>
                  <div className="flex justify-center gap-4 mt-3">
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-semibold text-gray-900">
                        {data.beneficiaries?.direct_beneficiaries || t("modal.na")}
                      </div>
                      <div className="text-xs text-gray-900">{t("modal.directImpact") || "Direct Impact"}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm sm:text-base font-semibold text-gray-900">
                        {data.beneficiaries?.indirect_beneficiaries || t("modal.na")}
                      </div>
                      <div className="text-xs text-gray-900">{t("modal.indirectImpact") || "Indirect Impact"}</div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    {t("modal.specificGroups")}
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
                    {data.beneficiaries?.beneficiary_categories
                      ? data.beneficiaries.beneficiary_categories.map(
                          (category, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: "#72e3ad" }}
                              ></div>
                              <span className="text-xs sm:text-sm font-medium text-gray-900">
                                {category}
                              </span>
                            </div>
                          )
                        )
                      : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with additional resources */}
            <div className="text-center p-3 sm:p-6 bg-gray-100 rounded-lg">
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-3">
                {t("modal.wantToKnowMore")}
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                <button className="flex items-center gap-1 px-3 py-2 bg-white text-gray-900 rounded-lg text-xs sm:text-sm border border-gray-200">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  <span>{t("modal.contactPWD")}</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-white text-gray-900 rounded-lg text-xs sm:text-sm border border-gray-200">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                  <span>{t("modal.viewOnMap")}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader Component
const ModalSkeleton = () => (
  <div className="px-3 sm:px-6 pb-6 space-y-4 sm:space-y-8 animate-pulse">
    {/* Title */}
    <div className="h-7 w-1/3 bg-gray-200 rounded mb-2 mx-auto" />
    <div className="h-4 w-2/3 bg-gray-200 rounded mx-auto mb-4" />
    {/* Status */}
    <div className="h-6 w-40 bg-gray-200 rounded-full mx-auto mb-2" />
    {/* Cards */}
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-4 border border-gray-200 rounded-lg bg-white flex flex-col items-center">
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
    {/* Progress */}
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-full bg-gray-200 rounded mb-2" />
      <div className="h-3 w-1/2 bg-gray-100 rounded" />
    </div>
    {/* Timeline */}
    <div className="border border-gray-200 rounded-lg p-8 bg-white">
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-4" />
      <div className="flex gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="h-6 w-6 bg-gray-200 rounded-full mb-2" />
            <div className="h-3 w-12 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
    {/* Who's Involved */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col gap-3">
          <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-1/3 bg-gray-100 rounded mb-2" />
          <div className="h-3 w-1/2 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
    {/* Who Benefits */}
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
      <div className="flex gap-4">
        <div className="h-10 w-16 bg-gray-200 rounded" />
        <div className="flex-1 flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-3 w-1/2 bg-gray-100 rounded" />
          ))}
        </div>
      </div>
    </div>
    {/* Footer */}
    <div className="h-8 w-1/2 bg-gray-200 rounded mx-auto" />
  </div>
);

// Export the Modal component for use in your ProjectGrid
export default Modal;
