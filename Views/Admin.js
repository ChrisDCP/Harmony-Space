import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { logOut } from '../servicios/databaseServices';
import PieChartComponent from '../Components/admin/PieChart';
import BarChartComponent from '../Components/admin/BarChartResult';
import UsersTableComponent from '../Components/admin/UserTable';

const AdminScreen = () => {
  return (
    <LinearGradient colors={['#4C1D95', '#5B21B6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Buen dia señor admin</Text>
        <TouchableOpacity onPress={logOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Salir de admin</Text>
        </TouchableOpacity>

        <PieChartComponent />
        <BarChartComponent />
        <UsersTableComponent />
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
  logoutButton: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    width: 100,
    height: 40,
    margin: 5,
    alignSelf: 'flex-end',
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default AdminScreen;
