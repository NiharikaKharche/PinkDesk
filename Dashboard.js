// Import the React library, which is necessary for creating React components.
import React from "react";

// Import custom components that will be used within the Dashboard.
// WeatherWidget displays the current weather information.
import WeatherWidget from "../components/WeatherWidget";
// TaskManager is a component for managing user tasks.
import TaskManager from "../components/TaskManager";
// ProgressChart visualizes the user's progress.
import ProgressChart from "../components/ProgressChart";

/**
 * The Dashboard component serves as the main view for logged-in users.
 * It aggregates several widgets like weather, task management, and progress charts
 * to provide a comprehensive overview.
 */
const Dashboard = () => {
  // Retrieve the username from the browser's local storage.
  // This is used to personalize the welcome message.
  const username = localStorage.getItem("username");

  // The return statement contains the JSX that will be rendered to the DOM.
  return (
    // Main container div with Bootstrap classes for styling (container and margin-top).
    <div className="container mt-4">
      {/* A personalized welcome message.
        It displays the retrieved username if it exists.
        If the username is not found in local storage, it defaults to "Guest".
      */}
      <h2>Welcome {username ? username : "Guest"}!</h2>

      {/* A simple motivational or informational message for the user. */}
      <p>Happy planning.</p>

      {/* Render the WeatherWidget component. */}
      <WeatherWidget />

      {/* Render the TaskManager component. */}
      <TaskManager />

      {/* Render the ProgressChart component. */}
      <ProgressChart />
    </div>
  );
};

// Export the Dashboard component so it can be imported and used in other parts of the application,
// such as in the main App component or a routing setup.
export default Dashboard;