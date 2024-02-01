import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { getWeatherByCoordinates } from "./actions/weatherService";



function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.weatherReducer.theme);

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());

    navigator.geolocation.getCurrentPosition(async (position)=>{
      const {latitude,longitude} = position.coords;
      const weatherData = await getWeatherByCoordinates(latitude,longitude);
      await dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: weatherData });
    })
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);
  
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
     
      setSlideIn((state) => !state);
    }
  };

  const appStyle = {
    backgroundColor:theme,
    transition: "background-color 0.5s ease"
  }

  return (
    <div className="App" style={appStyle}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
    
  );
}

export default App;
