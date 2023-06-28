//models
import { User } from "../models/Users";
import { encrypt, compare } from "../helpers/HandleBcrypt.js";
const jwt = require("jsonwebtoken");

import { config as dotenv } from "dotenv";
import decodeJwt from "../helpers/jwtDecode";
dotenv();

const secret = process.env.SECRET;
const { Op } = require("sequelize");

//crear un nuevo registro en la tabla user
export const signUp = async (req, res) => {
  //Datos que se envias desde el front
  const { email, password, name, token } = req.body

  //validando los parametros

  if (!token && (email == null || password == null || name == null)) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" })
  }

  try {
    //encrytando la contraseña
    const passwordHash = password ? await encrypt(password) : ""
    const decode = decodeJwt(token)

    const validateUser = await User.findOne({
      where: { email: token ? decode.email : email }
    })

    //Valida si existe el id
    if (validateUser) {
      return res
        .status(400)
        .json({ msg: "Bad Request. that email is already registered" });
    }

    //creando los datos en la tabla de users
    const user = await User.create({
      email: email || decode.email,
      password: passwordHash,
      name: name || decode.name,
    });

    const {id, email, name} = user
    const generateToken = token ? token : jwt.sign(
      {
        id, email, name
        //exp: Date.now() + 60 * 1000,
      },
      secret
    )

    res.json({ user, token: generateToken || token })
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

//verifica el mail y contraseña
export const signIn = async (req, res) => {
  //Datos que se envias desde el front
  const { email, password, token } = req.body;

  if (!token && (email == null || password == null)) {
    return res.status(400).json({ msg: "Bad Request. Please Fill all fields" });
  }

  try {
    const decode = token ? decodeJwt(token) : null
    const user = await User.findOne({
      where: {
        email: decode?.email ? decode.email : email,
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: token ? "Bad Request. that email is already registered" : "Bad Request. error does not exist the username and password",
      });
    }
    //Comprar la contraseña con la conttraseña encrytada
    const checkPassword = token ? null : await compare(password, user.password)

    if (token) return res.json({ user, token })

    if (checkPassword) {
      const {id, email, name} = user
      const token = jwt.sign(
        {
          id, email, name
          //exp: Date.now() + 60 * 1000,
        },
        secret
      )
      return res.json({ user, token })
    }

    return res.status(404).json({
      msg: token ? "Bad Request. that email is already registered" : "Bad Request. error does not exist the username and password",
    })

  } catch (error) {
    return res.status(500).json({ msg: error.message });
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
