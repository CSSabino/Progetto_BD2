//import Compare from '../components/Compare'
import React, { useState, useEffect } from 'react';

const ComparePhone = () => {
  const [phones, setPhones] = useState([]);
  const [phone1, setPhone1] = useState(null);
  const [phone2, setPhone2] = useState(null);
  const [details1, setDetails1] = useState(null);
  const [details2, setDetails2] = useState(null);
  //const [showPhoneSelection, setShowPhoneSelection] = useState(false);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('api/smartphoneOperations');
        const data = await response.json();
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };

    fetchPhones();
  }, []);

  const handlePhone1Select = async (id) => {
    setPhone1(id);
    try {
      const response = await fetch(`api/smartphoneOperations/id/${id}`);
      const data = await response.json();
      setDetails1(data);
    } catch (error) {
      console.error('Error fetching phone details:', error);
    }
  };

  const handlePhone2Select = async (id) => {
    setPhone2(id);
    try {
      const response = await fetch(`api/smartphoneOperations/id/${id}`);
      const data = await response.json();
      setDetails2(data);
    } catch (error) {
      console.error('Error fetching phone details:', error);
    }
  };


  return (
    <div>
      <h1>Compare Phones</h1>
      <div>
        <label>Select Phone 1: </label>
        <select onChange={(e) => handlePhone1Select(e.target.value)} value={phone1}>
          <option value="">Select a phone</option>
          {phones.map(phone => (
            <option key={phone._id} value={phone._id}>{phone.model}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Phone 2: </label>
        <select onChange={(e) => handlePhone2Select(e.target.value)} value={phone2}>
          <option value="">Select a phone</option>
          {phones.map(phone => (
            <option key={phone._id} value={phone._id}>{phone.model}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div>
          {details1 ? (
            <div>
              <h2>{details1.model}</h2>
              <p>Brand: {details1.brand_name}</p>
              <p>Price: {details1.price}</p>
              <p>Rating: {details1.rating}</p>
              {/* Aggiungi altre proprietà che desideri mostrare */}
            </div>
          ) : (
            <p>Select a phone to see details</p>
          )}
        </div>
        <div>
          {details2 ? (
            <div>
              <h2>{details2.model}</h2>
              <p>Brand: {details2.brand_name}</p>
              <p>Price: {details2.price}</p>
              <p>Rating: {details2.rating}</p>
              {/* Aggiungi altre proprietà che desideri mostrare */}
            </div>
          ) : (
            <p>Select a phone to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparePhone;
