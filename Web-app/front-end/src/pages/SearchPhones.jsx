import React, { useState, useEffect } from 'react';
import PhoneCard from '../components/PhoneCard';
import { useLocation } from 'react-router-dom';
import '../style/allPhones.css'

function SearchPhones() {
  const [phones, setPhones] = useState([]);
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhones = async () => {
      const query = new URLSearchParams(location.search);
      const paramValue = query.get('value');

      const brand_name = paramValue
      const model = paramValue

      try {
        const response = await fetch('api/smartphoneOperations/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brand_name, model })
        });
        const data = await response.json();

        if (response.ok) {
          setPhones(data);
        }

        if (!response.ok) {
          setError(data.error)
        }

      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };

    fetchPhones();

  }, [location]);

  if (error) {
    return <div>{error}</div>;
  }

  if (phones.length <= 0) 
    return(
          <div>
            <h1>No smartphone found with this specifics</h1>
          </div>
    );

  return (
    <div>
      <div className="phone-list">
        {phones.map((phone) => (
          <PhoneCard key={phone._id} phone={phone} />
        ))}
      </div>
    </div>
  );
}

export default SearchPhones;
