import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../../Components/MovieItem/MovieItem';
import { getMovieList } from '../../Services/apiCalls';
import { loadMoviesSuccess, loadMoviesFailure, loadMoviesRequest} from '../../Actions/loadMoviesActions';
import './MovieList.css';

function MovieList({ searching, triggerSearch }) {
  const [movies, setMovies] = useState();

  useEffect(() => {
    getMovieList(searching).then((data) => setMovies(data));
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

const select = (state) => ({
  moviesLoaded: state,
});
const actions = {
setSuccess: loadMoviesSuccess,
setFailure: loadMoviesFailure,
setRequest: loadMoviesRequest,
};
export default connect(select, actions)(MovieList);
