import React, { useState } from "react";
import { Link } from "react-router-dom";

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
        {cart.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "50px", height: "50px" }}
              />
              {product.title}
            </Link>
            - ${product.price} (Quantity:
            <input
              type="number"
              value={editedQuantities[product.id] || product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e)}
              min="1"
              style={{ width: "40px" }}
            />
            )<button onClick={() => removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/checkout">Proceed to Checkout</Link> {/* Updated text */}
    </div>
  );
}

export default ShoppingCart;
