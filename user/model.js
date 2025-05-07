const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const sequelize = require('../db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'email_status_unique'  // Composite uniqueness constraint
    },
    // mobile_number: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: 'email_status_unique'  // Composite uniqueness constraint
    // },
    password: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    zip_code: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  }, {
    tableName: 'user',
    timestamps: true
  }
);

module.exports = User;
