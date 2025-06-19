import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        <div onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img
            src={user.avatar}
            alt="avatar"
            style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }}
          />
          <span>{user.name}</span>
        </div>

        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            right: 0,
            top: '120%',
            background: '#fff',
            border: '1px solid #ccc',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
            borderRadius: 4,
            padding: '0.5rem',
            zIndex: 999
          }}>
            <div onClick={handleProfile} style={{ padding: '0.5rem', cursor: 'pointer' }}>Profile</div>
            <div onClick={handleLogout} style={{ padding: '0.5rem', cursor: 'pointer' }}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
