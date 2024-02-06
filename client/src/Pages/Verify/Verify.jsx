import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
    try {
        const response = await axios.post('http://localhost:8080/user/authenticate',{email});
        if(response.status=='200'){
          const id = response.data.id  
            navigate(`/verify/${id}`);
        }else{
            alert("Invalid email or password")
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
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            Send Otp
          </button>
        </form>
        <p>
        
        </p>
      </div>
    </section>
  );
};

export default Auth;
