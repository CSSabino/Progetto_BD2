import React, { useState, useEffect, useRef } from 'react';
import { useLogout } from '../hooks/useLogout';
import { Link } from 'react-router-dom';
import '../style/header.css'

function Header(/*{ onSearch }*/) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedInRef = useRef(isLoggedIn); // useRef per memorizzare lo stato iniziale  
  const { logout } = useLogout()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      // Se esiste userInfo nel localStorage, l'utente è già loggato
      setIsLoggedIn(true);
    } else {
      // Altrimenti, l'utente non è loggato
      setIsLoggedIn(false);
    }
    isLoggedInRef.current = isLoggedIn; // Aggiorniamo useRef con lo stato corrente
  }, []);

  const handleLogout = () => {
    logout()
  }

  // Mostra il pulsante di logout solo se l'utente è loggato e isLoggedInRef.current è true
  const showLogoutButton = isLoggedIn && isLoggedInRef.current;

  return (
    <header>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/compare">Compare</Link>
          </li>
          <li>
            <Link to="/phones">AllPhones</Link>
          </li>
          {showLogoutButton ? (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
