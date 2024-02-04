import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import axios from "axios";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [otp, setOtp] = useState();
  const userId = useSelector((state)=>state?.currentUserReducer?.result?._id)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp)
    try {
        const response = await axios.post('http://localhost:8080/user/verifyOtp',{otp,userId});
        if(response.status=='200'){
          navigate('/')
          window.location.href='';
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="OTP">
            <h4>Verification Code</h4>
            <input
              type="number"
              name="Otp"
              id="OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            Verify
          </button>
        </form>
        <p>
        
        </p>
      </div>
    </section>
  );
};

export default Auth;
