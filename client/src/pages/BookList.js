import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    rating: 0,
  });

  const { user } = useContext(UserContext);

  const fetchBooks = (pageNum = 1) => {
    setLoading(true);
    axios.get(`http://localhost:5000/books?page=${pageNum}&limit=10`)
      .then(res => {
        setBooks(res.data.books);
        setPages(res.data.pages);
        setPage(res.data.page);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setError('Failed to load books.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios.delete(`http://localhost:5000/books/${id}`, {
        headers: { 'x-user-role': user.role }
      })
        .then(() => fetchBooks(page))
        .catch(() => alert('Delete failed'));
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/books', form, {
        headers: { 'x-user-role': user.role }
      });
      setBooks(prev => [...prev, res.data]);
      setForm({ title: '', author: '', description: '', coverImage: '', rating: 0 });
    } catch (err) {
      alert('Add failed');
    }
  };

  const filteredBooks = books.filter(book =>
    (book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())) &&
    book.rating >= minRating
  );

  if (loading) return <div style={styles.container}><p>Loading books...</p></div>;
  if (error) return <div style={styles.container}><p>{error}</p></div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Books</h2>

      <div style={styles.controlsWrapper}>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
          <label style={{ color: 'white' }}>
            Min Rating:
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              style={styles.select}
            >
              <option value={0}>All</option>
              <option value={2}>2+</option>
              <option value={2.5}>2.5+</option>
              <option value={3}>3+</option>
              <option value={3.5}>3.5+</option>
              <option value={4}>4+</option>
              <option value={4.5}>4.5+</option>
            </select>
          </label>
        </div>
      </div>

      {user?.role === 'admin' && (
        <form onSubmit={handleAddBook} style={styles.form}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            style={styles.input}
          />
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
            style={styles.input}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            style={styles.input}
          />
          <input
            name="coverImage"
            placeholder="Image URL"
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            style={styles.input}
          />
          <input
            name="rating"
            type="number"
            placeholder="Rating"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>Add Book</button>
        </form>
      )}

      <div style={styles.grid}>
        {filteredBooks.map((book) => (
          <div key={book._id} style={styles.card}>
            <img
              src={book.coverImage}
              alt={book.title}
              style={styles.image}
            />
            <h4 style={styles.text}>{book.title}</h4>
            <p style={styles.text}>{book.author}</p>
            <p style={{ color: '#ffd700', margin: '0.3rem 0' }}>
              ★ <span style={{ color: '#fff' }}>{book.rating}</span>
            </p>
            <Link to={`/book/${book._id}`} style={styles.link}>View Details</Link>
            {user?.role === 'admin' && (
              <button
                onClick={() => handleDelete(book._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => fetchBooks(i + 1)}
            style={{
              ...styles.pageButton,
              backgroundColor: i + 1 === page ? '#00ffd0' : '#333',
              color: i + 1 === page ? '#000' : '#fff'
            }}
          >
            {i + 1}
          </button>
        ))}
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
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2.2rem',
    color: '#00ffd0',
    textShadow: '0 0 10px rgba(0,255,208,0.4)'
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  input: {
    padding: '0.5rem',
    width: '200px',
    borderRadius: '4px',
    border: '1px solid #555',
    backgroundColor: '#2e2e3e',
    color: 'white'
  },
  select: {
    padding: '0.5rem',
    borderRadius: '4px',
    marginLeft: '0.5rem',
    backgroundColor: '#2e2e3e',
    color: 'white',
    border: '1px solid #555'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem'
  },
  addButton: {
    backgroundColor: '#00ffd0',
    color: '#000',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '30px',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#2c2c3a',
    padding: '1rem',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.4)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    color: '#fff',
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
    marginBottom: '1rem',
    borderRadius: '6px'
  },
  text: {
    margin: '0.4rem 0'
  },
  link: {
    color: '#00ffd0',
    textDecoration: 'underline',
    fontWeight: 'bold'
  },
  deleteButton: {
    marginTop: '0.5rem',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  pagination: {
    textAlign: 'center',
    marginTop: '2rem'
  },
  pageButton: {
    margin: '0 5px',
    padding: '6px 12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s'
  }
};

export default BookList;
