import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import { fetchProducts, login } from "./api/api";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("login");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [sortOption, setSortOption] = useState("alphabetical_asc");
  const [filterOption, setFilterOption] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab === activeTab ? "" : tab);
  };

  const handleLogin = async (loginData) => {
    try {
      const response = await login(loginData);
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      // Apply sorting
      if (sortOption === "price_asc") {
        data.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price_desc") {
        data.sort((a, b) => b.price - a.price);
      } else if (sortOption === "alphabetical_asc") {
        data.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === "alphabetical_desc") {
        data.sort((a, b) => b.title.localeCompare(a.title));
      }

      // Apply filtering
      let filteredData = data;
      if (filterOption !== "") {
        filteredData = data.filter((product) =>
          product.category.toLowerCase().includes(filterOption.toLowerCase())
        );
      }

      setProducts(filteredData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    setActiveTab("products");
    setShowAddedToCartMessage(true);
    setTimeout(() => setShowAddedToCartMessage(false), 3000);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  // Callback function to handle sorting
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Callback function to handle filtering
  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  return (
    <Router>
      <div className="App">
        <div className="tab-buttons">
          <Link
            to="/"
            className={`nav-button ${
              activeTab === "home" ? "active" : ""
            } home-link`}
          >
            Home
          </Link>
          <button onClick={() => handleTabChange("login")}>Account</button>
          <button onClick={() => handleTabChange("registration")}>
            Registration
          </button>
          <button onClick={() => handleTabChange("products")}>
            Shopping Cart
          </button>
          {showAddedToCartMessage && <div>Added to Cart!</div>}
        </div>
        {activeTab === "home" && (
          <div className="product-list">
            <h2>Products</h2>
            <ProductList products={products} onAddToCart={addToCart} />
          </div>
        )}
        {activeTab === "login" && <Login /> && <Login onLogin={handleLogin} />}
        {activeTab === "registration" && <Registration />}
        {activeTab === "products" && (
          <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
        )}
        <Routes>
          <Route
            path="/product/:id"
            element={<ProductDetail products={products} />}
          />
          <Route
            path="/"
            element={
              <div className="product-list">
                <h2>Products</h2>
                <ProductList products={products} onAddToCart={addToCart} />
              </div>
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
