import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, get, ref, set } from 'firebase/database';
import { getStorage } from 'firebase/storage'; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTcDs_4cWkZfdTQyXpffMwRFfaPAU5GFo",
  authDomain: "harmony-space-59144.firebaseapp.com",
  databaseURL: "https://harmony-space-59144-default-rtdb.firebaseio.com",
  projectId: "harmony-space-59144",
  storageBucket: "harmony-space-59144.appspot.com",
  messagingSenderId: "655190154989",
  appId: "1:655190154989:web:beccef3f31c98c08e5f6e4",
  measurementId: "G-5PP4XRXQ09"
};

// Initialize Firebase app
const appFirebase = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Realtime Database
const db = getDatabase(appFirebase);

// Initialize Firebase Storage
const storage = getStorage(appFirebase); // Aquí inicializamos Firebase Storage

// Export the initialized services
export { auth, db, storage, get, ref, set };
