import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function AddBookForm({ setBooks }) {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    rating: 0
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/books', form, {
        headers: {
          'x-user-role': user.role
        }
      });
      setBooks(prev => [...prev, res.data]);
      alert('Book added!');
    } catch (err) {
      alert('Add failed');
    }
  };

  return (
    user?.role === 'admin' && (
      <form onSubmit={handleSubmit}>
        <h4>Add Book</h4>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="author" placeholder="Author" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="coverImage" placeholder="Image URL" onChange={handleChange} />
        <input name="rating" type="number" min="0" max="5" step="0.1" onChange={handleChange} />
        <button type="submit">Add Book</button>
      </form>
    )
  );
}

export default AddBookForm;
