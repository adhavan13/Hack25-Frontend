import React, { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, Menu, X } from "lucide-react";
import ProjectGrid from "./ProjectGrid";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../i18n/config";

const DesignGallery = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("Latest"); // for time filter (dropdown)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(
    "Agriculture and Allied Services"
  ); // default to Agriculture and Allied Services
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      project_title: "PM Kaushal Vikas Yojana",
      scheme: "Skill Development",
      status: "Active",
      likes: 111,
      views: 14.1,
      preview: [
        { type: "mobile", color: "bg-blue-500" },
        { type: "mobile", color: "bg-gray-900" },
        { type: "mobile", color: "bg-yellow-400" },
        { type: "mobile", color: "bg-gray-900" },
      ],
    },
    {
      id: 2,
      project_title: "Swachh Bharat Mission",
      scheme: "Sanitation & Cleanliness",
      status: "Pending",
      likes: 54,
      views: 4.2,
      preview: [
        {
          type: "card",
          color: "bg-gradient-to-br from-pink-200 to-orange-400",
        },
        {
          type: "card",
          color: "bg-gradient-to-br from-gray-800 to-orange-600",
        },
      ],
    },
    {
      id: 3,
      project_title: "Pradhan Mantri Ujjwala Yojana",
      scheme: "Clean Fuel Access",
      status: "Completed",
      likes: 88,
      views: 13.4,
      preview: [
        { type: "mobile", color: "bg-gray-900" },
        { type: "mobile", color: "bg-orange-600" },
        { type: "mobile", color: "bg-gray-900" },
      ],
    },
    {
      id: 4,
      project_title: "Digital India Programme",
      scheme: "Digital Empowerment",
      status: "Active",
      likes: 37,
      views: 2.9,
      preview: [
        {
          type: "logo",
          color: "bg-gradient-to-r from-red-500 to-yellow-400",
          text: "DUAAL",
        },
        {
          type: "logo",
          color: "bg-gradient-to-r from-red-500 to-yellow-400",
          text: "DUAAL",
        },
      ],
    },
    {
      id: 5,
      project_title: "Smart Cities Mission",
      scheme: "Urban Development",
      status: "Pending",
      likes: 31,
      views: 1.8,
      preview: [
        {
          type: "logo",
          color: "bg-white",
          text: "LUMINA",
          textColor: "text-gray-800",
        },
        {
          type: "brand",
          color: "bg-gradient-to-br from-pink-300 to-orange-400",
        },
      ],
    },
    {
      id: 6,
      project_title: "PM Jan Dhan Yojana",
      scheme: "Financial Inclusion",
      status: "Completed",
      likes: 97,
      views: 3.9,
      preview: [
        {
          type: "mobile",
          color: "bg-gradient-to-br from-green-400 to-blue-600",
        },
        { type: "mobile", color: "bg-gray-900" },
        { type: "mobile", color: "bg-purple-600" },
      ],
    },
    {
      id: 7,
      project_title: "Ayushman Bharat",
      scheme: "Healthcare Coverage",
      status: "Active",
      likes: 111,
      views: 14.7,
      preview: [
        { type: "dashboard", color: "bg-gray-900" },
        { type: "dashboard", color: "bg-white" },
      ],
    },
    {
      id: 8,
      project_title: "PM Kisan Samman Nidhi",
      scheme: "Agricultural Support",
      status: "Pending",
      likes: 36,
      views: 5.7,
      preview: [{ type: "web", color: "bg-gray-900" }],
    },
  ]);
  const [loading, setLoading] = useState(false); // for loading state
  const dropdownRef = useRef(null);

  // Replace hardcoded filter names with translation keys
  const timeFilters = [
    t("scheme.filters.latest"),
    t("scheme.filters.old"),
    t("scheme.filters.upcoming"),
  ];

  const filters = [
    t("scheme.categories.agriculture"),
    t("scheme.categories.rural"),
    t("scheme.categories.irrigation"),
    t("scheme.categories.economic"),
    t("scheme.categories.industry"),
    t("scheme.categories.energy"),
  ];

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Fetch projects by sector
  const fetchProjectsBySector = async (sector) => {
    setLoading(true);
    try {
      // Map translated sector back to English for backend
      const sectorMap = {
        [t("scheme.categories.agriculture")]: "Agriculture and Allied Services",
        [t("scheme.categories.rural")]: "Rural Development",
        [t("scheme.categories.irrigation")]: "Irrigation and Flood Control",
        [t("scheme.categories.economic")]: "Economic Services",
        [t("scheme.categories.industry")]: "Industry and Minerals",
        [t("scheme.categories.energy")]: "Energy",
      };
      const backendSector = sectorMap[sector] || sector;
      const response = await axios.post(
        "https://hack25-backend-x7el.vercel.app/api/projects/getNames",
        {
          sector: backendSector,
          pageSize: 10,
          offset: 1,
          filters: {},
          language: "eng",
          location: "",
        }
      );
      // Map response to add dummy preview/likes/views for compatibility
      const mapped = (response.data || []).map((proj) => ({
        ...proj,
        preview: [],
        likes: 0,
        views: 0,
      }));
      setProjects(mapped);
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch default sector projects on mount
    fetchProjectsBySector(t("scheme.categories.agriculture"));
    // eslint-disable-next-line
  }, [t]);

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Gradient header section */}
      <div className="h-32 bg-gradient-to-br from-gray-300 to-gray-400 p-4 flex items-end">
        <div className="w-3/4 h-6 bg-white/20 rounded"></div>
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Project title */}
        <div className="h-5 bg-gray-200 rounded mb-2 w-4/5"></div>

        {/* Project subtitle/description */}
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/5"></div>

        {/* Status badge */}
        <div className="flex justify-end">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Left - Time Filter Dropdown */}
            <div
              className="hidden md:flex items-center relative"
              ref={dropdownRef}
            >
              <button
                onClick={toggleDropdown}
                className={`flex items-center justify-center space-x-1 px-3 lg:px-5 py-2 text-sm font-medium transition-colors whitespace-nowrap border border-gray-100 rounded-lg text-gray-800 bg-white`}
              >
                <span>{activeFilter}</span>
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-3 bg-white border border-gray-100 rounded-lg shadow-md z-20">
                  {timeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        activeFilter === filter ? "font-semibold" : ""
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Center - Other Filters */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6 overflow-x-auto scrollbar-hide mx-auto">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveCategoryFilter(filter);
                    fetchProjectsBySector(filter);
                  }}
                  className={`flex items-center space-x-1 px-2 lg:px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategoryFilter === filter
                      ? "text-black font-semibold bg-[#72e3ad] rounded-full"
                      : "text-gray-800 font-medium hover:text-gray-600 hover:bg-white border border-gray-100 rounded-lg"
                  }`}
                >
                  <span>{filter}</span>
                </button>
              ))}
            </div>

            {/* Right - Filter Button */}
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-800 hover:text-gray-600 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors bg-white">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {t("scheme.filters.filters")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-2 overflow-x-auto">
          <div className="flex flex-wrap gap-2 mb-2">
            {/* Time filters for mobile */}
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-[#72e3ad] text-black font-semibold rounded-full"
                    : "bg-white text-gray-700 hover:text-gray-600 border border-gray-100 rounded-full"
                }`}
              >
                <span>{filter}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {/* Other filters for mobile */}
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveCategoryFilter(filter);
                  fetchProjectsBySector(filter);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-1 px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeCategoryFilter === filter
                    ? "bg-[#72e3ad] text-black font-semibold rounded-full"
                    : "bg-white text-gray-700 hover:text-gray-600 border border-gray-100 rounded-full"
                }`}
              >
                <span>{filter}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Project Grid */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-14 py-4 md:py-8 bg-white">
        {loading ? <SkeletonGrid /> : <ProjectGrid projects={projects} />}
      </div>
    </div>
  );
};

export default DesignGallery;
