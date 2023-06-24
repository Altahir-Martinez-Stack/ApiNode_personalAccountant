import app from "../app";
import { sequelize } from "./database";
import schedule from "node-schedule"
import changeJobs from "./helpers/changeJobs";

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

function initialJobs() {
  console.log("initial jobs");
  try {
    /* 
      Se estara ejecutando cada 5 minutos 
      para actualizar los jobs por si cambian
    */
    schedule.scheduleJob('*/5 * * * *', function () {
      changeJobs()
    })
  } catch (error) {
    schedule.gracefulShutdown()
    return error.message
  }
}


main()
//initialJobs()