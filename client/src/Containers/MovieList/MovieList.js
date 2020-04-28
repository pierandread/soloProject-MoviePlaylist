import React from 'react';
import MovieItem from '../../Components/MovieItem/MovieItem';
import './MovieList.css';

function MovieList({ movies }) {
  return (
    <div>
      <div className="movies">
        {movies && movies
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
