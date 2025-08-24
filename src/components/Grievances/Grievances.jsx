import { useState, useEffect } from 'react';
import axios from 'axios';

import CategoryNavigation from './sectors';
import GrievanceCard from './grievanceCard';
import PostGrievanceModal from './PostGrievanceModal';
import ChatBot from '../ChatBot/chatbot';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Menu } from 'lucide-react'; // <-- Add Menu icon

export default function Grievances() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [grievances, setGrievances] = useState([]);
  const [allGrievances, setAllGrievances] = useState([]); // Store all grievances for client-side filtering
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userVotes, setUserVotes] = useState({}); // Track user votes: { grievanceId: 'upvote'|'downvote'|null }
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // <-- Add state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setMobileMenuOpen(false); // close menu on mobile after selecting
  };

  // Handle location selection
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedLocation("");
    setShowSearchBar(false);
  };

  // Filter grievances based on search term, category, and location
  const filterGrievances = (grievancesList) => {
    return grievancesList.filter((grievance) => {
      const matchesSearch =
        !searchTerm ||
        grievance.grievance_title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        grievance.short_description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        grievance.long_description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        grievance.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grievance.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grievance.project_service_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      // When "All" is selected, show grievances from all categories
      const matchesCategory =
        selectedCategory === "All" ||
        !grievance.category || // Include grievances without category
        grievance.category === selectedCategory ||
        grievance.category
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase());

      const matchesLocation =
        !selectedLocation ||
        !grievance.location || // Include grievances without location
        grievance.location
          ?.toLowerCase()
          .includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    });
  };

  useEffect(() => {
    const fetchAllGrievances = async () => {
      setLoading(true);
      setError("");
      try {
        let allFetchedGrievances = [];
        let offset = 0;
        const pageSize = 100;
        let hasMoreData = true;

        // Fetch all grievances using pagination
        while (hasMoreData) {
          const body = {
            sector: null, // Get all sectors
            pageSize: pageSize,
            offset: offset,
            filters: {},
            language: "eng",
          };

          const res = await axios.post(
            "https://hack25-backend-x7el.vercel.app/api/grievance/getPosts",
            body
          );

          const fetchedData = res.data || [];
          allFetchedGrievances = [...allFetchedGrievances, ...fetchedData];

          // If we got fewer results than pageSize, we've reached the end
          if (fetchedData.length < pageSize) {
            hasMoreData = false;
          } else {
            offset += pageSize;
          }

          // Safety check to prevent infinite loop
          if (offset > 10000) {
            console.warn("Reached maximum offset limit, stopping pagination");
            break;
          }
        }

        console.log(
          `Fetched total of ${allFetchedGrievances.length} grievances from database`
        );
        setAllGrievances(allFetchedGrievances);

        // Apply filters to the fetched data
        const filtered = filterGrievances(allFetchedGrievances);
        setGrievances(filtered);
      } catch (err) {
        setError("Failed to load grievances");
        console.error("Error fetching grievances:", err);
      }
      setLoading(false);
    };
    fetchAllGrievances();
  }, []); // Only fetch once on component mount

  // Apply filters whenever filter criteria change
  useEffect(() => {
    if (allGrievances.length > 0) {
      const filtered = filterGrievances(allGrievances);
      setGrievances(filtered);
    }
  }, [searchTerm, selectedCategory, selectedLocation, allGrievances]);

  const handlePostSuccess = () => {
    // Refresh grievances after successful post
    const fetchAllGrievances = async () => {
      setLoading(true);
      setError("");
      try {
        let allFetchedGrievances = [];
        let offset = 0;
        const pageSize = 100;
        let hasMoreData = true;

        // Fetch all grievances using pagination
        while (hasMoreData) {
          const body = {
            sector: null,
            pageSize: pageSize,
            offset: offset,
            filters: {},
            language: "eng",
          };

          const res = await axios.post(
            "https://hack25-backend-x7el.vercel.app/api/grievance/getPosts",
            body
          );

          const fetchedData = res.data || [];
          allFetchedGrievances = [...allFetchedGrievances, ...fetchedData];

          if (fetchedData.length < pageSize) {
            hasMoreData = false;
          } else {
            offset += pageSize;
          }

          if (offset > 10000) {
            console.warn("Reached maximum offset limit, stopping pagination");
            break;
          }
        }

        console.log(
          `Refreshed total of ${allFetchedGrievances.length} grievances from database`
        );
        setAllGrievances(allFetchedGrievances);
        const filtered = filterGrievances(allFetchedGrievances);
        setGrievances(filtered);
      } catch (err) {
        setError("Failed to load grievances");
        console.error("Error refreshing grievances:", err);
      }
      setLoading(false);
    };
    fetchAllGrievances();
  };

  // Handle upvote
  const handleUpvote = (grievanceId) => {
    const currentVote = userVotes[grievanceId];

    setGrievances((prevGrievances) =>
      prevGrievances.map((grievance) => {
        if (grievance.grievance_id === grievanceId) {
          let newUpvotes = grievance.upvotes_count || 0;
          let newDownvotes = grievance.downvotes_count || 0;

          if (currentVote === "upvote") {
            // Already upvoted, remove upvote
            newUpvotes = Math.max(0, newUpvotes - 1);
          } else if (currentVote === "downvote") {
            // Currently downvoted, switch to upvote
            newUpvotes = newUpvotes + 1;
            newDownvotes = Math.max(0, newDownvotes - 1);
          } else {
            // No vote, add upvote
            newUpvotes = newUpvotes + 1;
          }

          return {
            ...grievance,
            upvotes_count: newUpvotes,
            downvotes_count: newDownvotes,
          };
        }
        return grievance;
      })
    );

    // Update user vote state
    setUserVotes((prev) => ({
      ...prev,
      [grievanceId]: currentVote === "upvote" ? null : "upvote",
    }));
  };

  // Handle downvote
  const handleDownvote = (grievanceId) => {
    const currentVote = userVotes[grievanceId];

    setGrievances((prevGrievances) =>
      prevGrievances.map((grievance) => {
        if (grievance.grievance_id === grievanceId) {
          let newUpvotes = grievance.upvotes_count || 0;
          let newDownvotes = grievance.downvotes_count || 0;

          if (currentVote === "downvote") {
            // Already downvoted, remove downvote
            newDownvotes = Math.max(0, newDownvotes - 1);
          } else if (currentVote === "upvote") {
            // Currently upvoted, switch to downvote
            newDownvotes = newDownvotes + 1;
            newUpvotes = Math.max(0, newUpvotes - 1);
          } else {
            // No vote, add downvote
            newDownvotes = newDownvotes + 1;
          }

          return {
            ...grievance,
            upvotes_count: newUpvotes,
            downvotes_count: newDownvotes,
          };
        }
        return grievance;
      })
    );

    // Update user vote state
    setUserVotes((prev) => ({
      ...prev,
      [grievanceId]: currentVote === "downvote" ? null : "downvote",
    }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white px-2 sm:px-0"> {/* px-2 for mobile, sm:px-0 for desktop */}
      {/* Header */}
      {/* <Header /> */}

      <div className="px-2 sm:px-6 lg:px-8 py-3 sm:py-6 lg:py-8 border-b shadow-[0_4px_12px_0_rgba(0,0,0,0.06)]">
        {/* Responsive: px-2/py-3 for mobile, sm:px-6/py-6 for desktop */}
        <div className="px-0 sm:pl-5 flex flex-col sm:flex-row justify-between items-start gap-3">
          <div className="w-full sm:w-auto">
            <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900 pl-1 sm:pl-0">
              Grievances
            </h1>
            <p className="mt-1 sm:mt-2 text-xs sm:text-base lg:text-lg text-gray-600 pl-1 sm:pl-0">
              View and submit grievances across different sectors
            </p>
            {(searchTerm || selectedCategory !== "All" || selectedLocation) && (
              <div className="mt-2 flex flex-wrap gap-2 pl-1 sm:pl-0">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedLocation && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                    Location: {selectedLocation}
                    <button
                      onClick={() => setSelectedLocation("")}
                      className="hover:bg-orange-200 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end pr-1 sm:pr-0">
            {/* Mobile menu icon for filters */}
            <button
              className="block sm:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen((open) => !open)}
              title="Show filters"
            >
              <Menu size={22} />
            </button>
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title="Toggle search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-black px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap flex items-center gap-2"
              style={{ backgroundColor: "#72e3a6" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5dd490")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#72e3a6")}
            >
              <span className="text-lg">+</span>
              <span className="hidden xs:inline">Post Grievance</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearchBar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 sm:mt-4 px-1 sm:px-5"
          >
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search grievances by title, description, location, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-sm sm:text-base"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Category Navigation */}
        <div className="mt-3 sm:mt-6">
          {/* Hide on mobile, show on sm+ */}
          <div className="hidden sm:block px-1 sm:px-0">
            <CategoryNavigation
              onCategoryChange={handleCategoryChange}
              onLocationChange={handleLocationChange}
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              categories={[
                'All',
                'Agriculture and Allied Services',
                'Rural Development',
                'Irrigation and Flood Control',
                'Economic Services',
                'Industry and Minerals',
                'Energy'
              ]}
            />
          </div>
          {/* Show filters on mobile only when menu is open */}
          {mobileMenuOpen && (
            <div className="block sm:hidden w-full px-1">
              <div className="flex flex-wrap gap-2 px-1 py-2">
                {['All', 'Agriculture and Allied Services', 'Rural Development', 'Irrigation and Flood Control', 'Economic Services', 'Industry and Minerals', 'Energy'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`
                      flex items-center space-x-1 px-3 py-1.5 text-xs font-medium transition-colors
                      ${
                        selectedCategory === category
                          ? 'bg-[#72e3ad] text-black font-semibold rounded-full'
                          : 'bg-white text-gray-700 hover:text-gray-600 border border-gray-100 rounded-full'
                      }
                    `}
                  >
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Grievances Cards */}
        <div className="mt-4 sm:mt-8 px-1 sm:px-5">
          {/* Results summary */}
          {!loading && !error && (
            <div className="mb-3 sm:mb-4 px-1 sm:px-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Showing {grievances.length} of {allGrievances.length} grievances
                {(searchTerm ||
                  selectedCategory !== "All" ||
                  selectedLocation) && (
                  <span className="ml-1 text-blue-600">(filtered)</span>
                )}
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:gap-6 grid-cols-1">
            {loading ? (
              // Skeleton loader: show 3 skeleton cards
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse bg-gray-100 rounded-lg p-3 sm:p-6 flex flex-col gap-3"
                  >
                    <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </>
            ) : error ? (
              <p className="text-red-500 px-1 sm:px-0">{error}</p>
            ) : grievances.length > 0 ? (
              <AnimatePresence>
                {grievances.map((grievance) => (
                  <motion.div
                    key={grievance._id || grievance.grievance_id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.35,
                      type: "spring",
                      stiffness: 80,
                    }}
                    className="px-1 sm:px-0"
                  >
                    <GrievanceCard
                      id={grievance.grievance_id}
                      title={grievance.grievance_title}
                      description={
                        grievance.long_description ||
                        grievance.short_description
                      }
                      status={grievance.status}
                      date={grievance.date_of_submission}
                      location={grievance.location}
                      category={grievance.category}
                      projectService={grievance.project_service_name}
                      assignedOfficer={grievance.assigned_officer_department}
                      upvotes={grievance.upvotes_count}
                      downvotes={grievance.downvotes_count || 0}
                      evidence={grievance.supporting_evidence}
                      onUpvote={() => handleUpvote(grievance.grievance_id)}
                      onDownvote={() => handleDownvote(grievance.grievance_id)}
                      userVote={userVotes[grievance.grievance_id]}
                      showReadMore={isMobile} // <-- Only show on mobile
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div className="col-span-full text-center py-8 lg:py-16 px-1 sm:px-0">
                <div className="max-w-md mx-auto">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    No grievances found
                  </h3>
                  <p className="text-gray-500 mb-4 text-sm sm:text-base">
                    {searchTerm ||
                    selectedCategory !== "All" ||
                    selectedLocation
                      ? "Try adjusting your search criteria or filters"
                      : "No grievances have been submitted yet"}
                  </p>
                  {(searchTerm ||
                    selectedCategory !== "All" ||
                    selectedLocation) && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PostGrievanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePostSuccess}
      />

      {/* Enhanced ChatBot with filter integration */}
      <ChatBot
        onCategoryFilter={handleCategoryChange}
        onLocationFilter={handleLocationChange}
        onSearchFilter={handleSearch}
        currentFilters={{
          category: selectedCategory,
          location: selectedLocation,
          search: searchTerm,
        }}
      />
    </div>
  );
}
