import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { windowWidth } from '../../utils/Dimensions';
import { COLORS } from '../../utils/Colors';
import CertifiedIcon from '../CertifiedIcon';
import  FontAwesome  from "react-native-vector-icons/FontAwesome";

const UserResults = ({users,navigation}) => {
  return (
    <View>
      <FlatList 
            windowSize={6}
            horizontal={false}
            scrollEnabled
            numColumns={2}
            data={users}
            keyExtractor={(item,index) => 
                    index.toString()
                    
                
            }
            renderItem={({ item, index }) => {
                            
                return (
                    <View style={styles.user}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Profil',{
                                picture:item.picture,
                                username:item.username,
                                certified:item.certified,
                                userid:item.id
                                })
                        }>
                                    <Image style={styles.userImage} resizeMode="cover" source={{
                                                        uri: item.picture,
                                                    }}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>navigation.navigate('Profil',{
                                picture:item.picture,
                                username:item.username,
                                certified:item.certified,
                                userid:item.id
                                })
                        } style={{alignSelf:'flex-start'}}>
                            <Text style={styles.userName}>{item.username} {' '} {(item.certified==1) ? <CertifiedIcon />:null}</Text>
                            <Text style={{color:COLORS.gray,padding:5, alignSelf:'center',fontSize:12}}>description texte ici</Text>
                        </TouchableOpacity>
                        <View style={styles.ButtonEditProfile}>
                            <Text style={styles.ButtonEditProfileText}>S'abonner</Text>
                        </View>
                    </View>
                );
                }}
            />
    </View>
  );
};

export default UserResults;

const styles = StyleSheet.create({
    user:{
        padding:10,
        flexDirection:'row',
        width:windowWidth,
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:0.5,
    },
    userImage:{
        alignSelf:'center',
        marginLeft:6,
        width:60,
        height:60,
        borderRadius:15,
        borderWidth:1,
        backgroundColor:COLORS.black,
        alignItems:'center',
        justifyContent:'center'
    },
    userName:{
        alignSelf:'flex-start',
        width:'100%',
        marginLeft:20,
        fontSize:16,
        fontWeight:'600',
        color:COLORS.white,
        //textAlign:'center'
    },
    UserDetails:{
        //paddingTop:10,
        alignSelf:'flex-start',
        justifyContent:'flex-start',
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
    ButtonEditProfile:{
        width: 100,
        height:32,
        //display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        alignSelf:'flex-end',
        //borderColor:COLORS.gray,
        paddingHorizontal:20,
        borderRadius:5,
        backgroundColor:COLORS.primary
    },
    ButtonEditProfileText:{
        color:COLORS.grayLight,
        fontSize:12
    },
});
