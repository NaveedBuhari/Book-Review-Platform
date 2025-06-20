import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const quotes = [
  "A room without books is like a body without a soul. – Cicero",
  "So many books, so little time. – Frank Zappa",
  "Books are a uniquely portable magic. – Stephen King",
  "Until I feared I would lose it, I never loved to read. – Harper Lee",
  "There is no friend as loyal as a book. – Ernest Hemingway",
  "That's the thing about books. They let you travel without moving your feet. – Jhumpa Lahiri",
  "Reading gives us someplace to go when we have to stay where we are. – Mason Cooley",
  "Once you learn to read, you will be forever free. – Frederick Douglass",
  "I have always imagined that Paradise will be a kind of library. – Jorge Luis Borges",
  "The only thing you absolutely have to know is the location of the library. – Albert Einstein"
];

function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`, { withCredentials: true })
      .then(res => {
        const bookArray = Array.isArray(res.data) ? res.data : res.data.books || [];
        const randomBooks = bookArray.sort(() => 0.5 - Math.random()).slice(0, 4);
        setFeaturedBooks(randomBooks);
      })
      .catch(err => {
        console.error("Error loading featured books:", err);
        setFeaturedBooks([]);
      });
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to <span style={styles.highlight}>Stellar</span> Book Review Platform</h1>
        <p style={styles.tagline}>Discover books, share reviews, and get inspired.</p>
        <Link to="/books">
          <button style={styles.button}>Browse Books</button>
        </Link>
        <p style={styles.quote}><em>{quotes[quoteIndex]}</em></p>
      </div>

      <div style={styles.featuredSection}>
        <h2 style={styles.featuredTitle}>Featured Books</h2>
        <div style={styles.bookGrid}>
          {featuredBooks.map(book => (
            <div key={book._id} style={styles.bookCard}>
              <img src={book.coverImage} alt={book.title} style={styles.cover} />
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    minHeight: '100vh',
    backgroundImage: 'url("/assets/home-bg.avif")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff',
    textAlign: 'center',
    padding: '60px 20px',
  },
  hero: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '40px',
    borderRadius: '12px',
    maxWidth: '700px',
    margin: '0 auto 50px auto',
    animation: 'fadeIn 1s ease-in-out'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold'
  },
  highlight: {
    color: '#00ffd0'
  },
  tagline: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#ddd'
  },
  button: {
    backgroundColor: '#00ffd0',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '20px 0',
    cursor: 'pointer',
    boxShadow: '0 0 15px #00ffd0'
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '17px',
    color: '#ccc',
    marginTop: '10px'
  },
  featuredSection: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 20px'
  },
  featuredTitle: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  bookGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px'
  },
  bookCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 0 8px rgba(0,0,0,0.4)'
  },
  cover: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px'
  }
};

export default Home;
