//models
import { User } from "../models/Users";
import { encrypt, compare } from "../helpers/HandleBcrypt.js";
const jwt = require("jsonwebtoken");

import { config as dotenv } from "dotenv";
dotenv();

const secret = process.env.SECRET;
const { Op } = require("sequelize");

//crear un nuevo registro en la tabla user
export const signUp = async (req, res) => {
  //Datos que se envias desde el front
  const { email, password, name } = req.body;

  //validando los parametros
  if (email == null || password == null || name == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  //encrytando la contraseña
  const passwordHash = await encrypt(password);
  try {
    const validateUser = await User.findOne({
      where: {
        email,
      },
    });

    //Valida si existe el id
    if (validateUser) {
      return res
        .status(400)
        .json({ msg: "Bad Request. that email is already registered" });
    }
    //creando los datos en la tabla de users
    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
      //roleId: 0,
    });

    res.send("creating user");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//verifica el mail y contraseña
export const signIn = async (req, res) => {
  //Datos que se envias desde el front
  const { email, password } = req.body;

  if (email == null || password == null) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: "Bad Request. error does not exist the username and password",
      });
    }
    //Comprar la contraseña con la conttraseña encrytada
    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      var name = user.name;
      const token = jwt.sign(
        {
          name,
          //exp: Date.now() + 60 * 1000,
        },
        secret
      );
      res.json({user, token });
    } else {
      return res.status(404).json({
        msg: "Bad Request. error does not exist the username and password",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const token = async (req, res) => {
//   const { id: sub, name } = { id: 4, name: "renzo" };
//   const token = jwt.sign(
//     {
//       sub,
//       name,
//       exp: Date.now() + 60 * 1000,
//     },
//     secret
//   );
//   res.send({ token });
//   try {
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
