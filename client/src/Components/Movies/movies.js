import React, {useState, useEffect} from 'react';
import SingleMovie from '../Single movie/singleMovie';
import {getMovieList} from '../../apiCalls';
import './movies.css'


function Movies({searching, triggerSearch}) {
  const [movies, setMovies] = useState ();
  const [title, setTitle] = useState();
 
  useEffect(() => {
    getMovieList(searching).then(data => setMovies (data))
  }, [triggerSearch])

  console.log("movies")
    
  return (
    <div>
        <div className='movies'>
          {movies && movies.results.slice(0,10).map(movie => <SingleMovie key = {movie.id} title = {movie.title} posterPath = {movie.poster_path} date = {movie.release_date} />
          )}
        </div>
      <p className="no-movies">No more movies, if your movie is not in the list try another search</p>
    </div>
  )

}


export default Movies;
