import { config as dotenv } from "dotenv";
dotenv();

const postgres = "postgres";

export const config = {
  nameDB: process.env.NAME_DB || "tools-easier-life",
  username: process.env.USERNAME_DB || postgres,
  password: process.env.PASSWORD_DB || "root",
  host: process.env.HOST_DB || "localhost",
  dialect: process.env.DIALECT_DB || postgres,
  urlConnect : process.env.CONNECT_URL_BD || ""
}