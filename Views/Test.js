import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import questions from '../Components/Questions';
import { db, ref, set, auth } from '../servicios/firebase';

const StressTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const userId = auth.currentUser.uid

  const handleAnswer = (optionScore) => {
    setScore(score + optionScore);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
      saveResult(score + optionScore);
    }
  };

  const saveResult = async (finalScore) => {
    try {
      await set(ref(db, `users/${userId}/stressTestResults`), {
        score: finalScore,
        date: new Date().toISOString(),
      });
      alert("Resultado guardado con éxito.");
    } catch (error) {
      console.error("Error al guardar el resultado:", error);
      alert("Hubo un error al guardar el resultado.");
    }
  };

  const getResultMessage = (finalScore) => {
    if (finalScore <= 13) {
      return {
        title: "Nivel de Estrés Bajo",
        message: "Te sientes bastante relajado en tu vida diaria. Mantente así y recuerda cuidar tu salud mental.",
      };
    } else if (finalScore <= 26) {
      return {
        title: "Nivel de Estrés Moderado",
        message: "Experimentas un nivel moderado de estrés. Considera prácticas de manejo de estrés como la meditación o el ejercicio.",
      };
    } else {
      return {
        title: "Nivel de Estrés Alto",
        message: "Es posible que estés experimentando un alto nivel de estrés. Considera hablar con un profesional para obtener apoyo adicional.",
      };
    }
  };

  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      {completed ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{getResultMessage(score).title}</Text>
          <Text style={styles.resultScore}>Puntaje final: {score}</Text>
          <Text style={styles.resultMessage}>{getResultMessage(score).message}</Text>
        </View>
      ) : (
        <>
          <View style={styles.form}>
            <Progress.Bar 
              progress={progress} 
              width={null} 
              color="#5a8df4"
              borderRadius={5}
              height={10}
              style={styles.progressBar}
            />

            <Text style={styles.questionText}>
              {questions[currentQuestionIndex].question}
            </Text>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option.score)}
              >
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A57CFE',
      justifyContent: 'center',
    },
    form:{
        backgroundColor:'#fff',
        height:'90%',
        width:'100%',
        padding:20,
        justifyContent:'center',
        borderRadius:45
    },
    questionText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    optionButton: {
      backgroundColor: '#5a8df4',
      paddingVertical: 15,
      borderRadius: 10,
      marginVertical: 8,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
      color: '#fff',
    },
    resultContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
      },
    resultText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
    },
    
    progressBar: {
    marginVertical: 20,
    },
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
      },
      resultScore: {
        fontSize: 20,
        color: '#555',
        marginBottom: 20,
      },
      resultMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 10,
      },
  });


export default StressTest;
