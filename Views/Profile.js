import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {
  const navigation = useNavigation()

  return (
    <View style={{justifyContent:'center'}}>
      <Button
        title='LOGIN'
        onPress={()=>navigation.navigate('login')}
      />
    </View>
  )
}