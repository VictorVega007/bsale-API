'use strict';

const { appCache } = require('../middleware/appCacheMiddleware');
const Product = require('../models/products');
const { Op } = require('sequelize');

module.exports = {
    index: async function (req, res) {
        try {
            res.header('Access-Control-Allow-Origin', '*');
            const page = Number.parseInt(req.query.page, 10);
            const limit = 12;
            let pageSize = 0;
    
            if (!Number.isNaN(page) && page > 0) {
                pageSize = page;
            };
            
            const getProductsFromDatabase = async (query) => Product.findAndCountAll(query);
    
            const query = {
                attributes: ['id', 'name', 'url_image', 'price', 'discount', 'category'],
                limit,
                offset: pageSize * limit,
            };
        
            if (req.query.category && req.query.category !== '0') {
                const { category } = req.query;
                query.where = { category };
    
            }
            
            if (req.query.name) {
                const { name } = req.query;
    
                if (query.where) {
                    query.where.name = {
                        [Op.like]: `%${name.toLowerCase()}%`
                    }
                } else {
                    query.where = {
                        name: {
                            [Op.like]: `%${name.toLowerCase()}%`
                        }
                    };
                };
            }
            
            if (req.query.order && req.query.order !== '0') {
                const { order } = req.query;
                query.order = [['price', order]];
    
            }
            
            if (req.query.discount && req.query.discount !== '0') {
                const { discount } = req.query;
                if (query.where) {
                    query.where.discount = discount;
                    
                } else {
                    query.where = { discount };
                };
            };
    
            const produtcs = await getProductsFromDatabase(query);
    
            const response = {
                totalPages: Math.ceil(produtcs.count / limit),
                content: produtcs.rows,
            };
    
            appCache.set(req.originalUrl, response);
            res.send(response);
    
        } catch (error) {
            res.status(error.response.status).json({message: error.message});
        }
    }
}