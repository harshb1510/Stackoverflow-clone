// weatherService.js

import axios from 'axios';

const API_KEY = 'b76cdd4398be3adb793792040ef3b161'; // Replace with your OpenWeatherMap API key

const weatherService = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeatherByCoordinates = async (latitude, longitude) => { 
  try {
    const response = await weatherService.get('/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: 'metric', // Use 'imperial' for Fahrenheit
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default weatherService;
