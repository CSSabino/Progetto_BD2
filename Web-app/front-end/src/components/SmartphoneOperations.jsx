import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import InsertSmartphoneModal from './InsertSmartphoneModal';
import UpdateSmartphoneModal from './UpdateSmartphoneModal'

const SmartphoneOperation = () => {
    const { user } = useAuthContext();

    const [phones, setPhones] = useState([]);
    const [phoneSelected, setPhoneSelected] = useState(null);
    const [detailsPhoneSelected, setDetailsPhoneSelected] = useState(null)

    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);    

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const response = await fetch('/api/smartphoneOperations');
                const data = await response.json();
                setPhones(data);
                setPhoneSelected(phones[0]._id)
                setDetailsPhoneSelected(phones[0])
            } catch (error) {
                console.error('Error fetching phones:', error);
            }
        };

        fetchPhones();
    }, []);

    const handlePhoneSelect = async (id) => {
        setPhoneSelected(id);
        try {
          const response = await fetch(`/api/smartphoneOperations/id/${id}`);
          const data = await response.json();
          setDetailsPhoneSelected(data);
        } catch (error) {
          console.error('Error fetching phone details:', error);
        }
      };

    const openInsertModal = () => {
        setInsertModalOpen(true);
    };

    const closeInsertModal = () => {
        setInsertModalOpen(false);
    };

    const openUpdateModal = () => {
        setUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setUpdateModalOpen(false);
    };

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    // <UpdateSmartphoneModal isOpen={isModalOpen} onClose={handleCloseModal} detailsPhoneSelected={detailsPhoneSelected}/>
    return (
        <div>
            <div className="content">
                <button onClick={openInsertModal}>Insert Smartphone</button>
                <InsertSmartphoneModal isOpen={insertModalOpen} onClose={closeInsertModal} />
            </div>

            <div className="content">
                <div>
                    <select onChange={(e) => handlePhoneSelect(e.target.value)} value={phoneSelected} required>
                        <option value="">Select a phone</option>
                        {phones.map(phone => (
                            <option key={phone._id} value={phone._id}>{phone.model}</option>
                        ))}
                    </select>
                </div>
                <button onClick={openUpdateModal}>Update Smartphone</button>
                <UpdateSmartphoneModal isOpen={updateModalOpen} onClose={closeUpdateModal} detailsPhoneSelected={detailsPhoneSelected}/>
            </div>

            <div className="content">
                <button onClick={openDeleteModal}>Delete Smartphone</button>

            </div>
        </div>
    );
};

export default SmartphoneOperation;
