import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ResultsChart = ({ labels, data, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: data }]
        }}
        width={Dimensions.get("window").width - 40} // Ancho del gráfico
        height={220}
        yAxisSuffix=" pts" // Sufijo en el eje Y
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#e0f7fa",
          backgroundGradientTo: "#b2ebf2",
          decimalPlaces: 1, // Mostrar 1 decimal
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6", // Radio del punto
            strokeWidth: "2",
            stroke: "#0288d1"
          }
        }}
        bezier // Suaviza las líneas
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
});

export default ResultsChart;
