import React from 'react';
import { render } from '@testing-library/react-native';
import Chatbot from '../Views/ChatBot';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'MockedIonicons',
}));

jest.mock('expo-linear-gradient', () => {
  const LinearGradient = ({ children }) => children;
  return { LinearGradient };
});


describe('Chatbot Component', () => {
  it('renders correctly with given props', () => {
    const { getByPlaceholderText, getByText } = render(
      <Chatbot />
    );

    // Verifica que el placeholder del input esté presente.
    expect(getByPlaceholderText('Escribe un mensaje...')).toBeTruthy();
  });
});
