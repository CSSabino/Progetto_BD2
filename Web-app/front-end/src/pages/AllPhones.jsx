import React, { useState, useEffect } from 'react';
import PhoneCard from '../components/PhoneCard';
import FilterModal from '../components/FilterModal';

import '../style/allPhones.css'

function AllPhones() {
  const [phones, setPhones] = useState([]);
  
  const [filterModalOpen, setFilterModalOpen] = useState(false);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sortBy })
      });
      const data = await response.json();

      setPhones(data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    }
  };

  const openFilterModal = () => {
    setFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setFilterModalOpen(false);
  };


  return (
    <div>
      <div className="button-container">
        <button className="custom-button" onClick={() => handleSort('price_asc')}>Sort all phone by Price<br></br>(Low to High)</button>
        <button className="custom-button" onClick={() => handleSort('price_desc')}>Sort all phone by Price<br></br>(High to Low)</button>
        <button className="custom-button" onClick={() => handleSort('rating_asc')}>Sort all phone by Rating<br></br>(Low to High)</button>
        <button className="custom-button" onClick={() => handleSort('rating_desc')}>Sort all phone by Rating<br></br>(High to Low)</button>
        <button style={{backgroundColor:"red"}} className="custom-button" onClick={openFilterModal}>Add filter</button>
      </div>

      <FilterModal isOpen={filterModalOpen} onClose={closeFilterModal} setPhones={setPhones} /> 

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
