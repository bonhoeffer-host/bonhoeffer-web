'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '../layouts/loading';

// Database Management Component
function DatabaseManager({ database, title, description, backPath = '/admin' }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [schema, setSchema] = useState({});
  const [requiredFields, setRequiredFields] = useState([]);
  const [pagination, setPagination] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loadingOperation, setLoadingOperation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchRecords(currentPage, limit);
    } else {
      router.push('/admin');
    }
  }, [router, database, currentPage, limit, searchTerm, sortField, sortDirection, filters]);

  const fetchRecords = async (page = currentPage, pageLimit = limit) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageLimit.toString(),
      });

      // Add search parameter
      if (searchTerm.trim()) {
        queryParams.append('search', searchTerm.trim());
      }

      // Add sorting parameters
      if (sortField) {
        queryParams.append('sortField', sortField);
        queryParams.append('sortDirection', sortDirection);
      }

      // Add filter parameters
      Object.entries(filters).forEach(([field, value]) => {
        if (value && value !== '') {
          queryParams.append(`filter_${field}`, value);
        }
      });

      const response = await fetch(`/api/admin/database/${database}?${queryParams.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setRecords(data.records);
        setSchema(data.schema);
        setRequiredFields(data.requiredFields);
        setPagination(data.pagination);
        setTotalRecords(data.totalRecords || data.records.length);
        setTotalPages(Math.ceil((data.totalRecords || data.records.length) / pageLimit));
      } else {
        console.error('Error fetching records:', data.error);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
    setIsLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoadingOperation('create');
    
    try {
      const response = await fetch(`/api/admin/database/${database}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowAddForm(false);
        setFormData({});
        fetchRecords();
      } else {
        alert('Error creating record: ' + result.error);
      }
    } catch (error) {
      alert('Error creating record: ' + error.message);
    }
    
    setLoadingOperation('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoadingOperation('update');
    
    try {
      const response = await fetch(`/api/admin/database/${database}/${editingRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setShowEditForm(false);
        setEditingRecord(null);
        setFormData({});
        fetchRecords();
      } else {
        alert('Error updating record: ' + result.error);
      }
    } catch (error) {
      alert('Error updating record: ' + error.message);
    }
    
    setLoadingOperation('');
  };

  const handleDelete = async (recordId) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    setLoadingOperation('delete');
    
    try {
      const response = await fetch(`/api/admin/database/${database}/${recordId}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        fetchRecords();
      } else {
        alert('Error deleting record: ' + result.error);
      }
    } catch (error) {
      alert('Error deleting record: ' + error.message);
    }
    
    setLoadingOperation('');
  };

  const openAddForm = () => {
    setFormData({});
    setShowAddForm(true);
  };

  const openEditForm = (record) => {
    setEditingRecord(record);
    setFormData(record.properties);
    setShowEditForm(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setIsLoading(true); // Show loading when changing pages
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing limit
    setIsLoading(true); // Show loading when changing limit
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleFilter = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSearchInput('');
    setSortField('');
    setSortDirection('asc');
    setCurrentPage(1);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={isLoading}
          className="px-3 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ←
        </button>
      );
    }

    // First page if not visible
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={isLoading}
          className="px-3 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-3 py-2 mx-1 text-white">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={isLoading}
          className={`px-3 py-2 mx-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            i === currentPage
              ? 'bg-[#989b2e] text-white'
              : 'bg-gray-600 text-white hover:bg-gray-500'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-3 py-2 mx-1 text-white">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={isLoading}
          className="px-3 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={isLoading}
          className="px-3 py-2 mx-1 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          →
        </button>
      );
    }

    return pages;
  };

  const renderFormField = (fieldName, fieldSchema) => {
    const value = formData[fieldName] || '';
    const isRequired = requiredFields.includes(fieldName);
    
    const handleFieldChange = (newValue) => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: newValue
      }));
    };

    const commonProps = {
      className: "w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
      value: value,
      onChange: (e) => handleFieldChange(e.target.value),
      required: isRequired
    };

    switch (fieldSchema.type) {
      case 'title':
      case 'rich_text':
        return (
          <textarea
            {...commonProps}
            rows={fieldSchema.type === 'title' ? 1 : 3}
            placeholder={`Enter ${fieldName.toLowerCase()}`}
          />
        );
      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            step="any"
            placeholder={`Enter ${fieldName.toLowerCase()}`}
          />
        );
      case 'url':
        return (
          <input
            {...commonProps}
            type="url"
            placeholder={`Enter ${fieldName.toLowerCase()}`}
          />
        );
      case 'email':
        return (
          <input
            {...commonProps}
            type="email"
            placeholder={`Enter ${fieldName.toLowerCase()}`}
          />
        );
      case 'phone_number':
        return (
          <input
            {...commonProps}
            type="tel"
            placeholder={`Enter ${fieldName.toLowerCase()}`}
          />
        );
      case 'date':
        return (
          <input
            {...commonProps}
            type="date"
          />
        );
      case 'checkbox':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => handleFieldChange(e.target.checked)}
              className="mr-2"
            />
            <span className="text-foreground">{fieldName}</span>
          </label>
        );
      case 'select':
        return (
          <input
            {...commonProps}
            placeholder={`Enter ${fieldName.toLowerCase()} (select option)`}
          />
        );
      case 'multi_select':
        return (
          <input
            {...commonProps}
            placeholder={`Enter ${fieldName.toLowerCase()} (comma separated)`}
          />
        );
      default:
        return (
          <input
            {...commonProps}
            type="text"
            placeholder={`Enter ${fieldName.toLowerCase()}`}
          />
        );
    }
  };

  const renderValue = (value, type) => {
    if (!value && value !== 0 && value !== false) return '-';
    
    switch (type) {
      case 'checkbox':
        return value ? 'Yes' : 'No';
      case 'multi_select':
        return Array.isArray(value) ? value.join(', ') : value;
      case 'url':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#989b2e] hover:underline">
            {value}
          </a>
        );
      case 'email':
        return (
          <a href={`mailto:${value}`} className="text-[#989b2e] hover:underline">
            {value}
          </a>
        );
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return String(value);
    }
  };

  if (isLoading && records.length === 0) {
    return (
      <Loading/>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href={backPath}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={openAddForm}
                className="bg-[#989b2e] hover:bg-[#7a7d24] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add New
              </button>
              {/* <Link
                href={backPath}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-lg transition-colors"
              >
                Back
              </Link> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-white/80">{description}</p>
        </div>

        {/* Search, Filter, and Sort Controls */}
        <div className="mb-6 bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="flex">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search records... (Press Enter to search)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#989b2e] focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#989b2e] text-white border border-[#989b2e] rounded-r-lg hover:bg-[#7a7d24] focus:outline-none focus:ring-2 focus:ring-[#989b2e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  showFilters || Object.keys(filters).some(key => filters[key]) 
                    ? 'bg-[#989b2e] text-white' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586l-4-2v-2.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
              </button>

              {(searchTerm || sortField || Object.keys(filters).some(key => filters[key])) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-white font-medium mb-3">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(schema).map(([fieldName, fieldSchema]) => (
                  <div key={fieldName}>
                    <label className="block text-sm text-white mb-1">{fieldName}</label>
                    {fieldSchema.type === 'checkbox' ? (
                      <select
                        value={filters[fieldName] || ''}
                        onChange={(e) => handleFilter(fieldName, e.target.value)}
                        className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
                      >
                        <option value="">All</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={filters[fieldName] || ''}
                        onChange={(e) => handleFilter(fieldName, e.target.value)}
                        placeholder={`Filter by ${fieldName.toLowerCase()}`}
                        className="w-full px-3 py-2 bg-gray-600 text-white border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-[#989b2e]"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Records Table */}
        {records.length > 0 ? (
          <div className="bg-gray-700 rounded-lg overflow-hidden relative">
            {/* Loading overlay for table */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-700/50 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
                <div className="flex items-center space-x-2 text-white">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#989b2e]"></div>
                  <span>Loading records...</span>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900">
                  <tr>
                    {Object.keys(schema).map((fieldName) => (
                      <th key={fieldName} className="px-4 py-3 text-left text-lg font-medium text-white">
                        <button
                          onClick={() => handleSort(fieldName)}
                          className="flex items-center space-x-1 hover:text-[#989b2e] transition-colors group"
                        >
                          <span>
                            {fieldName}
                            {requiredFields.includes(fieldName) && (
                              <span className="text-destructive ml-1">*</span>
                            )}
                          </span>
                          <div className="flex flex-col">
                            <svg 
                              className={`h-3 w-3 ${sortField === fieldName && sortDirection === 'asc' ? 'text-[#989b2e]' : 'text-gray-400 group-hover:text-[#989b2e]'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            <svg 
                              className={`h-3 w-3 -mt-1 ${sortField === fieldName && sortDirection === 'desc' ? 'text-[#989b2e]' : 'text-gray-400 group-hover:text-[#989b2e]'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </button>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-left text-lg font-medium text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-gray-700">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-600 cursor-pointer">
                      {Object.entries(schema).map(([fieldName, fieldSchema]) => (
                        <td key={fieldName} className="px-4 py-3 text-sm text-white">
                          <div className="max-w-xs truncate" title={record.properties[fieldName]}>
                            {renderValue(record.properties[fieldName], fieldSchema.type)}
                          </div>
                        </td>
                      ))}
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditForm(record)}
                            className="text-[#989b2e] hover:text-[#7a7d24] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loadingOperation || isLoading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loadingOperation || isLoading}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : !isLoading ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">No records found.</p>
            <button
              onClick={openAddForm}
              className="bg-[#989b2e] hover:bg-[#7a7d24] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add First Record
            </button>
          </div>
        ) : (
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-white">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#989b2e]"></div>
              <span>Loading records...</span>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {records.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-4 relative">
            {/* Loading overlay for pagination */}
            {isLoading && (
              <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
                <div className="flex items-center space-x-2 text-white">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#989b2e]"></div>
                  <span>Loading...</span>
                </div>
              </div>
            )}
            
            {/* Records per page selector */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">Records per page:</span>
                <select
                  value={limit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  disabled={isLoading}
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#989b2e] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={75}>75</option>
                  <option value={100}>100</option>
                </select>
              </div>
              
              {/* Records info */}
              <div className="text-white text-sm">
                {isLoading ? (
                  <span className="text-white/60">Loading records...</span>
                ) : (
                  <div className="flex flex-col">
                    <span>Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalRecords)} of {totalRecords} records</span>
                    {(searchTerm || sortField || Object.keys(filters).some(key => filters[key])) && (
                      <span className="text-[#989b2e] text-xs mt-1">
                        {searchTerm && `Search: "${searchTerm}"`}
                        {sortField && ` • Sorted by ${sortField} (${sortDirection})`}
                        {Object.keys(filters).some(key => filters[key]) && ` • ${Object.keys(filters).filter(key => filters[key]).length} filter(s) active`}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Page numbers */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center">
                {renderPaginationNumbers()}
              </div>
            )}
          </div>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-4">Add New Record</h3>
              <form onSubmit={handleCreate} className="space-y-4 ">
                {Object.entries(schema).map(([fieldName, fieldSchema]) => (
                  <div key={fieldName}>
                    <label className="block text-sm font-medium text-white mb-1">
                      {fieldName}
                      {requiredFields.includes(fieldName) && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                      <span className="text-white/70 ml-2">({fieldSchema.type})</span>
                    </label>
                    {renderFormField(fieldName, fieldSchema)}
                  </div>
                ))}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-destructive hover:bg-destructive/80 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingOperation === 'create'}
                    className="bg-[#989b2e] hover:bg-[#7a7d24] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loadingOperation === 'create' ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Form Modal */}
        {showEditForm && editingRecord && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-4">Edit Record</h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                {Object.entries(schema).map(([fieldName, fieldSchema]) => (
                  <div key={fieldName}>
                    <label className="block text-sm font-medium text-white mb-1">
                      {fieldName}
                      {requiredFields.includes(fieldName) && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                      <span className="text-white/70 ml-2">({fieldSchema.type})</span>
                    </label>
                    {renderFormField(fieldName, fieldSchema)}
                  </div>
                ))}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditForm(false);
                      setEditingRecord(null);
                    }}
                    className="bg-destructive hover:bg-destructive/80 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingOperation === 'update'}
                    className="bg-[#989b2e] hover:bg-[#7a7d24] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loadingOperation === 'update' ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DatabaseManager;