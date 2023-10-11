const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  item_number: String,
  weights: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
