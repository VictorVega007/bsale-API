'use strict';

const dotenv = require('dotenv');
dotenv.config();

const configSQL = {
    host: process.env.SQL_HOST || '',
    username: process.env.SQL_USER || '',
    password: process.env.SQL_PASSWORD || '',
    database: process.env.SQL_DATABASE || '',
};

module.exports = configSQL;