import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyButton from './../SpotifyButton';
import { render, cleanup } from '@testing-library/react';
import SpotifyContext from './../../../SpotifyContext';

afterEach(cleanup);

it('should be defined', () => {
  expect(SpotifyButton).toBeDefined();
});

it('renders element correctly', () => {
  const tree = (
    <SpotifyContext.Provider
      value={{ tokenSpotify: 'ytruitigfiu', spotifyUserId: 'Mick Jagger' }}
    >
      <SpotifyButton />
    </SpotifyContext.Provider>
  );
  render(tree);
});

it('matches snapshot', () => {
  const tree = <SpotifyButton />;
  expect(tree).toMatchSnapshot();
});
