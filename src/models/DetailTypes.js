import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";

//Creando las tablas DetailTypes
export const DetailType = sequelize.define("DetailTypes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nameNumber: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});
