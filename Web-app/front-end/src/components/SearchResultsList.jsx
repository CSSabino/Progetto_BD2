import React from 'react'
import { SearchResult } from './SearchResult'
import '../style/searchResultsList.css'

export const  SearchResultsList = ({results, clearResults}) => {
  return (
    <div className='results-list'>
        {results.map((result, id) => {
            return <SearchResult result={result} key={id} clearResults={clearResults} />;
        })}
    </div>
  )
}
