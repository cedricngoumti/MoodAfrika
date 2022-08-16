import React,{useContext, useState, useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native';
//import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';
import { Text, View,ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import HomeScreen from '../Screens/HomeScreen';
import AppStack from './AppStack';





const Routes = () => {

    const {user, setUser, loading } = useContext(AuthContext);
    
    if(loading) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        )
    }
    return (
        <NavigationContainer >
            {user ? <AppStack/> : <AuthStack /> } 
            
        </NavigationContainer>
    )
}

export default Routes