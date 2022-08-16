import React, { useState} from 'react'
import { } from 'react';
import {View, StyleSheet, Image, ImageBackground,Text} from 'react-native'
import { COLORS } from '../../utils/Colors';
import { windowHeight, windowWidth } from '../../utils/Dimensions'


const ImagePost = ({item}) => {
    const [resizeMode , setResizeMode]=useState(item.resizeMode);
    const [percent, setPercent] = useState(0)
   

    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center', width:windowWidth, height:windowHeight, position: "relative" }}>
            <ImageBackground
                onLoadStart={()=>null}
                onLoad={()=>null}
                onLoadEnd={()=>null}
                source={{
                    uri: item.image,
                }}
                onProgress={e => setPercent(parseInt((e.nativeEvent.loaded / e.nativeEvent.total)*100))}

                style={{width:'100%', height:'100%',alignItems:'flex-end',justifyContent:'flex-end'}}
                resizeMode={item.resizeMode}
                //blurRadius={20}
            >   
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',paddingHorizontal:5}}>
                    <Image source={require('../../assets/moood.png')} style={{width:24, height:24}} resizeMode='cover'/>
                    <Text style={{color:'white',fontWeight:'bold'}}>oodAfrika</Text>
                </View>
                <Text style={{color:'white', fontStyle:'italic',paddingBottom:5,paddingHorizontal:5}}>@{item.username}</Text>
            </ImageBackground>
            {(percent < 100) && <View style={{width:'100%',position:'absolute', bottom:windowHeight*0.5,justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
                    <Text style={{color:COLORS.grayLight}}>Chargement...</Text>
                    <Text style={{fontWeight:'bold',fontSize:16,color:COLORS.grayLight}}>{percent} %</Text>
                </View> }
        </View>
    )
}

export default ImagePost

const styles = StyleSheet.create({})