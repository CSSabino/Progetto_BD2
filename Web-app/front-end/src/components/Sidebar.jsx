import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserEdit, FaStar } from 'react-icons/fa';
import { IoMdPhonePortrait } from "react-icons/io";

import { useAuthContext } from '../hooks/useAuthContext';

import '../style/dashboard.css'

const Sidebar = () => {  
  const { user } = useAuthContext()

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="profile"><FaUserEdit className='icon'/> Edit Profile</Link>
        </li>
        <li>
          <Link to="reviews"><FaStar className='icon'/> My Reviews</Link>
        </li>

        {user.user.isAdmin && (
          <li>
          <Link to="smartphoneOperations"><IoMdPhonePortrait className='icon'/> Smartphone Operation</Link>
        </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
