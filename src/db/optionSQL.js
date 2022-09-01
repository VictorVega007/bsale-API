'use strict';

const { Sequelize } = require('sequelize');

const {
    host,
    username, 
    password,
    database
} = require('../configSQL');

const databaseConsulting = new Sequelize (database, username, password, {
    host,
    dialect: 'mysql'
}) 

module.exports = databaseConsulting;