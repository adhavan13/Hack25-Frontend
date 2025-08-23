import { useState } from 'react';
import Header from '../Navbar/Header';
import CategoryNavigation from './sectors';
import SearchBar from './SearchBar';
<<<<<<< HEAD
import GrievanceCard from './GrievanceCard';
=======

// GrievanceCard component
const GrievanceCard = ({ title, description, status, date, category }) => {
  // Status color mapping with custom green and required backgrounds/text
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Resolved': 'bg-gray-100', // Use gray-100 background for green, text-black
    'Rejected': 'bg-red-100 text-red-800'
  };

  // Custom style for Resolved status to use #72e3ad as accent
  const resolvedStyle = status === 'Resolved'
    ? { color: '#000', backgroundColor: '#f3f4f6', border: '1px solid #72e3ad' }
    : {};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">{title}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}
          style={status === 'Resolved' ? resolvedStyle : {}}
        >
          {status}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="text-xs text-gray-500">{date}</span>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full`}
          style={
            category === 'Infrastructure'
              ? { background: '#f3f4f6', color: '#000', border: '1px solid #72e3ad' }
              : { background: '#f3f4f6', color: '#374151' }
          }
        >
          {category}
        </span>
      </div>
    </div>
  );
};
>>>>>>> 827bbb4310429b2889cb57a75e2ad34cbb7b2cf5

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
<<<<<<< HEAD
}
=======
}

>>>>>>> 827bbb4310429b2889cb57a75e2ad34cbb7b2cf5
