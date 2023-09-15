import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

function ProductList({ products }) {
  return (
    <div className="product-list-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} className="product-link">
            <h3 className="product-title">{product.title}</h3>
          </Link>
          <p className="product-price">Price: ${product.price}</p>
          {/* Display the product image */}
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          {/* Add other product information as needed */}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
