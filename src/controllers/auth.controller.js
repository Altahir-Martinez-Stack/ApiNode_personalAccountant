//models
import { User } from "../models/Users";
import { encrypt, compare } from "../helpers/HandleBcrypt.js";
const jwt = require("jsonwebtoken");

import { config as dotenv } from "dotenv";
dotenv();

const secret = process.env.SECRET;
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
    //Comprar la contraseña con la conttraseña encrytada
    const checkPassword = await compare(password, user.password);
    if (checkPassword) {
      // res.send({
      //   data: user.name,
      // });
      var name = user.name;
      const token = jwt.sign(
        {
          name,
          //exp: Date.now() + 60 * 1000,
        },
        secret
      );
      console.log({ token });
      res.send("request accepted, user is correct");
    } else {
      return res.status(404).json({
        msg: "Bad Request. error does not exist the username and password",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const token = async (req, res) => {
  const { id: sub, name } = { id: 4, name: "renzo" };
  const token = jwt.sign(
    {
      sub,
      name,
      exp: Date.now() + 60 * 1000,
    },
    secret
  );
  res.send({ token });
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const publics = async (req, res) => {
  res.send("I'm public");
  try {
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const privates = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new Error("Authentication failed!");
  }

  try {
    const payload = jwt.verify(token, secret);
    if (Date.now() > payload.exp) {
      return res.status(401).send({ error: "token expired" });
    }
    res.send("I'm private");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
