import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PhoneDetails() {
  const { id } = useParams();

  const [smartphone, setSmartphone] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    
    const fetchPhoneDetails = async () => {
      try {
        const response = await fetch(`/api/smartphoneOperations/id/${id}`);
        const data = await response.json();
        setSmartphone(data);
      } catch (err) {
        setError('Error fetching phone details');
      }
    };

    fetchPhoneDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!smartphone) return <p>No smartphone found</p>;


  return (
    <div>
      <h1>{smartphone.model}</h1>
      <p>Brand: {smartphone.brand_name}</p>
      <p>Price: ${smartphone.price}</p>
      <p>Rating: {smartphone.rating}</p>
      <p>Internal memory: {smartphone.internal_memory} GB</p>
      <p>5G: {smartphone.has_5g}</p>
      <p>NFC: {smartphone.has_nfc}</p>
      <p>Ir_blaster: {smartphone.has_ir_blaster}</p>
      <p>Processor Brand: {smartphone.processor_brand}</p>
      <p>Number of Cores: {smartphone.num_cores}</p>
      <p>Processor Speed: {smartphone.processor_speed}</p>
      <p>Battery Capacity: {smartphone.battery_capacity}</p>
      <p>Fast Charging Available: {smartphone.fast_charging_available}</p>
      <p>RAM Capacity: {smartphone.ram_capacity}</p>
      <p>Screen Size: {smartphone.screen_size}</p>
      <p>Refresh Rate: {smartphone.refresh_rate}</p>
      <p>Resolution: {smartphone.resolution}</p>
      <p>Number of Rear Cameras: {smartphone.num_rear_cameras}</p>
      <p>Number of Front Cameras: {smartphone.num_front_cameras}</p>
      <p>Operating System: {smartphone.os}</p>
      <p>Primary Rear Camera: {smartphone.primary_camera_rear}</p>
      <p>Primary Front Camera: {smartphone.primary_camera_front}</p>
      <p>Extended Memory Available: {smartphone.extended_memory_available}</p>
    </div>
  );
}

export default PhoneDetails;

// src/pages/PhoneDetails.jsx
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PhoneDetails = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/phones/${id}`);
        setPhone(response.data);
      } catch (err) {
        setError('Error fetching phone details');
      }
    };

    fetchPhoneDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!phone) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{phone.name}</h1>
      <p>Brand: {phone.brand}</p>
      <p>Price: ${phone.price}</p>
      <p>Specifications: {phone.specs}</p>
    </div>
  );
};

export default PhoneDetails;
*/
