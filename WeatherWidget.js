// Import React and the useState hook for managing component state.
import React, { useState } from "react";
// Import Bootstrap CSS for styling.
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * The WeatherWidget component allows users to fetch and display the current
 * weather for a specified city using the OpenWeatherMap API.
 */
const WeatherWidget = () => {
  // State to hold the user's input for the city name.
  const [city, setCity] = useState("");
  // State to hold the weather data object returned from the API. Initialized to null.
  const [weather, setWeather] = useState(null);

  // --- SECURITY WARNING ---
  // Storing API keys directly in client-side code is insecure and not recommended for production.
  // Anyone can view your key by inspecting the browser's source code.
  // For a real application, this key should be stored in an environment variable
  // and accessed via a backend server to protect it.
  const apiKey = "6a919644890dd6ecfdb9cac40bd7d6f3";

  /**
   * Fetches weather data from the OpenWeatherMap API for the entered city.
   * This is an async function because it uses the 'await' keyword for the API call.
   */
  const getWeather = async () => {
    // Basic validation to ensure the city input is not empty.
    if (!city.trim()) {
      alert("Please enter a city name");
      return; // Exit the function if the input is empty.
    }
    
    // try...catch block to handle potential errors during the API request.
    try {
      // Fetch data from the API. The URL is constructed with the city, API key, and units.
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      
      // Check if the HTTP response status is not successful (e.g., 404 Not Found).
      if (!response.ok) {
        throw new Error("City not found");
      }
      
      // Parse the JSON data from the response.
      const data = await response.json();
      // Update the 'weather' state with the fetched data, which triggers a re-render.
      setWeather(data);

    } catch (error) {
      // If any error occurs in the 'try' block, it's caught here.
      // Display the error message in an alert to the user.
      alert(error.message);
    }
  };

  // Render the component's UI.
  return (
    // A Bootstrap card component to wrap the weather widget.
    <div className="card p-4 shadow mt-4">
      <h3 className="text-center text-pink mb-3">Live Weather</h3>
      <h6 className="text-center text-dark mb-3">Plan your day smarter by checking the weather before tackling your tasks!</h6>
      
      {/* Input group for entering the city name and triggering the API call. */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name"
          // The input's value is controlled by the 'city' state.
          value={city}
          // The 'onChange' event updates the 'city' state on every keystroke.
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={getWeather}>
          Get Weather
        </button>
      </div>

      {/* Conditional rendering: This block is only displayed if the 'weather' state is not null. */}
      {weather && (
        <div className="mt-3 text-center">
          <h5>
            {/* Accessing properties from the weather data object. */}
            {weather.name}, {weather.sys.country}
          </h5>
          <p>🌡 Temperature: <strong>{weather.main.temp}°C</strong></p>
          <p>☁ Weather: <strong>{weather.weather[0].description}</strong></p>
          <p>💧 Humidity: <strong>{weather.main.humidity}%</strong></p>
          <p>🌬 Wind Speed: <strong>{weather.wind.speed} m/s</strong></p>
        </div>
      )}
    </div>
  );
};

// Export the WeatherWidget component to be used in other parts of the application.
export default WeatherWidget;