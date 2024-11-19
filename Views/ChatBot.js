// Chatbot.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { sendMessageToGeminiAi } from "../servicios/OpenAi";
import { Ionicons } from "@expo/vector-icons";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return Alert.alert("debe escribir un mensaje");

    const userMessage = { sender: "user", text: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage("");
    Keyboard.dismiss();
    try {
      const response = await sendMessageToGeminiAi(message);
      const botMessage = { sender: "bot", text: response };
      console.log(response);
      setChatHistory([...chatHistory, userMessage, botMessage]);
    } catch (error) {
      setChatHistory([
        ...chatHistory,
        userMessage,
        { sender: "bot", text: "Error al obtener respuesta." },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <Text
            key={index}
            style={
              chat.sender === "user" ? styles.userMessage : styles.botMessage
            }
          >
            {chat.text}
          </Text>
        ))}
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
    paddingVertical: 20,
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
});
