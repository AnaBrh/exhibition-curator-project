import React from 'react';

const FilterDropdown = ({ onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select filter</option>
    </select>
  );
};

export default FilterDropdown;
