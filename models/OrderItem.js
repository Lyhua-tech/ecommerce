const sequelize = require('../config/databases');
const {DataTypes} = require('sequelize');

const OrderItems = sequelize.define('OrderItems', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Orders',
            key: 'id',
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: 'Products',
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    timestamps: true,
})

module.exports = OrderItems