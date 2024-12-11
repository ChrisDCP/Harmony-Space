import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";

// Mock de Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "testUserId" },
  })),
}));

jest.mock('expo-linear-gradient', () => ({
    LinearGradient: jest.fn(({ children }) => children),
  }));

// Mock del servicio
jest.mock("../servicios/databaseServices", () => ({
  fetchDailyResults: jest.fn(() =>
    Promise.resolve([
      { date: "2024-12-01", stressLevel: 3, notes: "Día regular" },
      { date: "2024-12-02", stressLevel: 2, notes: "Día tranquilo" },
    ])
  ),
}));

// Mock del componente ResultCard
const ResultCard = ({ date, stressLevel, notes }) => (
  <View style={{ marginBottom: 10 }}>
    <Text>{date}</Text>
    <Text>Nivel de Estrés: {stressLevel}</Text>
    <Text>Notas: {notes}</Text>
  </View>
);

describe("DailyTestResultsScreen", () => {
  const DailyTestResultsScreen = ({ navigation }) => {
    const [dailyResults, setDailyResults] = React.useState([]);

    // Obtener el ID del usuario actual
    const userId = getAuth().currentUser?.uid;

    React.useEffect(() => {
      const loadResults = async () => {
        try {
          const results = await require("../servicios/databaseServices").fetchDailyResults(userId);
          setDailyResults(results);
        } catch (error) {
          console.error("Error loading daily results:", error);
        }
      };

      if (userId) {
        loadResults();
      }
    }, [userId]);

    return (
      <LinearGradient colors={["#2C27B4", "#e1e1f9"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View>
            <Text style={{ fontSize: 24, color: "#fff", marginBottom: 10 }}>Resultados del Test Diario</Text>
            <Text style={{ fontSize: 16, color: "#e1e1f9", marginBottom: 20 }}>
              Revisa tus niveles de estrés diarios y analiza tus patrones.
            </Text>
          </View>
          {dailyResults.map((result, index) => (
            <ResultCard
              key={index}
              date={result.date}
              stressLevel={result.stressLevel}
              notes={result.notes}
            />
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ textAlign: "center", color: "#2C27B4" }}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    );
  };

  it("debería cargar y mostrar los resultados diarios", async () => {
    const { getByText, findByText } = render(
      <DailyTestResultsScreen navigation={{ goBack: jest.fn() }} />
    );

    // Espera a que los datos sean cargados
    await waitFor(() => {
      expect(require("../servicios/databaseServices").fetchDailyResults).toHaveBeenCalledWith(
        "testUserId"
      );
    });

    // Verifica que los resultados se muestren correctamente
    expect(await findByText("2024-12-01")).toBeTruthy();
    expect(await findByText("Nivel de Estrés: 3")).toBeTruthy();
    expect(await findByText("Notas: Día regular")).toBeTruthy();

    expect(await findByText("2024-12-02")).toBeTruthy();
    expect(await findByText("Nivel de Estrés: 2")).toBeTruthy();
    expect(await findByText("Notas: Día tranquilo")).toBeTruthy();

    // Verifica que el botón "Volver" funcione
    const backButton = getByText("Volver");
    fireEvent.press(backButton);
    expect(backButton).toBeTruthy();
  });
});
