import {  StyleSheet } from "react-native"
import { COLORS } from "../../utils/Colors"
import { windowHeight } from "../../utils/Dimensions"

const styles = StyleSheet.create({
    text: {
      color: "white",
      textAlign: "left",
    },
    textIcon: {
      color: "white",
      textAlign: "center",
      marginRight:10
    },
    userNameText: {
      color: "white",
      textAlign: "left",
      
    },
    postDate: {
      color: COLORS.gray,
      fontSize:10,
    },
    musicTitle:{
      color: "white",
      textAlign: "center",
      alignSelf:"center"
    },
    icon: {
      textAlign: "center",
      backgroundColor: 'rgba(52, 52, 52, 0.2)',
      padding:10,
      borderRadius:99,
      marginRight:10
      
    },
    iconLiked: {
      textAlign: "center",
      backgroundColor: '#dc0b4f',
      padding:10,
      borderRadius:99,
      marginRight:10
      
    },
    certified: {
      textAlign: "center",
      backgroundColor: '#dc0b4f',
      
      
      
      
    },
    footer: {
      position:'absolute',
      bottom:22,
      //flex: 1,
      alignItems: "flex-end",
      justifyContent: "space-between",
      flexDirection: "row",
      padding: 15,
      marginBottom:windowHeight*0.05
    },
    iconList: {
      justifyContent: "space-around",
      height: "70%",

    },
    
    userDetails: {
      flex: 1,
      alignItems: "flex-start",
    },
    userName: {
      flexDirection: "row",
      
    },
    spacing: {
      paddingBottom: 10,
      
    },
    transparentBackgroundCircle:{
      backgroundColor: 'rgba(52, 52, 52, 0.2)',
      padding:10,
      borderRadius:70
    },
    loading_container:{
      position:"absolute",
      left:0,
      right:0,
      top:windowHeight/2,
      bottom:0,
      alignItems:'center',
      justifyContent:'center',
      zIndex:10,
  },backgroundVideo: {
    position: 'absolute',
    width:'100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

export default styles