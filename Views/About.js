import React from 'react'
import { View , Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Logo from '../assets/HarmonySpace Logo.png'
import { Ionicons } from '@expo/vector-icons'

const About = () => {
  return (
    <LinearGradient colors={['#2C27B4', '#e1e1f9']} style={{flex:1}}>
      <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}> 
        <View style={styles.container }> 
          <Image source={Logo} style={styles.imgLogo}/>
          <Text style={{fontSize:26, fontWeight:'bold', top:-30}}>Ayuda</Text>
          <Text style={styles.text} >
          En Harmony Space, ofrecemos herramientas para ayudar 
          a estudiantes y maestros a gestionar el estrés 
          y mejorar su bienestar emocional. 
          Nuestro objetivo es crear un espacio seguro y accesible 
          donde los usuarios encuentren apoyo y soluciones para una mejor calidad de vida.
          </Text>
          <View style={styles.icons} >
          <TouchableOpacity style={{marginHorizontal:10}} >
            <Ionicons name="call-outline" size={46} color="#A57CFE" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:10}} >
            <Ionicons name="mail-outline" size={46} color="#A57CFE" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:10}} >
            <Ionicons name="globe-outline" size={46} color="#A57CFE" />
          </TouchableOpacity>
        </View>
        </View>


      </SafeAreaView>
    </LinearGradient>
  )
}

export default About

const styles = StyleSheet.create({
  container:{
    height:'80%',
    width:'80%',
    borderRadius:40,
    backgroundColor:'white',
    alignItems:'center'
  },
  imgLogo:{
    height:'30%',
    width:'60%'
  },
  text:{
    fontSize:20,
    textAlign:'justify',
    marginHorizontal:8,
    marginVertical:15,
    fontWeight:'300'
  },
  icons:{
    flexDirection:'row',
    marginTop:30
  }
})