import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ShoppingCart.css";

function ShoppingCart({ cart, removeFromCart }) {
  const [editedQuantities, setEditedQuantities] = useState(
    JSON.parse(localStorage.getItem("editedQuantities")) || {}
  );

  useEffect(() => {
    localStorage.setItem("editedQuantities", JSON.stringify(editedQuantities));
  }, [editedQuantities]);

  const handleQuantityChange = (productId, event) => {
    const updatedQuantities = { ...editedQuantities };
    updatedQuantities[productId] = parseInt(event.target.value, 10);
    setEditedQuantities(updatedQuantities);
  };

  const calculateSubtotal = (product) => {
    const quantity = editedQuantities[product.id] || product.quantity;
    return product.price * quantity;
  };

  const calculateGrandTotal = () => {
    let total = 0;
    for (const product of cart) {
      total += calculateSubtotal(product);
    }
    return total;
  };

  return (
    <div className="shopping-cart-container">
      <h2 className="shopping-cart-heading">Shopping Cart</h2>
      <ul className="cart-item-list">
        {cart.map((product) => (
          <li key={product.id} className="cart-item">
            <Link to={`/product/${product.id}`} className="cart-item-link">
              <img src={product.image} alt={product.title} className="cart-item-image" />
              {product.title}
            </Link>
            - ${product.price} (Quantity:
            <input
              type="number"
              value={editedQuantities[product.id] || product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e)}
              min="1"
              className="cart-item-quantity"
            />
            ) Subtotal: ${calculateSubtotal(product).toFixed(2)}{" "}
            <button
              onClick={() => removeFromCart(product.id)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="grand-total">Grand Total: ${calculateGrandTotal().toFixed(2)}</div>
      <div className="checkout-container">
        <Link to="/checkout" className="checkout-link">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default ShoppingCart;
