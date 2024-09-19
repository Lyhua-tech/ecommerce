const Categories = require('./Categories');
const Orders = require('./Oders');
const OrderItems = require('./OrderItem');
const Products = require('./Products');
const Users = require('./Users');
const Roles = require('./Roles');

// Users and Orders
Users.hasMany(Orders, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Orders.belongsTo(Users, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Users and Roles (RoleId as a reference key in Users)
Users.belongsTo(Roles, { foreignKey: 'roleId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Roles.hasMany(Users, { foreignKey: 'roleId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Orders and OrderItems
Orders.hasMany(OrderItems, { foreignKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderItems.belongsTo(Orders, { foreignKey: 'orderId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Products and OrderItems
Products.hasMany(OrderItems, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
OrderItems.belongsTo(Products, { foreignKey: 'productId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Categories and Products
Categories.hasMany(Products, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Products.belongsTo(Categories, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = { Categories, Orders, OrderItems, Products, Users, Roles };
