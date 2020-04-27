import { combineReducers } from 'redux';
import movieListReducer from './loadMovieList';
import authenticationReducer from './authentication';

const allReducers = combineReducers({
  authentication: authenticationReducer,
  movieList: movieListReducer
});

export default allReducers;