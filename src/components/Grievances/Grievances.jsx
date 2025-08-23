import { useState } from 'react';
import Header from '../Navbar/Header';
import CategoryNavigation from './sectors';
import SearchBar from './SearchBar';
import GrievanceCard from './GrievanceCard';

export default function Grievances() { 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Add logic for filtering grievances by search term
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Add logic for filtering grievances by category
  };

  // Sample grievance data
  const sampleGrievances = [
    {
      id: 1,
      title: "Road Maintenance Required",
      description: "The road in our locality has several potholes causing accidents and vehicle damage. Immediate attention is required.",
      status: "Pending",
      date: "2023-05-15",
      category: "Infrastructure"
    },
    {
      id: 2,
      title: "Irregular Water Supply",
      description: "We have been facing irregular water supply in our area for the past two weeks. This is causing significant inconvenience.",
      status: "In Progress",
      date: "2023-05-10",
      category: "Utilities"
    },
    {
      id: 3,
      title: "Street Light Malfunction",
      description: "Several street lights in our colony are not working, making it unsafe to walk at night.",
      status: "Resolved",
      date: "2023-05-05",
      category: "Infrastructure"
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <Header /> */}
      
      <div className="px-2 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 py-6 sm:py-8">
        <div className="pl-2 sm:pl-5">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Grievances</h1>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg text-gray-600">
            View and submit grievances across different sectors
          </p>
        </div>

        {/* Search Bar */}
        <CategoryNavigation />
        <div className="mb-4 sm:mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Grievances Cards */}
        <div className="mt-8 grid gap-6 grid-cols-1">
          {sampleGrievances.length > 0 ? (
            sampleGrievances.map((grievance) => (
              <GrievanceCard
                key={grievance.id}
                title={grievance.title}
                description={grievance.description}
                status={grievance.status}
                date={grievance.date}
                category={grievance.category}
              />
            ))
          ) : (
            <p className="col-span-full text-left text-gray-500 py-8 sm:py-12">
              No grievances found. Select a different category or try another search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
