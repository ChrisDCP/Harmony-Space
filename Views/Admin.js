import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart, BarChart } from 'react-native-chart-kit';

const AdminScreen = () => {
  const [userData, setUserData] = useState([]);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Datos manuales
    const mockUserData = [
      { id: 'BEFZTD5e', name: 'Daniela', email: 'Dl355358@gmail.com', age: '23', country: 'Nicaragua', sex: 'Femenino' }
    ];
    setUserData(mockUserData);

    const mockTestResults = [
      { month: '2024-12', monthlyScore: 28, dailyScore: 0 } // Simulando datos de pruebas
    ];
    setTestResults(mockTestResults);
  }, []);

  const screenWidth = Dimensions.get('window').width;

  // Datos para el gráfico de pastel
  const pieData = [
    { name: 'Usuarios', population: userData.length, color: '#8884d8', legendFontColor: '#FFF', legendFontSize: 14 },
    { name: 'Tests Mensuales', population: testResults.filter(r => r.monthlyScore > 0).length, color: '#82ca9d', legendFontColor: '#FFF', legendFontSize: 14 },
    { name: 'Tests Diarios', population: testResults.filter(r => r.dailyScore > 0).length, color: '#ffc658', legendFontColor: '#FFF', legendFontSize: 14 },
  ];

  // Datos para el gráfico de barras
  const barData = {
    labels: ['Dic 2024'],
    datasets: [
      { data: [28] }, // Puntuación mensual simulada
    ],
  };

  return (
    <LinearGradient colors={['#4C1D95', '#5B21B6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Panel de Administrador</Text>

        {/* Gráfico de pastel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Actividad</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#4C1D95',
              backgroundGradientTo: '#5B21B6',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>

        {/* Gráfico de barras */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resultados de Tests por Mes</Text>
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#4C1D95',
              backgroundGradientTo: '#5B21B6',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Tabla de Usuarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tabla de Usuarios</Text>
          <ScrollView horizontal>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>ID</Text>
                <Text style={styles.tableHeader}>Nombre</Text>
                <Text style={styles.tableHeader}>Email</Text>
                <Text style={styles.tableHeader}>Edad</Text>
                <Text style={styles.tableHeader}>País</Text>
                <Text style={styles.tableHeader}>Sexo</Text>
              </View>
              {userData.map((user, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{user.id.substring(0, 8)}...</Text>
                  <Text style={styles.tableCell}>{user.name}</Text>
                  <Text style={styles.tableCell}>{user.email}</Text>
                  <Text style={styles.tableCell}>{user.age}</Text>
                  <Text style={styles.tableCell}>{user.country}</Text>
                  <Text style={styles.tableCell}>{user.sex}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  table: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
});

export default AdminScreen;
