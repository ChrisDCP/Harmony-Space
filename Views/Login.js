import { View, Text, ToastAndroid, StyleSheet, 
         Image, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { db,auth,ref,get,set } from '../servicios/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

import { useNavigation } from '@react-navigation/native'

export default function Login() {
  //login input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //pass state
  const [showPass, setShowPass] = useState('')
  const navigation = useNavigation()

  //switch select
  const [swSelected, setswSelected] = useState('login')

  //functions
  //show pass
  const toggleShowPassword = () =>{
    setShowPass(!showPass)
  }

  const showInputName = swSelected ==='register'

  async function singUp(){
    if (!name || !email || !password){
      ToastAndroid.show("Todos los campos deben estar completos", ToastAndroid.CENTER, ToastAndroid.SHORT)
      return;
    }
    try {
      const useCredentials = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = useCredentials.user;

      await set(ref(db,"users/" + user.uid), {
        name: name,
        email: email,
      });

      ToastAndroid.show("Regristro completo", ToastAndroid.CENTER, ToastAndroid.SHORT)
      navigation.navigate('home')
      
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
    setName('')
    setEmail('')
    setPassword('')
    
  }

  async function loginService (){
    if (!email || !password){
      ToastAndroid.show("Todos los campos deben estar completos", ToastAndroid.CENTER, ToastAndroid.SHORT)
      return;
    }
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email.trim(), password)
      const user = userCredentials.user

      const userRef = ref(db, 'users/' + user.uid)
      const snapShot = await get(userRef)

      if(snapShot.exists()){
        ToastAndroid.show("Inicio de sesion con exito", ToastAndroid.SHORT, ToastAndroid.CENTER)
        navigation.navigate('home')
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credentials') {
        ToastAndroid.show("la contraseña y el correo electronico no coinciden", ToastAndroid.CENTER, ToastAndroid.SHORT)
      }
      if (error.code === 'auth/invalid-email') {
        ToastAndroid.show("ingrese un correo electronico valido", ToastAndroid.CENTER, ToastAndroid.SHORT)
      }else{
      ToastAndroid.show(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
      }
    }
    setEmail('')
    setPassword('')
  }
  

  return (
    <SafeAreaView style={styles.vista} >
      <Image style={styles.imgLogo} source={require('../assets/HarmonySpace Logo.png')} />
      <View style={styles.formulario}>

        <View style={styles.swContenedor}>
          <TouchableOpacity
            style={[styles.swButton,swSelected ==='login' ?
              styles.swButtSelected : styles.swButtNonSelected]}
            onPress={()=>setswSelected('login')}>
            <Text style={styles.swButtText} >Iniciar sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.swButton,swSelected ==='register' ?
              styles.swButtSelected : styles.swButtNonSelected]}
            onPress={()=>setswSelected('register')}>
            <Text style={styles.swButtText} >Registrarse</Text>
          </TouchableOpacity>
        </View>

        {showInputName && (
        <TextInput
        style={styles.inputsCredentials}
        onChangeText={setName}
        value={name}
        placeholder='Nombre'
        />)}

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
          onPress={swSelected === 'login'? loginService : singUp}
        >
          <Text style={styles.submitText} >{swSelected==='login' ? 'Iniciar sesion' : 'Registrarse'}</Text>
        </TouchableOpacity>

          {!showInputName && (
        <Text style={styles.contraseñaText}>¿Has olvidado la contraseña?</Text>)}
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
  swContenedor:{
    width:'80%',
    backgroundColor:'#3a7fdf',
    top:'-35%',
    height:70,
    borderRadius:40,
    flexDirection:'row',
    alignItems:'center'
  },
  swButton:{
    width:'50%',
    height:'100%',
    borderRadius:40,
    justifyContent:'space-around',
    alignItems:'center'
  },
  swButtSelected:{
    backgroundColor:'#4bc9ff'
  },
  swButtNonSelected:{
    backgroundColor:'#3a7fdf'
  },
  swButtText:{
    color:'white',
    fontSize:18,
    fontWeight:'400',
    textAlign:'center'
  },
  
  inputsCredentials:{
    borderColor:'black',
    borderBottomWidth:1,
    width:'80%',
    marginBottom:20
  },
  passContainer:{
    width:'100%',
    flexDirection:'row',
    marginLeft:60
  },
  eyeIcon:{
    right:30
  },
  submitButton:{
    backgroundColor:"#4bc9ff",
    margin:10,
    padding:10,
    height:70,
    width:'60%',
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