import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainTestScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Test</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Mensual</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MonthlyTest')}
        >
          <Text style={styles.buttonText}>Ir al Test Mensual</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Diario</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DailyTest')}
        >
          <Text style={styles.buttonText}>Ir al Test Diario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A57CFE',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  section: {
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5a8df4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainTestScreen;
