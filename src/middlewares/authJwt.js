const jwt = require("jsonwebtoken");

import { config as dotenv } from "dotenv";
dotenv();

const secret = process.env.SECRET;

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    //si tiene token o no
    if (!token)
      return res.status(403).json({ message: "Authentication failed!" });

    //compara el token
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token !");
  }
};

export const isModerator = async (req, res, next) => {};

export const isAdmin = async (req, res, next) => {};
