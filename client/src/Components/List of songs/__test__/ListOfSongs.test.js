import React from 'react';
import ReactDOM from 'react-dom';
import ListOfSongs from './../ListOfSongs';
import { render, cleanup } from '@testing-library/react';
import { TestUtils } from 'react-dom/test-utils';
import SpotifyContext from './../../../SpotifyContext';
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup);

it('should be defined', () => {
  expect(ListOfSongs).toBeDefined();
});

it('renders element correctly with child components', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ListOfSongs />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
});

it('renders element correctly with child components', () => {
  render(
    <SpotifyContext.Provider
      value={{ tokenSpotify: 'DDD', spotifyUserId: 'DDD' }}
    >
      <ListOfSongs></ListOfSongs>
    </SpotifyContext.Provider>
  );
});

// describe('<ListOfSongs />', () => {
//   it('allows us to set props', () => {
//     const wrapper = render(<ListOfSongs title="Trolls World Tour" />);
//     expect(wrapper.props().title).to.equal('Trolls World Tour');
//     wrapper.setProps({ title: 'inception' });
//     expect(wrapper.props().title).to.equal('inception');
//   });
// });

it('matches snapshot', () => {
  const tree = <ListOfSongs title="Trolls World Tour" />;
  expect(tree).toMatchSnapshot();
});
