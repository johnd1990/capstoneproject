import React, { useState } from "react";

const SortFilter = ({
  onSortChange,
  onFilterChange,
  onPriceRangeChange,
}) => {
  const [minPriceInput, setMinPriceInput] = useState(""); // Initialize with an empty string
  const [maxPriceInput, setMaxPriceInput] = useState(""); // Initialize with an empty string

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPriceInput(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPriceInput(e.target.value);
  };

  const handlePriceRangeFilter = () => {
    // Convert input values to numbers and pass them to the parent component
    const minPriceValue = minPriceInput !== "" ? parseFloat(minPriceInput) : 0;
    const maxPriceValue =
      maxPriceInput !== "" ? parseFloat(maxPriceInput) : Infinity;

    // Log values for debugging
    console.log("minPriceValue:", minPriceValue);
    console.log("maxPriceValue:", maxPriceValue);

    // Check if onPriceRangeChange is a function before calling it
    if (typeof onPriceRangeChange === "function") {
      onPriceRangeChange(minPriceValue, maxPriceValue);
    }
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

      {/* Price range input fields */}
      <div className="price-range">
        <label htmlFor="minPrice">Min Price: </label>
        <input
          type="text"
          id="minPrice"
          onChange={handleMinPriceChange}
          value={minPriceInput}
        />
        <label htmlFor="maxPrice">Max Price: </label>
        <input
          type="text"
          id="maxPrice"
          onChange={handleMaxPriceChange}
          value={maxPriceInput}
        />
        <button onClick={handlePriceRangeFilter}>Apply</button>
      </div>
    </div>
  );
};

export default SortFilter;
