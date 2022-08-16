import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import  FontAwesome  from "react-native-vector-icons/FontAwesome"; 
import  Fontisto  from "react-native-vector-icons/Fontisto"; 
import { COLORS } from '../utils/Colors';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const Preview = (props) => {
    const {image, setImage} = props
  return (
    <View style={styles.container}>
        
      <View style={styles.header}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                //StatusBar.setHidden(false);
                                                setImage(null);
                                            }}
                                            style={{padding:18}}
                                        >
                                            <AntDesign name="close" size={28} color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                //StatusBar.setHidden(false);
                                                //navigation.goBack();
                                            }}
                                            style={{padding:18}}
                                        >
                                            <View style={styles.row}>
                                                <FontAwesome name="music" size={18} color="#fff" />
                                                <Text style={styles.description}>Sons</Text>
                                            </View>
                                            
                                        </TouchableOpacity>
                                        <View style={styles.rightHeader}>
                                            <TouchableOpacity
                                                
                                                style={{paddingTop:18}}
                                            >   
                                                <View style={styles.row}>
                                                    <MaterialIcons name="rotate-right" size={28} color="#fff" />
                                                    <Text style={styles.rightMenu}>Retourner</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                
                                                style={{paddingTop:18}}
                                            >   
                                                <View style={styles.row}>
                                                    <AntDesign name="filter" size={28} color="#fff" />
                                                    <Text style={styles.rightMenu}>Filtres</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                               
                                                style={{paddingTop:18}}
                                            >   
                                                <View style={styles.row}>
                                                    <FontAwesome name="magic" size={28} color="#fff" />
                                                    <Text style={styles.rightMenu}>Embellir</Text>
                                                </View>
                                            </TouchableOpacity>

                                            
                                            

                                        </View>
                                        
                                        
                                        
                                    </View>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000'
        
    },header:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
    
    },
    rightHeader:{
        flexDirection:'column',
        alignItems:'center'
    },
    row:{
        flexDirection:'column',
        alignItems:'center'
    },
    rightMenu:{
        fontSize:10,
        color:'#fff',
        marginHorizontal:10,
        fontWeight:'bold'

    },
    description:{
        fontSize:15,
        color:'#fff',
        marginLeft:10,
        fontWeight:'bold'

    },
});
