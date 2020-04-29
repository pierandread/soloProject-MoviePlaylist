import ApiHelpers from './ApiHelpers';

const BASE_URL = 'https://api.themoviedb.org/3';

export function getMovieList(keyword) {
  return ApiHelpers.fetchRequest(
    `${BASE_URL}/search/movie?api_key=${
      process.env.REACT_APP_TMDB_ID
    }&language=en-US&query=${encodeURIComponent(
      keyword
    )}&page=1&include_adult=false`
  );
}