// /tests/mocks/@react-native-async-storage/async-storage.js
export default {
    getItem: jest.fn(() => Promise.resolve('mocked value')),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
  };
  