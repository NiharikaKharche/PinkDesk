// Import the React library, the foundation for building the component.
import React from "react";

// Import the minified Bootstrap CSS for pre-built, responsive styling.
import 'bootstrap/dist/css/bootstrap.min.css';

// Import a custom stylesheet for additional or overriding styles.
import '../App.css';

// Import an image from the assets folder to be used as a background.
import bgImage from "../assets/download.jpeg";

/**
 * The Home component serves as the landing page for the application.
 * It displays a full-screen hero section with a welcome message.
 */
const Home = () => {
  // The return statement renders the component's UI using JSX.
  return (
    // This div is the main container for the home page.
    <div 
      // A custom class name for any specific styling in App.css.
      className="home-wrapper" 
      // Inline styles are used here to apply a dynamic background image.
      style={{ 
        // Sets the background image using the imported image file.
        backgroundImage: `url(${bgImage})`, 
        // Ensures the image covers the entire container, scaling as needed.
        backgroundSize: "cover", 
        // Centers the image within the container.
        backgroundPosition: "center", 
        // Sets the container's height to 100% of the viewport height, making it full-screen.
        height: "100vh", 
      }}
    >
      {/* This container from Bootstrap helps center and pad the content. */}
      <div className="container py-5">
        {/* The main heading, using a Bootstrap class for large, prominent text. */}
        <h1 className="display-5">Welcome to PinkDesk</h1>
        {/* A subheading or tagline, using a Bootstrap class to make it stand out. */}
        <h3 className="lead">Manage your assignments, tasks, and track your weekly progress efficiently!</h3>
      </div>
    </div>
  );
};

// Export the Home component as the default export, making it available for other parts of the app.
export default Home;