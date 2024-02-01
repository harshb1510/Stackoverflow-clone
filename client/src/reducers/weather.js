// weatherReducer.js

const initialState = {
    weatherData: null,
    theme: "default", // Set default theme
  };
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_WEATHER_SUCCESS":
        return {
          ...state,
          weatherData: action.payload,
          theme: getThemeFromWeather(action.payload), // Update theme based on weather data
        };
      case "FETCH_WEATHER_FAILURE":
        // Handle failure or set default values
        return {
          ...state,
          weatherData: null,
          theme: "default",
        };
      default:
        return state;
    }
  };
  
  // Function to determine theme based on weather conditions
  const getThemeFromWeather = (weatherData) => {
    if (!weatherData) {
      return "default";
    }
  
    const temperature = weatherData.main.temp;
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
  
    if (temperature > 25) {
      return "#ff5733"; // Hot theme color (e.g., orange)
    } else if (temperature < 10) {
      return "#3498db"; // Cold theme color (e.g., blue)
    } else {
      switch (weatherCondition) {
        case "clear":
          return "#f1c40f"; // Sunny theme color (e.g., yellow)
        case "clouds":
          return "#ecf0f1"; // Cloudy theme color (e.g., light gray)
        case "rain":
          return "#3498db"; // Rainy theme color (e.g., blue)
        default:
          return "default";
      }
    }
  };
  
  
  export default weatherReducer;
  