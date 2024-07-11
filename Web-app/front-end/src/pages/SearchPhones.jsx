import React, { useState, useEffect } from 'react';
import PhoneCard from '../components/PhoneCard';
import { useLocation } from 'react-router-dom';
import '../style/allPhones.css'

function SearchPhones() {
    const [phones, setPhones] = useState([]);
    const location = useLocation();
    const [results, setResults] = useState([]);
    const query = location.state?.query || '';
  
    /*useEffect(() => {
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
    }, []);*/

  return (
    <div>
      <h1>{query}</h1>
    </div>
  );
}

/*<div className="phone-list">
        {phones.map((phone) => (
          <PhoneCard key={phone._id} phone={phone} />
        ))}
      </div>*/
export default SearchPhones;
