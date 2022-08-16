import { StyleSheet, Text, View,TouchableOpacity,FlatList,PermissionsAndroid,Platform,Image } from 'react-native'
import React, { useState,useEffect } from 'react'

import  AntDesign  from "react-native-vector-icons/AntDesign";
import  Entypo  from "react-native-vector-icons/Entypo";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '../utils/Colors';
import { windowWidth } from '../utils/Dimensions';
import CameraRoll from "@react-native-community/cameraroll";


const SelectScreen = (props) => {
  const {navigation} = props;
  const [data,setData] = useState([]);

  
  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 200,
      assetType: 'All',
    })
      .then((res) => {
        setData(res.edges);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    <Text style={styles.title}>Créer un mood</Text>
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
                numColumns={3}
                renderItem={({ item }) => (<View style={{width:'33%',height:windowWidth*0.33,marginBottom:4,marginRight:4}}>
                    <TouchableOpacity onPress={()=>navigation.replace('Upload',{isLoad:true,item:item})}><Image
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode:'cover'
                }}
                source={{ uri: item.node.image.uri }}
                /></TouchableOpacity></View>)}
            />

           </View>
       </View>
    </View>
  )
}

export default SelectScreen

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
})