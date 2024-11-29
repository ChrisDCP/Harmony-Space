import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";



// Extraer la API Key desde las variables de entorno
const apiKey = "AIzaSyCvrN5yfEuQeWZnG-ZY8LJSEV1QvYd1_3o"

// Crear instancia del modelo con las instrucciones
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: `
    Eres parte de una aplicación que ayuda a las personas a controlar sus niveles de estrés y ansiedad.
    Acompañarás a los usuarios y les darás indicaciones para reducir el estrés. si no quieren ejercicios solo ofrece compañia y escucha.
    si este te pide o le ofreces y acepta metodos para relajarse (respiraciones, meditaciones o demas acciones que puedan ayudar a la relajacion), le muestras los ejercicios (si no ha aceptado solo sigue hablando) con el siguiente formato:
      - "response": Una breve y amable invitacion a realizar la actividad. 
      - "title": El nombre de la actividad recomendada(solo titulo, sin mas informacion).
      - "description": Una descripción detallada de los pasos.
    (no convines los formatos)
      Ejemplo:
    {
      "response": "Excelente. Aquí tienes una rutina sencilla:",
      "title": "Relajación Muscular",
      "description": "1. **Cuello:** Inclina la cabeza lentamente hacia un lado, manteniendo la posición por 15 segundos...(continua todo el ejercicio)"
    }
  `,
});

// Configuración general para generación de respuestas
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
};

// Función para enviar mensajes
export const sendMessageToGeminiAi = async (userMessage, chatHistory) => {
  try {
    // Iniciar sesión de chat con el historial pasado como argumento
    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory, // El historial dinámico se pasa aquí
    });

    // Enviar el mensaje del usuario y obtener la respuesta
    const result = await chatSession.sendMessage(userMessage);

    // Devolver el resultado procesado
    return {
      text: result.response.text(),
      history: [
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage }] }, // Agregar mensaje del usuario
        { role: "model", parts: [{ text: result.response.text() }] }, // Agregar respuesta del modelo
      ],
    };
  } catch (error) {
    console.error("Error al comunicarse con GeminiAI:", error);
    console.log(apiKey)
    throw error;
  }
};
