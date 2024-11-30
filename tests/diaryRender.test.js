import React from 'react';
import { render } from '@testing-library/react-native';
import Diary from '../Views/Diary';

describe('Diary Component Rendering', () => {
  it('should render the diary correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<Diary />);
    
    // Verifica que el campo de entrada y el botón de enviar están presentes
    expect(getByPlaceholderText('Escribe un mensaje...')).toBeTruthy();
    expect(getByTestId('send-button')).toBeTruthy();
  });
});