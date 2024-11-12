import React from 'react';
import { View, Text, Touchable } from 'react-native';
import UserTable from '../Components/UserTable';
import { logOut } from '../servicios/databaseServices';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AdminScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginVertical: 20 }}>Administración de Usuarios</Text>
      <UserTable/>
      <TouchableOpacity onPress={()=>logOut()}>
          <Text style={{textAlign:'center',fontSize:20 }}>Log out</Text>
        </TouchableOpacity>
    </View>
  );
};

export default AdminScreen;
