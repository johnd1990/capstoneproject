import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h3>{product.title}</h3>
          </Link>
          <p>Price: ${product.price}</p>
          {/* Display the product image */}
          <img src={product.image} alt={product.title} />
          {/* Add other product information as needed */}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
