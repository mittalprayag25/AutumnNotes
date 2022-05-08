import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import Note from '../index';
import initialState from '../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Create Note', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      categories: {
        categories: [
          {label: 'cat1', value: 'cat1'},
          {label: 'cat2', value: 'cat2'},
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
        <Note {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe('Create Node with no categories', () => {
  const navigation = mockNavigationWithParams({});

  const useSelectorSpy = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  const mockedDispatch = jest.fn();
  useDispatchSpy.mockReturnValue(mockedDispatch);

  beforeEach(() => {
    useDispatchSpy.mockReturnValue(mockedDispatch);
    useSelectorSpy.mockReturnValue({
      categories: {
        categories: [],
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
        <Note {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should save when text input value is there', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Note {...props} />
      </Provider>,
    );
    const textInput = getByTestId('text-input-notes');
    const save = getByTestId(`test-save`);
    act(() => {
      fireEvent(save, 'press');
    });
    expect(mockedDispatch).not.toHaveBeenCalled();

    fireEvent.changeText(textInput, '98756789');

    act(() => {
      fireEvent(save, 'press');
    });
    expect(mockedDispatch).toHaveBeenCalled();
  });
  it('should go back', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Note {...props} />
      </Provider>,
    );
    const goBack = getByTestId('test-back');
    act(() => {
      fireEvent(goBack, 'press');
    });
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
});
