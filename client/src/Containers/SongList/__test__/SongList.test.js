import React from 'react';
import ListOfSongs from '../SongList';
import { render, cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

// mocking Redux Provider and store
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../../../Reducers';
const initialState = {
  authentication: {
    spotifyToken: 'DDD',
    spotifyId: 'DDD',
  },
  movieList: false,
};
const store = createStore(allReducers, initialState);

afterEach(cleanup);

it('should be defined', () => {
  expect(ListOfSongs).toBeDefined();
});

// it('renders element correctly with child components', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(
//     <Provider store={store}>
//       <ListOfSongs />
//     </Provider>
//   );
//   const result = renderer.getRenderOutput();

//   expect(result.type).toBe('div');
// });

it('renders element correctly with child components', () => {
  render(
    <Provider store={store}>
      <ListOfSongs></ListOfSongs>
    </Provider>
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
  const tree = (
    <Provider store={store}>
      <ListOfSongs title="Trolls World Tour" />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});
