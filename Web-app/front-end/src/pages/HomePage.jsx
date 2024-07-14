import React, { useEffect, useState } from 'react';
import PhoneCard from '../components/PhoneCard';

function HomePage() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch('api/smartphoneOperations');
        const json = await response.json()
        
        if(response.ok){
          setPhones(json.slice(0, 6))
        }
      } catch (error) {
        console.error('Error fetching phones:', error);
      }
    };

    fetchPhones();
  }, []);

  return (
    <div>
      <h1>Phone Comparison</h1>
      <div className="phone-list">
        {phones.map(phone => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
