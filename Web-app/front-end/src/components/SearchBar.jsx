import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../style/searchBar.css'

export const SearchBar = ({ setResults, setNumResult }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {

        fetch("/api/smartphoneOperations")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((phone) => {
                    return value && phone && (phone.model && phone.model.toLowerCase().includes(value.toLowerCase()) || phone.brand_name && phone.brand_name.toLowerCase().includes(value.toLowerCase()));
                })
                setResults(results.slice(0, 5));

                if (results.length > 5) {
                    setNumResult(true)
                } else {
                    setNumResult(false)
                }
            });
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    const clearResults = () => {
        setResults([]);
        setNumResult(false)
        setInput('')
    };

    return (
        <div className="input-wrapper">
            <div className="bar-div">
                <input className="input-bar"
                    placeholder='Type to search...'
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="search-button-div">
                <Link
                    to={`/search-phones?value=${input}`}
                    className="search-button" onClick={clearResults}> <button>Search All</button>
                </Link>
            </div>
            
        </div>
    );
};
