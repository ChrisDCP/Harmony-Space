// /tests/components/ChatbotRender.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import Chatbot from '../Views/ChatBot';
import Player from '../Components/Player';
import Cards from '../Components/Cards';
import Diary from '../Views/Diary';

describe('Chatbot Component Rendering', () => {
  it('should render the chatbot correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<Diary />);
    
    // Verifica que el campo de entrada y el botón de enviar están presentes
    expect(getByPlaceholderText('Escribe un mensaje...')).toBeTruthy();
    expect(getByTestId('send-button')).toBeTruthy();
  });
});
