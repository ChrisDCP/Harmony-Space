import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Diary from '../Views/Diary';

jest.mock('expo-linear-gradient', ()=>({
  LinearGradient: jest.fn(({children})=> children)
}))

jest.mock('@expo/vector-icons', () => ({
  Ionicons: jest.fn(() => null),
}));


describe('Diary - Comportamiento del modal', () => {
  it('debería abrir el modal al presionar el botón de añadir', () => {
    const { getByTestId, getByText } = render(<Diary />);
    
    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);
    
    // Verifica que el modal aparece
    expect(getByText('Nueva Entrada')).toBeTruthy();
  });
});

describe('Diary - Agregar nueva entrada', () => {
  it('debería agregar una nueva entrada y mostrarla en la lista', () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<Diary />);
    
    // Abre el modal
    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);
    
    // Completa los campos de entrada
    const titleInput = getByPlaceholderText('Título');
    const contentInput = getByPlaceholderText('¿Qué quieres recordar hoy?');
    fireEvent.changeText(titleInput, 'Mi nueva entrada');
    fireEvent.changeText(contentInput, 'Hoy fue un gran día.');
    
    // Guarda la entrada
    const saveButton = getByTestId('save-button');
    fireEvent.press(saveButton);
    
    // Verifica que la entrada aparece en la lista
    expect(getByText('Mi nueva entrada')).toBeTruthy();
    expect(getByText('Hoy fue un gran día.')).toBeTruthy();
  });
});
