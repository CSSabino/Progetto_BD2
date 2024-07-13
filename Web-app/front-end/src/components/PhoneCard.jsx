import React from 'react';
import { Link } from 'react-router-dom';

import { SlScreenSmartphone } from "react-icons/sl";
import { FaStar } from "react-icons/fa";

import '../style/phoneCard.css'

function PhoneCard({ phone }) {
  return (
    <div className="phone-card">
      <div className='details'>
        <h2>{phone.model}</h2>
        <h4>Brand name: {phone.brand_name}</h4>
        <h4>Price: $ {phone.price}</h4>
        <h4>Rating: {[...Array(phone.rating)].map((_, i) => (
          <FaStar key={i} className='icon-star-rating' />
        ))}
          ({phone.rating})</h4>
        <h4><Link to={`/phone/${phone._id}`} style={{ color: "white" }}>Click here for more details</Link></h4>
      </div>
      <div className='details'>
        <SlScreenSmartphone className='icon-smartphone'/>
      </div>
    </div>
  );
}

export default PhoneCard;
