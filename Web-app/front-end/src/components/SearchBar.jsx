import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../style/searchBar.css'

export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("/api/smartphoneOperations")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((phone) => {
                    return value && phone && phone.model && phone.brand_name
                    && phone.model.toLowerCase().includes(value)
                    && phone.brand_name.toLowerCase().includes(value)
                }).slice(0, 5);
                setResults(results);
            });
    };

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }
  
    return (
    <div className="input-wrapper"> 
        <input className="input-bar"
            placeholder='Type to search...' 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}
        />
        <Link
        to={`/search-phones?value=${input}`}
        className="search-button"> <button>Search All</button>
        </Link>
    </div>
  )
}
