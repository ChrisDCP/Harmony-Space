import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBar from '../Components/test/ProgressBar'; // Barra de progreso reutilizable
import ModalIntro from '../Components/test/ModalIntro'; // Modal de introducción
import QuestionBlock from '../Components/test/QuestionBlock'; // Bloque de preguntas reutilizable
import TestResult from '../Components/test/TestResult'; // Vista de resultados
import { MonthQuestions } from '../Components/test/Questions'; // Preguntas del test mensual
import { db, ref, set, get, auth } from '../servicios/firebase';

const MonthlyTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [isTestAllowed, setIsTestAllowed] = useState(true);
  
  const userId = auth.currentUser.uid;

  useEffect(() => {
    checkMonthlyTestAvailability();
    console.log(isTestAllowed)
  }, []);
  
  const checkMonthlyTestAvailability = async () => {
    try {
      const today = new Date();
      const yearMonthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`; // "YYYY-MM"
      const resultRef = ref(db, `users/${userId}/monthlyTestResults/${yearMonthKey}`);
      const snapshot = await get(resultRef);
  
      if (snapshot.exists()) {
        console.log("El test mensual ya fue realizado este mes.");
        setIsTestAllowed(false); // No permitir
      } else {
        setIsTestAllowed(true); // Permitir
      }
    } catch (error) {
      console.error("Error checking test availability:", error);
    }
  };
     
  

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleAnswer = (points) => {
    setScore((prevScore) => prevScore + points); // Suma el puntaje recibido
    if (currentQuestionIndex < MonthQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Avanza a la siguiente pregunta
    } else {
      // Cuando se termina, guarda el resultado
      setIsTestCompleted(true)
      saveMonthlyResult(score + points); // Suma el último puntaje
    }
  };

  const saveMonthlyResult = async () => {
    if (!isTestAllowed) {
      alert("Ya has realizado el test mensual este mes.");
      return;
    }

    try {
      const today = new Date();
      const yearMonthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`; // "YYYY-MM"
      const resultRef = ref(db, `users/${userId}/monthlyTestResults/${yearMonthKey}`);
  
      await set(resultRef, {
        date: today.toISOString(),
        score,
      });
  
      console.log("Resultado mensual guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el resultado mensual:", error);
    }
  };

  if (!isTestAllowed) {
    return (
      <View style={styles.container}>
        <TestResult
          score={null}
          totalQuestions={MonthQuestions.length}
          message="Ya realizaste el test mensual. Podrás hacerlo nuevamente el próximo mes."
        />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {!isTestStarted ? (
        <ModalIntro
          title="Test Mensual"
          description="Este test evalúa tu estado general del mes. Responde con sinceridad para obtener un seguimiento más preciso."
          onStart={handleStartTest}
        />
      ) : isTestCompleted ? (
        <TestResult
          score={score}
          totalQuestions={MonthQuestions.length}
          message="¡Has completado el test mensual! Gracias por completarlo."
          onRetry={null} // No permitir reintentar el test mensual
        />
      ) : (
        <View>
          {/* Barra de progreso */}
          <ProgressBar
            progress={(currentQuestionIndex + 1) / MonthQuestions.length}
          />
  
          {/* Bloque de preguntas */}
          <QuestionBlock
            question={MonthQuestions[currentQuestionIndex].question}
            options={MonthQuestions[currentQuestionIndex].options}
            onSelect={handleAnswer}
          />
        </View>
      )}
    </View>
  );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default MonthlyTest;
