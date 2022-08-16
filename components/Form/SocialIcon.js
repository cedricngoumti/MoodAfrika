import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native';
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { windowWidth,windowHeight } from '../../utils/Dimensions';


const SocialIcon = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  icon,
  ...rest
}) => {
  let bgColor = backgroundColor;
  return (
      <View style={styles.container}>
            <TouchableOpacity
            style={[styles.buttonContainer, {backgroundColor: bgColor}]}
            {...rest}>
            <View style={styles.iconWrapper}>
              {icon ? (<MaterialIcons name={btnType} style={styles.icon} size={28} color={color}/>):(
                <FontAwesome name={btnType} style={styles.icon} size={28} color={color} />
              )}
                
            </View>
            
            </TouchableOpacity>
            <View style={{alignItems:'center', width:'100%', justifyContent:'center'}}>
                 <Text style={styles.descriptionText} >{buttonTitle}</Text>
            </View>
            
    </View>
  );
};

export default SocialIcon;

const styles = StyleSheet.create({
  container:{
    width:windowWidth*0.2,
    paddingLeft:10,
    flexDirection:'column', 
    alignItems:'center'
    
  },
  buttonContainer: {
    marginTop: 10,
    marginLeft: 10,
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius:windowWidth * 0.07,
    padding: 10,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
    //borderRadius: 3,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  }, 
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  descriptionText:{
    
    textAlign:'center',
    fontSize:10
  }
});