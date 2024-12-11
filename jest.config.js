module.exports = {
  preset: "react-native", 
  testEnvironment: "node", 
  
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$': './__mocks__/@react-native-async-storage/async-storage.js', 
  },

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native(-community)?|expo(-.*)?|@expo(-.*)?|@unimodules|unimodules|sentry-expo|native-base)',
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],  // Mantén solo esta línea
};
