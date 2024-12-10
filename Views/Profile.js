import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { logOut } from '../servicios/databaseServices';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth } from '../servicios/firebase'; // Asegúrate de importar Firebase correctamente

export default function Profile() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Usuario'); // Nombre por defecto

  useEffect(() => {
    // Obtenemos el usuario actual y su nombre
    const user = auth.currentUser;
    if (user && user.displayName) {
      setUserName(user.displayName);
    } else {
      setUserName('Usuario'); // Nombre genérico si no hay datos
    }
  }, []);

  return (
    <LinearGradient colors={['#fff', '#B888E9']} style={{ flex: 1, alignItems: 'center' }}>
      {/* Contenedor del perfil del usuario */}
      <TouchableOpacity
        style={styles.userProfileContainer}
        onPress={() => navigation.navigate('userProfileData')}
      >
        <Image
          source={require('../assets/UserIcon.png')}
          style={styles.userIcon}
        />
        {/* Aseguramos que el texto y el ícono estén en un contenedor View */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <MaterialCommunityIcons name="account-edit-outline" size={25} color="white" />
        </View>
      </TouchableOpacity>

      {/* Botones */}
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.menuButtonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => logOut()}
        >
          <Text style={styles.menuButtonText}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('about')}
        >
          <Text style={styles.menuButtonText}>Acerca de nosotros</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  userProfileContainer: {
    width: '60%',
    height: '20%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, .5)',
  },
  userIcon: {
    height: '70%',
    width: '60%',
    borderRadius: 50,
    resizeMode: 'cover',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Separación entre la imagen y el nombre
  },
  userName: {
    fontSize: 25,
    color: 'black',
    padding: 5,
  },
  menuButton: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    height: 40,
    width: '95%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center', // Centrar el texto del botón
  },
  menuButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
});
