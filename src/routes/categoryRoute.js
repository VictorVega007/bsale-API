'use strict';

const { Router } = require('express');
const router = Router();
const { verifyingCache } = require('../middleware/appCacheMiddleware');
const CategoryController = require('../controllers/category_controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    Categories:
 *      type: object
 *      properties:
 *          id: 
 *             type: integer
 *             description: number of id
 *          name:
 *             type: integer
 *             description: category name
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Gets a category of products associated with one kind of product
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Gets all categories of products
 *         content: 
 *            application/json:
 *               schema:
 *                 type: array
 *                 description: Array with product data inside of objects
 *                 items: 
 *                   $ref: '#/components/schemas/Categories'
 */


router.route('/', verifyingCache)
    .get(CategoryController.index)

module.exports = router;