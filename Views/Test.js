import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import questions from '../Components/Questions';
import { db, ref, set } from '../servicios/firebase';

const StressTest = ({ userId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

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

  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      {completed ? (
        <Text style={styles.resultText}>Puntaje final: {score}</Text>
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
    resultText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    
    progressBar: {
    marginVertical: 20,
    },
  });


export default StressTest;
