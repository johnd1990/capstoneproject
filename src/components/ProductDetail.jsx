import React from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail({ products }) {
  const { id } = useParams();

  // Find the product by ID from the products array
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} />

      <Link to="/">Back to Products</Link>
    </div>
  );
}

export default ProductDetail;
