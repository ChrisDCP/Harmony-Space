import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../Views/Login';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'MockedIonicons',
}));

jest.mock('expo-linear-gradient', () => {
  const LinearGradient = ({ children }) => children;
  return { LinearGradient };
});


describe('Login Component', () => {
  it('renders correctly with required fields', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    // Verificar que los campos de entrada estén presentes.
    expect(getByPlaceholderText(' email')).toBeTruthy();
    expect(getByPlaceholderText('contraseña')).toBeTruthy();

    // Verificar que el botón de login esté presente.
    expect(getByText('iniciar sesion')).toBeTruthy();
  });
});
