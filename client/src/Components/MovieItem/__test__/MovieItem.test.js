import React from 'react';
import MovieItem from '../MovieItem';
import ReactDOM from 'react-dom';
import SpotifyContext from '../../../SpotifyContext';

// import react-testing methods
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('should take a snapshot', () => {
  const wrapper = (
    <SpotifyContext.Provider
      value={{ tokenSpotify: 'DDD', spotifyUserId: 'DDD' }}
    >
      <MovieItem></MovieItem>
    </SpotifyContext.Provider>
  );
  const { asFragment } = render(wrapper);

  expect(asFragment(wrapper)).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieItem />, div);
});

it('should be defined', () => {
  expect(MovieItem).toBeDefined();
});

it('changes text when button clicked', () => {
  const wrapper = (
    <SpotifyContext.Provider
      value={{ tokenSpotify: 'DDD', spotifyUserId: 'DDD' }}
    >
      <MovieItem></MovieItem>
    </SpotifyContext.Provider>
  );
  const { getByText } = render(wrapper);
  const button = getByText(/show playlist/i);
  expect(button).toHaveTextContent(/show playlist/i);

  button.click();
  expect(button).toHaveTextContent(/hide playlist/i);
});

it('hides the playlist when button clicked', () => {});
