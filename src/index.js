import app from "../app";
import { sequelize } from "./database";

//Models
import "./models/DetailTypes.js";
import "./models/Details.js";
import "./models/Users.js";
import "./models/Roles.js";

async function main() {
  try {
    //"force :true" para forzar la creacion de las tablas
    await sequelize.sync({ force: false });
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(app.get("port"));
    console.log("server on port", app.get("port"));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
