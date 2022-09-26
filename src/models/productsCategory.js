'use strict';

const { DataTypes } = require('sequelize');
const databaseConsulting = require('../db/optionSQL');

const CategoryOfProducts = databaseConsulting.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    }
}, {
    modelName: 'Category',
    tableName: 'category',
    underscored: true,
    timestamps: false,
});

const consultProductsCategory = CategoryOfProducts.findAll();

module.exports = consultProductsCategory;