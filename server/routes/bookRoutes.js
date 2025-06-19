const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const isAdmin = require('../middleware/adminMiddleware');

// pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      books
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});


// GET single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});


// ADD a book (Admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: 'Invalid book data' });
  }
});

// DELETE a book (Admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
