const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request - ePlan',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4b38b3;">Password Reset Request</h2>
          <p>You have requested a password reset for your ePlan account.</p>
          <p>Please click the link below to reset your password:</p>
          <a href="${resetUrl}" style="background-color: #4b38b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p style="margin-top: 20px;">This link will expire in 10 minutes.</p>
          <p>If you did not request this password reset, please ignore this email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">ePlan Financial Planning System</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = {
  sendPasswordResetEmail
};