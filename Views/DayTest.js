import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import ProgressBar from '../Components/test/ProgressBar';
import ModalIntro from '../Components/test/ModalIntro';
import QuestionBlock from '../Components/test/QuestionBlock';
import TestResult from '../Components/test/TestResult';
import { DailyQuestions } from '../Components/test/Questions';
import { db, ref, get, set, auth } from '../servicios/firebase';

const DailyTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isTestAllowed, setIsTestAllowed] = useState(true);

  const userId = auth.currentUser.uid;

  useEffect(() => {
    checkDailyTestAvailability();
  }, []);

  const checkDailyTestAvailability = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Fecha actual en formato YYYY-MM-DD
      const resultRef = ref(db, `users/${userId}/dailyTestResults/${today}`);
      const snapshot = await get(resultRef);
  
      if (snapshot.exists()) {
        setIsTestAllowed(false); // Test ya realizado hoy
      } else {
        setIsTestAllowed(true); // Test disponible
      }
    } catch (error) {
      console.error("Error al verificar disponibilidad del test diario:", error);
    }
  };
  

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswer = (points) => {
    setScore((prevScore) => prevScore + points); // Suma el puntaje recibido
    if (currentQuestionIndex < DailyQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Avanza a la siguiente pregunta
    } else {
      // Cuando se termina, guarda el resultado
      setIsTestCompleted(true)
      saveDailyResult(score + points); // Suma el último puntaje
    }
  };

  const saveDailyResult = async (score) => {
    try {
      const today = new Date().toISOString().split("T")[0]; // Obtener solo la fecha (YYYY-MM-DD)
      const resultRef = ref(db, `users/${userId}/dailyTestResults/${today}`);
  
      await set(resultRef, {
        date: new Date().toISOString(), // Fecha y hora completa
        score: score, // Puntuación del día
      });
  
      console.log("Resultado diario guardado correctamente.");
    } catch (error) {
      console.error("Error al guardar el resultado diario:", error);
    }
  };

  if (!isTestAllowed) {
    return (
      <View style={styles.container}>
        <TestResult
          score={null}
          totalQuestions={DailyQuestions.length}
          message="Ya realizaste el test diario de hoy. ¡Vuelve mañana para continuar con tu seguimiento!"
        />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {!isTestStarted ? (
        <ModalIntro
          title="Test Diario"
          description="Este test evalúa cómo te sentiste durante el día. Responde con sinceridad para llevar un seguimiento adecuado."
          onStart={handleStartTest}
        />
      ) : isTestCompleted ? (
        <TestResult
          score={score}
          totalQuestions={DailyQuestions.length}
          message="¡Gracias por completar el test diario! Continúa con este hábito para un mejor seguimiento."
          onRetry={null} // No permitir reintentos
        />
      ) : (
        <View>
          {/* Barra de progreso */}
          <ProgressBar
            progress={(currentQuestionIndex + 1) / DailyQuestions.length}
          />
  
          {/* Bloque de preguntas */}
          <QuestionBlock
            question={DailyQuestions[currentQuestionIndex].question}
            options={DailyQuestions[currentQuestionIndex].options}
            onSelect={handleAnswer}
          />
        </View>
      )}
    </View>
  );
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default DailyTest;
