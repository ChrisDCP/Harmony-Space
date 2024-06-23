import { View, Text, ToastAndroid } from 'react-native'
import React from 'react'

import { db,auth,ref,get } from '../servicios/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigation } from '@react-navigation/native'

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  async function singUp(){
    if (!name || !email || !password){
      ToastAndroid.show("Todos los campos deben estar completos", ToastAndroid.CENTER, ToastAndroid.SHORT)
      return;
    }
    try {
      const useCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = useCredentials.user;

      await set(ref(db,"users/" + user.uid), {
        name: name,
        email: email,
      });
      ToastAndroid.show("Regristro completo", ToastAndroid.CENTER, ToastAndroid.SHORT)
      navigation.navigate('home')
      // Alert.alert('Registro éxitoso', 'Cuenta creada con éxito',[{text: 'OK', onPress: () => navigation.navigate('home')}]);
    }catch(error){
      if (error.code === 'auth/email-already-in-use') {
        ToastAndroid.show("El correo electronico ya esta en uso", ToastAndroid.CENTER, ToastAndroid.SHORT)
      }
      if(error.code === 'auth/invalid-email'){
        ToastAndroid.show('Ingrese un correo electronico valido', ToastAndroid.SHORT, ToastAndroid.CENTER)
      }else{
        ToastAndroid.show(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
    }
  }

  async function loginService (){
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredentials.user

      const userRef = ref(db, 'users/' + user.uid)
      const snapShot = await get(userRef)

      if(snapShot.exists()){
        const userData = snapShot.val()
        navigation.navigate('home')
      }
    } catch (error) {
      ToastAndroid.show(error.message)
    }
  }
  
  

  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}