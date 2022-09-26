'use strict';

const { DataTypes } = require('sequelize');
const databaseConsulting = require('../db/optionSQL');

const Product = databaseConsulting.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    url_image: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    discount: {
        type: DataTypes.INTEGER,
    },
    category: {
        type: DataTypes.INTEGER,
    }
}, {
    modelName: 'Product',
    tableName: 'product',
    underscored: true,
    timestamps: false,
});

const getProductsFromDatabase = (query) => Product.findAndCountAll(query);

module.exports = { getProductsFromDatabase };