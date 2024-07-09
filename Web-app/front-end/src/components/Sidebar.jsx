import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

import '../style/dashboard.css'

const Sidebar = () => {  
  const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="profile">Edit Profile</Link>
        </li>
        <li>
          <Link to="reviews">My Reviews</Link>
        </li>

        {user.user.isAdmin && (
          <li>
          <Link to="smartphoneOperations">Smartphone Operation</Link>
        </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
