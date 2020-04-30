import React, { useState } from 'react';
import Movies from '../../Containers/MovieList/MovieList';
import { getMovieList } from '../../Services/TMDBApi';
import iconSearch from '../../images/Search-512.webp';
import './Search.css';

function Search() {
  const [inputSearch, setInputSearch] = useState('');
  const [movies, setMovies] = useState([]);

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

      <div className="input-icons">
        <img
            className="searchIcon"
            alt=""
            src={iconSearch}
          />
          <input
            className="search"
            type="text"
            placeholder="Search for your favorite movies here!"
            value={inputSearch}
            onChange={searchOnChange}
          />
      </div>

      <div style={{overflow: 'auto', height: '75vh'}}>
        {movies.length > 0 && <Movies movies={movies} />}
      </div>
    </div>
  );
}

export default Search;
