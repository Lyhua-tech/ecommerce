const sequelize = require("../config/databases");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username must not be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email is invalid form",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: {
      unique: true,
      fields: ["email", "username"],
    },
  },
);

module.exports = Users;
