import React from 'react';
import { render } from '@testing-library/react-native';
import Player from '../Components/Player'; // Ajusta el path según tu proyecto.

jest.mock('expo-av', () => ({
    Audio: {
      Sound: {
        createAsync: jest.fn(() => ({
          sound: {
            playAsync: jest.fn(),
            pauseAsync: jest.fn(),
            unloadAsync: jest.fn(),
          },
        })),
      },
    },
  }));
  
  jest.mock('expo-linear-gradient', () => {
    const LinearGradient = ({ children }) => children;
    return { LinearGradient };
  });
  
  jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'MockedIonicons',
  }));
  

describe('Player Component', () => {
  it('renders correctly with given props', () => {
    const mockOnClose = jest.fn();

    const { getByText } = render(
      <Player
        audioUrl="https://example.com/audio.mp3"
        title="Test Audio"
        imageUrl="https://example.com/image.jpg"
        isVisible={true}
        onClose={mockOnClose}
      />
    );

    expect(getByText('Test Audio')).toBeTruthy();
  });
});
