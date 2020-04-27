function loadMovies(state = false, action) {
  switch (action.type) {
    case 'LOAD_MOVIES_SUCCESS':
      state = true;
      return state;
    case 'LOAD_MOVIES_FAILURE':
      state = false;
      return state;
    case 'LOAD_MOVIES_RESQUEST':
      state = false;
      return state;
    default:
      return state;
  }
}

export default loadMovies;