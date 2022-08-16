import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator,Image ,ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { COLORS } from '../utils/Colors'
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import  AntDesign  from "react-native-vector-icons/AntDesign";
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { useNavigation } from '@react-navigation/native';
import { fetchRoomApi } from '../utils/API';
import SoundPlayer from 'react-native-sound-player';
import SocialButton from '../components/Form/SocialButton';
import CertifiedIcon from '../components/CertifiedIcon';
import { convertDateToFrench } from '../utils/API';
import ShareButton from '../components/ShareButton';
import CommentButton from '../components/CommentButton';
import LikeButton from '../components/LikeButton';

const RoomDetailScreen = (props) => {
    const [dateg, setDateg] = useState(null)

    const {isLoad,item} = props.route.params
    const [isLoading, setIsLoading]=useState(isLoad)
    const [isPaused, setIsPaused]=useState(0)
    const navigation = useNavigation()
    const [value,setValue] = useState({
        title:'',
        audio:null,
    })

    const fetchRoomApiCall = async () => {

        const data =  await fetchRoomApi();
        
        //setValue(data.rooms[0]);
        console.log(data.rooms)
        
      };
    
      useEffect(() => {
            
        fetch(`https://bonaberifc.com/apimood/public/rooms/get?id=${item}`,{ 
            credentials: "same-origin",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        },
        )
        .then((response) => response.json())
        .then((json) => {
            
            setValue(json.rooms)
            console.log();
            //console.log(json)
            setDateg(convertDateToFrench(json.rooms.registration));
            //playSound(json.rooms.audio);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
        //
      }, []);

      const playSound = (urisong) =>{
          try {
              SoundPlayer.playUrl(urisong)
              getInfo()
          } catch (e) {
            console.log(`cannot play the sound file`, e)
          }
      }


      const getInfo = async() => { // You need the keyword `async`
        try {
          const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
          console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
        } catch (e) {
          console.log('There is no song playing', e)
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                        <TouchableOpacity onPress={()=>navigation.goBack()} >
                        <MaterialIcons name="keyboard-backspace"  size={30} color={COLORS.white} />
                            
                        </TouchableOpacity>
                        <View>
                        <Text style={styles.title} numberOfLines={1}>{value.title}</Text>
                        </View>
                        
                        <TouchableOpacity onPress={()=>null } >
                            <AntDesign name="adduser" size={24} color={COLORS.white} />
            
                        </TouchableOpacity>
            </View>
            {
                isLoading ? (
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:windowHeight*0.2}}>
                        <ActivityIndicator size={'large'} color={COLORS.white}/>
                    </View>
                ):(<View style={{flex:1, alignItems:'center' ,width:windowWidth}}>
                    <View>
                        <Text style={{color:COLORS.grayLight, fontSize:16}} numberOfLines={3}>{value.title}</Text>
                    </View>
                    <ScrollView contentContainerStyle={{padding:15,justifyContent:'center',alignItems:'center',maxHeight:windowHeight*0.4}}>
                        <Text style={{color:COLORS.gray,fontSize:14,textAlign:'center'}}>{value.description}</Text>
                    </ScrollView>

                    
                    <View style={styles.footer}>
                <View style={styles.userDetails}>
                   <View style={{width: "100%",flexDirection:'row',justifyContent: "space-between"}}>
                   <TouchableOpacity onPress={() => navigation.navigate('Profil',{
                       picture:value.picture,
                       username:value.username,
                       certified:value.certified,
                       userid:value.iduser
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
                            uri: value.picture,
                            }}
                            style={{ width: 24, height: 24, resizeMode: "cover" }}
                        />
                        </View>
                        <View >
                            <Text style={[styles.userNameText]}>{value.username}{' '}{(value.certified==1) ? <CertifiedIcon />:null}</Text>
                            <Text style={[styles.postDate]}>{dateg}</Text>
                        </View>
                        
                        
                    </View>
                    </TouchableOpacity>
                    <View style={styles.iconList,{flexDirection:'row'}}>
                        <LikeButton item={item} liked={false} nblikes={0}/>

                        <CommentButton item={item} />

                        <ShareButton item={item} />
                        
                       
                    
                    </View>

                   </View>
                  
                  
                  
                  
                  
                  
                </View>
                
              </View>
                    <View style={{flex:1,paddingHorizontal:25, justifyContent:'center'}}>
                        {
                            isPaused ? (
                                <SocialButton 
                                    btnType={'play'}
                                    buttonTitle={'Lire l\'audio'}
                                    color={COLORS.white}
                                    backgroundColor='rgba(52, 52, 52, 0.7)'
                                    onPress={() => {SoundPlayer.resume()
                                        setIsPaused(0)
                                    }}
                                />
                            ):(
                                <SocialButton 
                                    btnType={'pause'}
                                    buttonTitle={'Mettre en Pause'}
                                    color={COLORS.white}
                                    backgroundColor='rgba(52, 52, 52, 0.7)'
                                    onPress={() => {SoundPlayer.pause()
                                        setIsPaused(1)
                                    }}
                                />
                            )
                        }
                        
                    </View>
                     
                </View>)
            }
        </View>
    )
}

export default RoomDetailScreen

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
        minWidth:windowWidth*0.6,
        width:windowWidth*0.6,
        fontSize:18,
        marginHorizontal:20,
        color:COLORS.white,
        fontWeight:"600",
        alignSelf:'center',
        
    },
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
        //position:'absolute',
        //bottom:22,
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