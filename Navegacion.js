import React from 'react'
//navigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

//styles
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

//tab Screens
import HomeScreen from './Views/HomeScreen'
import Profile from './Views/Profile'
import ChatBot from './Views/ChatBot'
import Relaxing from './Views/Relaxing'
//Stack Screens 
import Login from './Views/Login'
import UserProfileData from './Views/UserProfileData'
import About from './Views/About'


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

      <StackNavigator.Screen
      name='userProfileData'
      component={UserProfileData}
      options={{presentation: 'modal', headerTitleAlign:'center', title:'User Profile' }}
      />

      <StackNavigator.Screen
      name='about'
      component={About}
      options={{presentation: 'modal', title:'Acerca de nosotros' }}
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
      name='chatbot'
      component={ChatBot}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size})=>(
          <MaterialComunityIcons name= 'robot-happy-outline' color={color} size={size}/>
        ),
        tabBarLabel:''
      }}
    />

    <Tab.Screen
      name='relaxing'
      component={Relaxing}
      options={{
        headerShown: false,
        tabBarIcon: ({color, size})=>(
          <MaterialComunityIcons name= 'music-box-multiple-outline' color={color} size={size}/>
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