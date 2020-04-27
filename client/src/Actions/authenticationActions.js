export function setSpotifyToken (token) {
  return {
    type: 'SET_SPOTIFY_TOKEN',
    payload: { token }
  };
};

export function setSpotifyId (spotifyId) {
  return {
    type: 'SET_SPOTIFY_ID',
    payload: { spotifyId }
  };
};