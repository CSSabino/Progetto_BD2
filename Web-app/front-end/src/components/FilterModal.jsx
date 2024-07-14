import React, { useState } from 'react';

import '../style/modal.css'

const FilterModal = ({ isOpen, onClose, setPhones }) => {

    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(7150);
    const [sortBy, setSortBy] = useState('price_asc')

    const [error, setError] = useState('');

    const handleFilter = async (e) => {
        e.preventDefault();

        if (minRating < 0 || minRating > maxRating || minRating > 10) {
            setError("Error value for min rating");
            return;
        }


        if (maxRating < 0 || minRating > maxRating || maxRating > 10) {
            setError("Error value for max rating");
            return;
        }

        if (minPrice < 0 || minPrice > maxPrice) {
            setError("Error value for min price");
            return;
        }

        if (maxPrice < 0 || minPrice > maxPrice) {
            setError("Error value for max price");
            return;
        }

        const price_min = minPrice
        const price_max = maxPrice
        const rating_min = minRating
        const rating_max = maxRating

        try {
            const response = await fetch('/api/smartphoneOperations/filter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price_min, price_max, rating_min, rating_max, sortBy })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error)
                return;
            }

            if (response.ok) {
                setPhones(data)
            }

        } catch (error) {
            console.error('Error smarthone filter:', error);
            setError(error)
        }

        setError('')
        onClose();
    };

    const handleReset = async () => {
        setMinPrice(0)
        setMaxPrice(7150)
        setMinRating(0)
        setMaxRating(10)
        setSortBy('price_asc')

        try {
            const response = await fetch('api/smartphoneOperations');
            const data = await response.json();
            setPhones(data);
        } catch (error) {
            console.error('Error fetching phones:', error);
        }

        setError('')
        onClose();
    }

    const handleSortBySelect = async (value) => {
        setSortBy(value)
      };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Smartphone's filter</h2>
                <form onSubmit={handleFilter}>
                    <label>
                        Min rating:
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={minRating}
                            onChange={(e) => setMinRating(parseFloat(e.target.value))}
                        />
                    </label>
                    <label>
                        Max rating:
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={maxRating}
                            onChange={(e) => setMaxRating(parseFloat(e.target.value))}
                        />
                    </label>
                    <br />
                    <label>
                        Min Price:
                        <input
                            type="number"
                            min="0"
                            value={minPrice}
                            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                        />
                    </label>
                    <label>
                        Max price:
                        <input
                            type="number"
                            min="0"
                            max="7150"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                        />
                    </label>
                    <label>
                        Sort by:
                        <select onChange={(e) => handleSortBySelect(e.target.value)} value={sortBy}>
                            <option value="price_asc">Ascending price</option>
                            <option value="price_desc">Descending price</option>
                            <option value="rating_asc">Ascending rating</option>
                            <option value="rating_desc">Descending rating</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Confirm filter</button>
                    <button onClick={handleReset}>Reset filter</button>
                    {error && <h4 style={{ color: "red" }}>{error}</h4>}

                </form>
            </div>
        </div>
    );
};

export default FilterModal;
