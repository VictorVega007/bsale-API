'use strict';

const { Router } = require('express');
const router = Router();
const { appCache, verifyingCache } = require('../middleware/appCacheMiddleware');
const CategoryOfProducts = require('../models/productsCategory');

router.get('/', verifyingCache, async (req, res) => {
    const productsCategory = await CategoryOfProducts.findAll();
    const setCache = appCache.set(req.originalUrl, productsCategory);

    setCache 
        ? res.status(200).send(productsCategory) 
        : res.status(404).json({error: `Category of ${productsCategory} not found`});
});

module.exports = router;