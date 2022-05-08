import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import Category from '../index';
import initialState from '../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Create Category', () => {
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
        <Category {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('should save when text input value is there', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Category {...props} />
      </Provider>,
    );
    const textInput = getByTestId('create-category-input-text');
    const save = getByTestId(`create-category-save`);
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
        <Category {...props} />
      </Provider>,
    );
    const goBack = getByTestId('create-category-back');
    act(() => {
      fireEvent(goBack, 'press');
    });
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
  it('should remove category', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <Category {...props} />
      </Provider>,
    );
    const text = getByTestId('create-category-remove-cat2');
    act(() => {
      fireEvent(text, 'press');
    });
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
