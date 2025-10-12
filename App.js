// Import the React library, the foundation for all React components.
import React from "react";

// Import components from 'react-router-dom' to handle client-side routing.
// BrowserRouter (aliased as Router): The main router component that uses the HTML5 history API.
// Routes: A container for a collection of <Route> elements.
// Route: Defines a mapping between a URL path and a React component.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import the various components that will serve as pages or UI elements.
import Navbar from "./components/Navbar";         // The navigation bar, visible on all pages.
import Home from "./components/Home";             // The landing page.
import Login from "./components/Login";           // The login page.
import Dashboard from "./components/Dashboard";   // The user's main dashboard.
import TaskManager from "./components/TaskManager"; // A dedicated page for managing tasks.
import ProgressChart from "./components/ProgressChart"; // A dedicated page for viewing progress.

// Import the main stylesheet for the application.
import "./App.css";

/**
 * The App component is the root component of the entire application.
 * It sets up the main router and defines the routes for each page.
 */
function App() {
  // The return statement contains the JSX that defines the application's structure.
  return (
    // <Router> wraps the entire application, enabling routing capabilities.
    <Router>
      {/* This div is the main container for the app, often used for global styling. */}
      <div className="App">
        {/* The Navbar component is placed outside of <Routes> so it appears on every page. */}
        <Navbar />
        
        {/* The <Routes> component is where you define all possible routes.
            It will only render the first <Route> that matches the current URL. */}
        <Routes>
          {/* Route for the homepage. 'path="/"' is the root URL. */}
          <Route path="/" element={<Home />} />
          
          {/* Route for the login page. */}
          <Route path="/login" element={<Login />} />
          
          {/* Route for the user dashboard. */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Route for the standalone task manager view. */}
          <Route path="/tasks" element={<TaskManager />} />
          
          {/* Route for the standalone progress chart view. */}
          <Route path="/progress" element={<ProgressChart />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component so it can be rendered by the entry point of the application (index.js).
export default App;