import React from 'react';
import { FaCheck, FaTimes, FaStar } from 'react-icons/fa';

import '../style/phoneDetails.css'

function Phone({ smartphone }) {

    const booleanField = (label, value) => (
        <div className="phone-detail">
            {label}: {value ? (
                <FaCheck className='icon icon-confirm' />
            ) : (
                <FaTimes className='icon icon-reject' />
            )}
        </div>
    );

    return (
        <><h1>{smartphone.model}</h1>
            <div className="phone-details-box">
                <div className="phone-detail">Brand: {smartphone.brand_name}</div>
                <div className="phone-detail">Price: $ {smartphone.price}</div>
                <div className="phone-detail">Rating: <FaStar key={smartphone.rating} className='icon-star' />({smartphone.rating})</div>
                <div className="phone-detail">Internal memory: {smartphone.internal_memory} GB</div>
                {booleanField("5G", smartphone.has_5g)}
                {booleanField("NFC", smartphone.has_nfc)}
                {booleanField("IR Blaster", smartphone.has_ir_blaster)}
                <div className="phone-detail">Processor Brand: {smartphone.processor_brand}</div>
                <div className="phone-detail">Number of Cores: {smartphone.num_cores}</div>
                <div className="phone-detail">Processor Speed: {smartphone.processor_speed} GHz</div>
                <div className="phone-detail">Battery Capacity: {smartphone.battery_capacity} mAh</div>
                <div className="phone-detail">Fast Charging Available: {smartphone.fast_charging_available}</div>
                <div className="phone-detail">RAM Capacity: {smartphone.ram_capacity} GB</div>
                <div className="phone-detail">Screen Size: {smartphone.screen_size} inches</div>
                <div className="phone-detail">Refresh Rate: {smartphone.refresh_rate} Hz</div>
                <div className="phone-detail">Resolution: {smartphone.resolution}</div>
                <div className="phone-detail">Number of Rear Cameras: {smartphone.num_rear_cameras}</div>
                <div className="phone-detail">Number of Front Cameras: {smartphone.num_front_cameras}</div>
                <div className="phone-detail">Operating System: {smartphone.os}</div>
                <div className="phone-detail">Primary Rear Camera: {smartphone.primary_camera_rear}</div>
                <div className="phone-detail">Primary Front Camera: {smartphone.primary_camera_front}</div>
                {booleanField("Extended Memory Available", smartphone.extended_memory_available)}
            </div></>
    );
}

export default Phone;
