import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import { sendMessageToGeminiAi } from "../servicios/OpenAi"; // Importa tu función para enviar mensajes
import { Ionicons } from "@expo/vector-icons";

export default function Chatbot() {
  const [message, setMessage] = useState(""); // Mensaje del usuario
  const [chatHistory, setChatHistory] = useState([]); // Historial de chat (estado local)
  const chatboxRef = useRef(null);

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      return Alert.alert("Debe escribir un mensaje");
    }

    // Crear el mensaje del usuario
    const userMessage = { role: "user", parts: [{ text: message }] };

    // Actualizar el historial con el mensaje del usuario
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
 // Actualiza el estado local

    setMessage(""); // Limpia el input
    Keyboard.dismiss();

    try {
      // Llama a la función `sendMessageToGeminiAi` pasando el mensaje del usuario y el historial
      const response = await sendMessageToGeminiAi(message, chatHistory);

      // Agregar la respuesta del bot al historial
      const botMessage = { role: "model", parts: [{ text: response.text }] };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]); // Actualiza con el historial procesado
    } catch (error) {
      // Manejo del error
      console.error("Error al obtener respuesta del bot:", error);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "model", parts: [{ text: "Error al obtener respuesta." }] },
    ]);
    }
  };

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  

  useEffect(() => {
    if (chatboxRef.current) {
        chatboxRef.current.scrollToEnd({ animated: true });
    }
}, [chatHistory]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer} 
      ref={chatboxRef}
      contentContainerStyle={{padding:10}}
      >
{chatHistory.map((chat, index) => {
  const messageText = chat.parts[0]?.text;

  // Verificar si el contenido es un JSON válido
  if (chat.role === "model" && isJsonString(messageText)) {
    const exercise = JSON.parse(messageText);

    return (
      <View key={index} style={styles.botMessage}>
        {exercise.response && <Text style={styles.response} selectable={true}>{exercise.response}</Text>}
        {exercise.title && <Text style={styles.title} selectable={true}>{exercise.title}</Text>}
        {exercise.description && <Text style={styles.description} selectable={true}>{exercise.description}</Text>}
      </View>
    );
  }

  // Renderizar texto normal
  return (
    <Text
      key={index}
      style={
        chat.role === "user" ? styles.userMessage : styles.botMessage
      }
      selectable={true}
    >
      {messageText || ""}
    </Text>
  );
})}
      </ScrollView>
      <View style={styles.send}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje..."
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <Ionicons name="send-outline" color="#A57CFE" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#AAE6FF",
  },
  chatContainer: {
    top: 20,
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 40,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#D9EFE4",
    padding: 10,
    borderRadius: 21,
    marginVertical: 5,
    maxWidth: "85%",
    marginRight: 10,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 26,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#AAD6F6",
    padding: 10,
    borderRadius: 21,
    marginVertical: 5,
    maxWidth: "85%",
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 26,
  },
  send: {
    backgroundColor: "white",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    marginBottom: -20,
    height: 62,
    position: "relative",
  },
  input: {
    padding: 10,
    width: "90%",
  },
  response: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A67D8",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#2D3748",
  },
});
