'use strict';

const { Router } = require('express');
const router = Router();
const Op = require('sequelize');
const { appCache, verifyingCache } = require('../middleware/appCacheMiddleware');
const Product = require('../models/products');

router.get('/', verifyingCache, async (req, res) => {
    try {
        const page = parseInt(req.params.page, 10);
        const limit = 12;
        let pageSize = 0;

        if (typeof page === 'number' && page > 0) {
            pageSize = page;
        }

        const getProducts = async (query) => Product.findAndCountAll(query);
        const query = {
            attributes: ['id', 'name', 'price', 'url_image', 'discount', 'category'],
            limit,
            offset: pageSize * limit,
        };

        switch (query) {
            case (req.query.category && req.query.category !== '0') :
                const { category } = req.query;
                query.where = { category };
                break;
            case (req.query.name) :
                const { name } = req.query;

                if (query.where) {
                    query.where.name = {
                        [Op.like]: `%${name.toLocaleLowerCase()}`
                    }
                } else {
                    query.where = {
                        name: {
                            [Op.like]: `%${name.toLocaleLowerCase()}`
                        }
                    };
                };
                break;
            case (req.query.order && req.query.order !== '0') :
                const { order } = req.query;
                query.order = [['price', order]];
                break;
            case (req.query.discount && req.query.discount !== '0') :
                const { discount } = req.query;

                if (query.where) {
                    query.where.discount = discount;
                } else {
                    query.where = { discount };
                };
                break;
        };

        const produtcs = await getProducts(query);

        const response = {
            totalPages: Math.ceil(produtcs.count / limit),
            content: produtcs.rows,
        };

        appCache.set(req.originalUrl, response);
        res.send(response);

    } catch (error) {
        res.status(error.response.status).json({message: error.message});
    }
});

module.exports = router;