import React, { useState, useEffect, useRef } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import '../style/header.css'

function Header(/*{ onSearch }*/) {
  const { logout } = useLogout()
  const { user } = useAuthContext()


  const handleLogout = () => {
    logout()
  }

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
          {user && (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
          {!user && (
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
