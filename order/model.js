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
        address: {
            type: DataTypes.STRING
        },
        address_type: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING
        },
        pin: {
            type: DataTypes.INTEGER
        },
        order: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        shipping_mode: {
            type: DataTypes.STRING,
        },
        invoiceNumber: {
            type: DataTypes.STRING
        },
        invoiceDate: {
            type: DataTypes.STRING
        },
        transactionType: {
            type: DataTypes.STRING
        },
        orderId: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        sku: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        invoiceAmount: {
            type: DataTypes.STRING
        },
        taxExclusiveGross: {
            type: DataTypes.STRING
        },
        totalTaxAmount: {
            type: DataTypes.STRING
        },
        cgstTax: {
            type: DataTypes.STRING
        },
        sgstTax: {
            type: DataTypes.STRING
        },
        utgstTax: {
            type: DataTypes.STRING
        },
        igstTax: {
            type: DataTypes.STRING
        },
        customerBillToGST: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        buyerName: {
            type: DataTypes.STRING
        },
        total_product_cost: {
            type: DataTypes.STRING
        },
        total_shipment_cost: {
            type: DataTypes.STRING
        },
        waybill: {
            type: DataTypes.STRING,
        },
        payment: {
            type: DataTypes.STRING
        },
        remarks: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }


    },
    {
        tableName: 'orders',
        timestamps: true
    }

)

module.exports = Order;