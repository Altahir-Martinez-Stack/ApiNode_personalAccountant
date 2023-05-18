const nodemailer = require("nodemailer");

//cuenta de correo principal
let mail = {
  user: "testpruebasperu01@gmail.com",
  password: "rlijsgpqnotgcmki",
  type: "smtp.gmail.com",
};

// create reusable transporter object using the default SMTP transport
const config = {
  host: mail.type,
  port: 587,
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.password, // generated ethereal password
  },
};

//tranport es que envia el correo
const transport = nodemailer.createTransport(config);

// send mail with defined transport object
function recipientsEmail(mailAddresses, subjectAddressee, descriptionMessage) {
  const message = {
    from: mail.user, // sender address
    to: mailAddresses, // list of receivers
    subject: subjectAddressee, // Subject line
    text: descriptionMessage, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  };
  return message;
}

module.exports = { transport, recipientsEmail };
