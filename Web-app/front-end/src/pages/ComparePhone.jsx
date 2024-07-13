import React, { useState, useEffect, isValidElement } from 'react';

import Phone from '../components/Phone';

import '../style/comparePhone.css'

const ComparePhone = () => {
  const [phones, setPhones] = useState([]);
  const [phone1, setPhone1] = useState(null);
  const [phone2, setPhone2] = useState(null);
  const [details1, setDetails1] = useState(null);
  const [details2, setDetails2] = useState(null);

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
    if (id === '') {
      setDetails1(null)
      setPhone1(null)
    } else {
      setPhone1(id);
      try {
        const response = await fetch(`api/smartphoneOperations/id/${id}`);
        const data = await response.json();
        setDetails1(data);
      } catch (error) {
        console.error('Error fetching phone details:', error);
      }
    }
  };

  const handlePhone2Select = async (id) => {
    if (id === '') {
      setDetails2(null)
      setPhone2(null)
    } else {
      setPhone2(id);
      try {
        const response = await fetch(`api/smartphoneOperations/id/${id}`);
        const data = await response.json();
        setDetails2(data);
      } catch (error) {
        console.error('Error fetching phone details:', error);
      }
    }
  };


  return (
    <div>
      <h1>Compare Phones</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <select onChange={(e) => handlePhone1Select(e.target.value)} value={phone1}>
          <option value="">Select a phone</option>
          {phones.map(phone => (
            <option key={phone._id} value={phone._id}>{phone.model}</option>
          ))}
        </select>

        <select onChange={(e) => handlePhone2Select(e.target.value)} value={phone2}>
          <option value="">Select a second phone</option>
          {phones.map(phone => (
            <option key={phone._id} value={phone._id}>{phone.model}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>

        {details1 ? (
          <div>
            <Phone key={details1._id} smartphone={details1} />
          </div>
        ) : (
          <p>Select a phone to see details</p>
        )}

        {details2 ? (
          <div>
            <Phone key={details2._id} smartphone={details2} />
          </div>
        ) : (
          <p>Select a phone to see details</p>
        )}
      </div>
    </div>
  );
};

export default ComparePhone;
