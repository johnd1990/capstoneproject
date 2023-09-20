import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";
import SortFilter from "./SortFilter"; // Import the SortFilter component

function ProductList({ products, onAddToCart }) {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("alphabetical_asc");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    // Sort products based on sortOption
    const sorted = [...products].sort((a, b) => {
      if (sortOption === "alphabetical_asc") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "alphabetical_desc") {
        return b.title.localeCompare(a.title);
      } else if (sortOption === "price_asc") {
        return a.price - b.price;
      } else if (sortOption === "price_desc") {
        return b.price - a.price;
      }
    });

    // Filter products based on filterOption
    const filtered = sorted.filter((product) => {
      if (!filterOption) {
        return true; // Show all products when no filter is applied
      }
      return product.category === filterOption;
    });

    setSortedProducts(filtered);
  }, [products, sortOption, filterOption]);

  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };

  return (
    <div className="product-list-container">
      <SortFilter
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      {sortedProducts.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} className="product-link">
            <h3 className="product-title">{product.title}</h3>
          </Link>
          <p className="product-price">Price: ${product.price}</p>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
