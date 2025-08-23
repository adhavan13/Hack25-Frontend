import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Navbar/Header';
import CategoryNavigation from './sectors';
import SearchBar from './SearchBar';
import GrievanceCard from './GrievanceCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function Grievances() { 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchGrievances = async () => {
      setLoading(true);
      setError('');
      try {
        const body = {
          sector: selectedCategory === 'All' ? null : selectedCategory,
          pageSize: 10,
          offset: 0,
          filters: searchTerm ? { search: searchTerm } : {},
          language: 'eng'
        };
        const res = await axios.post(
          'https://hack25-backend-x7el.vercel.app/api/grievance/getPosts',
          body
        );
        setGrievances(res.data || []);
      } catch (err) {
        setError('Failed to load grievances');
      }
      setLoading(false);
    };
    fetchGrievances();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <Header /> */}
      
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 border-b shadow-[0_4px_12px_0_rgba(0,0,0,0.06)]">
        {/* Added border-b and shadow for bottom border shadow */}
        <div className="px-2 sm:pl-5 flex justify-between items-start">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Grievances</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-gray-600">
              View and submit grievances across different sectors
            </p>
          </div>
          <button className="text-black px-4 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap flex items-center gap-2" style={{ backgroundColor: '#72e3a6' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#5dd490'} onMouseLeave={(e) => e.target.style.backgroundColor = '#72e3a6'}>
            <span className="text-lg">+</span>
            Post Grievance
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 sm:mt-6">
          <CategoryNavigation onCategoryChange={handleCategoryChange} />
        </div>
        <div className="mb-4 sm:mb-5 mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Grievances Cards */}
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1">
          {loading ? (
            // Skeleton loader: show 3 skeleton cards
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 rounded-lg p-6 flex flex-col gap-3"
                >
                  <div className="h-5 w-1/3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-1/4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : grievances.length > 0 ? (
            <AnimatePresence>
              {grievances.map((grievance) => (
                <motion.div
                  key={grievance._id || grievance.grievance_id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.35, type: "spring", stiffness: 80 }}
                >
                  <GrievanceCard
                    id={grievance.grievance_id}
                    title={grievance.grievance_title}
                    description={grievance.long_description || grievance.short_description}
                    status={grievance.status}
                    date={grievance.date_of_submission}
                    category={grievance.category}
                    projectService={grievance.project_service_name}
                    location={grievance.location}
                    assignedOfficer={grievance.assigned_officer_department}
                    upvotes={grievance.upvotes_count}
                    downvotes={grievance.downvotes_count || 0}
                    evidence={grievance.supporting_evidence}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <p className="col-span-full text-left text-gray-500 py-6 sm:py-8 lg:py-12 text-sm sm:text-base">
              No grievances found. Select a different category or try another search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
