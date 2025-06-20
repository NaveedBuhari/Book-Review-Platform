import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
        withCredentials: true
      })
        .then(res => {
          setBio(res.data.bio);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleSave = async () => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, { bio }, {
      withCredentials: true
    });
    setUser(res.data);
    alert('Profile updated!');
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;
  if (!user) return <div style={styles.container}><p>User not logged in</p></div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Profile</h2>
        <img src={user.avatar} alt="avatar" style={styles.avatar} />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <div style={styles.bioSection}>
          <label style={styles.label}>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            style={styles.textarea}
          />
          <button onClick={handleSave} style={styles.button}>Save</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#1e1e2f',
    minHeight: '100vh',
    color: 'white',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#2c2c3a',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.4)'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#00ffd0',
    textShadow: '0 0 10px rgba(0,255,208,0.4)'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    marginBottom: '1rem',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)'
  },
  bioSection: {
    marginTop: '1.5rem',
    textAlign: 'left'
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '0.5rem',
    color: '#ccc'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: '#2e2e3e',
    color: 'white',
    border: '1px solid #555',
    resize: 'none',
    marginBottom: '1rem'
  },
  button: {
    backgroundColor: '#00ffd0',
    color: '#000',
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s all'
  }
};

export default Profile;
