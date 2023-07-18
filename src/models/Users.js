import { DataTypes } from "sequelize";
import { sequelize } from "../database/index";
import { Detail } from "./Details";
import { DetailType } from "./DetailTypes";

//Creando las tablas Users
export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
})

const userId = "userId"
// DetailType DetailType
User.hasMany(DetailType, {
  foreinkey: userId,
  sourceKey: "id",
});

DetailType.belongsTo(User, {
  foreinkey: userId,
  targetId: "id",
});


// DetailType Detail
User.hasMany(Detail, {
  foreinkey: userId,
  sourceKey: "id",
});

Detail.belongsTo(User, {
  foreinkey: userId,
  targetId: "id",
});