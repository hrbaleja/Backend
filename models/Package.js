const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  price: { type: Number, required: true, },
  weights: { type: String, required: true, },
  active: { type: Boolean, default: true, },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', },],
  images: [{ type: String, },],

});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
