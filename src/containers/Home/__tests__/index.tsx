import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import Home from '../index';
import initialState from './../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Test Home', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      notes: {
        allNotes: [
          {
            value: 'some value',
            description: 'some description',
            category: 'some category',
          },
          {
            value: 'some value 2',
            description: 'some description 2',
            category: 'some category 2',
          },
        ],
      },
    });
  });

  const props = {
    navigation: navigation,
  };

  const changeState = {
    ...initialState,
  };
  it('should match snapshot', () => {
    const wrapper = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('should not show no record found', () => {
    const {queryByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    const textInput = queryByTestId('no-record-found');
    expect(textInput).toBeNull();
  });
});

describe('Test Home when all Notes is null', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      notes: {
        allNotes: [],
      },
    });
  });

  const props = {
    navigation: navigation,
  };

  const changeState = {
    ...initialState,
  };
  it('should match snapshot', () => {
    const wrapper = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe('Test Home with no notes', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      notes: {
        allNotes: [],
      },
    });
  });

  const props = {
    navigation: navigation,
  };

  const changeState = {
    ...initialState,
  };
  it('should match snapshot', () => {
    const wrapper = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should show no record found', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    const textInput = getByTestId('no-record-found');
    expect(textInput).not.toBeNull();
  });
  it('should Navigate to new Note Page', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    const add = getByTestId('test-add');
    act(() => {
      fireEvent(add, 'press');
    });
    expect(navigation.navigate).toHaveBeenCalledTimes(1);
  });
  it('Should open category page', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Home {...props} />
      </Provider>,
    );
    const category = getByTestId('categories-text');
    act(() => {
      fireEvent(category, 'press');
    });
    expect(navigation.navigate).toHaveBeenCalledTimes(2);
  });
});
