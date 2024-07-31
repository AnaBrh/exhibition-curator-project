// SortDropdown.jsx
import React from 'react';

const SortDropdown = ({ sortOption, onSortChange }) => {
  return (
    <div>
      <label htmlFor="sort-options">Sort by: </label>
      <select
        id="sort-options"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
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


/* sort by:
relevance
title (a-z) title(HAR&MET)
title (z-a)
date (newes-oldest) objectEndDate(MET) dateend(HAR)
date (oldest-newest)
artist (a-z) artistAlphaSort(MET) people.alphasort(HAR) 
artist (z-a)

*/
