import { StyleSheet, Text, View,TouchableOpacity,FlatList,PermissionsAndroid,Platform,Image } from 'react-native'
import React, { useState,useEffect } from 'react'

import  AntDesign  from "react-native-vector-icons/AntDesign";
import  Entypo  from "react-native-vector-icons/Entypo";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import { COLORS } from '../utils/Colors';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import CameraRoll from "@react-native-community/cameraroll";
import MusicFiles from 'react-native-get-music-files';


const SelectRoomScreen = (props) => {
  const {navigation} = props;
  const [data,setData] = useState([]);

  
  const getPhotos = () => {
    
      MusicFiles.getAll({
          blured : true, // works only when 'cover' is set to true
          artist : true,
          duration : true, //default : true
          cover : false, //default : true,
          genre : true,
          title : true,
          cover : true,
          minimumSongDuration : 10000, // get songs bigger than 10000 miliseconds duration,
          fields : ['title','albumTitle','genre','lyrics','artwork','duration'] // for iOs Version
      }).then(tracks => {
          console.log(tracks)
          setData(tracks)
      }).catch(error => {
          // catch the error
      })
   };

   const askPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission Explanation',
          message: 'ReactNativeForYou would like to access your photos!',
        },
      );
      if (result !== 'granted') {
        console.log('Access to pictures was denied');
        return;
      } else {
        getPhotos();
      }
    } else {
      getPhotos();
    }
  };

  useEffect(() => {
    askPermission();
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Entypo name="cross" size={30} color={COLORS.white} />
                        
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.title}>Créer un podcast</Text>
                    </View>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate('Settings') } >
                        <AntDesign name="setting" size={24} color={COLORS.white} />
        
                    </TouchableOpacity>
       </View>
       <View style={styles.containerPicture}>
           <View style={{flexDirection:'row',alignItems:'center',paddingBottom:15}}>
                <Text style={styles.containerPictureTitle}>Récents</Text>
                <MaterialIcons name="expand-more" size={26} color={COLORS.white} />
           </View>
           <View style={styles.pictures}>
                <FlatList
                data={data}
                
                renderItem={({ item }) => (
                  <View style={{width: "100%",flexDirection:'row',justifyContent: "space-between",paddingHorizontal:25}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Upload',{
                      picture:item.picture,
                      username:item.username,
                      certified:item.certified,
                      userid:item.iduser
                      })}>
                   <View style={[styles.userName, styles.spacing,styles.transparentBackgroundCircle]}>
                       
                       <FontAwesome name="music" style={{
                           width: 24,
                           height: 24,
                           borderRadius: 50,
                           borderWidth: 2,
                           borderColor: "#fff",
                           overflow: "hidden",
                           marginRight: 10,
                       }} size={24} color={COLORS.primary} />

                       
                       
                       <View style={{width:windowWidth*0.65}} >
                           <Text style={[styles.userNameText]}>{item.title ? item.title : item.fileName}</Text>
                           <Text style={[styles.postDate]}>duration : {parseInt(item.duration/1000)} sec</Text>
                       </View>
                       <View style={{align:'flex-end'}}>
                          <AntDesign name="play"  size={24} color={COLORS.primary} />
                       </View>
                   </View>
                   </TouchableOpacity>
                   

                  </View>
                    )}
            />

           </View>
       </View>
    </View>
  )
}

export default SelectRoomScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center',
        paddingTop:25,
        backgroundColor:COLORS.black
        
    },
    header:{
        width:windowWidth,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderBottomWidth:0.5,
        

    },
    title:{
        fontSize:22,
        marginHorizontal:20,
        color:COLORS.white,
        fontWeight:"600",
        alignSelf:'center',
        
    },
    containerPicture:{
        flex:1,
        paddingTop:25,
        flexDirection:'column',
        marginBottom:40
    },
    containerPictureTitle:{
        fontSize:18,
        marginLeft:20,
        color:COLORS.white,
        fontWeight:"400",
        
    },
    titleSong:{
      fontSize:18,
      marginHorizontal:20,
      color:COLORS.white,
      fontWeight:"300",
      
      
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
  } ,
  userNameText: {
    color: "white",
    textAlign: "left",
    
  },
  postDate: {
    color: COLORS.gray,
    fontSize:10,
  },
})