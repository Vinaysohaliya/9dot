import { useState, useMemo } from 'react';

const useSearch = (data, keys, pageSize) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((item) =>
      keys.some((key) =>
        item[key].toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data, keys]);

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return {
    searchTerm,
    handleSearchChange,
    paginatedData,
    currentPage,
    handlePageChange,
    totalPages,
  };
};

export default useSearch;
