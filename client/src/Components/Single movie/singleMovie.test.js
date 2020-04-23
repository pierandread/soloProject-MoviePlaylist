import React from 'react';
import ReactDOM from 'react-dom';
import singleMovie from './SingleMovie';
import SingleMovie from './SingleMovie';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SingleMovie />, div);
});
