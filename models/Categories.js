const sequelize = require("../config/databases");
const { DataTypes } = require("sequelize");

const Categories = sequelize.define("Categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Categories;
