// Import React hooks and the Bar component from the chart libraries.
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Import necessary components from Chart.js to build the chart.
// This is required for Chart.js v3+ to work with react-chartjs-2.
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components with Chart.js. This process is known as "tree-shaking"
// and ensures that only the necessary parts of the library are bundled, reducing file size.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * The ProgressChart component visualizes the user's task completion status
 * using a bar chart. It fetches task data from localStorage.
 */
const ProgressChart = () => {
  // Retrieve the current username from localStorage, defaulting to "Guest".
  const username = localStorage.getItem("username") || "Guest";
  // Define a unique storage key for the user's tasks to retrieve the correct data.
  const storageKey = `tasks_${username}`;

  // State to store the tasks loaded from localStorage.
  const [tasks, setTasks] = useState([]);

  // useEffect hook to load data from localStorage when the component mounts or the user changes.
  useEffect(() => {
    // Get the JSON string of tasks from localStorage, or an empty array if none exists.
    const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Update the component's state with the loaded tasks.
    setTasks(savedTasks);
    // Log the loaded tasks for debugging.
    console.log(`Tasks loaded for chart for ${username}:`, savedTasks);
  }, [storageKey, username]); // Dependency array ensures this runs only when the user changes.

  // Calculate the number of completed tasks by filtering the tasks array.
  const doneCount = tasks.filter(t => t.done).length;
  // Calculate the number of remaining (incomplete) tasks.
  const notDoneCount = tasks.length - doneCount;

  // Define the data structure required by Chart.js to render the bar chart.
  const data = {
    // Labels for the X-axis of the chart.
    labels: ['Completed', 'Remaining'],
    // datasets is an array of objects, where each object represents a set of data.
    datasets: [
      {
        // The label for this dataset, which appears in the tooltip and legend.
        label: 'Tasks Progress',
        // The actual data points to be plotted on the chart.
        data: [doneCount, notDoneCount],
        // The background colors for the bars. The first color corresponds to the first label, and so on.
        backgroundColor: ['#28a745', '#dc3545'], // Green for completed, Red for remaining.
      },
    ],
  };

  // Render the component's UI.
  return (
    <div className="container mt-4">
      {/* Personalized header for the chart section. */}
      <h3>{username}'s Weekly Progress</h3>
      {/* The Bar component from react-chartjs-2, which renders the chart. */}
      {/* It takes the configured 'data' object as a prop. */}
      <Bar data={data} />
    </div>
  );
};

// Export the ProgressChart component for use in other parts of the application.
export default ProgressChart;