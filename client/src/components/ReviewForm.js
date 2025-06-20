import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm({ bookId, user, setReviews }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      bookId,
      userId: user.id,
      userName: user.name,
      comment,
      rating: Number(rating)
    };
    axios.post(`${process.env.REACT_APP_API_URL}/reviews`, review, {
      withCredentials: true
    })
      .then(res => {
        setReviews(prev => [...prev, res.data]);
        setComment('');
        setRating(5);
      })
      .catch(err => console.error('Review submit error:', err));
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h4 style={styles.title}>Write a Review</h4>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        placeholder="Share your thoughts..."
        style={styles.textarea}
      />
      <div style={styles.row}>
        <label style={styles.label}>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.select}
        >
          {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <button type="submit" style={styles.button}>Submit Review</button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: '#2c2c3a',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,255,208,0.1)',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: {
    color: '#00ffd0',
    marginBottom: '0.5rem',
    fontSize: '1.3rem'
  },
  textarea: {
    resize: 'vertical',
    padding: '0.75rem',
    borderRadius: '6px',
    backgroundColor: '#1e1e2f',
    border: '1px solid #555',
    color: 'white',
    fontSize: '1rem',
    width: '100%'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  label: {
    color: 'white',
    fontWeight: 'bold'
  },
  select: {
    backgroundColor: '#1e1e2f',
    color: 'white',
    border: '1px solid #555',
    padding: '0.4rem',
    borderRadius: '4px'
  },
  button: {
    backgroundColor: '#00ffd0',
    color: '#000',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
    marginLeft: 'auto'
  }
};

export default ReviewForm;
