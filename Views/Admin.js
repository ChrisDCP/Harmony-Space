// AdminScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import UserTable from '../Components/UserTable';

const AdminScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>Administración de Usuarios</Text>
      <UserTable />
    </View>
  );
};

export default AdminScreen;
