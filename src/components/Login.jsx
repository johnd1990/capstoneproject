import React, { useState } from "react";

function Login() {
  // State variables to store login data and messages
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState(""); // To store login success/failure message

  // Function to handle input changes and update loginData
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle login submission
  const handleLogin = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Check the response status code to determine login success or failure
      if (response.status === 200) {
        const data = await response.json();
        console.log("Login successful! Token:", data.token);
        setLoginMessage("Login Successful"); // Set success message
        // Handle successful login
      } else {
        console.error("Login failed");
        setLoginMessage("Login Failed"); // Set failure message
        // Handle login failure
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginMessage("Login Failed"); // Set failure message for network or other errors
      // Handle any network or other errors here.
    }
  };

  // Render the Login component
  return (
    <div>
      <h2>Login</h2>
      {loginMessage && (
        // Display a message based on the login success/failure status
        <p
          className={loginMessage === "Login Successful" ? "success" : "error"}
        >
          {loginMessage}
        </p>
      )}
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
