// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product with weights
router.post('/', productController.createProduct);

// Get all products with weights
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Update a product with weights by ID
router.put('/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Get the last product by batchno and barcode
router.get('/last/:1', productController.getLastProduct);

// Count total number of products
router.get('/count/:2', productController.countProducts);

// Get the last 5 products
router.get('/recent/:6', productController.getLastSixProducts);

module.exports = router;
