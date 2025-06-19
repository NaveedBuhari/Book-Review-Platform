import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import ReviewForm from '../components/ReviewForm';

function BookDetail() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => setError('Error loading book.'));

    axios.get(`http://localhost:5000/reviews?bookId=${id}`)
      .then(res => setReviews(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      axios
        .delete(`http://localhost:5000/reviews/${reviewId}`, {
          headers: { 'x-user-role': user.role }
        })
        .then(() => setReviews(prev => prev.filter(r => r._id !== reviewId)))
        .catch(() => alert('Failed to delete review.'));
    }
  };

  if (loading) return <div style={styles.container}><p>Loading book...</p></div>;
  if (error) return <div style={styles.container}><p>{error}</p></div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{book.title}</h2>
        <div style={styles.bookDetails}>
          <img src={book.coverImage} alt={book.title} style={styles.image} />
          <div style={styles.info}>
            <p style={{ fontSize: '1.3rem' }}><strong>Description:</strong></p>
            <p style={{ marginBottom: '1rem' }}>{book.description}</p>
            <p style={{ fontSize: '1.3rem' }}><strong>Author:</strong> <em>{book.author}</em></p>
          </div>
        </div>
      </div>

      <div style={styles.reviewSection}>
        <h3 style={styles.sectionHeading}>Reviews</h3>
        <hr style={{ borderColor: '#444' }} />
        {reviews.length === 0 ? (
          <p style={{ color: 'gray' }}>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} style={styles.reviewCard}>
              <p>
                <strong>
                  {review.userName}
                  {review.userRole === 'admin' && ' (Admin)'}
                </strong>{' '}
                rated <span style={{ color: '#ffd700' }}>★</span> {review.rating}/5
              </p>
              <p>{review.comment}</p>
              {user?.role === 'admin' && (
                <button
                  style={styles.deleteReviewBtn}
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div style={styles.reviewSection}>
        <h3 style={styles.sectionHeading}>Write a Review</h3>
        <hr style={{ borderColor: '#444' }} />
        <ReviewForm bookId={book._id} user={user} setReviews={setReviews} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e2f',
    minHeight: '100vh',
    padding: '2rem',
    color: 'white'
  },
  card: {
    backgroundColor: '#2c2c3a',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.4)',
    textAlign: 'center'
  },
  title: {
    color: '#00ffd0',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0,255,208,0.4)'
  },
  bookDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '2rem'
  },
  image: {
    width: '160px',
    borderRadius: '6px',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)'
  },
  info: {
    maxWidth: '500px',
    textAlign: 'left'
  },
  reviewSection: {
    marginTop: '2rem'
  },
  sectionHeading: {
    color: '#00ffd0',
    textShadow: '0 0 8px rgba(0,255,208,0.3)',
    fontSize: '1.6rem',
    marginBottom: '1rem'
  },
  reviewCard: {
    backgroundColor: '#2c2c3a',
    padding: '1rem',
    borderRadius: '8px',
    margin: '1rem 0',
    position: 'relative'
  },
  deleteReviewBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default BookDetail;
