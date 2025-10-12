// Import React hooks (useState, useEffect) for state management and side effects.
import React, { useState, useEffect } from "react";
// Import Bootstrap CSS for styling the component.
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * TaskManager is a component for creating, viewing, updating, and deleting tasks.
 * It persists tasks in the browser's localStorage, specific to each user.
 */
const TaskManager = () => {
  // Get the username from localStorage, defaulting to "Guest" if not found.
  const username = localStorage.getItem("username") || "Guest";
  // Create a unique key for localStorage to store tasks for the current user.
  const storageKey = `tasks_${username}`;

  // State to hold the array of task objects. Initialized as an empty array.
  const [tasks, setTasks] = useState([]);
  // State to manage the value of the new task input field.
  const [input, setInput] = useState("");
  // State to manage the value of the due date input field.
  const [dueDate, setDueDate] = useState("");

  // useEffect hook to load tasks from localStorage when the component mounts or the user changes.
  useEffect(() => {
    // Retrieve the tasks string from localStorage, or an empty array string if null.
    const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Sort tasks by their due date in ascending order before setting them in state.
    const sortedTasks = savedTasks.sort((a, b) => new Date(a.due) - new Date(b.due));
    // Update the component's state with the loaded and sorted tasks.
    setTasks(sortedTasks);
    // Log the loaded tasks for debugging purposes.
    console.log(`Tasks loaded for ${username}:`, sortedTasks);
    // The dependency array ensures this effect runs only when storageKey changes.
  }, [storageKey, username]);

  /**
   * Helper function to save the current list of tasks to both state and localStorage.
   * @param {Array} tasksArray - The array of tasks to be saved.
   */
  const saveTasks = (tasksArray) => {
    // Sort tasks by due date before every save to maintain order.
    const sortedTasks = tasksArray.sort((a, b) => new Date(a.due) - new Date(b.due));
    // Update the React state to re-render the component.
    setTasks(sortedTasks);
    // Save the sorted tasks to localStorage after converting them to a JSON string.
    localStorage.setItem(storageKey, JSON.stringify(sortedTasks));
    // Log the saved tasks for debugging.
    console.log(`Tasks saved for ${username}:`, sortedTasks);
  };

  /**
   * Adds a new task to the list.
   */
  const addTask = () => {
    // Validate that both the task text and due date fields are filled.
    if (!input || !dueDate) {
      alert("Please enter both task and due date!");
      return; // Exit the function if validation fails.
    }
    // Create a new array with the existing tasks and the new task object.
    const newTasks = [...tasks, { text: input, done: false, due: dueDate }];
    // Save the updated tasks array.
    saveTasks(newTasks);
    // Clear the input fields for the next entry.
    setInput("");
    setDueDate("");
  };

  /**
   * Toggles the 'done' status of a task at a specific index.
   * @param {number} index - The index of the task to toggle.
   */
  const toggleDone = (index) => {
    // Create a copy of the tasks array to avoid direct state mutation.
    const updatedTasks = [...tasks];
    // Invert the 'done' property of the specified task.
    updatedTasks[index].done = !updatedTasks[index].done;
    // Save the modified tasks array.
    saveTasks(updatedTasks);
  };

  /**
   * Deletes a task from the list at a specific index.
   * @param {number} index - The index of the task to delete.
   */
  const deleteTask = (index) => {
    // Create a copy of the tasks array.
    const updatedTasks = [...tasks];
    // Remove one element at the specified index.
    updatedTasks.splice(index, 1);
    // Save the modified tasks array.
    saveTasks(updatedTasks);
  };

  /**
   * Determines the Bootstrap background and text color class for a task item
   * based on its completion status and due date.
   * @param {object} task - The task object.
   * @returns {string} A string of Bootstrap classes.
   */
  const getTaskClass = (task) => {
    if (task.done) return "bg-success text-white"; // Green for completed tasks.

    // Get today's date with time reset to midnight for accurate day comparison.
    const today = new Date().setHours(0, 0, 0, 0);
    const due = new Date(task.due).setHours(0, 0, 0, 0);
    
    // Calculate the difference in days between the due date and today.
    const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "bg-danger text-white"; // Red for overdue tasks.
    if (diffDays <= 3) return "bg-warning text-dark"; // Yellow for tasks due within 3 days.
    
    return "bg-light"; // Default light background for other tasks.
  };

  // Render the component's UI.
  return (
    <div className="container mt-4">
      {/* Personalized header for the task manager. */}
      <h3>{username}'s Task Manager</h3>

      {/* Input form for adding a new task */}
      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <button className="btn btn-primary w-100" onClick={addTask}>
            Add Task
          </button>
        </div>
      </div>

      {/* List of tasks */}
      <ul className="list-group">
        {/* Conditionally render a message if there are no tasks. */}
        {tasks.length === 0 && <li className="list-group-item text-center">No tasks yet</li>}
        
        {/* Map over the tasks array to render each task as a list item. */}
        {tasks.map((task, index) => (
          <li
            key={index} // Unique key for each item, crucial for React's rendering performance.
            // Dynamically set classes for styling based on task status.
            className={`list-group-item d-flex justify-content-between align-items-center ${getTaskClass(task)}`}
          >
            {/* Left side of the task item: checkbox, text, and due date. */}
            <div>
              <input
                type="checkbox"
                className="me-2"
                checked={task.done}
                onChange={() => toggleDone(index)}
              />
              <strong>{task.text}</strong>
              <span className="ms-3">{task.due}</span>
            </div>
            {/* Right side of the task item: delete button. */}
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the component for use in other parts of the application.
export default TaskManager;