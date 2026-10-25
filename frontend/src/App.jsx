import React, { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  // 1. Fetch danh sách sách khi component mount (dùng useEffect)
  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Lỗi lấy danh sách sách:', err));
  }, []);

  // 2. Thêm mới một cuốn sách
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !price) {
      return alert('Vui lòng nhập đầy đủ Tên sách, Tác giả và Giá tiền!');
    }

    try {
      const res = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, price: Number(price) })
      });

      if (res.ok) {
        const newBook = await res.json();
        setBooks(prev => [...prev, newBook]);
        setTitle('');
        setAuthor('');
        setPrice('');
      }
    } catch (err) {
      console.error('Lỗi thêm sách:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Ứng dụng Quản lý Sách (Book Store)</h2>

      {/* Form thêm sách */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>Thêm sách mới</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Tên sách"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Tác giả"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="number"
            placeholder="Giá tiền"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Thêm sách
        </button>
      </form>

      {/* Danh sách sách */}
      <h3>Danh sách sách</h3>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef' }}>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Chưa có cuốn sách nào.</td></tr>
          ) : (
            books.map(book => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{Number(book.price).toLocaleString()} VNĐ</td>
                <td>{book.isPublished ? 'Đã xuất bản' : 'Chưa xuất bản'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;