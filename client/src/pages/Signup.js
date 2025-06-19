import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    bio: '',
    avatar: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users', formData);
      if (res.status === 201) {
        alert('Account created successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        {error && <p style={styles.error}>{error}</p>}

        <input type="text" name="username" placeholder="Username" required onChange={handleChange} style={styles.input} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} style={styles.input} />
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
        <input type="text" name="avatar" placeholder="Avatar URL" onChange={handleChange} style={styles.input} />
        <textarea name="bio" placeholder="Bio" onChange={handleChange} style={styles.textarea} />

        <label style={styles.label}>Role:</label>
        <select name="role" onChange={handleChange} style={styles.select}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1e1e2f',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  form: {
    backgroundColor: '#2c2c3a',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)',
    color: 'white',
    textAlign: 'center'
  },
  title: {
    color: '#00ffd0',
    marginBottom: '1.5rem',
    textShadow: '0 0 8px rgba(0,255,208,0.4)'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#2e2e3e',
    color: 'white'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#2e2e3e',
    color: 'white',
    resize: 'vertical',
    margin: '0.5rem 0'
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #555',
    backgroundColor: '#2e2e3e',
    color: 'white',
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    textAlign: 'left',
    marginBottom: '0.25rem',
    fontWeight: 'bold',
    color: '#ccc',
    marginTop: '1rem'
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#00ffd0',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '1rem'
  }
};

export default Signup;
