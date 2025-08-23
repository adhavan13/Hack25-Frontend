import { useState } from 'react';
import Header from '../Navbar/Header';
import CategoryNavigation from './sectors';
import SearchBar from './SearchBar';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <Header /> */}
      
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Grievances</h1>
          <p className="mt-2 text-lg text-gray-600">
            View and submit grievances across different sectors
          </p>
        </div>

        {/* Search Bar */}
        <CategoryNavigation />
        <div className="mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Category Navigation */}

        {/* Grievances List - Placeholder for now */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <p className="col-span-full text-left text-gray-500 py-12">
            Select a category to view grievances
          </p>
          {/* Grievance cards would be mapped here */}
        </div>
      </div>
    </div>
  );
}
