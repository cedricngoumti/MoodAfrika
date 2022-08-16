import { StyleSheet, Text, View,FlatList ,TouchableOpacity,Image} from 'react-native';
import React,{useState,useEffect} from 'react';
import { COLORS } from '../utils/Colors';
import  AntDesign  from "react-native-vector-icons/AntDesign";
import  MaterialIcons  from "react-native-vector-icons/MaterialIcons";
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import  Feather  from "react-native-vector-icons/Feather";
import CertifiedIcon from '../components/CertifiedIcon';

const SuggestionScreen = ({dataSuggestion,userSuggestion,hashtagSuggestion,navigation}) => {
   // const {hashtags} = dataSuggestion;
    const [userSuggest, setUserSuggest] = useState([])
    const [hashtags, setHashtags] = useState([])
    console.log(hashtagSuggestion);
    useEffect(() => {0
            setUserSuggest(userSuggestion);   
            setHashtags(hashtagSuggestion);
    }, [userSuggestion,hashtagSuggestion]);
   


  return (
    <View style={styles.container}>
      <FlatList 
            //windowSize={6}
            horizontal={false}
            scrollEnabled
            
            data={userSuggest}
            keyExtractor={(item,index) => 
                    index.toString()
                    
                
            }
            renderItem={({ item, index }) => {
                            
                return (
                    <TouchableOpacity 
                            onPress={()=> navigation.navigate('Profil',{
                                picture:item.picture,
                                username:item.username,
                                certified:item.certified,
                                userid:item.id
                            })} 
                            style={styles.suggestionUser}
                        >
                        <View  style={{flexDirection:'row'}}>
                            
                            <AntDesign name="search1" size={24} color={COLORS.white} />
                            <Text style={styles.title}>{' '} {item.username} {' '} {(item.certified==1) ? <CertifiedIcon />:null}</Text>
                        </View>
                        <Image style={styles.userImage} resizeMode="cover" source={{
                                                        uri: item.picture,
                                                    }}/>
                    </TouchableOpacity>
                );
                }}
                ListFooterComponent={
                    (
                        <FlatList 
                        //windowSize={6}
                        horizontal={false}
                        
                        
                        data={hashtags}
                        keyExtractor={(item,index) => 
                                index.toString()
                                
                            
                        }
                        renderItem={({ item, index }) => {
                                        
                            return (
                                <TouchableOpacity 
                                        onPress={()=> navigation.navigate('HashTag',{
                                            //id:item.id,
                                            name:item.name
                                        })} 
                                        style={styles.suggestionUser}
                                    >
                                    <View  style={{flexDirection:'row'}}>
                                        <Feather name="hash" size={24} color={COLORS.white} />
                                        <Text style={styles.titleHash}>{' '} {item.name.substring(1)} {' '} </Text>
                                    </View>
                                    
                                </TouchableOpacity>
                            );
                            }}
                        />
                    )
                }
    />
    
    </View>
  );
};

export default SuggestionScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:5,
    },
    suggestionUser:{
        
        paddingBottom:10,
        paddingHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        

    },
    title:{
        fontSize:14,
        color:COLORS.white,
        fontWeight:"bold",
        
    },
    titleHash:{
        fontSize:18,
        color:COLORS.white,
        fontWeight:"bold",
        
    },
    userImage:{
        alignSelf:'center',
        marginLeft:4,
        width:40,
        height:40,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:COLORS.black,
        alignItems:'center',
        justifyContent:'center'
    },
});
