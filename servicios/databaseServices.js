import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { get, update, remove} from "firebase/database"
import { auth, storage, db } from './firebase.js'; 


// Función para cerrar sesión
export function logOut() {

  signOut(auth)
    .then(() => {
      Alert.alert("Sesión cerrada");

    })
    .catch((error) => {
      Alert.alert(error.message);
    });
}

// Verificación del estado del usuario
export const IsUserActive = onAuthStateChanged(auth, (user) => {
  return !!user;  // Devuelve true si el usuario está logueado, false si no
});

// Función para obtener la URL de un archivo de audio
export const getAudioUrl = async (audioPath) => {
  const audioRef = ref(storage, audioPath); // Usa la instancia de storage desde firebaseConfig
  try {
    const downloadURL = await getDownloadURL(audioRef);
    return downloadURL;
  } catch (error) {
    console.error("Error al obtener la URL de descarga:", error);
    throw error; 
  }
};


//funcion para obtener todos los usuarios
export const fetchUsers = async () => {
  try {
    const snapshot = await get(ref(db, 'users'));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No users found.");
      return {};
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//funcion para actualizar un usuario
export const updateUser = async (userId, updatedData) => {
  try {
    await update(ref(db, `users/${userId}`), updatedData);
    console.log("User updated successfully.");
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Función para obtener los resultados diarios


export const fetchDailyResults = async (userId) => {
  if (!userId) throw new Error("El userId es necesario para cargar los resultados diarios.");
  console.log(userId)
  try {
    const resultsRef = ref(db, `users/${userId}/dailyTestResults`); // Ruta correcta
    const snapshot = await get(resultsRef);
    console.log("Snapshot:", snapshot);
    if (!snapshot.exists()) {
      console.log("No hay resultados diarios para este usuario.");
      return [];
    }

    const data = snapshot.val(); // Los datos deberían estar aquí
    
    // Verificar la estructura de los datos
    console.log("Resultados diarios:", data);

    // Procesar los datos y convertirlos en un array de objetos
    const results = Object.keys(data).map((key) => ({
      date: key,
      score: data[key].score,
    }));

    return results;
  } catch (error) {
    console.error("Error al obtener los resultados diarios:", error);
    throw error;
  }
};

export const fetchMonthlyResults = async (userId) => {
  if (!userId) throw new Error("El userId es necesario para cargar los resultados mensuales.");
  try {
    const resultsRef = ref(db, `users/${userId}/monthlyTestResults`); // Ruta correcta
    const snapshot = await get(resultsRef);

    if (!snapshot.exists()) {
      console.log("No hay resultados mensuales para este usuario.");
      return [];
    }

    const data = snapshot.val(); // Los datos deberían estar aquí

    // Verificar la estructura de los datos
    console.log("Resultados mensuales:", data);

    // Procesar los datos y convertirlos en un array de objetos
    const results = Object.keys(data).map((key) => ({
      date: key,
      score: data[key].score,
    }));

    return results;
  } catch (error) {
    console.error("Error al obtener los resultados mensuales:", error);
    throw error;
  }
};
