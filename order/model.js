const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Order = sequelize.define(
    'orders',

    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_detials: {
            type: DataTypes.JSON,
        },
        order_detials: {
            type: DataTypes.JSON,
        },
        asign_to: { 
            type: DataTypes.STRING,
        },
        remarks: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.ENUM('order-failed', 'order-recived', 'shipped', 'out-for-delivery', 'delivered'),
            defaultValue: 'order-recived'
        }


    },
    {
        tableName: 'orders',
        timestamps: true
    }

)

module.exports = Order;