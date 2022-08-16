/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   LogBox
 } from 'react-native';
 
 
 import Navigation from './navigation';

 import {enableScreens} from 'react-native-screens'
 import { Provider } from 'react-redux';
 import { createStore,applyMiddleware } from 'redux';
 import thunk from 'redux-thunk';
 import reducers from './reducers'; // index
import { COLORS } from './utils/Colors';
import SnackBar from './components/SnackBar';
import { useRef,useEffect } from 'react';


 
 
 
 const App = () => {
   
   LogBox.ignoreLogs(['new NativeEventEmitter']);
   const store = createStore(reducers,{},  applyMiddleware(thunk));
   enableScreens()
   const isDarkMode = useColorScheme() === 'dark';
 
  
   
 
  
  

   return (
     <Provider store={store}>
       <View style={styles.container}>
               <StatusBar translucent backgroundColor={COLORS.transparent} barStyle={isDarkMode ? 'light-content' : 'light-content'} />
               <Navigation />  
       </View>
     </Provider>
     
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex:1,
     backgroundColor:'#fff'
   },
 });
 
 export default App;
 