import React from 'react'
import { Link } from 'react-router-dom';
import '../style/searchResult.css'

<<<<<<< Updated upstream
export const SearchResult = ({ result }) => {
=======
/*export const SearchResult = ({result}) => {
  return <div className='search-result'>{result.model}</div>;
};*/

export const SearchResult = ({ result, clearResults }) => {
>>>>>>> Stashed changes
  return (
    <Link to={`/phone/${result._id}`} className='search-result' onClick={clearResults}>
      {result.model}
      <br></br>
    </Link>
  );
};
