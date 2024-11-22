import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { logOut } from '../servicios/databaseServices'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Profile() {
  const navigation = useNavigation()

  return (
    <LinearGradient colors={['#fff', '#B888E9']} style={{flex:1, alignItems:'center'}}>
      <TouchableOpacity style={styles.userProfileContainer}
      onPress={()=>navigation.navigate('userProfileData')}>
        <Image source={require('../assets/UserIcon.png')}
          style={styles.userIcon}
        />
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.userName}>userName</Text>
          <MaterialCommunityIcons name='account-edit-outline' size={25} color={'white'} />
        </View>
      </TouchableOpacity>

      <View style={{flex:1, width:'100%', alignItems:'center'}}>
        <TouchableOpacity style = {styles.menuButton}
          onPress={()=>navigation.navigate('login')}
        >
          <Text style={{textAlign:'center',fontSize:20 }}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.menuButton}
          onPress={()=>logOut()}
        >
          <Text style={{textAlign:'center',fontSize:20 }}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.menuButton}
          onPress={()=>navigation.navigate('about')}
        >
          <Text style={{textAlign:'center',fontSize:20 }}>Acerca de nosotros</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {styles.menuButton}
          onPress={()=>navigation.navigate('test')}
        >
          <Text style={{textAlign:'center',fontSize:20 }}>Medir tu nivel de estres</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  menuButton:{
    backgroundColor:'#fafafa',
    borderRadius:10,
    height:40,
    width:'95%',
    marginTop:20,
    justifyContent:'center'
  },
  userProfileContainer:{
    width:'60%',
    height:'20%',
    alignItems:'center',
    padding:10,
    backgroundColor:'rgba(255, 255, 255, .3)',
    borderWidth:1,
    borderColor:'rgba(255, 255, 255, .5)'
  },
  userIcon:{
    height:'70%',
    width:'60%',
    borderRadius:50,
    resizeMode:'cover'
  },
  userName:{
    fontSize:25,
    color:'black',
    padding:5
  }
})