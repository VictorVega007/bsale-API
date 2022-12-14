'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const products = require('./routes/productRoute');
const categories = require('./routes/categoryRoute');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();

app.use(express.json());


var corsOptions = {
    methods: ['GET','PUT','POST','DELETE', 'OPTIONS'],
    allowedHeaders: ['access_token','Content-Type'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const swaggerDefinition = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BSale API',
            version: '1.0.0'
        },
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
};

const databaseConsulting = require('./db/optionSQL');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await databaseConsulting.authenticate();
        await databaseConsulting.sync({ force: false });
        console.log('Connection established to database');
        console.log('Connection')
    } catch (error) {
        throw new Error(`Error connecting to database ${error.message}`);
    }
})();

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerDefinition)));
app.use('/products', products);
app.use('/categories', categories);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

server.keepAliveTimeout = 30 * 1740000;
server.headersTimeout = 35 * 1740000;


