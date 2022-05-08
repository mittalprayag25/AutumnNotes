import configureStore from 'redux-mock-store';

import initialState from '../redux/store/initialState';

export const mockStore = configureStore()(initialState);
export const createMockStore = (state = initialState) =>
  configureStore()(state);

//mock navigation
const state = {params: {}};
export const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  isFocused: () => true,
  setParams: (params: any) => (state.params = params),
  //getParam: (key: any) => state.params[key],
  state,
  pop: jest.fn(),
  popToTop: jest.fn(),
  reset: jest.fn(),
  replace: jest.fn(),
};

export const mockNavigation = {
  isFocused: () => true,
  navigate: jest.fn(),
  goBack: jest.fn(),
  pop: jest.fn(),
  getParam: jest.fn(),
  popToTop: jest.fn(),
  setParams: jest.fn(),
  replace: jest.fn(),
  addListener: jest.fn((event, callback) => {
    switch (event) {
      case 'didFocus':
        callback();
        return {
          remove: jest.fn(),
        };
      case 'didBlur':
        callback();
        return {
          remove: jest.fn(),
        };
      default:
        break;
    }
  }),
};

export const mockNavigationWithParams = (params: any) => ({
  ...mockNavigation,
  getParam: (key: string) => params[key],
  state: {params},
});
