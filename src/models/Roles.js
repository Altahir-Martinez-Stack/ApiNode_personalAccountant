import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";
import { User } from "./Users";

//Creando las tablas Rol
export const Rol = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING,
  },
});
Rol.hasMany(User, {
  foreinkey: "rolId",
  sourceKey: "id",
});

User.belongsTo(Rol, {
  foreinkey: "rolId",
  targetId: "id",
});
