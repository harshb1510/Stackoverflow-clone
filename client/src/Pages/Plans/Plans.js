import React, { useEffect, useState } from "react";
import "./Plans.css";
import axios from "axios";
import { useSelector } from "react-redux";
import * as api from "../../api/index";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";

const Plans = ({slideIn,handleSlideIn}) => {
var id = useSelector((state) => state.currentUserReducer?.result._id);
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
 const [plan,setPlan] = useState('');
const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

useEffect(() => {
        const loadRazorpayScript = async () => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => {};
          document.body.appendChild(script);
        };
    
        loadRazorpayScript();
        setPlan(currentProfile?.plan)
}, [setPlan]);

const initPayment = (data) => {
  const options = {
    key: "rzp_test_rrpFDSyVYUuEE4",
    amount: data.amount,
    currency: data.currency,
    order_id: data.orderDetails.razorpayOrderId,
    handler: async (response) => {
      try {
        const verifyUrl = `http://localhost:8080/user/verify`;

        const verifyData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        await axios.post(verifyUrl, verifyData);
        await axios.post(`http://localhost:8080/user/subscribe/${id}`,data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

    const handleSilverPlan = async () => {
        try {
          const response = await api.order({amount:100})
          initPayment(response.data);
        } catch (error) {
          
        }
    }
    const handleGoldPlan = async () => {
      const response = await api.order({amount:1000})
      initPayment(response.data);
    }
    useEffect(() => {
      const handleResize = () => {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      };
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  
    
  return (
    <>
    <LeftSidebar className='sidebar' slideIn={slideIn} handleSlideIn={handleSlideIn} />
    <div className="con-items ">
      <div className="item item1">
        <header>
          <h3>Free</h3>
          <p>
            <b>₹0 </b>
          </p>
        </header>
        <ul>
          <li>
            <i className="bx bx-check"></i>
            1 Question per day
          </li>
          <li>
            <i className="bx bx-check"></i>
            Free Plan Service
          </li>
          <li>
            <i className="bx bx-check"></i>
            Available to all user
          </li>
        </ul>
        <p className="item-list">Default</p>
      </div>
      <div className="item color item2">
        <span className="badge">{plan === 'gold' ? 'Current Plan' : 'Upgrade to Gold'}</span>
        <header>
          <h3>Gold</h3>
          <p>
            <b>₹1000/month</b>
          </p>
        </header>
        <ul style={{color:'black'}}>
          <li>
            <i className="bx bx-check"></i>
           Unlimited Question Access
          </li>
          <li>
            <i className="bx bx-check"></i>
            No limit per day
          </li>
          <li>
            <i className="bx bx-check"></i>
           Available to special Users
          </li>
        </ul>
        <button className="border" onClick={handleGoldPlan}>Choose Plan</button>
      </div>
      <div className="item item3">
      <span className="badge-2">{plan === 'silver' ? 'Current Plan' : 'Upgrade to Silver'}</span>
        <header>
          <h3>Silver</h3>
          <p>
            <b className="b-tag">₹100/month</b>
          </p>
        </header>
        <ul>
          <li>
            <i className="bx bx-check"></i>
            5 Question per day
          </li>
          <li>
            <i className="bx bx-check"></i>
            Limiting Questions
          </li>
          <li>
            <i className="bx bx-check"></i>
           Available to all user
          </li>
        </ul>
        <button onClick={handleSilverPlan}>Choose Plan</button>
      </div>
    </div>
    </>
  );
};

export default Plans;
