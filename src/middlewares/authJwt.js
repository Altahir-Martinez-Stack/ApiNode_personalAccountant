const jwt = require("jsonwebtoken");

import { config as dotenv } from "dotenv";
import decodeJwt from "../helpers/jwtDecode";
import { User } from "../models/Users";
dotenv();

const secret = process.env.SECRET;

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"]
  
  try {
    if (!token)
      return res.status(403).json({ message: "Authentication failed!" })

    const { email } = decodeJwt(token)
    const foundUser = email ? await User.findOne({ where: { email } }) : null

    if (foundUser) {
      const { id, email, name } = foundUser
      req.user = { id, email, name }
      return next()
    }


    //compara el token
    const verified = jwt.verify(token, secret);
    req.user = verified;
    return next()

  } catch (error) {
    return res.status(400).send("Invalid token !");
  }
};

export const isModerator = async (req, res, next) => { };

export const isAdmin = async (req, res, next) => { };
