import { View, Text } from 'react-native'
import React from 'react'

import { db,auth,ref,get } from '../servicios/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function loginService (){

}

function singUp(){
  
}

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}