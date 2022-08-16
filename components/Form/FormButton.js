import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS } from '../../utils/Colors'
import { windowHeight, windowWidth } from '../../utils/Dimensions'

const FormButton = ({buttonTitle, ...rest}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.butonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
        </View>
        
    )
}

export default FormButton

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        width: '100%',
        
        paddingBottom:windowHeight*0.08,
        height:windowHeight*0.15,
        
    },
    butonContainer:{
        backgroundColor: COLORS.primary,
        marginTop:10,
        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,


    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#ffffff',
        //fontFamily:'Lato-Regular'
    }
})
