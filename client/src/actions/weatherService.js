// weatherService.js

import axios from 'axios';

// Replace with your OpenWeatherMap API key

const weatherService = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeatherByCoordinates = async (latitude, longitude) => { 
  try {
    const response = await weatherService.get('/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: "b76cdd4398be3adb793792040ef3b161",
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default weatherService;
