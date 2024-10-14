// Chatbot.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { sendMessageToGeminiAi } from '../servicios/OpenAi';

export default function Chatbot() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { sender: 'user', text: message };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await sendMessageToGeminiAi(message);
      const botMessage = { sender: 'bot', text: response };
      setChatHistory([...chatHistory, userMessage, botMessage]);
      
    } catch (error) {
      setChatHistory([...chatHistory, userMessage, { sender: 'bot', text: 'Error al obtener respuesta.' }]);
    }
    
    setMessage(''); 
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <Text key={index} style={chat.sender === 'user' ? styles.userMessage : styles.botMessage}>
            {chat.text}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Escribe un mensaje..."
      />
      <Button title="Enviar" onPress={handleSendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
