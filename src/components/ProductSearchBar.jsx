import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ProductSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate(); // Get the navigate function from the nearest <Router>

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
    navigate("/"); // Navigate to the home page after performing the search
  };

  return (
    <form className="product-search" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default ProductSearchBar;
