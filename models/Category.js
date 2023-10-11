// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Add more fields as needed
});

module.exports = mongoose.model('Category', categorySchema);
