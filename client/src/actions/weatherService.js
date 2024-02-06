// weatherService.js

import axios from 'axios';


const weatherService = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5', 
});

export const getWeatherByCoordinates = async (latitude, longitude) => { 
  try {
    const response = await weatherService.get('/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: process.env.Openweather_api_key,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default weatherService;
