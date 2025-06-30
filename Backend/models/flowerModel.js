const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Flower', flowerSchema);
