import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";

//Creando las tablas Details
export const Detail = sequelize.define("details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.INTEGER,
  },
  amountOfMoney: {
    type: DataTypes.DECIMAL(18, 2),
  },
  description: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
});
