import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TestResult = ({ title, score, message }) => {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>{title}</Text>
      <Text style={styles.resultScore}>Puntaje final: {score}</Text>
      <Text style={styles.resultMessage}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
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

export default TestResult;
