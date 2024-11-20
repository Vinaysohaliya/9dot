import React from 'react';

const SearchInput = ({ searchTerm, handleSearchChange, placeholder = 'Search...' }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchInput;
