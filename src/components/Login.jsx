import React, { useState, useEffect } from "react";

function Login({ onLogin, onLogout }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (isUserLoggedIn) {
        console.log("You are already logged in.");
        return;
      }

      const response = await onLogin(loginData);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful! Token:", data.token);
        setLoginMessage("Login successful!");
        setIsUserLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(loginData));
      } else {
        console.error("Login failed");
        setLoginMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginMessage("An error occurred during login.");
    }
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    if (onLogout) {
      onLogout();
    }
    setLoginMessage("Logout successful");
  };

  return (
    <div>
      <h2>Login</h2>
      {isUserLoggedIn ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <p>{loginMessage}</p>
        </>
      ) : (
        <form>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {isUserLoggedIn ? "Logged In" : "Login"}
          </button>
          {loginMessage && (
            <p
              className={
                loginMessage.includes("successful") ? "success" : "error"
              }
            >
              {loginMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;
