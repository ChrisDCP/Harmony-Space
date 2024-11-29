import { View, Text, ToastAndroid, StyleSheet, 
         Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState} from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { db,auth,ref,get,set } from '../servicios/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

import { useNavigation } from '@react-navigation/native'

import { LinearGradient } from 'expo-linear-gradient'


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
      navigation.navigate('test')
      
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
    <LinearGradient colors={['#A0E6FFC9', '#F1A3EF99','#599DE6']} style={styles.vista}
    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
      
        <Image style={styles.imgLogo} source={require('../assets/harmonySpaceLogo.png')} />
        
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
          <LinearGradient colors={['#DABEF5','#AAD6F6']} 
          style={styles.inputsCredentials} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder={'Nombre'}
          />
          </LinearGradient>)}

          <LinearGradient colors={['#DABEF5','#AAD6F6']} 
          style={styles.inputsCredentials} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder='E-mail'
            textContentType='emailAddress'
            />
          </LinearGradient>

          <View style={styles.passContainer}>
          <LinearGradient colors={['#DABEF5','#AAD6F6']} 
          style={styles.inputsCredentials} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder='Contraseña'
              textContentType='password'
              secureTextEntry={!showPass}
            />
          </LinearGradient>
            <MaterialCommunityIcons 
              name={showPass ? 'eye-off' : 'eye'} 
              size={30} 
              color="#fff"
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
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  vista:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center'
  },
  imgLogo:{
    height:'30%',
    width:'55%'
  },
  formulario:{
    position:'absolute',
    paddingTop:'40%',
    height:'70%',
    width:'85%',
    borderRadius:40,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    backgroundColor:'rgba(255,255,255,0.1)',
    alignItems:'center',
    bottom:25,
    alignContent:'space-around',
  },
  swContenedor:{
    width:'80%',
    backgroundColor:'#A0E6FF',
    top:'-35%',
    height:50,
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
    backgroundColor:'#A57CFE'
  },
  swButtNonSelected:{
    backgroundColor:'#A0E6FF',
  },
  swButtText:{
    color:'white',
    fontSize:18,
    fontWeight:'600',
    lineHeight:33,
    textAlign:'center'
  },
  
  inputsCredentials:{
    borderRadius:25,
    width:'80%',
    marginBottom:20,
    padding:10
  },
  passContainer:{
    width:'100%',
    flexDirection:'row',
    marginLeft:70,
    
  },
  eyeIcon:{
    right:35,
    top:7
  },
  submitButton:{
    backgroundColor:"#A57CFECF",
    padding:10,
    height:50,
    width:'60%',
    top:40,
    borderRadius:40,
  },
  submitText:{
    textAlign:'center',
    lineHeight:35,
    fontWeight:'600',
    color:'white',
    fontSize:23,
    bottom:5
  },
  contraseñaText:{
    marginTop:55,
    color:'#11a1f1',
    textDecorationLine:'underline'
  }
})