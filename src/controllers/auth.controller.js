//models
import { User } from "../models/Users";
import { encrypt, compare } from "../helpers/HandleBcrypt.js";
import { token } from "morgan";
const { Op } = require("sequelize");

//crear un nuevo registro en la tabla user
export const registerLogin = async (req, res) => {
  //Datos que se envias desde el front
  const { email, password, name } = req.body;

  //validando los parametros
  if (email == null || password == null || name == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  //encrytando la contraseña
  const passwordHash = await encrypt(password);
  try {
    //creando los datos en la tabla de users
    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
    });

    res.send("creating user");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//verifica el mail y contraseña
export const login = async (req, res) => {
  //Datos que se envias desde el front
  const { email, password } = req.body;

  if (email == null || password == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "Bad Request. error does not exist the username and password",
      });
    }
    console.log("sdasa:", user);
    //Comprar la contraseña con la conttraseña encrytada
    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      res.send("request accepted, user is correct");
      // res.send({
      //   data: user.name,
      // });
    } else {
      return res.status(404).json({
        msg: "Bad Request. error does not exist the username and password",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
