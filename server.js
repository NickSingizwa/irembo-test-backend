// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 5000; // Choose any port you prefer

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'singizwanick19@gmail.com', // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Endpoint to handle form data submission
app.post('/api/v1/registerDetails', (req, res) => {
  // Retrieve data from the request body
  const {
    nationalId,
    passportId,
    telephone,
    email,
    businessType,
    companyName,
    tinNumber,
    regDate,
    businessProvince,
    purpose,
    category,
    weight,
    unit,
    quantity,
    description,
    citizenship,
    province,
    otherpurpose,
  } = req.body;

  const mailOptions = {
    from: 'singizwanick19@gmail.com',
    to: email, // Enter recipient email address
    subject: 'New Form Submission',
    html: `
      <p><strong>Business Owner Details:</strong></p>
      <p>Citizenship: ${citizenship}</p>
      <p>National ID: ${nationalId}</p>
      <p>Passport ID: ${passportId}</p>
      <p>Telephone: ${telephone}</p>
      <p>Email: ${email}</p>
      <hr>
      <p><strong>Business Details:</strong></p>
      <p>Business Type: ${businessType}</p>
      <p>Company Name: ${companyName}</p>
      <p>TIN Number: ${tinNumber}</p>
      <p>Registration Date: ${regDate}</p>
      <p>Business Province: ${businessProvince}</p>
      <hr>
      <p><strong>Product Information:</strong></p>
      <p>Purpose of Importation: ${purpose}</p>
      <p>Category: ${category}</p>
      <p>Weight (kg): ${weight}</p>
      <p>Unit of Measurement: ${unit}</p>
      <p>Quantity: ${quantity}</p>
      <p>Description: ${description}</p>
      <p>Province: ${province}</p>
      <p>Other Purpose: ${otherpurpose}</p>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'An error occurred while sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Details registered successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
