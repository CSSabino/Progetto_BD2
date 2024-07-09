import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const InsertSmartphoneModal = ({ isOpen, onClose, detailsPhoneSelected }) => {
    const { user } = useAuthContext();

    const [brand_name, setBrand_name] = useState('');
    const [model, setModel] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (detailsPhoneSelected) {
            setBrand_name(detailsPhoneSelected.brand_name)
            setModel(detailsPhoneSelected.model)
        }
    }, [detailsPhoneSelected]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/smartphone/${detailsPhoneSelected._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error)
            }

            if (response.ok) {
                navigate(`/phoneS`);
            }

        } catch (error) {
            console.error('Error update user:', error);
            setError(error)
        }

        onClose();

    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Delete smartphone</h2>
                <p>Are you sure to delete the smartphone with this features:
                    <br></br>
                    <br></br>
                    <strong>Brand name: </strong>{brand_name}
                    <br></br>
                    <strong>Model: </strong>{model}
                </p>
                <form onSubmit={handleSubmit}>
                    <button type="submit">Confirm delete</button>
                </form>
            </div>
        </div>
    );
};

export default InsertSmartphoneModal
