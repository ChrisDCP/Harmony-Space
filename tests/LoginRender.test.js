// tests/LoginRender.test.js
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Views/Login'; // Asegúrate de que la ruta sea correcta

// Mock para Firebase Auth
jest.mock('firebase/auth', () => ({
  initializeAuth: jest.fn().mockReturnValue({ currentUser: null }),
  signInWithEmailAndPassword: jest.fn(),
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

describe('Login Component', () => {
  test('should render Login component correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    );

    // Verifica si un elemento del componente se renderiza correctamente
    const loginForm = getByTestId('login-form'); // Asegúrate de agregar `testID="login-form"` en el componente
    expect(loginForm).toBeTruthy(); // Verifica que el elemento exista en el árbol de renderizado
  });
});
