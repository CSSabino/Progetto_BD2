import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import AllPhones from './pages/AllPhones';
import PhoneDetails from './pages/PhoneDetails';
import ComparePhone from './pages/ComparePhone';
import SearchPhones from './pages/SearchPhones';
import NotFoundPage from './pages/NotFound';

import './style/icon.css'

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
            <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/compare" element={<ComparePhone />} />
            <Route path="/phone/:id" element={<PhoneDetails />} />
            <Route path="/phones" element={<AllPhones />} />
            <Route path="/search-phones" element={<SearchPhones />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
