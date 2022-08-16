import React,{ useCallback, useMemo, useState,useRef, useEffect } from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import { windowWidth , windowHeight } from '../../utils/Dimensions'
import  AntDesign  from "react-native-vector-icons/AntDesign";

import ImagePost from '../ImagePost';
import TextPost from '../TextPost';
import VideoPost from '../VideoPost';
import Video from 'react-native-video';
import ShareButton from '../ShareButton';
import CommentButton from '../CommentButton';
import LikeButton from '../LikeButton';
import { COLORS } from '../../utils/Colors';
import CertifiedIcon from '../CertifiedIcon';
import PostDescription from '../PostDescription';
import { convertDateToFrench } from '../../utils/API';





const PostItem = ({item,index, navigation,activeIndex,activeTabs}) => {
  
    const [localContent, setLocalContent] = useState()
    const [isDownloading, setIsDownloading] = useState(false)
    const [dateg, setDateg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
   

    useEffect(() => {
        
        setDateg(convertDateToFrench(item.registration));
        _displayDownloading()
        
      }, [isDownloading])

      

    const _displayDownloading = () => {
        if(isDownloading) {
            return(
                <View style={{position:'absolute',zIndex:10 ,bottom:0,width:windowWidth,height:windowHeight*0.05,backgroundColor:COLORS.primary,justifyContent:'center', alignItems:'center'}}>
                      <Text style={{color:COLORS.white,fontWeight:'bold'}}>Téléchargement...</Text>
                  </View>
                )

        } 
              
        
    }
    
    
    const _displayLoading = () => {
        if(isLoading && item.type == 1) {
            return(
                <View style={{height:12,zIndex:10,position:"absolute",top:windowHeight/2,bottom:0,right:0,left:0}}>
                    <Image source={require('../../assets/loading.gif')} style={{width:50,height:12,alignSelf:'center'}}/>
                    <Text style={{color:'white',alignSelf:'center'}}>Chargement...</Text>
                </View>
                )

        } 
              
        
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignContent:'center', width:windowWidth, height:windowHeight, position: "relative"  }}>
            {_displayLoading()}

            {(item.type == 0) && <VideoPost  item={item} index={index} activeIndex={activeIndex} activeTabs={activeTabs} /> 
                
            }

            {item.type == 1 && <ImagePost item={item} /> }

            {item.type == 2 && <TextPost item={item} />}

            <View style={styles.footer}>
                <View style={styles.userDetails}>
                   <View style={{width: "100%",flexDirection:'row',justifyContent: "space-between"}}>
                   <TouchableOpacity onPress={() => navigation.navigate('Profil',{
                       picture:item.picture,
                       username:item.username,
                       certified:item.certified,
                       userid:item.iduser
                       })}>
                    <View style={[styles.userName, styles.spacing,styles.transparentBackgroundCircle]}>
                        <View
                        style={{
                            width: 24,
                            height: 24,
                            borderRadius: 50,
                            borderWidth: 2,
                            borderColor: "#fff",
                            overflow: "hidden",
                            marginRight: 10,
                        }}
                        >
                        <Image
                            source={{
                            uri: item.picture,
                            }}
                            style={{ width: 24, height: 24, resizeMode: "cover" }}
                        />
                        </View>
                        <View >
                            <Text style={[styles.userNameText]}>{item.username}{' '}{(item.certified==1) ? <CertifiedIcon />:null}</Text>
                            <Text style={[styles.postDate]}>{dateg}</Text>
                        </View>
                        
                        
                    </View>
                    </TouchableOpacity>
                    <View style={styles.iconList,{flexDirection:'row'}}>
                        
                        <LikeButton item={item} liked={item.liked} nblikes={item.nblikes}/>

                        <CommentButton item={item} />

                        <ShareButton item={item} setIsDownloading={setIsDownloading} localContent={localContent} setLocalContent={setLocalContent}/>
                        
                    </View>

                   </View>
                  
                  
                  <>
                    {item.type!=2 && <PostDescription description={decodeURIComponent(item.description)}/>}
                  </>
                  
                  
                  
                </View>
                
              </View>
              {_displayDownloading()}
              
        </View>
    )
}

export default PostItem


