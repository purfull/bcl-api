// models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // cartId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  // productId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'cart_items',
  timestamps: true
});

module.exports = CartItem;
