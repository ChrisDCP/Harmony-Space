import { View, Text, TouchableOpacity, StyleSheet, Alert, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { logOut } from '../servicios/databaseServices'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function Profile() {
  const navigation = useNavigation()

  return (
    <View style={{flex:1, alignItems:'center', backgroundColor:'#4bc9ff'}}>
      <View style={styles.userProfileContainer}>
        <Image source={require('../assets/UserIcon.png')}
          style={styles.userIcon}
        />
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.userName}>lorem ipsum</Text>
          <MaterialCommunityIcons name='account-edit-outline' size={25} color={'white'} />
        </View>
      </View>

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
  userProfileContainer:{
    width:'50%',
    height:'20%',
    alignItems:'center',
    padding:10,
    backgroundColor:'rgba(255, 255, 255, .3)',
    borderWidth:1,
    borderColor:'rgba(255, 255, 255, .5)'
  },
  userIcon:{
    height:'70%',
    width:'70%',
    borderRadius:50,
  },
  userName:{
    fontSize:25,
    color:'white',
    padding:5
  }
})