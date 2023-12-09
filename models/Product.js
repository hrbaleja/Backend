const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  batchno: String, 
  weights: [String],
  isavailablejar: Boolean,
  barcode: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\d{13}$/.test(v); 
      },
      message: props => `${props.value} is not a valid 13-digit number!`
    },
    required: [true, 'Barcode is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
