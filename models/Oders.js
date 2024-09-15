const sequelize = require("../config/databases");
const { DataTypes } = require("sequelize");

const Orders = sequelize.define(
  "Orders",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
      validate: {
        isIn: {
          args: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
          msg: "Status value must be'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', or 'Returned' ",
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Orders;
