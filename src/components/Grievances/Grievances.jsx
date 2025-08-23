import { useState } from 'react';
import Header from '../Navbar/Header';
import CategoryNavigation from './sectors';
import SearchBar from './SearchBar';

// GrievanceCard component
const GrievanceCard = ({ title, description, status, date, category }) => {
  // Status color mapping
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">{date}</span>
        <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full text-gray-700">{category}</span>
      </div>
    </div>
  );
};

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
      
      <div className="pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 py-8">
        <div className="mb-5 pl-1">  {/* Added pl-1 to align with sectors */}
          <h1 className="text-2xl font-bold text-gray-900">Grievances</h1>
          <p className="mt-2 text-lg text-gray-600">
            View and submit grievances across different sectors
          </p>
        </div>

        {/* Search Bar */}
        <CategoryNavigation />
        <div className="mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Grievances Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <p className="col-span-full text-left text-gray-500 py-12">
              No grievances found. Select a different category or try another search term.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
