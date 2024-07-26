import React from 'react';

const SortDropdown = ({ onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Sort by</option>
      <option value="title">Title</option>
      <option value="date">Date</option>
    </select>
  );
};

export default SortDropdown;
