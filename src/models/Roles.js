import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";
import { User } from "./Users";

//Creando las tablas Rol
export const Rol = sequelize.define("Roles", {
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
  foreinkey: "RolId",
  sourceKey: "id",
});

User.belongsTo(Rol, {
  foreinkey: "RolId",
  targetId: "id",
});
