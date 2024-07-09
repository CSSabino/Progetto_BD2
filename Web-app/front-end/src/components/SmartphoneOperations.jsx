import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import InsertSmartphoneModal from './InsertSmartphoneModal';
import UpdateSmartphoneModal from './UpdateSmartphoneModal'
import DeleteSmartphoneModal from './DeleteSmartphoneModal'

const SmartphoneOperation = () => {
    const { user } = useAuthContext();

    const [phones, setPhones] = useState([]);
    const [phoneUpdateSelected, setUpdatePhoneSelected] = useState(null);
    const [phoneDeleteSelected, setDeletePhoneSelected] = useState(null);
    const [detailsUpdatePhoneSelected, setUpdateDetailsPhoneSelected] = useState(null)
    const [detailsDeletePhoneSelected, setDeleteDetailsPhoneSelected] = useState(null)

    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);    

    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const response = await fetch('/api/smartphoneOperations');
                const data = await response.json();
                setPhones(data);
                setUpdatePhoneSelected(phones[0]._id)
                setUpdateDetailsPhoneSelected(phones[0])
            } catch (error) {
                console.error('Error fetching phones:', error);
            }
        };

        fetchPhones();
    }, []);

    const handleUpdatePhoneSelect = async (id) => {
        setUpdatePhoneSelected(id);
        try {
          const response = await fetch(`/api/smartphoneOperations/id/${id}`);
          const data = await response.json();
          setUpdateDetailsPhoneSelected(data);
        } catch (error) {
          console.error('Error fetching phone details:', error);
        }
      };

      const handleDeletePhoneSelect = async (id) => {
        setDeletePhoneSelected(id);
        try {
          const response = await fetch(`/api/smartphoneOperations/id/${id}`);
          const data = await response.json();
          setDeleteDetailsPhoneSelected(data);

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

    return (
        <div>
            <div className="content">
                <button onClick={openInsertModal}>Insert Smartphone</button>
                <InsertSmartphoneModal isOpen={insertModalOpen} onClose={closeInsertModal} />
            </div>

            <div className="content">
                <div>
                    <select onChange={(e) => handleUpdatePhoneSelect(e.target.value)} value={phoneUpdateSelected} required>
                        <option value="">Select a phone</option>
                        {phones.map(phone => (
                            <option key={phone._id} value={phone._id}>{phone.model}</option>
                        ))}
                    </select>
                </div>
                <button onClick={openUpdateModal}>Update Smartphone</button>
                <UpdateSmartphoneModal isOpen={updateModalOpen} onClose={closeUpdateModal} detailsPhoneSelected={detailsUpdatePhoneSelected}/>
            </div>

            <div className="content">
                <div>
                    <select onChange={(e) => handleDeletePhoneSelect(e.target.value)} value={phoneDeleteSelected} required>
                        <option value="">Select a phone</option>
                        {phones.map(phone => (
                            <option key={phone._id} value={phone._id}>{phone.model}</option>
                        ))}
                    </select>
                </div>
                <button onClick={openDeleteModal}>Delete Smartphone</button>
                <DeleteSmartphoneModal isOpen={deleteModalOpen} onClose={closeDeleteModal} detailsPhoneSelected={detailsDeletePhoneSelected}/>
            </div>
        </div>
    );
};

export default SmartphoneOperation;
