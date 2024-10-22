import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, storage } from './firebase.js'; 

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
const getAudioUrl = async (audioPath) => {
  const audioRef = ref(storage, audioPath); // Usa la instancia de storage desde firebaseConfig
  try {
    const downloadURL = await getDownloadURL(audioRef);
    return downloadURL;
  } catch (error) {
    console.error("Error al obtener la URL de descarga:", error);
    throw error; 
  }
};

export { getAudioUrl };
