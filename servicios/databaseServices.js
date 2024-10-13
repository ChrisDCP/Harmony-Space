import {useEffect, useState} from "react";
import { auth, db, get, ref, set } from './firebase';
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

export function FetchUserData(){

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
}

