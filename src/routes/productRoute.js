'use strict';

const { Router } = require('express');
const router = Router();
const { verifyingCache } = require('../middleware/appCacheMiddleware');
const Product = require('../controllers/products_controller')

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
 *         description: Product discount
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

router.route('/', verifyingCache)
    .get(Product.index)

module.exports = router;