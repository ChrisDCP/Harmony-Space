import { View, Text, ToastAndroid, StyleSheet, 
    Image, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { db,auth,ref,get } from '../servicios/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigation } from '@react-navigation/native'

export default function Login() {
  //login input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //pass state
  const [showPass, setShowPass] = useState('')
  const navigation = useNavigation()

  //functions
  //show pass
  const toggleShowPassword = () =>{
    setShowPass(!showPass)
  }

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
    <SafeAreaView style={styles.vista} >
      <Image style={styles.imgLogo} source={require('../assets/HarmonySpace Logo.png')} />
      <View style={styles.formulario}>
        <TextInput
          style={styles.inputsCredentials}
          onChangeText={setEmail}
          value={email}
          placeholder='E-mail'
          textContentType='emailAddress'
        />
        <View style={styles.passContainer}>
          <TextInput
            style={styles.inputsCredentials}
            onChangeText={setPassword}
            value={password}
            placeholder='Contraseña'
            textContentType='password'
            secureTextEntry={!showPass}
          />
          <MaterialCommunityIcons 
            name={showPass ? 'eye-off' : 'eye'} 
            size={24} 
            color="#aaa"
            style={styles.eyeIcon} 
            onPress={toggleShowPassword} 
          /> 
        </View>
        <TouchableOpacity
          style={styles.submitButton}
        >
          <Text style={styles.submitText} >Iniciar sesion</Text>
        </TouchableOpacity>

        <Text style={styles.contraseñaText}>¿Has olvidado la contraseña?</Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  vista:{
    flex:1,
    backgroundColor:'#1ad9f9',
    justifyContent:'space-between',
    alignItems:'center'
  },
  imgLogo:{
    height:'30%',
    width:'55%'
  },
  formulario:{
    paddingTop:'40%',
    height:'70%',
    width:'75%',
    borderRadius:40,
    backgroundColor:'white',
    alignItems:'center',
    bottom:15
  },
  inputsCredentials:{
    borderColor:'black',
    borderBottomWidth:1,
    width:'80%',
    marginTop:10,
    marginBottom:20
  },
  passContainer:{
    width:'100%',
    flexDirection:'row',
    marginLeft:60
  },
  eyeIcon:{
    margin:10,
    right:30
  },
  submitButton:{
    backgroundColor:"#4bc9ff",
    margin:10,
    padding:10,
    height:70,
    width:200,
    top:40,
    borderRadius:40,
    justifyContent:'center'
  },
  submitText:{
    textAlign:'center',
    color:'white',
    fontSize:25,
    textShadowColor: "#3a55FF",
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 1,
  },
  contraseñaText:{
    marginTop:55,
    color:'#11a1f1',
    textDecorationLine:'underline'
  }
})