const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hi, I am login");
});

app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Setup email data
  const mailOptions = {
    from: email,
    to: "adeelimran467@gmail.com",
    subject: `New message from ${firstName} ${lastName}`,
    text: `You received a new message from your website contact form:\n\n
    Name: ${firstName} ${lastName}\n
    Email: ${email}\n
    Phone: ${phone}\n
    Message: ${message}`,
    replyTo: email,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending message");
    }
    console.log("Email sent: " + info.response);
    res.status(200).json("Message sent successfully");
  });
});

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
