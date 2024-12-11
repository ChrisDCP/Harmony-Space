import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Chatbot from "../Views/ChatBot";
import * as OpenAi from "../servicios/OpenAi";

jest.mock("../servicios/OpenAi", () => ({
  sendMessageToGeminiAi: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'MockedIonicons',
  }));

describe("Chatbot - Respuesta del bot", () => {
  it("debería agregar la respuesta del bot al historial después de enviar un mensaje", async () => {
    // Mock de la respuesta de OpenAi
    OpenAi.sendMessageToGeminiAi.mockResolvedValueOnce({
      text: "Hola, soy un bot. ¿En qué puedo ayudarte?",
    });

    const { getByPlaceholderText, getByTestId, queryByText } = render(<Chatbot />);


    // Verificar que el historial esté vacío inicialmente
    expect(queryByText("Hola, soy un bot. ¿En qué puedo ayudarte?")).toBeNull();

    // Simular el envío de un mensaje
    const input = getByPlaceholderText("Escribe un mensaje...");
    const sendButton = getByTestId("send-button");

    fireEvent.changeText(input, "Hola");
    fireEvent.press(sendButton);

    // Esperar a que se actualice el historial del chat
    await waitFor(() => {
      expect(queryByText("Hola")).not.toBeNull(); // Mensaje del usuario
      expect(queryByText("Hola, soy un bot. ¿En qué puedo ayudarte?")).not.toBeNull(); // Respuesta del bot
    });
  });
});
