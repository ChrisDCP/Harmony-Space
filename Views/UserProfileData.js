import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db, get, ref, set } from '../servicios/firebase';

export default function UserProfileData() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserProfile(currentUser.uid);
    }
  }, []);

  const fetchUserProfile = (uid) => {
    const userRef = ref(db, `/users/${uid}`);
    get(userRef)
      .then(snapshot => {
        const userData = snapshot.val();
        if (userData) {
          setName(userData.name || '');
          setCountry(userData.country || '');
          setAge(userData.age || '');
          setSex(userData.sex || '');
        }
      })
      .catch(error => {
        console.error('Error fetching user profile: ', error);
      });
  };

  const handleSave = () => {
    if (user) {
      const userRef = ref(db, `/users/${user.uid}`);
      set(userRef, {
        name,
        country,
        age,
        sex,
      })
      .then(() => {
        console.log('User profile saved!');
      })
      .catch(error => {
        console.error('Error saving user profile: ', error);
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, margin: 10 }}>Editar datos de usuario</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: '90%', height: '70%', borderRadius: 15 }}>
        <TextInput
          style={styles.inputsUserData}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.inputsUserData}
          placeholder='Country'
          value={country}
          onChangeText={setCountry}
        />
        <TextInput
          style={styles.inputsUserData}
          placeholder='Age'
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.inputsUserData}
          placeholder='Sex'
          value={sex}
          onChangeText={setSex}
        />
        <TouchableOpacity onPress={handleSave}>
          <Text>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsUserData: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
    width: '90%',
    marginBottom: 20,
    height: 50,
    fontSize: 20,
    includeFontPadding: true
  }
});
