import {NativeModules} from 'react-native';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter.js', () => {
  const NativeEventEmitter = require('react-native/Libraries/EventEmitter/__mocks__/NativeEventEmitter');
  return NativeEventEmitter;
});

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
