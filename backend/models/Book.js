const mongoose = require('mongoose');

// Schema đúng các trường đề bài KTX2 yêu cầu: title, author, price, isPublished
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Book', bookSchema);