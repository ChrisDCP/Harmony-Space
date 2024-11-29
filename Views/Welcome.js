import React, { useEffect, useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Añadí este ícono para el botón de enviar
import Color from '../../Color/PaletaColor';

const ChatbotComponent = () => {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const chatboxRef = useRef(null);

    // Función que obtiene la respuesta de la IA
    const getAIResponse = async (userInput) => {
        const apiKey = 'AIzaSyBDSmQgTV4Q0f3dtU-UHvYa6NYQ2vjSTzA';  // Asegúrate de reemplazar con tu clave de API real
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
        try {
            const prompt = `
                Eres Whipi, un chatbot especializado en medicina naturista complementaria, con un enfoque específico en la medicina naturista practicada en Nicaragua. 
                Tu conocimiento abarca teorías, prácticas tradicionales, y el uso de remedios, plantas medicinales y terapias naturales utilizadas en el país. 
                Si recibes preguntas o información no relacionada con la medicina naturista en Nicaragua, responde con: "No tengo información sobre ese tema. Solo puedo ayudarte con medicina naturista." 
                Si alguien te pregunta quién te creó, responde: "Fui creado por el Instituto Josefa Toledo de Aguerri." 
                Tu objetivo es proporcionar respuestas claras y útiles sobre este campo, manteniéndote dentro de tu área de especialización.
                
                El usuario ha dicho: "${userInput}". 
                Responde de manera detallada y coherente a la consulta del usuario.
            `;
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]  // Se envía el prompt completo con el contexto y el input del usuario
                    }]
                }),
            });
    
            // Convertir la respuesta a JSON
            const data = await response.json();
    
            // Extraer el texto de la respuesta
            const aiText = data.candidates[0].content.parts[0].text;
            console.log('AI Response:', aiText);
            return aiText; // Devuelve el texto para usarlo en la conversación
        } catch (error) {
            console.error('Error fetching AI response:', error);
            return 'Lo siento, hubo un problema al obtener la respuesta del chatbot.'; // Mensaje de error para mostrar al usuario
        }
    };
    
    const conversacion = async () => {
        try {
            // Mensaje del usuario
            const Usuario = {
                user: 'Tu',
                message: input,
                type: 'user',
            };
    
            // Llamar a la función para obtener la respuesta del bot, pasando el input del usuario
            const botResponse = await getAIResponse(input);
    
            // Mensaje del bot
            const bot = {
                user: 'Whipi',
                message: botResponse,
                type: 'bot',
            };
    
            // Actualizar la conversación
            setConversation((prevConversation) => [...prevConversation, Usuario, bot]);
            setInput(''); // Limpiar el input
    
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollToEnd({ animated: true });
        }
    }, [conversation]);

    return (
        <View style={styles.container}>
            <View style={styles.efecto}>
                <View style={styles.title}>
                    <Text style={styles.titulo}>¡Hola, Bienvenido!</Text>
                    <View style={styles.separador} />
                    <Text style={styles.info}>Estamos aquí para ayudarte...</Text>
                </View>
                <View style={styles.fondoImage}>
                    <Image
                        source={require('../../../assets/boticono.png')}
                        style={styles.image}
                    />
                </View>
            </View>

            <View style={styles.chatContainer}>
                <ScrollView
                    ref={chatboxRef}
                    style={styles.chatBody}
                    contentContainerStyle={styles.chatContent}
                    showsVerticalScrollIndicator={false}
                >
                    {conversation.map((message, index) => (
                        <View key={index} style={message.type === 'user' ? styles.userMessage : styles.botMessage}>
                            <Text style={styles.messageUser}>{message.user}: </Text>
                            <Text style={styles.mes}>{message.message}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.chatFooter}>
                    <TextInput
                        style={styles.inputChat}
                        value={input}
                        placeholder="Pregunta algo..."
                        onChangeText={setInput}
                        placeholderTextColor="#c2c2c2"
                    />
                    <TouchableOpacity style={styles.btnSend} onPress={conversacion}>
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4'
    },
    chatContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
        paddingBottom: 10,
        backgroundColor: '#f4f4f4', // Fondo del chat para mejor contraste
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
    },
    chatBody: {
        maxHeight: 460,
    },
    chatContent: {
        padding: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Color.COLOR_SECUNDARIO,
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: Color.COLOR_BLUE,
        borderRadius: 20,
        padding: 10,
        marginVertical: 5,
        maxWidth: '75%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4,
    },
    messageUser: {
        fontWeight: 'bold',
        color: '#fff',
    },
    mes: {
        color: '#fff',
    },
    chatFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 4,
    },
    inputChat: {
        flex: 1,
        borderRadius: 25,
        borderColor: Color.COLOR_SECUNDARIO,
        borderWidth: 2,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    btnSend: {
        backgroundColor: Color.COLOR_SECUNDARIO,
        borderRadius: 25,
        padding: 10,
        marginLeft: 10,
    },
    efecto: {
        backgroundColor: Color.COLOR_SECUNDARIO,
        width: '100%',
        height: 300,
        borderRadius: 35,
        marginTop: -50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
    },
    info: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'normal',
    },
    title: {
        width: '90%',
        height: 70,
        alignItems: 'center',
        marginTop: 50,
    },
    fondoImage: {
        width: '90%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
    },
});

export default ChatbotComponent;
