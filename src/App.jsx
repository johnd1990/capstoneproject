import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import ProductSearchBar from "./components/ProductSearchBar";
import NavigationBar from "./components/NavigationBar";
import Checkout from "./components/Checkout";
import { fetchProducts, login } from "./api/api";
import "./styles/App.css";

function App() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [sortOption] = useState("alphabetical_asc");
  const [filterOption] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [minPrice] = useState("");
  const [maxPrice] = useState("");
  const [cartQuantity, setCartQuantity] = useState(0);
  const calculateSubtotal = (product) => {
    return product.price * product.quantity;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoginSuccessful(true);
    }

    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Read the cart from local storage
    setCart(storedCart);
  }, []);

  useEffect(() => {
    fetchProducts(sortOption, filterOption, minPrice, maxPrice)
      .then((data) => {
        setOriginalProducts(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    localStorage.setItem("cart", JSON.stringify(cart));

    const totalQuantity = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCartQuantity(totalQuantity);
  }, [cart, sortOption, filterOption, minPrice, maxPrice]);

  const handleLogin = async (loginData) => {
    try {
      const response = await login(loginData);
      if (response.ok) {
        setIsLoginSuccessful(true);
        return response;
      } else {
        console.error("Login failed");
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoginSuccessful(false);
    setCart([]); // Clear the cart in state
    localStorage.removeItem("cart"); // Clear cart from localStorage on logout
  };

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
    setShowAddedToCartMessage(true);
    setTimeout(() => setShowAddedToCartMessage(false), 3000);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
  };

  const handleSearch = (query) => {
    const filteredProducts = originalProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <Router>
      <div className="banner">
        <img
          src="https://i.ibb.co/LpTHCfq/zamazon-1.png"
          alt="Banner Image"
          className="banner-image"
        />
      </div>
      <div className="App">
        <div className="nav-row">
          <NavigationBar cartQuantity={cartQuantity} />
          {showAddedToCartMessage && <div>Added to Cart!</div>}
        </div>
        <div className="search-row">
          <ProductSearchBar onSearch={handleSearch} />
        </div>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} onLogout={handleLogout} />}
          />
          <Route
            path="/"
            element={
              <ProductList products={products} onAddToCart={addToCart} />
            }
          />
          <Route
            path="/shopping-cart"
            element={
              <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                grandTotal={cart.reduce(
                  (total, product) => total + calculateSubtotal(product),
                  0
                )}
                cart={cart}
              />
            }
          />
          {!isLoginSuccessful && (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
          <Route
            path="/product/:id"
            element={
              <ProductDetail products={products} addToCart={addToCart} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// function LoginSuccess({ setIsLoginSuccessful }) {
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setIsLoginSuccessful(false); // Redirect back to home page
//     }, 1000); // Redirect after 1 second

//     // Cleanup the timeout when unmounting
//     return () => clearTimeout(timeout);
//   }, [setIsLoginSuccessful]);

//   return (
//     <div className="login-success">
//       <h2>Login Successful! Redirecting...</h2>
//     </div>
//   );
// }

export default App;
