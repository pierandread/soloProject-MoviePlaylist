import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieItem from '../../Components/MovieItem/MovieItem';
import { getMovieList } from '../../Services/apiCalls';
import { loadMoviesSuccess, loadMoviesFailure, loadMoviesRequest } from '../../Actions/loadMoviesActions';
import './MovieList.css';

function MovieList({ searching, triggerSearch }) {
  const [movies, setMovies] = useState();
  const dispatch = useDispatch();
  const moviesLoaded = useSelector(state => state.movieList);
  
  useEffect(() => {
    dispatch(loadMoviesRequest());
    getMovieList(searching)
    .then(data => {
      setMovies(data)
      dispatch(loadMoviesSuccess(data));
    })
    .catch(err => {
      dispatch(loadMoviesFailure(err));
    });
  }, [triggerSearch]);

  return (
    <div>
      <div className="movies">
        {movies &&
          movies.results
            .slice(0, 10)
            .map((movie) => (
              <MovieItem
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                date={movie.release_date}
              />
            ))}
      </div>
      <p className="no-movies">
        No more movies, if your movie is not in the list try another search
      </p>
    </div>
  );
}

export default MovieList;
