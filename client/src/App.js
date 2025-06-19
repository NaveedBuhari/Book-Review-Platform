import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';


import { UserProvider, UserContext } from './context/UserContext';
import Header from './components/Header';

function AppRoutes() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && <Header />} {/* Show header only when logged in */}
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<Signup />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
