import React from 'react'
import { SearchResult } from './SearchResult'
import '../style/searchResultsList.css'

export const SearchResultsList = ({ results, numResult, clearResults }) => {
  return (
    <div className='results-list'>
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} clearResults={clearResults} />;
      })}

      { numResult && (
        <span style={{color: "#007bff", textAlign: "center", fontSize: "14px", fontWeight: "bold"}}>There are other smarthpone with this value: Search All</span>
      )}
    </div>
  )
}
