'use strict';

const { Router } = require('express');
const router = Router();
const { verifyingCache } = require('../middleware/appCacheMiddleware');
// const CategoryOfProducts = require('../models/productsCategory');
const CategoryController = require('../controllers/category_controller');
// const CategoryOfProducts = require('../models/productsCategory');

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

// router.get('/', verifyingCache, async (req, res) => {
//     // const productsCategory = await CategoryOfProducts.findAll();
//     const productsCategory = CategoryController.index()
//     console.log(productsCategory)
//     const setCache = appCache.set(req.originalUrl, productsCategory);

//     setCache 
//         ? res.status(200).send(productsCategory) 
//         : res.status(404).json({error: `Category of ${productsCategory} not found`});
// });

router.route('/', verifyingCache)
    .get(CategoryController.index)



module.exports = router;