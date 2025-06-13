const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const sequelize = require('../db');

const Products = sequelize.define(
  'Products',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_english: {
      type: DataTypes.STRING
    },
    name_tamil: {
      type: DataTypes.STRING
    },
    description_english: {
      type: DataTypes.STRING,
    },
    description_tamil: {
      type: DataTypes.STRING,
    },
    category: {
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

module.exports = Products;