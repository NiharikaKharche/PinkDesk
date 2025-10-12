// Import React and necessary components from react-router-dom and Bootstrap.
import React from "react";
// Link is used for client-side routing, preventing a full page reload.
import { Link, useNavigate } from "react-router-dom";
// Import Bootstrap CSS for styling.
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The Navbar component provides the main navigation for the application.
 * It displays different links depending on whether the user is logged in or not.
 */
const Navbar = () => {
  // useNavigate is a hook from react-router-dom for programmatic navigation.
  const navigate = useNavigate();
  // Check if a username exists in localStorage to determine the user's login status.
  const username = localStorage.getItem("username");

  /**
   * Handles the user logout process.
   */
  const handleLogout = () => {
    // Remove the username from localStorage.
    localStorage.removeItem("username");
    // Note: It's good practice to also remove user-specific data.
    // However, if your app supports multiple users, you might want to leave other users' task data.
    // This line removes a generic 'tasks' key, which might affect other users if not designed carefully.
    localStorage.removeItem("tasks"); // Consider changing this to a user-specific key if needed.
    // Redirect the user to the login page after logging out.
    navigate("/login");
  };

  // Render the navigation bar UI.
  return (
    // The <nav> element with Bootstrap classes for styling a responsive, dark-themed navbar.
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* The brand/logo link that navigates to the homepage. */}
        <Link className="navbar-brand fw-bold" to="/">PinkDesk</Link>
        
        {/* The hamburger menu button for smaller screens (mobile view). */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* This div contains the navigation links and collapses on smaller screens. */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Unordered list for the navigation items, aligned to the right (ms-auto). */}
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* The "Home" link is always visible. */}
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            
            {/* Conditional rendering: Show "Login" link only if the user is NOT logged in. */}
            {!username && (
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            )}
            
            {/* Conditional rendering: Show dashboard, tasks, progress, and logout button only if the user IS logged in. */}
            {username && (
              // React Fragment (<>) is used to group multiple elements without adding an extra node to the DOM.
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/tasks">Tasks</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/progress">Progress</Link></li>
                <li className="nav-item">
                  {/* The logout button, which calls handleLogout when clicked. */}
                  <button className="btn btn-light btn-sm ms-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component to be used in other parts of the application.
export default Navbar;