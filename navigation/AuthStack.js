import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useState,useEffect} from 'react'
import DashboardScreen from '../Screens/DashboardScreen';
import HashTagScreen from '../Screens/HashTagScreen';

import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import ProfilScreen from '../Screens/ProfilScreen';
import ReaderScreen from '../Screens/ReaderScreen';
import SearchScreen from '../Screens/SearchScreen';




const Stack = createNativeStackNavigator();
function AuthStack() {
    
    return (
       
            
            <Stack.Navigator  >
                <Stack.Screen 
                  name="Dashboard" 
                  component={DashboardScreen} 
                  options={{
                    headerShown:false
                  }}
                />
                <Stack.Screen 
                  name="Home" 
                  component={HomeScreen} 
                  options={{
                    headerShown:false
                  }}
                />
                <Stack.Screen 
                  name="search" 
                  component={SearchScreen} 
                  options={{
                    headerShown:false
                  }}
                  
                />
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen} 
                  options={{
                    headerShown:false
                  }}
                />
                <Stack.Screen 
                  name="Profil" 
                  component={ProfilScreen} 
                  options={{
                    headerShown:false
                  }}
                  
                />
                <Stack.Screen 
                  name="Reader" 
                  component={ReaderScreen} 
                  options={{
                    headerShown:false
                  }}
                  
                />
                <Stack.Screen 
                  name="HashTag" 
                  component={HashTagScreen} 
                  options={{
                    headerShown:false
                  }}
                  
                />
                
               
               
               
            </Stack.Navigator>

    )
}


export default AuthStack