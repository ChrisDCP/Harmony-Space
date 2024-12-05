import React,{useState, useEffect} from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const TestOverview = ({ title, chartData, onStartTest, isTestAvailable }) => {

  // Datos predeterminados si chartData es undefined o no tiene datasets
  const defaultData = {
    labels: ["No Data"],
    datasets: [
      {
        data: [0], // Valor predeterminado
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* Gráfica */}
      <LineChart
        data={chartData && chartData.datasets?.length > 0 ? chartData : defaultData}
        width={320}
        height={220}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f8f9fa",
          backgroundGradientTo: "#e9ecef",
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      {/* Mensaje sobre disponibilidad */}
      {!isTestAvailable && (
        <Text style={styles.message}>
          Ya realizaste este test. Vuelve en el tiempo adecuado
        </Text>
      )}

      {/* Botón para realizar el test */}
      <Button
        title="Realizar Test"
        onPress={onStartTest}
        disabled={!isTestAvailable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 10,
  },
  message: {
    fontSize: 14,
    color: "#A57CFE",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default TestOverview;
