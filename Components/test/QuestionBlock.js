import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionBlock = ({ question, options, onSelect }) => {

  const handleOptionPress = (score) => {
    if (typeof onSelect === 'function') {
      onSelect(score); // Aquí se asegura que siempre envía un número
    }

  };
  return (
    <View>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.optionButton}
          onPress={() => handleOptionPress(option.score)}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default QuestionBlock;
