import { transport } from "../config/config.mail.js";

// send mail with defined transport object
function recipientsEmail(mail, subjecttxt, description) {
  const message = {
    from: "testpruebasperu01@gmail.com", // sender address
    to: mail, // list of receivers
    subject: subjecttxt, // Subject line
    text: description, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  };
  return message;
}

//
export const sendMailTo = async (req, res) => {
  const { mail, subject, description } = req.body;

  if (mail == null || subject == null || description == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }
  try {
    const sendMessage = recipientsEmail(mail, subject, description);
    await transport.sendMail(sendMessage);
    res.send("confirmed request: The mail was sent");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
