import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../style/header.css'
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';

function Header() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const [results, setResults] = useState([]);  
  const [numResult, setNumResult] = useState(false)


  const handleLogout = () => {
    logout()
  }

  const clearResults = () => {
    setResults([]);
    setNumResult(false)
  };
  
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
                <Link to="/dashboard">Dashboard</Link>
              </li>
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
          <li>
            <div className='search-bar-conteiner'>
              <SearchBar setResults={setResults} setNumResult={setNumResult} />
              <SearchResultsList results={results} numResult={numResult} clearResults={clearResults} />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
