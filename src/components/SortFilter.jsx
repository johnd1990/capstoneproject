import React from "react";

const SortFilter = ({ onSortChange, onFilterChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="sort-filter-container">
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" onChange={handleSortChange}>
        <option value="alphabetical_asc">Alphabetical (A-Z)</option>
        <option value="alphabetical_desc">Alphabetical (Z-A)</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
      </select>

      <label htmlFor="category">Filter by category: </label>
      <select id="category" onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelry</option>
      </select>
    </div>
  );
};

export default SortFilter;
