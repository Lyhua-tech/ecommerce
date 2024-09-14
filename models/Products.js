const sequelize = require("../config/databases");
const { DataTypes } = require("sequelize");

const Products = sequelize.define("Products", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Products;
