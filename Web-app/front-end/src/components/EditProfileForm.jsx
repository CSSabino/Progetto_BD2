import React, { useState, useEffect } from 'react';

import { MdEdit } from "react-icons/md";

import EditUserModal from './EditUserModal'
import PasswordChangeModal from './PasswordChangeModal'

const EditProfileForm = () => {
  const [isHandleUpdateUserOpen, setIsHandleUpdateUserOpen] = useState(false);
  const [isHandlePasswordChangeOpen, setIsHandlePasswordChangeOpen] = useState(false);

  const handleUpdateUserModal = () => {
    setIsHandleUpdateUserOpen(true);
  };

  const handleUpdateUserCloseModal = () => {
    setIsHandleUpdateUserOpen(false);
  };

  const handlePasswordChangeModal = () => {
    setIsHandlePasswordChangeOpen(true);
  };

  const handlePasswordChangeCloseModal = () => {
    setIsHandlePasswordChangeOpen(false);
  };

  return (
    <div>
      <div className="content">
        <button onClick={handleUpdateUserModal}>
          <h4>
            <MdEdit className='icon' /> UPDATE DATA USER
          </h4>
        </button>
        <EditUserModal isOpen={isHandleUpdateUserOpen} onClose={handleUpdateUserCloseModal} />
      </div>
      <div className="content">
        <button onClick={handlePasswordChangeModal}>
          <h4>
            <MdEdit className='icon' /> CHANGE PASSWORD
          </h4>
        </button>
        <PasswordChangeModal isOpen={isHandlePasswordChangeOpen} onClose={handlePasswordChangeCloseModal} />
      </div>
    </div>
  );
};

export default EditProfileForm;
