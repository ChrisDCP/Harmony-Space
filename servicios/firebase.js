import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from 'firebase/auth';
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
  measurementId: "G-5PP4XRXQ09",
};

// Initialize Firebase app
const appFirebase = initializeApp(firebaseConfig);

// Configure persistence based on the environment
const isTestEnvironment = process.env.NODE_ENV === 'test';
const persistence = isTestEnvironment
  ? browserLocalPersistence // Use local persistence during testing
  : getReactNativePersistence(AsyncStorage); // Use AsyncStorage in production

// Initialize Firebase Auth
const auth = initializeAuth(appFirebase, {
  persistence,
});

// Initialize Firebase Realtime Database
const db = getDatabase(appFirebase);

// Initialize Firebase Storage
const storage = getStorage(appFirebase);

// Export the initialized services
export { auth, db, storage, get, ref, set };
