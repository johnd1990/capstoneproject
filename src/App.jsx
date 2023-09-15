import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { fetchProducts } from "./api/api";

import "./App.css";

function App() {
  // State variables to manage active tab and product data
  const [activeTab, setActiveTab] = useState("login");
  const [products, setProducts] = useState([]);

  // State variables to control the visibility of login and registration forms
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  // Function to handle tab changes (Login, Registration)
  const handleTabChange = (tab) => {
    setActiveTab(tab);

    // Toggle the visibility of the login and registration forms
    if (tab === "login") {
      setShowLogin(!showLogin);
      setShowRegistration(false);
    } else if (tab === "registration") {
      setShowRegistration(!showRegistration);
      setShowLogin(false);
    }
  };

  // Effect to fetch products when the component mounts
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Tab buttons for Login and Registration */}
        <div className="tab-buttons">
          <button onClick={() => handleTabChange("login")}>Login</button>
          <button onClick={() => handleTabChange("registration")}>
            Registration
          </button>
        </div>

        {/* Conditional rendering of Login and Registration forms */}
        {showLogin && <Login />}
        {showRegistration && <Registration />}

        <Routes>
          {/* Route for displaying product details */}
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} />}
          />


          {/* Default route for displaying the product list */}
          <Route
            path="/"
            element={
              <div className="product-list">
                <h2>Products</h2>
                <ProductList products={products} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
