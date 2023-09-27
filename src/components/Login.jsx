import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, onLogout }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const response = await onLogin(loginData);

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful! Token:", data.token);
        setIsLoginSuccessful(true); // Ensure this is setting isLoginSuccessful to true
        setIsLoginFailed(false);
        localStorage.setItem("user", JSON.stringify(loginData));

        // Navigate to the home page immediately after successful login
        navigate("/");
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    if (onLogout) {
      onLogout();
    }
    setIsLoginSuccessful(false);
    // Navigate to the login page after logout
    navigate("/login");
  };
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoginSuccessful(true);
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>
      {!isLoginSuccessful ? (
        <form onSubmit={handleLogin}>
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
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Login;
