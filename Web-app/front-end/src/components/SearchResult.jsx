import React from 'react'
import { Link } from 'react-router-dom';
import '../style/searchResult.css'

/*export const SearchResult = ({result}) => {
  return <div className='search-result'>{result.model}</div>;
};*/

export const SearchResult = ({ result }) => {
  return (
    <Link to={`/phone/${result._id}`} className='search-result'>
      {result.model}
      <br></br>
    </Link>
  );
};
