import React from 'react'
import { StyleSheet, Text,  View,ScrollView,Image } from 'react-native'
import { COLORS } from '../../utils/Colors'
import {  windowWidth,windowHeight } from '../../utils/Dimensions'

const TextPost = ({item}) => {
    console.log(item)
    return (
        <View style={{height:'70%',justifyContent:'center',alignItems:'center'}}>
        <ScrollView style={styles.mainContainer} scrollEnabled>
            
            
                
                    
                <Text
                textAlign={'center'}
                    underlineColorAndroid={COLORS.transparent}
                    style={{
                        
                        
                        width:windowWidth,
                        borderWidth: 0,
                        fontSize:16,
                        paddingHorizontal:15,
                        textAlign:'auto',
                        color:COLORS.grayLight,
                        borderColor:COLORS.transparent,
                        lineHeight:27    
                    }}
                >{item.description}</Text>
            
            
        
            
        
        </ScrollView>
       
        </View>
    )
}

export default TextPost

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: 'rgba(52, 52, 52, 0.1)',
        minHeight:0,
        width:'100%',
        paddingLeft:5,
        maxHeight:'92%',
        
    },
    
    textStatus : {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
        
        
    }
})
