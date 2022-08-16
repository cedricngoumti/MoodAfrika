import { StyleSheet, Text, View,TouchableOpacity, ScrollView ,Platform, PermissionsAndroid} from 'react-native';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import React,{useRef, useState} from 'react';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { windowHeight, windowWidth } from '../../utils/Dimensions';



const CertifiedIcon = ({item,setIsDownloading, setLocalContent,localContent}) => {


    return (
            <>
                  <TouchableOpacity>
                    <AntDesign
                        style={styles.iconLiked}
                        name="check"
                        size={14}
                        color="white"
                    />
                   
                </TouchableOpacity>
                
                
            </>
    );
};

export default CertifiedIcon;

const styles = StyleSheet.create({
    titleContainer:{
        paddingTop:10,
        alignItems:'center',
        width:windowWidth,
    
    },
    iconLiked: {
        textAlign: "center",
        backgroundColor: '#dc0b4f',
        //padding:10,
        borderRadius:99,
        marginRight:10
        
      },
    
     
      
});
