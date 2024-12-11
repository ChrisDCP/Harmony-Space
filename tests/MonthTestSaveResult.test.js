import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from "firebase/auth";

jest.mock('expo-linear-gradient', () => ({
    LinearGradient: jest.fn(({ children }) => children),
  })); 

// Mock de Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "testUserId" },
  })),
}));

// Mock de los servicios
jest.mock('../servicios/databaseServices', () => ({
  fetchDailyResults: jest.fn(() => Promise.resolve([
    { date: "2024-12-01", score: 3 },
    { date: "2024-12-02", score: 2 },
  ])),
  fetchMonthlyResults: jest.fn(() => Promise.resolve([
    { month: "November 2024", averageScore: 2.5 },
    { month: "October 2024", averageScore: 3.0 },
  ])),
}));

// Mock del componente TestOverview
const TestOverview = ({ title, data, onPress }) => (
  <View>
    <Text>{title}</Text>
    {data.map((item, index) => (
      <Text key={index}>
        {item.date || item.month}: {item.score || item.averageScore}
      </Text>
    ))}
    <TouchableOpacity onPress={onPress}>
      <Text>Realizar Test</Text>
    </TouchableOpacity>
  </View>
);

describe('StressTrackingScreen', () => {
  const StressTrackingScreen = ({ navigation }) => {
    const [dailyResults, setDailyResults] = React.useState([]);
    const [mainResults, setMainResults] = React.useState([]);

    // Obtener el ID del usuario actual
    const userId = getAuth().currentUser?.uid;

    React.useEffect(() => {
      const loadResults = async () => {
        try {
          const daily = await require('../servicios/databaseServices').fetchDailyResults(userId);
          setDailyResults(daily);

          const main = await require('../servicios/databaseServices').fetchMonthlyResults(userId);
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
      <LinearGradient colors={['#2C27B4', '#e1e1f9']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View>
            <Text style={{ fontSize: 24, color: '#fff', marginBottom: 10 }}>Seguimiento de Estrés</Text>
            <Text style={{ fontSize: 16, color: '#e1e1f9', marginBottom: 20 }}>
              Monitorea tu bienestar diario y mensual
            </Text>
          </View>

          <Text style={{ fontSize: 18, color: '#fff', marginBottom: 10 }}>Test Diario</Text>
          <Text style={{ fontSize: 14, color: '#e1e1f9', marginBottom: 10 }}>
            Realiza un breve test diario para evaluar tu nivel de estrés en las últimas horas.
          </Text>
          <TestOverview
            title="Resultados Diarios"
            data={dailyResults}
            onPress={() => navigation.navigate("DailyTest")}
          />

          <Text style={{ fontSize: 18, color: '#fff', marginBottom: 10 }}>Test Mensual</Text>
          <Text style={{ fontSize: 14, color: '#e1e1f9', marginBottom: 10 }}>
            Evalúa tu progreso mensual y obtén una visión más amplia de tu manejo del estrés a lo largo del tiempo.
          </Text>
          <TestOverview
            title="Resultados Mensuales"
            data={mainResults}
            onPress={() => navigation.navigate("MonthlyTest")}
          />
        </ScrollView>
      </LinearGradient>
    );
  };

  it('debería enviar correctamente el resultado del test mesual ', async () => {
    const { getByText, findByText } = render(<StressTrackingScreen navigation={{ navigate: jest.fn() }} />);

    // Espera a que los datos sean cargados
    await waitFor(() => {
      expect(require('../servicios/databaseServices').fetchDailyResults).toHaveBeenCalledWith("testUserId");
      expect(require('../servicios/databaseServices').fetchMonthlyResults).toHaveBeenCalledWith("testUserId");
    });

    // Verifica que los resultados diarios se muestren correctamente
    expect(await findByText("2024-12-01: 3")).toBeTruthy();
    expect(await findByText("2024-12-02: 2")).toBeTruthy();

    // Verifica que los resultados mensuales se muestren correctamente
    expect(await findByText("November 2024: 2.5")).toBeTruthy();

    // Verifica que los botones para realizar el test estén presentes

  });
});
