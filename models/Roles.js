const sequelize = require('../config/databases');
const {DataTypes} = require('sequelize')

const Roles = sequelize.define('Roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        validate: {
            isIn: {
                args: [['seller', 'buyer', 'admin']],
                msg: 'Roles must be only seller, buyer or admin'
            },
        }
    }
})

module.exports = Roles;