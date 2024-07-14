import React, { useState, useEffect } from 'react';
import PhoneCard from '../components/PhoneCard';
import { useLocation } from 'react-router-dom';
import '../style/allPhones.css'

function SearchPhones() {
  const [phones, setPhones] = useState([]);
  const [sortBy, setSortBy] = useState('price_asc')
  const [valueSearch, setValueSearch] = useState('')
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPhones = async () => {
      const query = new URLSearchParams(location.search);
      const paramValue = query.get('value');

      setValueSearch(paramValue)

      const brand_name = paramValue
      const model = paramValue

      try {
        const response = await fetch('api/smartphoneOperations/filter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brand_name, model, sortBy })
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

  }, [location, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
};

  if (error) {
    return <div>{error}</div>;
  }

  if (phones.length <= 0)
    return (
      <div>
        <h1>No smartphone found with this specific: "{valueSearch}"</h1>
      </div>
    );

  return (
    <div>
      <h1>Result for search "{valueSearch}"</h1>
      <div className="button-container">
        <button className="custom-button" onClick={() => handleSortChange ('price_asc')}>Sort by Price (Low to High)</button>
        <button className="custom-button" onClick={() => handleSortChange ('price_desc')}>Sort by Price (High to Low)</button>
        <button className="custom-button" onClick={() => handleSortChange ('rating_asc')}>Sort by Rating (Low to High)</button>
        <button className="custom-button" onClick={() => handleSortChange ('rating_desc')}>Sort by Rating (High to Low)</button>
      </div>

      <div className="phone-list">
        {phones.map((phone) => (
          <PhoneCard key={phone._id} phone={phone} />
        ))}
      </div>
    </div>
  );
}

export default SearchPhones;
