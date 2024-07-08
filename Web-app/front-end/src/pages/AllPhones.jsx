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
  
    const handleSortCresPrice = async (order) => {
      try {
        const response = await fetch('api/smartphoneOperations/order-by/priceCres');
        const data = await response.json();
        console.log("priceCres");
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
  
    const handleSortDecrPrice = async (order) => {
      try {
        const response = await fetch('api/smartphoneOperations/order-by/priceDecr');
        const data = await response.json();
        console.log("priceDecr");
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
  
    const handleSortCresRating = async (order) => {
      try {
        const response = await fetch('api/smartphoneOperations/order-by/ratingCres');
        const data = await response.json();
        console.log("ratingCres");
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };
  
    const handleSortDecrRating = async (order) => {
      try {
        const response = await fetch('api/smartphoneOperations/order-by/ratingDecr');
        const data = await response.json();
        console.log("ratingDecr");
        setPhones(data);
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };

/*function AllPhones() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    fetch('api/smartphoneOperations')
      .then((response) => response.json())
      .then((data) => {
        setPhones(data);
      })
      .catch((error) => console.error('Error fetching phones:', error));
  }, []);

  const handleSortCresPrice = async (order) => {
    try {
      const response = await fetch('api/smartphoneOperations/order-by/priceCres');
      
      console.log("priceCres");
      
      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    };
  };

  const handleSortDecrPrice = async (order) => {
    try {
      const response = await fetch('api/smartphoneOperations/order-by/priceDecr');
      console.log("priceDecr");
      
      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    };
  };

  const handleSortCresRating = async (order) => {
    try {
      const response = await fetch('api/smartphoneOperations/order-by/ratingCres');
      console.log("ratingCres");

      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    };
  };

  const handleSortDecrRating = async (order) => {
    try {
      const response = await fetch('api/smartphoneOperations/order-by/ratingDecr');
      console.log("ratingDecr");

      setPhones(response.data);
    } catch (error) {
      console.error('Error fetching phones:', error);
    };
  };*/


  return (
    <div>
      <div className="button-container">
        <button className="custom-button" onClick={() => handleSortCresPrice('priceCres')}>Sort by Price (Low to High)</button>
        <button className="custom-button" onClick={() => handleSortDecrPrice('priceDecr')}>Sort by Price (High to Low)</button>
        <button className="custom-button" onClick={() => handleSortCresRating('ratingCres')}>Sort by Rating (Low to High)</button>
        <button className="custom-button" onClick={() => handleSortDecrRating('ratingDecr')}>Sort by Rating (High to Low)</button>
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
