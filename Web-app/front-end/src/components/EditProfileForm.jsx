import React, { useState, useEffect } from 'react';

import { MdEdit } from "react-icons/md";

import EditUserModal from './EditUserModal'
import PasswordChangeModal from './PasswordChangeModal'

const EditProfileForm = () => {
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState('')

  const [isHandleUpdateUserOpen, setIsHandleUpdateUserOpen] = useState(false);
  const [isHandlePasswordChangeOpen, setIsHandlePasswordChangeOpen] = useState(false);

  const handleUpdateUserModal = () => {
    setIsHandleUpdateUserOpen(true);
  };

  const handleUpdateUserCloseModal = () => {
    setIsHandleUpdateUserOpen(false);

    if (setOperationSuccess)
      setShowModalSuccess(true)
  };

  const handlePasswordChangeModal = () => {
    setIsHandlePasswordChangeOpen(true);
  };

  const handlePasswordChangeCloseModal = () => {
    setIsHandlePasswordChangeOpen(false);

    if (setOperationSuccess)
      setShowModalSuccess(true)
  };

  const handleCloseShowModalSuccess = () => {
    setOperationSuccess(false)
    setShowModalSuccess(false)
    setMessageSuccess('')
  };

  return (
    <div>

      {operationSuccess && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseShowModalSuccess}>&times;</span>
            <h3>{messageSuccess}</h3>            
          </div>
        </div>
      )}

      <div className="content">
        <button onClick={handleUpdateUserModal}>
          <h4>
            <MdEdit className='icon' /> UPDATE DATA USER
          </h4>
        </button>
        <EditUserModal isOpen={isHandleUpdateUserOpen} onClose={handleUpdateUserCloseModal} setOperationSuccess={setOperationSuccess} setMessageSuccess={setMessageSuccess} />
      </div>
      <div className="content">
        <button onClick={handlePasswordChangeModal}>
          <h4>
            <MdEdit className='icon' /> CHANGE PASSWORD
          </h4>
        </button>
        <PasswordChangeModal isOpen={isHandlePasswordChangeOpen} onClose={handlePasswordChangeCloseModal} setOperationSuccess={setOperationSuccess} setMessageSuccess={setMessageSuccess} />
      </div>
    </div>
  );
};

export default EditProfileForm;
