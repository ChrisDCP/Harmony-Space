import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db, get, ref, set, update } from '../servicios/firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener usuario actual
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserData(currentUser.uid);
    }
  }, []);

  // Función para obtener los datos del usuario desde Firebase
  const fetchUserData = (uid) => {
    const userRef = ref(db, `/users/${uid}`);
    get(userRef)
      .then((snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setName(userData.name || '');
          setOccupation(userData.occupation || '');
          setBirthDate(userData.birthDate ? new Date(userData.birthDate) : new Date());
        }
      })
      .catch((error) => {
        console.error('Error fetching user data: ', error);
      });
  };

  // Función para manejar el cambio de fecha
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (user) {
      const userRef = ref(db, `/users/${user.uid}`);
      update(userRef, {
        name,
        occupation,
        birthDate,
      })
        .then(() => console.log('User profile updated successfully!'))
        .catch((error) => console.error('Error updating user profile:', error));
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      {/* Contenedor principal */}
      <View style={styles.profileContainer}>
        {/* Nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />

        {/* Correo electrónico (solo lectura) */}
        <TextInput
          style={[styles.input, styles.readOnly]}
          placeholder="Correo electrónico"
          value={user?.email || ''}
          editable={false}
        />

        {/* Ocupación */}
        <TextInput
          style={styles.input}
          placeholder="Ocupación"
          value={occupation}
          onChangeText={setOccupation}
        />

        {/* Fecha de nacimiento */}
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            Fecha de nacimiento: {birthDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Botón Guardar */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  profileContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  readOnly: {
    backgroundColor: '#e9e9e9',
    color: '#666',
  },
  datePicker: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
