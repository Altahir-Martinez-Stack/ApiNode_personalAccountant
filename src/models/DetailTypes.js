import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";
import { Detail } from "./Details";

//Creando las tablas DetailTypes
export const DetailType = sequelize.define("detailTypes", {
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
    type: DataTypes.DATEONLY,
  },
});


DetailType.hasMany(Detail, {
  foreinkey: "detailTypeId",
  sourceKey: "id",
});

Detail.belongsTo(DetailType, {
  foreinkey: "detailTypeId",
  targetId: "id",
});
