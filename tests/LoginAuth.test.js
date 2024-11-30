// /tests/components/LoginAuthentication.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../Views/Login';  // Ajusta la ruta según tu proyecto

describe('Login Component - Authentication', () => {
  it('should handle login process successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), '123456');

    fireEvent.press(getByText('Iniciar sesión'));

    await waitFor(() => {
      // Ajusta el texto que aparece después de un login exitoso
      expect(getByText('Bienvenido')).toBeTruthy();
    });
  });

  it('should display an error message when credentials are incorrect', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@example.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'wrongpassword');

    fireEvent.press(getByText('Iniciar sesión'));

    await waitFor(() => {
      // Ajusta el texto de error que aparece cuando las credenciales son incorrectas
      expect(getByText('Credenciales incorrectas')).toBeTruthy();
    });
  });
});
