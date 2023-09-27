import React from "react";
import { Link } from "react-router-dom";

function NavigationBar({ cartQuantity }) {
  return (
    <div className="nav-bar">
      <Link to="/" className="nav-button home-link">
        Home
      </Link>
      <Link to="/login" className="nav-button">
        Login
      </Link>
      <Link to="/registration" className="nav-button">
        Registration
      </Link>
      <Link to="/shopping-cart" className="nav-button">
        Shopping Cart ({cartQuantity})
      </Link>
    </div>
  );
}

export default NavigationBar;
