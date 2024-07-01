import { Alert, ToastAndroid } from "react-native";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

export function logOut (){
    onAuthStateChanged(auth, (user)=>{
        if (user) {
            signOut(auth)
            .then(()=>{Alert.alert("sesion cerrada")})
            .catch((error)=>{Alert.alert(error.message)})
        }else Alert.alert("no hay usuario activo")
    })
}