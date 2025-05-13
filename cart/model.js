// models/Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // userId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  tableName: 'carts',
  timestamps: true
});


module.exports = Cart;