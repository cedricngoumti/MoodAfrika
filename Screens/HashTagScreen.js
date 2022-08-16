import { Image, ScrollView, StyleSheet, Text, View,TouchableOpacity, FlatList,ActivityIndicator,Linking } from 'react-native';
import React,{useState,useEffect} from 'react';
import { COLORS } from '../utils/Colors';
import { windowWidth } from '../utils/Dimensions';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  Ionicons  from "react-native-vector-icons/Ionicons";
import  MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import  Feather  from "react-native-vector-icons/Feather";
import CertifiedIcon from '../components/CertifiedIcon';
import PostDescription from '../components/PostDescription';
import { dialCall } from '../utils/API';
import { useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';


const HashTagScreen = (props) => {
    const {user} = useContext(AuthContext);
    const {navigation,route} = props
    const { name} = route.params
    const [isLoading, setLoading] = useState(true);
    const [postUserData, setPostUserData] = useState([]);
    const [userProfile, setUserProfile] = useState({
        username:'',
        description:'',
        localisation:'',
        picture:'',
        banned:'',
        disabled:'',
        certified:'',
        web:'',
        facebook:'',
        tel:'',
        whatsapp:'',

    });
    
    
    

    useEffect(() => {
        const t = name.trim().substring(1);
        
        const API_URL = user ? `https://moodafrika.bonaberifc.com/api_hashtagScreen?hashtagText=${t}&me=${user.userid}`: `https://moodafrika.bonaberifc.com/api_hashtagScreen?hashtagText=${t}&me=false`;

        fetch(API_URL,{ 
            credentials: "same-origin",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        },
        )
        .then((response) => response.json())
        .then((json) => {
            
            setPostUserData([...postUserData,...json.posts]);
            
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
                
                
                
    }, []);

    
    const renderLoader = () =>{
        if(isLoading){
            return(
                <View style={styles.loader}>
                    <ActivityIndicator size={"large"} color="white"/>
                    <Text style={{color:'white'}}>Chargement.....</Text>
                </View>
            )
        }
    
    }
    
    return (
            <View style={styles.container}>
                 <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="keyboard-backspace"  size={30} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.title}></Text>
                    
                    <FontAwesome
                    style={{ position: 'absolute', right: 13, top: 12 }}
                    name="ellipsis-v"
                    size={24}
                    color={COLORS.white}
                    />
                </View>
                
                          <FlatList 
                            ListHeaderComponent={
                                <>
                                    <View style={{paddingTop:15,paddingBottom:20}}>
                                        <View style={{display:'flex',flexDirection:'row',paddingLeft:10,justifyContent:'space-around'}}>
                                            <View>
                                                <Feather name="hash" size={60} color={COLORS.white} style={{paddingLeft:20}}/>
                                                
                                            </View>
                                            <View style={{marginLeft:10}}>
                                                <Text style={styles.userName}>{name}</Text>
                                                
                                                <View style={styles.UserDetails}>
                                                    
                                                        <View style={styles.UserFollowersText}>
                                                            <Text style={styles.UserFollowersTextDesc}> {postUserData.length } personnes publient à ce sujet</Text>
                                                        </View>
                                                        
                                                        
                                                   
                                                    

                                                    
                                                </View>
                                            </View>
                                            

                                        </View>
                                        
                                        
                                        

                                        
                                        
                                    </View>
                                    {renderLoader}
                                </>
                            }
                            ListFooterComponent={
                                <View style={{flexDirection:'row',paddingTop:10, borderTopColor:COLORS.gray}}> 
                                            
                                                   
                                </View>
                            }
                            windowSize={6}
                            horizontal={false}
                            scrollEnabled
                            numColumns={3}
                            data={postUserData}
                            keyExtractor={(item,index) => 
                                    index.toString()
                                    
                                
                            }
                            renderItem={({ item, index }) => {
                                
                                return (
                                    <View>
                                        <TouchableOpacity onPress={() => navigation.navigate('Reader',{
                                                videos:postUserData,
                                                indexVideo:index,
                                            })}       
                                            key={index} style={[{width:(windowWidth/3)},{height:(windowWidth/3)}, index % 3 !== 0 ? {paddingLeft:2}:{paddingLeft:0}]}>
                                                        <Image style={{flex:1, width:windowWidth/3, height:windowWidth/3}} 
                                                            source={{
                                                                    uri: item.image,
                                                            }} 
                                                            resizeMode='cover' 
                                                        />
                                        </TouchableOpacity>
                                    </View>
                                );
                                }}
                            //onEndReachedThreshold={2}
                            //ListFooterComponent={renderLoader}
                            //onEndReached={loadMorePost(userid,limit,lastIndex)}            
                           />
                                {/*
                                    videoData.map((item, index) => {
                                        return (<TouchableOpacity key={index} style={[{width:(windowWidth/3)},{height:(windowWidth/3)},{backgroundColor:'white'}, index % 3 !== 0 ? {paddingLeft:2}:{paddingLeft:0}]}>
                                                        <Image style={{flex:1, width:windowWidth/3, height:windowWidth/3}} 
                                                            source={{
                                                                    uri: item.image,
                                                            }} 
                                                            resizeMode='cover' 
                                                        />
                                        </TouchableOpacity>)
                                    })
                                */}
                          
                
            </View>
    );
};

export default HashTagScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        //alignItems:'center',
        paddingTop:25,
        backgroundColor:COLORS.black
        
    },
    header:{
        
        padding:10,
        flexDirection:'row',
        
        alignItems:'center',
        borderBottomWidth:0.5,
        

    },
    userImage:{
        alignSelf:'center',
        marginLeft:10,
        width:100,
        height:100,
        borderRadius:25,
        borderWidth:1,
        backgroundColor:COLORS.black,
        alignItems:'center',
        justifyContent:'center'
    },
    userName:{
        alignSelf:'center',
        width:'100%',
        marginLeft:20,
        fontSize:18,
        fontWeight:'bold',
        color:COLORS.white,
        //textAlign:'center'
    },
    UserDetails:{
        //paddingTop:10,
        alignSelf:'flex-start',
        justifyContent:'space-around',
        alignItems:'flex-start',
        width:'100%',
        
    },
    UserDetailsText:{
        width:'80%',
        flexDirection:'row',
        paddingTop:10,
        paddingLeft:10,
        //paddingRight:15,
        alignItems:'center',
        //justifyContent:'center'
    },
    UserDetailsTextNumber:{
        color:'#fff',
        fontWeight:'bold'
        
    },
    UserDetailsTextDesc:{
        color:COLORS.gray,
       //marginTop:10,
        marginLeft:10,
    },
    UserFollowers:{
        marginTop:20,
        marginHorizontal:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    UserFollowersText:{
        paddingHorizontal:10,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    UserFollowersTextNumber:{
        color:'#fff',
        fontWeight:'bold'
    },
    UserFollowersTextDesc:{
        color:COLORS.gray,
        marginTop:10,
    },
    EditProfile:{
        marginTop:20,
        paddingRight:20,
        marginLeft:20,
        //width:windowWidth,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonEditProfile:{
        width: 160,
        height:52,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        //borderColor:COLORS.gray,
        padding:15,
        borderRadius:5,
        backgroundColor:COLORS.primary
    },
    ButtonEditProfileText:{
        color:COLORS.grayLight
    },
    ButtonFavorites:{
        marginLeft:10,
        display:'flex',
        height:52,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        //borderWidth:1,
        padding:15,
        //borderColor:COLORS.gray,
        borderRadius:10,
    },
    ButtonAddBio:{
        margin:10,
        //display:'flex',
       // marginHorizontal:10,
        //width:'95%',
        //height:52,
        //flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:10
    },
    ButtonAddBioText:{
        color:COLORS.gray
    },loader:{
        marginVertical:66,
        width:windowWidth,
        //height:windowHeight,
        textAlignVertical:'center',
        alignItems:"center",
        alignContent:'center'
    
    },
});
