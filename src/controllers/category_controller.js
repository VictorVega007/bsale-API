'use strict';

const CategoryOfProducts = require('../models/productsCategory');
const { appCache } = require('../middleware/appCacheMiddleware');

module.exports = {
    index: async function (req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        const productsCategory = await CategoryOfProducts.findAll();

        const setCache = appCache.set(req.originalUrl, productsCategory);

     setCache 
        ? res.status(200).json(productsCategory) 
        : res.status(404).json({error: `Category of ${productsCategory} not found`});
    }
}