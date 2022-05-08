import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import CategoryList from '../index';
import initialState from './../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Home with success data', () => {
  const navigation = mockNavigationWithParams({});
  const props = {
    navigation: navigation,
    data: {
      category: 'category',
      data: [
        {category: 'category', title: 'title', description: 'description'},
      ],
    },
  };

  const changeState = {
    ...initialState,
  };
  it('should match snapshot', () => {
    const wrapper = render(<CategoryList {...props} />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  // it('Should contain CLick More Text', () => {
  //   const {getByTestId} = render(
  //     <Provider store={createMockStore(changeState)}>
  //       <Home {...props} />
  //     </Provider>,
  //   );
  //   expect(getByTestId('more-records').props.children).toBe(
  //     'Click here for More stories.....',
  //   );
  // });
  // it('Should navigate to details', async () => {
  //   const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
  //   const mockedDispatch = jest.fn();
  //   useDispatchSpy.mockReturnValue(mockedDispatch);

  //   const {getByTestId} = render(
  //     <Provider store={createMockStore(changeState)}>
  //       <Home {...props} />
  //     </Provider>,
  //   );
  //   const scrollView = getByTestId('home-story-view');
  //   act(() => {
  //     fireEvent(getByTestId('more-records'), 'press');
  //   });
  //   expect(scrollView).toBeDefined();
  //   expect(mockedDispatch).toHaveBeenCalled();

  //   const {refreshControl} = scrollView.props;
  //   act(() => {
  //     refreshControl.props.onRefresh();
  //   });
  //   expect(mockedDispatch).toHaveBeenCalled();
  // });
});
