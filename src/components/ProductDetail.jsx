import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/ProductDetail.css";

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCartClick = () => {
    addToCart(product);
  };

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">{product.title}</h2>
      <p className="product-detail-price">Price: ${product.price}</p>
      <p className="product-detail-category">Category: {product.category}</p>
      <p className="product-detail-description">Description: {product.description}</p>
      <img src={product.image} alt={product.title} className="product-image" />
      <button onClick={handleAddToCartClick} className="add-to-cart-button">
        Add to Cart
      </button>
      <Link to="/" className="back-to-products-link">
        Back to Products
      </Link>
    </div>
  );
}

export default ProductDetail;
