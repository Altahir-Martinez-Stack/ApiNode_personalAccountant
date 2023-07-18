import { transport, recipientsEmail } from "../config/config.mail.js";

//para enviar mensaje
export const sendMailTo = async (req, res) => {
  //Datos que se envias desde el front
  const { mail, subject, description } = req.body;

  //valida si no es null
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
