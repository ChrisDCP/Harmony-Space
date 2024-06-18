import React from 'react'
//navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Header, createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

//styles
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//tab Screens
import HomeScreen from './Views/HomeScreen'
import Profile from './Views/Profile'
//Stack Screens 
import Login from './Views/Login'

// navigator const
const StackNavigator = createStackNavigator()
const Tab = createBottomTabNavigator()

//navigator functions

function MyStack(){
  return(
    <StackNavigator.Navigator
    >

      <StackNavigator.Screen
        name='home'
        component={HomeScreen}
        options={{headerShown:false}}      
        />

      <StackNavigator.Screen
        name='login'
        component={Login}
      />

    </StackNavigator.Navigator>

  )
}

function MyTabs(){
return(
  <Tab.Navigator
    initialRouteName='homeScreen'
  >

    <Tab.Screen
      name='homeScreen'
      component={MyStack}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size})=>(
          <MaterialComunityIcons name= 'home' color={color} size={size}/>
        ),
        tabBarLabel:''
      }}
    />

    <Tab.Screen
      name='profile'
      component={Profile}
      options={{
        headerShown: true,
        tabBarIcon: ({color, size})=>(
          <MaterialComunityIcons name= 'account-circle' color={color} size={size}/>
        ),
        tabBarLabel:''
      }}
    />

  </Tab.Navigator>
)
}

export default function Navegacion() {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  )
}