import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React,{useState,useEffect} from 'react'
import DashboardScreen from '../Screens/DashboardScreen';
import HashTagScreen from '../Screens/HashTagScreen';

import HomeScreen from '../Screens/HomeScreen';
import ListScreen from '../Screens/ListScreen';
import ProfilScreen from '../Screens/ProfilScreen';
import ReaderScreen from '../Screens/ReaderScreen';
import RecordScreen from '../Screens/RecordScreen';
import RoomDetailScreen from '../Screens/RoomDetailScreen';
import SearchScreen from '../Screens/SearchScreen';
import SelectRoomScreen from '../Screens/SelectRoomScreen';
import SelectScreen from '../Screens/SelectScreen';
import SettingScreen from '../Screens/SettingScreen';
import StatusScreen from '../Screens/StatusScreen';
import UploadScreen from '../Screens/UploadScreen';



const Stack = createNativeStackNavigator();
function AppStack() {
    
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
                  name="List" 
                  component={ListScreen} 
                  options={{
                    headerShown:false
                  }}
                />
                
                <Stack.Screen 
                  name="Status" 
                  component={StatusScreen} 
                  options={{
                    headerShown:false
                  }}
                />
                <Stack.Screen 
                  name="Record" 
                  component={RecordScreen} 
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
                  name="HashTag" 
                  component={HashTagScreen} 
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
                  name="Select" 
                  component={SelectScreen} 
                  options={{
                    headerShown:false
                  }}
                  
                />

                <Stack.Screen 
                  name="Upload" 
                  component={UploadScreen} 
                  options={{
                    headerShown:false
                  }}
                  
                />
                <Stack.Screen 
                  name="Settings" 
                  component={SettingScreen} 
                  options={{
                    headerShown:false,

                  }}
                  
                />
                <Stack.Screen 
                  name="RoomDetail" 
                  component={RoomDetailScreen} 
                  options={{
                    headerShown:false,

                  }}
                  
                />

                <Stack.Screen 
                  name="SelectRoom" 
                  component={SelectRoomScreen} 
                  options={{
                    headerShown:false,

                  }}
                  
                />
               
               
               
            </Stack.Navigator>

    )
}


export default AppStack