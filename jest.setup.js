jest.mock('@expo/vector-icons/MaterialCommunityIcons', () => 'Icon'); 
jest.mock('@expo/vector-icons', () => 'Icon'); 
jest.mock('firebase/auth', () => require('./__mocks__/firebase/auth'));
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));
jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
}));
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));