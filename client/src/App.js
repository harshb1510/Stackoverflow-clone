import { BrowserRouter as Router, useNavigate, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { getWeatherByCoordinates } from "./actions/weatherService";
import Chatbot from "./components/Chatbot/Chatbot";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.weatherReducer.theme);
  var id = useSelector((state) => state.currentUserReducer?.result?._id);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];

  useEffect(() => {
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());

    navigator.geolocation.getCurrentPosition(async (position) =>  {
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherByCoordinates(latitude, longitude);
      await dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: weatherData });
    });
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);
  const [chatbotOpen, setChatbotOpen] = useState(false); // State to manage chatbot visibility

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

  const handleToggleChatbot = async () => {
    if(id){
      if (currentProfile?.isAuthenticated) {
        setChatbotOpen((prev) => !prev);
      }else{
       alert("Authenticate first");
       window.location.href="/authenticate"
      }
    }else{
      alert("Please login to access this feature");
      window.location.href="/auth"
    }

  };

  const appStyle = {
    backgroundColor: theme,
    transition: "background-color 0.5s ease",
  };

  return (
    <div className="App" style={appStyle}>
      <Router>
        <Navbar handleSlideIn={handleSlideIn} handleToggleChatbot={handleToggleChatbot} />
        {chatbotOpen && <Chatbot />} {/* Conditionally render Chatbot */}
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
      <button className="chatboticon" onClick={handleToggleChatbot}>
        <ChatBubbleIcon/>
      </button>
    </div>
  );
}

export default App;
