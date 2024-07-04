import React from 'react';

function Compare({ phones }) {
  if (phones.length < 2) {
    return <p>Please select at least two phones to compare.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Feature</th>
          {phones.map(phone => (
            <th key={phone.id}>{phone.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Brand</td>
          {phones.map(phone => (
            <td key={phone.id}>{phone.brand}</td>
          ))}
        </tr>
        <tr>
          <td>Price</td>
          {phones.map(phone => (
            <td key={phone.id}>${phone.price}</td>
          ))}
        </tr>
        {/* Aggiungi altre righe per le diverse caratteristiche */}
      </tbody>
    </table>
  );
}

export default Compare;
