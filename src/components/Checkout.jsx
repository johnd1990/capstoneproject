import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout({ grandTotal }) {
    // Define state for user information
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  // Define state for credit card information
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  // Define event handlers for user information and credit card information
  const handleUserInfoChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define event handlers for user information and credit card information
  const handleCreditCardChange = (event) => {
    const { name, value } = event.target;
    setCreditCardInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define event handler for place order button
  return (
    <div className="checkout-page-container">
      <h2 className="checkout-heading">Checkout</h2>
      <div className="user-info">
        <h3>User Information</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleUserInfoChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleUserInfoChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleUserInfoChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userInfo.phone}
            onChange={handleUserInfoChange}
          />
        </div>
      </div>
      <div className="credit-card-info">
        <h3>Credit Card Details</h3>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={creditCardInfo.cardNumber}
            onChange={handleCreditCardChange}
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="text"
            name="expirationDate"
            value={creditCardInfo.expirationDate}
            onChange={handleCreditCardChange}
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={creditCardInfo.cvv}
            onChange={handleCreditCardChange}
          />
        </div>
      </div>
      <div className="grand-total">Grand Total: ${grandTotal.toFixed(2)}</div>
      <button
        className="place-order-button"
        onClick={() => alert("Order placed successfully!")}
      >
        Place Order
      </button>
      <Link to="/" className="continue-shopping-link">
        Continue Shopping
      </Link>
    </div>
  );
}

export default Checkout;
