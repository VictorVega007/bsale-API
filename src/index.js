'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./routes/productRoute');
const categories = require('./routes/categoryRoute');
const databaseConsulting = require('./db/optionSQL');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        await databaseConsulting.authenticate();
        await databaseConsulting.sync({ force: false });
        console.log('Connection established to database');
    } catch (error) {
        throw new Error(`Error connecting to database ${error.message}`);
    }
})();

app.use('/products', products);
app.use('/categories', categories);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

server.keepAliveTimeout = 30 *1000;
server.headersTimeout = 35 * 1000;


