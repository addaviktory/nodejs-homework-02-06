const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, verificationToken) {
  const port = process.env.PORT
  const verificationLink = `http://localhost:${port}/users/verify/${verificationToken}`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'addavikt@meta.ua',
      pass: process.env.META_PASSWORD, 
    },
  });

  const mailOptions = {
    from: 'addavikt@meta.ua', 
    to: email,
    subject: 'Email Verification',
    html: `<p>Для підтвердження email перейдіть за <a href="${verificationLink}">посиланням</a>.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendVerificationEmail,
};