import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import TestOverview from "../Components/test/TestOverView"; // Adjust the path if necessary
import { fetchDailyResults, fetchMonthlyResults } from "../servicios/databaseServices";
import { getAuth } from "firebase/auth";

const StressTrackingScreen = ({ navigation }) => {
  const [dailyResults, setDailyResults] = useState([]);
  const [mainResults, setMainResults] = useState([]);

  // Get the logged-in user ID from Firebase Auth
  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    const loadResults = async () => {
      try {
        const daily = await fetchDailyResults(userId);
        setDailyResults(daily);

        const main = await fetchMonthlyResults(userId);
        setMainResults(main);
      } catch (error) {
        console.error("Error loading results:", error);
      }
    };

    if (userId) {
      loadResults();
    }
  }, [userId]);

  return (
    <LinearGradient colors={['#2C27B4', '#e1e1f9']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Seguimiento de Estrés</Text>
          <Text style={styles.subtitle}>Monitorea tu bienestar diario y mensual</Text>
        </View>


          <Text style={styles.cardTitle}>Test Diario</Text>
          <Text style={styles.cardDescription}>
            Realiza un breve test diario para evaluar tu nivel de estrés y en las ultimas horas.
          </Text>
          <TestOverview
            title="Resultados Diarios"
            data={dailyResults}
            onPress={() => navigation.navigate("DailyTest")}
          />


          <Text style={styles.cardTitle}>Test Mensual</Text>
          <Text style={styles.cardDescription}>
            Evalúa tu progreso mensual y obtén una visión más amplia de tu manejo del estrés a lo largo del tiempo.
          </Text>
          <TestOverview
            title="Resultados Mensuales"
            data={mainResults}
            onPress={() => navigation.navigate("MainTest")}
          />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E9D5FF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#E9D5FF',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default StressTrackingScreen;