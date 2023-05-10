const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "testpruebasperu01@gmail.com", // generated ethereal user
    pass: "rlijsgpqnotgcmki", // generated ethereal password
  },
};

export const transport = nodemailer.createTransport(config);
