import { Alert } from "react-native";
import { auth } from "./firebase";
import { signOut, onAuthStateChanged, getAuth } from "firebase/auth";

const autentication = getAuth()
export function logOut (){
    signOut(autentication)
    .then(()=>{Alert.alert("sesion cerrada")})
    .catch((error)=>{Alert.alert(error.message)})
}

export const IsUserActive = onAuthStateChanged(autentication, (user)=>{
        if (user) {
            return true
        } else {
            return false
        }
})
