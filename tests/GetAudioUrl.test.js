import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Player from "../Components/Player";

describe("Player Component", () => {
  it("debería renderizar correctamente la URL del audio y permitir la reproducción", async () => {
    const mockAudioUrl = "https://example.com/audio.mp3";
    const mockTitle = "Sample Audio";
    const mockImageUrl = "https://example.com/image.jpg";
    const onCloseMock = jest.fn();

    const { getByText, getByLabelText } = render(
      <Player
        audioUrl={mockAudioUrl}
        title={mockTitle}
        imageUrl={mockImageUrl}
        isVisible={true}
        onClose={onCloseMock}
      />
    );

    // Comprueba que el título se renderiza
    expect(getByText(mockTitle)).toBeTruthy();

    // Comprueba los tiempos iniciales
    expect(getByLabelText("current-time")).toHaveTextContent("0:00");
    expect(getByLabelText("total-duration")).toHaveTextContent("0:00");

    // Simula interacción con el botón de play/pause
    const playPauseButton = getByText(/play/i); // Encuentra el botón de reproducción
    fireEvent.press(playPauseButton);

    // Puedes agregar más verificaciones si el estado de reproducción cambia
  });
});
