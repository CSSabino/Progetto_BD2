import React from 'react'
import { Link } from 'react-router-dom';
import '../style/searchResult.css'

export const SearchResult = ({ result, clearResults}) => {
  return (
    <Link to={`/phone/${result._id}`} className='search-result' onClick={clearResults}>
      {result.model}
      <br></br>
    </Link>
  );
};
