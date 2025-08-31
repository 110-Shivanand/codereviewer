const express1 = require('express');
const router = express1.Router();
const reviewCode = require('./ai.services');
const sendotp = require('./email.js');

// Function to generate OTP


// Route for reviewing code
router.post('/code', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Please provide code' });
  }

  const result = await reviewCode(code);
  res.json({ ans: result });
});

// Route for sending OTP


module.exports = router;
