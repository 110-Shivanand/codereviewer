const nodemailer = require('nodemailer');

const sendOTP = async ( email,otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivanand1807961@gmail.com',        // Your Gmail
      pass: process.env.passkey                   // App password
    }
  });

  const mailOptions = {
    from: 'shivanand1807961@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: ` Thank you for your intrest .Your OTP is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ OTP sent to email:');
  } catch (err) {
    console.error('❌ Error sending email:', err);
    throw err;
  }
};

module.exports=sendOTP