import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'

function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <Router>
        <Header />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
