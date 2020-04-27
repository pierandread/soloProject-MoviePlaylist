function authentication (state = {}, action) {
  switch (action.type) {
    case 'SET_SPOTIFY_TOKEN':
      state = { ...state, spotifyToken: action.payload.token };
      return state;
    case 'SET_SPOTIFY_ID':
      state = { ...state, spotifyId: action.payload.spotifyId };
      return state;
    default:
      return state;
  }
}

export default authentication;