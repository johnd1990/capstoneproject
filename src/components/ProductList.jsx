import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";
import SortFilter from "./SortFilter";

function ProductList({ products, onAddToCart }) {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("alphabetical_asc");
  const [filterOption, setFilterOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Define handleSortChange function
  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

  useEffect(() => {
    // Sort products based on the provided props
    let sortedProductsCopy = [...products];

    // Apply sorting
    if (sortOption === "alphabetical_asc") {
      sortedProductsCopy.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabetical_desc") {
      sortedProductsCopy.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "price_asc") {
      sortedProductsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      sortedProductsCopy.sort((a, b) => b.price - a.price);
    }

    // Apply category filter
    if (filterOption) {
      sortedProductsCopy = sortedProductsCopy.filter(
        (product) => product.category === filterOption
      );
    }

    // Apply price range filtering
    if (minPrice !== "" && maxPrice !== "") {
      sortedProductsCopy = sortedProductsCopy.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    setSortedProducts(sortedProductsCopy);
  }, [products, sortOption, filterOption, minPrice, maxPrice]);

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handlePriceRangeChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="product-list-container">
      <SortFilter
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onPriceRangeChange={handlePriceRangeChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
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
