import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator }  from '@react-navigation/native-stack';
import './src/core/fontawesome'
import {
  SafeAreaView, StatusBar
} from 'react-native';
import SplashScreen from './src/screens/Splash';
import SignInScreen from './src/screens/SignIn';
import SignUpScreen from './src/screens/SignUp';
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import MessageScreen from './src/screens/Message';
import useGlobal from './src/core/global';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

const Stack = createNativeStackNavigator()

export default function App() {

  const authenticated = useGlobal(state=> state.authenticated)
  const initialized = useGlobal(state=> state.initialized)

  const init = useGlobal(state=> state.init)

  useEffect(() => {
    init()
  }, [])

  return (
    <NavigationContainer theme = {LightTheme}>

      <StatusBar barStyle='dark-content' />

      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ):(
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Messages" component={MessageScreen} />
          </>
        )}
       
      
        
    </Stack.Navigator>


    </NavigationContainer>
  );
}

