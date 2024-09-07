require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const app = express();
const port = process.env.PORT || 5000;

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services or configure your own SMTP server
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Email sending function
const sendEmail = (recipients) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipients.join(', '),
    subject: 'Scheduled Company Update',
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    body {
    font-family: Arial, sans-serif;
    color: #333;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    }
    .container {
    width: 80%;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-align: center;
    }
    .header {
    background: #007bff;
    color: #fff;
    padding: 10px 0;
    border-radius: 8px 8px 0 0;
    }
    .content {
    margin: 20px 0;
    }
    .footer {
    font-size: 0.8em;
    color: #777;
    margin-top: 20px;
    }
    </style>
    </head>
    <body>
    <div class="container">
    <div class="header">
    <h1>Company Name</h1>
    </div>
    <div class="content">
    <h2>Hello Team,</h2>
    <p>This is your scheduled update for today.</p>
    <p>We hope you are having a great day!</p>
    <p>Best Regards,<br>Company Name</p>
    </div>
    <div class="footer">
    <p>Company Address | Company Phone | <a href="mailto:info@company.com">info@company.com</a></p>
    </div>
    </div>
    </body>
    </html>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};


// Define the recipients
const recipients = [
  'sanjeetk912258@gmail.com',
  'codewithsanjeet91@gmail.com',
  'coder.sanjeet91@gmail.com'
];

schedule.scheduleJob('*/2 * * * *', () => {
  console.log("Email sending ....")
  sendEmail(recipients);
  console.log('Scheduled email sent at 6 AM!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});