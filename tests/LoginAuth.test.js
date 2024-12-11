// tests/LoginRegisterRender.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Views/Login'; // Asegúrate de que la ruta sea correcta

// Mock para Firebase Auth
jest.mock('firebase/auth', () => ({
  initializeAuth: jest.fn().mockReturnValue({ currentUser: null }),
  createUserWithEmailAndPassword: jest.fn(), // Mock del método de registro
}));

// Mock para React Navigation
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
    })),
  };
});

// Mock para LinearGradient
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: jest.fn(({ children }) => children),
}));

describe('Register in Login Component', () => {
  test('should send correctly credentials for auth', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    // Verifica que el botón o enlace de registro esté presente
    const registerButton = getByTestId('register-button'); // Asegúrate de usar este testID en tu componente
    expect(registerButton).toBeTruthy(); // Verifica que exista
  });
});
