import React, { useState, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './login.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { Axios } from 'axios';
import { useEffect } from 'react';
const Login = () => {
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [gmail, setGmail] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    console.log(jwtDecode(credentialResponse.credential));
    navigate('/code');
  };

  const handleGoogleError = () => {
    console.log('Login failed');
  };
  useEffect(() => {
  if (otp) {
    console.log("Updated OTP:", otp);
    // do something with updated otp
  }
}, [otp]);


  const generateOTP = async (length = 6) => {
    const digits = '0123456789';
    const generatedOtp = Array.from({ length }, () => digits[Math.floor(Math.random() * 10)]).join('');
    setOtp(generatedOtp);
    setOtpSent(true);
    console.log('OTP sent:', otp);
    // Here you can send the OTP to user's email using backend API
    try{
const usedata = {
  email: email
};
console.log(usedata)
const response = await axios.post('http://localhost:3001/reviews/otpcode',usedata);
   const {message,code}=response.data
  // console.log(message)
   setOtp(code)
    }
    catch(error){
      console.log('erroromo ')
      toast.error(error.message)
      
    }
  };

  const verifyOtp = (code) => {
    if (enteredOtp === otp) {
      toast.success('OTP Verified Successfully!');
      navigate('/code');
    } else {
      alert('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div>
      <div id="login">
        <h1>Login with the following Options</h1>
        <div className="l">
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/135/246/non_2x/phone-icon-in-flat-style-telephone-call-illustration-on-white-isolated-background-mobile-hotline-business-concept-vector.jpg"
            alt="Phone"
          />
          <img
            onClick={() => setGmail(true)}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J3R6Uwnqkbf2ixL1Qb_oavnvO5d_CR6Cmw&s"
            alt="Other"
          />
          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              auto_select={true}
            />
          </div>
        </div>

        {gmail && !otpSent && (
          <div className="sendemail">
           <input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  ref={emailRef}
/>
            <button id="emailbtn" onClick={() => generateOTP()}>
              Send OTP
            </button>
          </div>
        )}

        {otpSent && (
          <div className="sendemail">
            <input
              type="text"
              required
              placeholder="Enter your OTP"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
            />
            <button id="emailbtn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
