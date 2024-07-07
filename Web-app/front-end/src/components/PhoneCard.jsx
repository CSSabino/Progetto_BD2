import React from 'react';
import { Link } from 'react-router-dom';

function PhoneCard({ phone }) {
  return (
    <div className="phone-card">
      <h2>{phone.model}</h2>
      <p>{phone.brand_name}</p>
      <p>{phone.price}</p>
      <p>{phone.rating}</p>
      <Link to={`/phone/${phone._id}`}>Details</Link>
    </div>
  );
}

export default PhoneCard;
