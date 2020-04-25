import React, { useState } from 'react';
import Movies from '../../Containers/MovieList/MovieList';
import './Search.css';
import iconSearch from '../../images/Search-512.webp';

function Search() {
  const [searching, setSearching] = useState();
  const [triggerSearch, setTriggerSearch] = useState(0);

  const submittingSearch = (e) => {
    e.preventDefault();
    setTriggerSearch(triggerSearch + 1);
    return;
  };

  return (
    <div className="Search">
      <form onSubmit={submittingSearch}>
        <label>
          Search:
          <input
            className="search"
            type="text"
            onChange={(e) => setSearching(e.target.value)}
          ></input>
        </label>
        <img
          className="searchIcon"
          alt=""
          src={iconSearch}
          onClick={submittingSearch}
        ></img>
      </form>
      {!searching && triggerSearch === 0 && (
        <p>
          <span role="img" aria-label="up">
            👆
          </span>{' '}
          Search a movie up here{' '}
          <span role="img" aria-label="up">
            👆
          </span>
        </p>
      )}
      {triggerSearch !== 0 && (
        <Movies searching={searching} triggerSearch={triggerSearch} />
      )}
    </div>
  );
}

export default Search;
