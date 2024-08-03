import React from 'react';

const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div className='sort-box'>
      <label htmlFor="sort-options">Sort by: </label>
      <select
        id="sort-options"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort options"
      >
        <option value="relevance">Relevance</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="date-desc">Date (Newest-Oldest)</option>
        <option value="date-asc">Date (Oldest-Newest)</option>
        <option value="artist-asc">Artist (A-Z)</option>
        <option value="artist-desc">Artist (Z-A)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
