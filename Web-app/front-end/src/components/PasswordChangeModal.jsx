import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import '../style/passwordChangeModal.css'

const PasswordChangeModal = ({ isOpen, onClose }) => {
    const { user } = useAuthContext();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        const response = await fetch('/api/userOperations/changePassword', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
          body: JSON.stringify({newPassword})
        });
        const data = await response.json();

        if(!response.ok){
            setError(data.error)
            return;
        }

        if(response.ok){

            let userStorage = JSON.parse(localStorage.getItem('user'))
      
            userStorage.user.password = data.user.password
      
            localStorage.setItem('user', JSON.stringify(userStorage)) 

        }

    } catch (error) {
        console.error('Error update user:', error);
      setError(error)
    }

    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <br></br>
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <br></br>
          <br></br>
          
          <button type="submit">Change Password</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
