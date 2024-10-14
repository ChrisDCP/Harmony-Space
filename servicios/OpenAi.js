
import { GoogleGenerativeAI } from "@google/generative-ai"
import Constants from "expo-constants"


const apiKey = Constants.expoConfig.extra.geminiapikey
const genAI = new GoogleGenerativeAI(apiKey)


const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: `Serás parte de una aplicación que ayuda a las personas a controlar sus niveles de estrés y ansiedad. 
                      Acompañarás y darás indicaciones de qué pueden hacer para disminuir el estrés y ansiedad. 
                      No des respuesta a mensajes que no tengan nada que ver con el tema.`,
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  //maxOutputTokens: 8192,
  responseMimeType: "application/json",
}


export const sendMessageToGeminiAi = async (message) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: message }],
        },
        
        {
          role: "model",
          parts: [
            {text: "```json\n{\"response\": \"Entiendo que te sientas estresado hoy. ¿Quieres hablar sobre qué te hace sentir así? A veces, identificar las causas del estrés puede ayudarnos a encontrar soluciones. También podemos explorar algunas técnicas de relajación juntos. Recuerda que no estás solo en esto.\"}\n\n```"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "puedes ayudarme con una tarea de programacion?"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\"response\": \"Lo siento, mi función es ayudarte a manejar el estrés y la ansiedad. No puedo ayudarte con tareas de programación, pero si te sientes abrumado por la tarea, podemos intentar buscar juntos algunas técnicas de relajación y organización para que te sientas mejor.\"}\n\n\n```"},
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(message)
    return result.response.text()
  } catch (error) {
    console.error('Error comunicando con GeminiAI:', error)
    throw error
  }
}
