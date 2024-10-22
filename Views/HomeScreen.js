import { Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#9C27B0', '#2196F3']} >
      <SafeAreaView> 
        <Text style={{fontSize:30, marginTop:25 }}>Bienvenido a harmony Space</Text>
        
      </SafeAreaView>
    </LinearGradient>

  )
}