import React, { useState } from 'react';
import Movies from '../../Containers/MovieList/MovieList';
import { getMovieList } from '../../Services/TMDBApi';
import './Search.css';
import iconSearch from '../../images/Search-512.webp';

function Search() {
  const [inputSearch, setInputSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const submitSearch = (e) => {
    e.preventDefault();
    search(inputSearch);
  };

  const searchOnChange = (e) => {
    const input = e.target.value;
    setInputSearch(input);
    search(input);
  };

  const search = (keywords) => {
    if (keywords) {
      getMovieList(keywords)
        .then((data) => {
          setMovies(data.results);
        })
        .catch((err) => {
          console.log('no movies found');
        });
    } else setMovies([]);
  };

  return (
    <div className="Search">
      <form onSubmit={submitSearch}>
        <label>
          Search:
          <input
            className="search"
            type="text"
            value={inputSearch}
            onChange={searchOnChange}
          />
        </label>
        <img
          className="searchIcon"
          alt=""
          src={iconSearch}
          onClick={submitSearch}
        />
      </form>
      <div style={{overflow: 'auto', height: '75vh'}}>
        {movies.length > 0 && <Movies movies={movies} />}
      </div>
    </div>
  );
}

export default Search;
