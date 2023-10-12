const Package = require('../models/Package');

// Controller for getting all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find()
    .populate({
      path: 'products',
      select: 'name ', 
    })
    .populate({
      path: 'category',
      select: 'name', 
    });
      res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for getting a package by ID
exports.getPackageById = async (req, res) => {
  const { id } = req.params;
  try {
    const package = await Package.findById(id) .populate({
      path: 'products',
      select: 'name ', 
    })
    .populate({
      path: 'category',
      select: 'name', 
    });
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for creating a package
exports.createPackage = async (req, res) => {
  const packageData = req.body;
  try {
    const newPackage = await Package.create(packageData);
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

// Controller for updating a package by ID
exports.updatePackage = async (req, res) => {
  const { id } = req.params;
  const packageData = req.body;
  try {
    const updatedPackage = await Package.findByIdAndUpdate(id, packageData, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package updated successfully', package: updatedPackage });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for deleting a package by ID
exports.deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndRemove(id);
    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully', package: deletedPackage });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
