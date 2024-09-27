import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query); 
    console.log('search value',query)
  };

  return (
    <div className="flex flex-col justify-center items-center py-4">
      {/* Optional label or instruction */}
      <p className="text-gray-600 mb-2 text-center">Search for services in your area or nearby locations</p>
      
      <div className="relative w-full max-w-md">
        {/* Search Input */}
        <input
          type="text"
          className="w-full py-3 pl-4 pr-12 text-gray-900 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
          placeholder="Search for a service or location "
          value={query}
          onChange={handleInputChange}
        />

        {/* Search Button */}
        <button
          className="absolute top-0 right-0 h-full px-4 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition-colors duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
