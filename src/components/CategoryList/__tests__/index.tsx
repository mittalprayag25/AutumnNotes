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

describe('Category List with some category', () => {
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
});

describe('Category List with no category', () => {
  const navigation = mockNavigationWithParams({});
  const props = {
    navigation: navigation,
    data: {
      category: '',
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

  it('should go back', () => {
    const {getByTestId} = render(<CategoryList {...props} />);
    const item = getByTestId('note-detail-item-title');
    act(() => {
      fireEvent(item, 'press');
    });
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });
});
