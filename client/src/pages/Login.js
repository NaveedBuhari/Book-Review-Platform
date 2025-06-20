import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Login() {
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/users/login`,
    form,
    { withCredentials: true }
  );
      setUser(res.data);
      navigate('/');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to <span style={styles.highlight}>Stellar</span> Book Review Platform</h2>

        <p>
          Don&apos;t have an account? <Link to="/signup" style={styles.link}>Create one</Link>
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <label style={styles.label}>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              style={{ marginRight: '5px' }}
            />
            Show Password
          </label>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
  minHeight: '100vh',
  backgroundImage: 'url("/assets/login-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  color: '#f5f5f5'
},

  card: {
    background: '#2e2e3e',
    padding: '30px',
    borderRadius: '10px',
    width: '350px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#f0f0f0'
  },
  highlight: {
    color: '#00ffd0'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #555',
    background: '#444',
    color: '#fff'
  },
  label: {
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '10px',
    color: '#ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#00ffd0',
    border: 'none',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: '#ff6b6b',
    marginBottom: '10px'
  },
  link: {
    color: '#00ffd0',
    textDecoration: 'underline'
  },
  background: {
  minHeight: '100vh',
  backgroundImage: 'url("/assets/login-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(2px)',
  padding: '20px'
}

};

export default Login;
