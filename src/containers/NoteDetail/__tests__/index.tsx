import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as reactRedux from 'react-redux';
import {Provider} from 'react-redux';

import {
  createMockStore,
  mockNavigationWithParams,
} from '../../../__mocks__/index';
import NoteDetail from '../index';
import initialState from './../../../redux/store/initialState';

const mockedDispatch = jest.fn();

describe('Test Note Detail', () => {
  const navigation = mockNavigationWithParams({
    singleNote: {
      value: 'some value',
      description: 'some description',
      category: 'some category',
    },
    index: 0,
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
        <NoteDetail {...props} />
      </Provider>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe('Test Note Detail with no param', () => {
  const navigation = mockNavigationWithParams({
    singleNote: {
      value: 'some value',
      description: 'some description',
      category: 'some category',
    },
    index: 0,
  });

  const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');

  const mockedDispatch = jest.fn();
  useDispatchSpy.mockReturnValue(mockedDispatch);

  const props = {
    navigation: navigation,
  };

  const changeState = {
    ...initialState,
  };
  it('should test all press events', () => {
    const {getByTestId} = render(
      <Provider store={createMockStore(changeState)}>
        <NoteDetail {...props} />
      </Provider>,
    );
    const inputText = getByTestId('note-detail-text-input');
    const save = getByTestId('note-detail-save');
    const deleteElement = getByTestId('note-detail-delete');
    const back = getByTestId('note-detail-back');
    fireEvent.changeText(inputText, '98756789');
    act(() => {
      fireEvent(save, 'press');
    });
    expect(mockedDispatch).toHaveBeenCalled();

    act(() => {
      fireEvent(deleteElement, 'press');
    });
    expect(mockedDispatch).toHaveBeenCalled();

    act(() => {
      fireEvent(back, 'press');
    });
    expect(mockedDispatch).toHaveBeenCalled();
    fireEvent.changeText(inputText, '');
    act(() => {
      fireEvent(save, 'press');
    });
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
