'use strict';

const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize');
const { appCache, verifyingCache } = require('../middleware/appCacheMiddleware');
const Product = require('../models/products');

/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties: 
 *          id: 
 *            type: integer
 *            description: Identifier number of product
 *          name:
 *             type: string
 *             description: Product name
 *          price: 
 *             type: integer
 *             description: Product price
 *          url_image:
 *            type: string
 *            description: Product url image 
 *          discount:
 *            type: integer
 *            description: Product discount applied to the product price
 *          category:
 *            type: integer
 *            description: Category number of products
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: List of products according to the pagination, name, order by price, filter by categories and discount
 *    tags: [Products]
 *    parameters:
 *     -   name: page
 *         in: query
 *         description: Page number to search
 *         schema:
 *          type: integer
 *          default:  0
 *     -   name: category
 *         description: Category number to search
 *         in: query
 *         schema:
 *          type: integer
 *          minimum:  1
 *          maximum:  7
 *          default:  1
 *     -   name: name
 *         description: Name of product to search
 *         in: query
 *         schema:
 *          type: string
 *          default:  pisco
 *     -   name: order
 *         description: Order price
 *         in: query
 *         schema:
 *          type: string
 *          enum: ['ASC', 'DESC']
 *          default:  
 *     -   name: discount
 *         description: product discount
 *         in: query
 *         schema:
 *          type: string
 *          enum: ['10', '20']
 *
 *    responses:
 *      200:
 *        description: List of products available by parameters which can be used to search
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                totalPages:
 *                  type: integer
 *                  description: Pages number according to the query used 
 *                content:
 *                  type: array
 *                  description:  Array of objects containing information about the data items
 *                  items:
 *                    $ref: '#/components/schemas/Products'
 *
 */

router.get('/', verifyingCache, async (req, res) => {

    try {
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
});

module.exports = router;