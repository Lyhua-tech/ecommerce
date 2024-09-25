const sequelize = require("../config/databases");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

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
    verificationtoken: DataTypes.STRING,
    verificationExpiration: DataTypes.DATE,
  },
  {
    timestamps: true,
  },
  {
    indexes: {
      unique: true,
      fields: ["email", "username"],
    },
  },
);

Users.beforeSave(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

module.exports = Users;
