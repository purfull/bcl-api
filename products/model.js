const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const sequelize = require('../db');

module.exports = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING
    },
    offer_price: {
      type: DataTypes.STRING
    },
    quantity_available: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  }, {
    tableName: 'Products',
    timestamps: true
  }
);
