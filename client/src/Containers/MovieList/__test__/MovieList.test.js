import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { render, cleanup } from '@testing-library/react';

import Movies from '../MovieList';

const movies = [
    {
      id: '27205',
      title: 'Inception',
      poster_path: '/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      release_date: '2010-12-07',
    },
    {
      id: '597',
      title: 'Titanic',
      poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
      release_date: '1997-11-18',
    }
  ];

describe('Movie component', () => {
  afterEach(cleanup);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Movies movies={movies}/>
    , div);
  });
  it('renders a footer message', () => {
    const component = render(
      <Movies movies={movies}/>
    );
    expect(component.getByText(/No more movies/i)).toBeInTheDocument();
  });
  it('renders each movie occurence as a SingleMovie component', async () => {
    const { container } = await render(
      <Movies movies={movies}/>
    );
    expect(container.getElementsByClassName('singleMovie').length).toEqual(
      movies.length
    );
  });
  it('renders the movie titles', async () => {
    const { queryByText } = await render(
      <Movies movies={movies}/>
    );
    expect(queryByText(/Inception/i)).toBeInTheDocument();
    expect(queryByText(/Titanic/i)).toBeInTheDocument();
  });
  it('should match snapshot (when there are no movies)', () => {
    const component = renderer.create(
      <Movies movies={[]}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot (when there are movies)', () => {
    const component = renderer.create(
      <Movies movies={movies}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
