import { Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#9C27B0', '#2196F3']} style={{flex:1}}>
      <SafeAreaView style={{flex:1}}> 
        <Text style={{fontSize:30, marginTop:25 }}>Bienvenido a harmony Space</Text>

      </SafeAreaView>
    </LinearGradient>

  )
}