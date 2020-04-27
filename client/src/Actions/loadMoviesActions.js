export function loadMoviesSuccess (response) {
  return {
    type: 'LOAD_MOVIES_SUCCESS',
    response
  };
}

export function loadMoviesFailure (error) {
  return {
    type: 'LOAD_MOVIES_FAILURE',
    error
  };
}

export function loadMoviesRequest () {
  return {
    type: 'LOAD_MOVIES_RESQUEST'
  };
}