
module.exports = {
    preset: "react-native", // Para proyectos React Native
    testEnvironment: "node", // Para manejar Firebase y funciones de backend
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy", // Ignorar estilos en las pruebas
    },
    transformIgnorePatterns: [
      "node_modules/(?!react-native|my-project|react-navigation|expo)/", // Adaptar si usas Expo o librerías específicas
    ],
    setupFiles: [
        "./__mocks__/@react-native-async-storage/async-storage.js",
        "./jest.setup.js"
      ],
  };
  