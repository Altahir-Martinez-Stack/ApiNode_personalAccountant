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

  const { email, password, name } = req.body
console.log(req.body?.token);
  if (req.body?.token) {
    console.log("entro 1");
    try {
      const decode = decodeJwt(token)
      if (!decode) return res.status(400).json({ msg: "Bad Request. error decode token" })

      const validateUser = await User.findOne({
        where: { email: decode.email }
      })

      if (validateUser) {
        return res
          .status(400)
          .json({ msg: "Bad Request. that email is already registered" });
      }

      const user = await User.create({
        email: decode.email,
        password: "",
        name: decode.name,
      })

      return res.json({ user, token })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }

  } else if (email && password && name) {

    try {
    
      const validateUser = await User.findOne({
        where: { email }
      })

      if (validateUser) {
        return res
          .status(400)
          .json({ msg: "Bad Request. that email is already registered" });
      }

      const passwordHash = await encrypt(password)

      const user = await User.create({
        email,
        password: passwordHash,
        name,
      });
      
      const generateToken = jwt.sign(
        {
          id: user.id, email: user.email, name: user.name
          //exp: Date.now() + 60 * 1000,
        },
        secret
      )

      return res.json({ user, token: generateToken })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }

  return res.status(400).json({ msg: "Bad Request. Please Fill all fields" })

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
      const { id, email, name } = user
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
