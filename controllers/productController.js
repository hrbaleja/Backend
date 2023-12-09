const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {

  try {
    const { name, description, price, image, batchno, weights, barcode, isavailablejar, category } = req.body;
    const product = new Product({ name, description, price, image, batchno, weights, barcode, isavailablejar, category });
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, image, batchno, weights, barcode, isavailablejar, category } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.image = image || product.image;
    product.batchno = batchno || product.batchno;
    product.weights = weights || product.weights;
    product.barcode = barcode || product.barcode;
    product.isavailablejar = isavailablejar || product.isavailablejar;
    product.category = category || product.category;
    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.deleteOne();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get the last product by batchno and barcode
exports.getLastProduct = async (req, res) => {
  try {
    const lastProduct = await Product.findOne({})
      .sort({ _id: -1 }) 
      .select('batchno barcode') 
      .lean(); 
    if (!lastProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(lastProduct);
  } catch (error) {
    res.status(500).json({  error: `Internal server error: ${error.message}` });
  }
};

// Count total number of products
exports.countProducts = async (req, res) => {
  try {
    const totalCount = await Product.countDocuments();
    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

// Get the last 5 products
exports.getLastSixProducts = async (req, res) => {
  try {
    const lastFiveProducts = await Product.find()
      .sort({ _id: -1 })
      .limit(6)
      .populate('category', 'name')
      .lean();
    res.status(200).json(lastFiveProducts);
  } catch (error) {
    console.error('Error in Get Recent Product:', error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};
