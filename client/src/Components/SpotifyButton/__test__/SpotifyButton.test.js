import React from 'react';
import SpotifyButton from './../SpotifyButton';
import { render, cleanup, fireEvent } from '@testing-library/react';

// mocking Redux Provider and store
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../../../Reducers';
const initialState = {
  authentication: {
    spotifyToken: 'ytruitigfiu',
    spotifyId: 'Mick Jagger',
  },
  movieList: false,
};
const store = createStore(allReducers, initialState);

afterEach(cleanup);

it('should be defined', () => {
  expect(SpotifyButton).toBeDefined();
});

it('renders element correctly', () => {
  const tree = (
    <Provider store={store}>
      <SpotifyButton />
    </Provider>
  );
  render(tree);
});

it('matches snapshot', () => {
  const tree = <SpotifyButton />;
  expect(tree).toMatchSnapshot();
});
