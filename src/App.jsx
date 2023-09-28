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
  const [minPrice] = useState(""); // State for minPrice
  const [maxPrice] = useState(""); // State for maxPrice
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    fetchProducts(sortOption, filterOption, minPrice, maxPrice)
      .then((data) => {
        setOriginalProducts(data); // Store the original products
        setProducts(data); // Initialize the products state with the original list
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Calculate the total quantity in the cart
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
        setIsLoginSuccessful(true); // Set login success state
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
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const handleSearch = (query) => {
    // Perform filtering based on the search query on the original products list
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
        {/* First Row: Navigation Links */}
        <div className="nav-row">
          <NavigationBar cartQuantity={cartQuantity} />
          {showAddedToCartMessage && <div>Added to Cart!</div>}
        </div>

        {/* Second Row: Search Bar and Filters */}
        <div className="search-row">
          <ProductSearchBar onSearch={handleSearch} />
          {/* Add the SortFilter component here */}
        </div>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
                onLogout={handleLogout} // Pass the logout handler to Login
              />
            }
          />
          <Route
            path="/"
            element={
              <ProductList products={products} onAddToCart={addToCart} />
            }
          />
          <Route
            path="/shopping-cart" // Updated path
            element={
              <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
            } // Updated element
          />
          <Route path="/registration" element={<Registration />} />
          {!isLoginSuccessful && (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
          {/* Redirect to home page if no matching route */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
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
