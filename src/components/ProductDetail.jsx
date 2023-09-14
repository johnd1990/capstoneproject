import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  // Get the product ID from the URL parameter
  const { id } = useParams();

  // State variable to store product details
  const [product, setProduct] = useState(null);

  // Effect to fetch product details based on the ID
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]); // Include `id` in the dependency array to re-fetch when it changes

  // If product data is not available yet, display a loading message
  if (!product) {
    return <div>Loading...</div>;
  }

  // Display product details, including a back button to the main page
  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} />

      {/* Add a back button that links to the main page */}
      <Link to="/">Back to Products</Link>
    </div>
  );
}

export default ProductDetail;
