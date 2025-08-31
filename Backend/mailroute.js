const express1 = require('express');
const router1 = express1.Router();
const sendotp=require('./email') //otpsender

const generateOTP = (length = 6) => {
  const digits = '0123456789';
  return Array.from({ length }, () => digits[Math.floor(Math.random() * 10)]).join('');
};

router1.post('/otpcode', async (req, res) => {
  const {email}=req.body
     console.log('email received')
     if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = generateOTP(); // No need to extract email from req.body
  console.log('📥 OTP Request received. Generated OTP:', otp,email);

  try {
    await sendotp(email,otp); // Just pass otp to email.js
    res.status(200).json({ message: 'OTP sent successfully',code:otp });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
});

module.exports = router1;
