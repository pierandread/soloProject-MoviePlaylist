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

export function getSpotifyUserId(token) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return ApiHelpers.fetchRequest('https://api.spotify.com/v1/me', options);
}
