import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login({ onLogin, onLogout }) {
  // Define state for login data
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Define state for login status
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();

  // Define event handler for login button
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle the login process
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Call the onLogin prop function passed from App.jsx
      const response = await onLogin(loginData);

      if (response.ok) {
        // If login is successful, set the login status to true
        const data = await response.json();
        console.log("Login successful! Token:", data.token);

        localStorage.setItem("user", loginData.username);

        const storedCart = JSON.parse(localStorage.getItem(loginData.username));
        if (storedCart) {
          setCart(storedCart);
        }

        setIsLoginSuccessful(true);
        setIsLoginFailed(false);
      } else {
        console.error("Login failed");
        setIsLoginSuccessful(false);
        setIsLoginFailed(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoginSuccessful(false);
      setIsLoginFailed(true);
    }
  };

  // Function to handle the logout process
  const handleLogout = () => {
    const username = localStorage.getItem("user");
    localStorage.removeItem("user");
    localStorage.removeItem(username);

    // Clear the cart
    if (onLogout) {
      onLogout();
    }
    setIsLoginSuccessful(false);
  };

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoginSuccessful(true);
    }
  }, []);

  return (
    <div>
      <h2 className="login-heading">Login</h2>{" "}
      {!isLoginSuccessful ? (
        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
              autoComplete="username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
          </div>
          <button type="submit">Login</button>
          {isLoginFailed && (
            <p className="error">
              Login Failed. Please check your credentials.
            </p>
          )}
        </form>
      ) : (
        <>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
