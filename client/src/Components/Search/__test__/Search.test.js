import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import renderer, { act } from 'react-test-renderer';

import Search from '../Search';

describe ('Search component', () => {

  afterEach(cleanup);

  it ('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
  });

  it ('should show search instructions inside input', () => {
      let component;
      act(() => {
        component = renderer.create(<Search />);
      });
      const instance = component.root;
      const input = instance.findByType('input');
      expect(input.props.placeholder).toEqual(expect.stringMatching(/Search/i));
  });

  // it ('should show search instructions when nothing has been typed', () => {
  //   const component = render(<Search />);
  //   expect(component.getByText(/Search a movie/i)).toBeInTheDocument();
  // });

  // it ('should NOT show search instructions when something has been typed', () => {
  //   let component;
  //   act(() => {
  //     component = renderer.create(<Search />);
  //   });
  //   const instance = component.root;
  //   const input = instance.findByType('input');
  //   expect(instance.findAllByType('p').length).toBe(1);
  //   input.props.onChange({target: { value: 'avengers' }});
  //   expect(instance.findAllByType('p').length).toBe(0);
  // });

});