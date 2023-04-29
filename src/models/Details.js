import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";
import { DetailType } from "./DetailTypes";

//Creando las tablas Details
export const Detail = sequelize.define("Details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  detailTypeId: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.DATE,
  },
});

//revisar despues
DetailType.hasMany(Detail, {
  foreignkey: "id",
  sourcekey: "detailTypeId",
});

Detail.belongsTo(DetailType, {
  foreignkey: "id",
  DetailTypeId: "id",
});
