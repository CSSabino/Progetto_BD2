import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import '../style/modal.css'

const PasswordChangeModal = ({ isOpen, onClose, setOperationSuccess, setMessageSuccess }) => {
  const { user } = useAuthContext();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setNewPassword('');
    setConfirmPassword('');
    setError(null)
  }, [onClose]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('/api/userOperations/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify({ newPassword })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error)
        return;
      }

      if (response.ok) {

        let userStorage = JSON.parse(localStorage.getItem('user'))

        userStorage.user.password = data.user.password

        localStorage.setItem('user', JSON.stringify(userStorage))

        setOperationSuccess(true)
        setMessageSuccess("The password has been updated successfully")
      }

    } catch (error) {
      console.error('Error update user password:', error);
      setError(error)
    }

    setNewPassword('');
    setConfirmPassword('');
    setError('')
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
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Change Password</button>

          {error && <h4 style={{ color: "red" }}>{error}</h4>}

        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
