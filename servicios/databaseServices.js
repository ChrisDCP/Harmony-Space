import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { get, update, remove } from "firebase/database"
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

export const deleteUser = async (userId) => {
  try {
    await remove(ref(db, `users/${userId}`));
    console.log("User deleted successfully.");
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};