const nodemailer = require("nodemailer");
const env = require("dotenv");

env.config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

 
module.exports = transporter;