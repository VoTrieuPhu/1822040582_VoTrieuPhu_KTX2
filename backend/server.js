const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book');

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối tới cơ sở dữ liệu BookStoreDB
mongoose.connect('mongodb://127.0.0.1:27017/BookStoreDB')
  .then(() => console.log('✅ Đã kết nối MongoDB BookStoreDB thành công!'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// [GET] /api/books - Lấy danh sách tất cả cuốn sách
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
  }
});

// [POST] /api/books - Thêm mới một cuốn sách từ req.body
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, price } = req.body;
    const newBook = new Book({ title, author, price });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi tạo sách', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 Backend server đang chạy tại http://localhost:3000');
});