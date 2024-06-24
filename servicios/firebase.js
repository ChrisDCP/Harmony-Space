import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getDatabase, get, ref } from "firebase/database";
import { getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getDatabase(appFirebase);

export {auth, db, get, ref};

