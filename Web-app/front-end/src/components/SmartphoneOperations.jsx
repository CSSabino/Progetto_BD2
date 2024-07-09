import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import InsertSmartphoneModal from './InsertSmartphoneModal';

const SmartphoneOperation = () => {
  const { user } = useAuthContext();
  
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // <PasswordChangeModal isOpen={isModalOpen} onClose={handleCloseModal} />
  return (
    <div>
      <div className="content">
        <button onClick={handleOpenModal}>Insert Smartphone</button>
        <InsertSmartphoneModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>

      <div className="content">
        <button onClick={handleOpenModal}>Update Smartphone</button>

      </div>
      
      <div className="content">
        <button onClick={handleOpenModal}>Delete Smartphone</button>

      </div>
    </div>
  );
};

export default SmartphoneOperation;
