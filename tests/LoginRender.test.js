// /tests/components/LoginRender.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import Login from '../Views/Login'; 

describe('Login Component Rendering', () => {
  it('should render the login screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Verifica si los campos de entrada y el botón están presentes
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(getByText('Iniciar sesión')).toBeTruthy();
  });
});
