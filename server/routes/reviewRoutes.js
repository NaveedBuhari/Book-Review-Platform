const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET reviews for a book
router.get('/', async (req, res) => {
  try {
    const { bookId } = req.query;
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST new review
router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add review' });
  }
});

// DELETE a review by ID (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const userRole = req.headers['x-user-role']; // Must match frontend header

    if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Only admins can delete reviews' });
    }

    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;
