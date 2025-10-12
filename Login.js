// Import React hooks and other necessary libraries.
import React, { useState } from "react";
// useNavigate is a hook from react-router-dom for programmatic navigation (e.g., redirecting).
import { useNavigate } from "react-router-dom";
// Import Bootstrap CSS for styling.
import "bootstrap/dist/css/bootstrap.min.css";
// Import a custom stylesheet for additional component-specific styles.
import "../App.css";

/**
 * The Login component provides a form for users to enter their credentials.
 * It handles basic validation and saves the username to localStorage upon successful login.
 */
const Login = () => {
  // Initialize the navigate function from the useNavigate hook.
  const navigate = useNavigate();
  // State to hold the value of the username input field.
  const [username, setUsername] = useState("");
  // State to hold the value of the password input field.
  const [password, setPassword] = useState("");

  /**
   * Handles the login logic when the login button is clicked.
   */
  const handleLogin = () => {
    // Basic validation: check if both username and password fields are filled.
    if (username && password) {
      // If validation passes, save the username to the browser's localStorage.
      // This acts as a simple way to persist the "logged-in" state.
      localStorage.setItem("username", username); 
      
      // Retrieve the name to confirm it was set correctly.
      let name = localStorage.getItem("username");
      alert(name + " is successfully logged in"); // Notify the user of successful login.
      
      // Redirect the user to the dashboard page.
      navigate("/dashboard");
    } else {
      // If validation fails, alert the user to enter their credentials.
      alert("Please enter username and password");
    }
  };

  // Render the login form UI.
  return (
    // Main wrapper div using flexbox to center the login card vertically and horizontally.
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      {/* The login form is presented as a styled "card". */}
      <div className="login-card card p-4 shadow-lg">
        <h2 className="text-center mb-4 text-primary">Login</h2>
        
        {/* Username input field group. */}
        <div className="mb-3">
          <input
            id="uname"
            type="text"
            className="form-control"
            placeholder="Username"
            // The value of the input is controlled by the 'username' state.
            value={username}
            // The onChange event updates the 'username' state with every keystroke.
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password input field group. */}
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            // The value of the input is controlled by the 'password' state.
            value={password}
            // The onChange event updates the 'password' state with every keystroke.
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login button, which triggers the handleLogin function on click. */}
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

// Export the Login component to make it available for use in other parts of the application (e.g., router).
export default Login;