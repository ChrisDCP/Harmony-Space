import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { logOut } from '../servicios/databaseServices'
import { auth } from '../servicios/firebase'
import { signOut } from 'firebase/auth'

export default function Profile() {
  const navigation = useNavigation()

  return (
    <View style={{flex:1, alignItems:'center', backgroundColor:'#4bc9ff'}}>
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
      </View>
    </View>
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
})