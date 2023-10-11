const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Create a new package
router.post('/', packageController.createPackage);

// Get all packages
router.get('/', packageController.getAllPackages);

// Get a single package by ID
router.get('/:id', packageController.getPackageById);

// Update a package by ID
router.put('/:id', packageController.updatePackage);

// Delete a package by ID
router.delete('/:id', packageController.deletePackage);

module.exports = router;
