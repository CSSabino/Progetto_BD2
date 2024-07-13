import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

import '../style/modal.css'

const InsertSmartphoneModal = ({ isOpen, onClose }) => {
    const { user } = useAuthContext();

    const [brand_name, setBrand_name] = useState('');
    const [model, setModel] = useState('');
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [has_5g, setHas_5g] = useState(false);
    const [has_nfc, setHas_nfc] = useState(false);
    const [has_ir_blaster, setHas_ir_blaster] = useState(false);
    const [processor_brand, setProcessor_brand] = useState('');
    const [num_cores, setNum_cores] = useState('');
    const [processor_speed, setProcessor_speed] = useState('');
    const [battery_capacity, setBattery_capacity] = useState('');
    const [fast_charging_available, setFast_charging_available] = useState(false);
    const [ram_capacity, setRam_capacity] = useState('');
    const [internal_memory, setInternal_memory] = useState('');
    const [screen_size, setScreen_size] = useState('');
    const [refresh_rate, setRefresh_rate] = useState('');
    const [resolution, setResolution] = useState('');
    const [num_rear_cameras, setNum_rear_cameras] = useState('');
    const [num_front_cameras, setNum_front_cameras] = useState('');
    const [os, setOs] = useState('');
    const [primary_camera_rear, setPrimary_camera_rear] = useState('');
    const [primary_camera_front, setPrimary_camera_front] = useState('');
    const [extended_memory_available, setExtended_memory_available] = useState(false);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setBrand_name('')
        setModel('')
        setPrice('')
        setRating('')
        setHas_5g(false)
        setHas_nfc(false)
        setHas_ir_blaster(false)
        setProcessor_brand('')
        setNum_cores('')
        setProcessor_speed('')
        setBattery_capacity('')
        setFast_charging_available(false)
        setRam_capacity('')
        setInternal_memory('')
        setScreen_size('')
        setRefresh_rate('')
        setResolution('')
        setNum_rear_cameras('')
        setNum_front_cameras('')
        setOs('')
        setPrimary_camera_rear('')
        setPrimary_camera_front('')
        setExtended_memory_available(false)

    }, [onClose]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/smartphone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({
                    brand_name, model, price, rating, has_5g, has_nfc, has_ir_blaster,
                    processor_brand, num_cores, processor_speed, battery_capacity, fast_charging_available,
                    ram_capacity, internal_memory, screen_size, refresh_rate, resolution, num_rear_cameras,
                    num_front_cameras, os, primary_camera_rear, primary_camera_front, extended_memory_available
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error)
            }

            if (response.ok) {
                let newSmartphoneId = data._id
                navigate(`/phone/${newSmartphoneId}`);
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
                <h2>Insert new smartphone</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Brand Name:</label>
                        <input type="text" value={brand_name} onChange={(e) => setBrand_name(e.target.value)} required />
                    </div>
                    <div>
                        <label>Model:</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" max="9999" />
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required min="1" max="10" />
                    </div>
                    <div>
                        <label>Has 5G:</label>
                        <input type="checkbox" checked={has_5g} onChange={(e) => setHas_5g(e.target.checked)} />
                    </div>
                    <div>
                        <label>Has NFC:</label>
                        <input type="checkbox" checked={has_nfc} onChange={(e) => setHas_nfc(e.target.checked)} />
                    </div>
                    <div>
                        <label>Has IR Blaster:</label>
                        <input type="checkbox" checked={has_ir_blaster} onChange={(e) => setHas_ir_blaster(e.target.checked)} />
                    </div>
                    <div>
                        <label>Processor Brand:</label>
                        <input type="text" value={processor_brand} onChange={(e) => setProcessor_brand(e.target.value)} required />
                    </div>
                    <div>
                        <label>Number of Cores:</label>
                        <input type="number" value={num_cores} onChange={(e) => setNum_cores(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Processor Speed:</label>
                        <input type="number" value={processor_speed} onChange={(e) => setProcessor_speed(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Battery Capacity:</label>
                        <input type="number" value={battery_capacity} onChange={(e) => setBattery_capacity(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Fast Charging Available:</label>
                        <input type="checkbox" checked={fast_charging_available} onChange={(e) => setFast_charging_available(e.target.checked)} min="0" />
                    </div>
                    <div>
                        <label>RAM Capacity:</label>
                        <input type="number" value={ram_capacity} onChange={(e) => setRam_capacity(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Internal Memory:</label>
                        <input type="number" value={internal_memory} onChange={(e) => setInternal_memory(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Screen Size:</label>
                        <input type="number" value={screen_size} onChange={(e) => setScreen_size(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Refresh Rate:</label>
                        <input type="number" value={refresh_rate} onChange={(e) => setRefresh_rate(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Resolution:</label>
                        <input type="text" value={resolution} onChange={(e) => setResolution(e.target.value)} required />
                    </div>
                    <div>
                        <label>Number of Rear Cameras:</label>
                        <input type="number" value={num_rear_cameras} onChange={(e) => setNum_rear_cameras(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Number of Front Cameras:</label>
                        <input type="number" value={num_front_cameras} onChange={(e) => setNum_front_cameras(e.target.value)} required min="0" />
                    </div>
                    <div>
                        <label>Operating System:</label>
                        <input type="text" value={os} onChange={(e) => setOs(e.target.value)} required />
                    </div>
                    <div>
                        <label>Primary Rear Camera:</label>
                        <input type="number" value={primary_camera_rear} onChange={(e) => setPrimary_camera_rear(e.target.value)} required />
                    </div>
                    <div>
                        <label>Primary Front Camera:</label>
                        <input type="number" value={primary_camera_front} onChange={(e) => setPrimary_camera_front(e.target.value)} required />
                    </div>
                    <div>
                        <label>Extended Memory Available:</label>
                        <input type="checkbox" checked={extended_memory_available} onChange={(e) => setExtended_memory_available(e.target.checked)} />
                    </div>
                    <button type="submit">Submit</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default InsertSmartphoneModal
