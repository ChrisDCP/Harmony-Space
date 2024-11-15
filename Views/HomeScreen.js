import React,{useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Cards from '../Components/Cards';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30, marginTop:25, color:'black', textAlign: 'center'}}>Bienvenido a harmony Space</Text>
      <Text style={{fontSize:20, marginTop:25, color:'black', textAlign: 'center'}}>Que le gustaria hacer?</Text>
      <View style={styles.grid}>
        <Cards
          type="meditation"
          onPress={() => navigation.navigate('relaxing')}
        />
        <Cards
          type="music"
          onPress={() => navigation.navigate('relaxing')}
        />
        <Cards
          type="bot"
          onPress={() => navigation.navigate('chatbot')}
        />
        <Cards
          type="profile"
          onPress={() => navigation.navigate('userProfileData')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,

  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
});

export default HomeScreen;




/** 
import { Text, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#9C27B0', '#2196F3']} style={{flex:1}}>
      <SafeAreaView style={{flex:1}}> 
        <Text style={{fontSize:30, marginTop:25, color:'white', textAlign: 'center'}}>Bienvenido a harmony Space</Text>

      </SafeAreaView>
    </LinearGradient>

  )
}*/