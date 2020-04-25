export function getMovieList(keyword) {
  return fetchMethod(
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
  return fetch('https://api.spotify.com/v1/me', options)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

function fetchMethod(url) {
  return fetch(url)
    .then((res) => (res.status < 400 ? res : new Error(res)))
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
