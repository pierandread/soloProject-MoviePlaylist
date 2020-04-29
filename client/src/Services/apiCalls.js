import ApiHelpers from './ApiHelpers';

export function getMovieList(keyword) {
  return ApiHelpers.fetchRequest(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.REACT_APP_TMDB_ID
    }&language=en-US&query=${encodeURIComponent(
      keyword
    )}&page=1&include_adult=false`
  );
}
