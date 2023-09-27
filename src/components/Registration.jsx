// Registration.jsx
import React, { useState } from "react";

function Registration() {
  // State variable to store registration data
  const [registrationData, setRegistrationData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // State variable to track registration status
  const [registrationStatus, setRegistrationStatus] = useState(null);

  // Function to handle input changes and update registrationData
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle registration submission
  const handleRegistration = async () => {
    try {
      // Simulate a successful registration response
      const simulatedResponse = {
        id: 123, // Replace with a unique ID if needed
        email: registrationData.email,
        username: registrationData.username,
        // Include other fields as needed
      };

      console.log("User registered successfully:", simulatedResponse);

      // Clear the input fields by resetting registrationData
      setRegistrationData({
        email: "",
        username: "",
        password: "",
      });

      // Update registration status to success
      setRegistrationStatus("success");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle any network or other errors here.

      // Update registration status to failure
      setRegistrationStatus("failure");
    }
  };

  // Render the Registration component
  return (
    <div>
      <h2>Registration</h2>
      {registrationStatus === "success" && (
        // Display a success message if registration was successful
        <p style={{ color: "green" }}>Registration Successful!</p>
      )}
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={registrationData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={registrationData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={registrationData.password}
            onChange={handleInputChange}
          />
        </div>
        {/* Registration form fields */}
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Registration;
