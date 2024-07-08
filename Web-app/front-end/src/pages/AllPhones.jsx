import React, { useState, useEffect } from 'react';
import PhoneCard from '../components/PhoneCard';
import '../style/allPhones.css'

function AllPhones() {
    const [phones, setPhones] = useState([]);
  
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
  
    const handleSort = async (sortBy) => {
      try {
        const response = await fetch('api/smartphoneOperations/filter', {
          method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({sortBy})
        });
        const data = await response.json();
        console.log("priceCres");
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };


  return (
    <div>
      <div className="button-container">
        <button className="custom-button" onClick={() => handleSort('price_asc')}>Sort by Price (Low to High)</button>
        <button className="custom-button" onClick={() => handleSort('price_desc')}>Sort by Price (High to Low)</button>
        <button className="custom-button" onClick={() => handleSort('rating_asc')}>Sort by Rating (Low to High)</button>
        <button className="custom-button" onClick={() => handleSort('rating_desc')}>Sort by Rating (High to Low)</button>
      </div>
      <h1>All Phones</h1>
      <div className="phone-list">
        {phones.map((phone) => (
          <PhoneCard key={phone._id} phone={phone} />
        ))}
      </div>
    </div>
  );
}

export default AllPhones;
