import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function ShoppingCart({ cart, removeFromCart }) {
  const [editedQuantities, setEditedQuantities] = useState({});

  const handleQuantityChange = (productId, event) => {
    const updatedQuantities = { ...editedQuantities };
    updatedQuantities[productId] = parseInt(event.target.value, 10);
    setEditedQuantities(updatedQuantities);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((product, index) => (
          <li key={product.id + index}>
            {product.title} - ${product.price}
            <input
              type="number"
              value={editedQuantities[product.id] || product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e)}
              min="1"
              style={{ width: "40px" }}
            />
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/checkout">Checkout</Link>
    </div>
  );
}

export default ShoppingCart;
