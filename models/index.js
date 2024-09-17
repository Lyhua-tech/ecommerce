const Categories = require('./Categories');
const Orders = require('./Oders');
const OrderItems = require('./OrderItem');
const Products = require('./Products');
const Users = require('./Users')

// Users and Orders
Users.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(Users, { foreignKey: 'userId' });

// Orders and OrderItems
Orders.hasMany(OrderItems, { foreignKey: 'orderId' });
OrderItems.belongsTo(Orders, { foreignKey: 'orderId' });

// Products and OrderItems
Products.hasMany(OrderItems, { foreignKey: 'productId' });
OrderItems.belongsTo(Products, { foreignKey: 'productId' });

// Categories and Products
Categories.hasMany(Products, { foreignKey: 'categoryId' });
Products.belongsTo(Categories, { foreignKey: 'categoryId' });

module.exports = {Categories, Orders, OrderItems, Products, Users,}